DOCKER_COMPOSE=docker-compose --env-file ./backend/.env

MIGRATE=cd backend && npx prisma migrate dev

up:
	$(DOCKER_COMPOSE) up -d
	$(MIGRATE)

ps:
	$(DOCKER_COMPOSE) ps

build:
	$(DOCKER_COMPOSE) up -d --build
	$(MIGRATE)

log:
	$(DOCKER_COMPOSE) logs $(SERVICE_NAME) --follow

down:
	$(DOCKER_COMPOSE) down