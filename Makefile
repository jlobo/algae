.PHONY: build up down dev test reset migration release

AWS_URL := http://localhost:4566
AWS_BUCKET := main

build:
	docker build -t jlob0/algae:latest .

up: build
	docker-compose up

down:
	docker-compose down

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

migration:
	@read -p "Enter the new migration file: " name; \
	[ -z "$$name" ] && echo "Full name cannot be empty" && return 1 || \
	npx sequelize migration:generate --name "$$name"

release:
	@read -p "Enter the new revision [major|minor|patch]: " revision; \
	[ -z "$$revision" ] && echo "Revision cannot be empty" && return 1 || \
	version=$$(npm version "$$revision") \
	&& branch=$$(git symbolic-ref --short HEAD) \
	&& git push --atomic origin "$$branch" "$$version"
