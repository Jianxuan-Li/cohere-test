.PHONY: up
up:
	docker-compose up -d
	@echo "Frontend is running on http://localhost:3000"
	@exit 0

.PHONY: down
down:
	@docker-compose down

.PHONY: clean
clean:
	docker image rm node:18