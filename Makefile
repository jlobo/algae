.PHONY: up down reset seed

AWS_URL := http://localhost:4566
AWS_BUCKET := main

dev:
	npx nodemon -r esm src/app.js

up:
	docker-compose up

down:
	docker-compose down

reset:
	@if aws --endpoint-url=$(AWS_URL) s3api head-bucket --bucket $(AWS_BUCKET) 2> /dev/null; then \
		aws --endpoint-url=$(AWS_URL) s3 rb "s3://$(AWS_BUCKET)" --force; \
	fi; \
	aws --endpoint-url=$(AWS_URL) s3 mb "s3://$(AWS_BUCKET)"; \
	npx sequelize-cli db:drop \
		&& npx sequelize-cli db:create \
		&& npx sequelize-cli db:migrate \
		&& npx sequelize-cli db:seed:all

seed:
	@read -p "Enter name of the seed: " name; \
	[ -z "$$name" ] && echo "Full name cannot be empty" && return 1 || \
	npx sequelize-cli seed:generate --name "$$name"

migrate:
	@read -p "Enter the new migration file: " name; \
	[ -z "$$name" ] && echo "Full name cannot be empty" && return 1 || \
	npx sequelize migration:generate --name "$$name"

test: reset
	npx mocha --timeout 30000 -r esm 'src/tests/**/*.js'