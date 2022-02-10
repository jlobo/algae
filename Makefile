.PHONY: up down setup

up:
	docker-compose up

down:
	docker-compose down

setup:
	aws --endpoint-url=http://localhost:4566 s3 mb "s3://main"
