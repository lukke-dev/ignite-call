docker:
	sudo docker compose -f docker-compose.yml up --remove-orphans

build:
	sudo docker compose -f docker-compose.yml build