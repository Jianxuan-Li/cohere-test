up:
	@cd backend && make down && make init && make up
	@cd frontend && make down && make up
down:
	@cd backend && make down
	@cd frontend && make down

clean:
	@cd backend && make down
	@cd frontend && make down
	@cd backend && make clean
	@cd frontend && make clean