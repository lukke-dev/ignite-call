docker:
	sudo docker compose -f docker-compose.yml up --remove-orphans

bash:
	sudo docker compose -f docker-compose.yml exec ignite_call /bin/bash

prisma_studio:
	sudo docker container exec ignite_call bash -c "npx prisma studio"

build:
	sudo docker compose -f docker-compose.yml build