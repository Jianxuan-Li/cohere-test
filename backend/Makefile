.PHONY: run
run:
	@docker -v > /dev/null 2>&1 || (echo "Docker is not installed" && exit 1)
	@docker-compose -v > /dev/null 2>&1 || (echo "Docker-compose is not installed" && exit 1)
	@docker info > /dev/null 2>&1 || (echo "Docker is not running" && exit 1)

	docker-compose run --rm --service-ports junt-ai-backend

	@exit 0

.PHONY: init
init:
	@docker -v > /dev/null 2>&1 || (echo "Docker is not installed" && exit 1)
	@docker-compose -v > /dev/null 2>&1 || (echo "Docker-compose is not installed" && exit 1)
	@docker info > /dev/null 2>&1 || (echo "Docker is not running" && exit 1)

	docker-compose run --rm junt-ai-backend poetry install

	@exit 0

.PHONY: up
up:
	docker-compose up -d
	@echo "Backend is running on http://localhost:8000"
	@exit 0

.PHONY: dev
dev:
	poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8000

.PHONY: lint
lint:
	poetry run pylint ./*.py

.PHONY: down
down:
	@docker-compose down

.PHONY: clean
clean:
	docker volume rm junt-ai-backend
	docker image rm docker.io/freeyeti/dev-in-docker:python3.11-poetry1.5.1-gdal-dev