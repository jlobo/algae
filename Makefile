.PHONY: up down dev test reset seed migrate

AWS_URL := http://localhost:4566
AWS_BUCKET := main

build:
	docker build -t jlob0/algae:latest .

up: build
	docker-compose up

down:
	docker-compose down

push: build
	docker push jlob0/algae

dev:
	npx nodemon -r esm src/app.js

test: reset
	npx mocha --timeout 30000 -r esm 'src/tests/**/*.js'

reset:
	@if aws --endpoint-url=$(AWS_URL) s3api head-bucket --bucket $(AWS_BUCKET) 2> /dev/null; then \
		aws --endpoint-url=$(AWS_URL) s3 rb "s3://$(AWS_BUCKET)" --force; \
	fi; \
	aws --endpoint-url=$(AWS_URL) s3 mb "s3://$(AWS_BUCKET)"; \
	npx sequelize-cli db:drop \
		&& npx sequelize-cli db:create \
		&& npx sequelize-cli db:migrate

seed:
	@read -p "Enter name of the seed: " name; \
	[ -z "$$name" ] && echo "Full name cannot be empty" && return 1 || \
	npx sequelize-cli seed:generate --name "$$name"

migrate:
	@read -p "Enter the new migration file: " name; \
	[ -z "$$name" ] && echo "Full name cannot be empty" && return 1 || \
	npx sequelize migration:generate --name "$$name"
