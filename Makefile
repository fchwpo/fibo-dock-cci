rebuild:
	docker-compose down
	docker-compose build
	docker-compose up
.PHONY: rebuild