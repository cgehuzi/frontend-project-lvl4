install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server --address localhost --port 5001

start:
	make start-backend & make start-frontend