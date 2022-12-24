backend-init:
	mkdir server &&\
	cd server && \
	npm init -y && \
	npm i --save sequelize express pg bcryptjs jsonwebtoken cors dotenv &&\
	npm i --save-dev nodemon sequelize-cli jest supertest &&\
	touch .gitignore app.js && mkdir controllers helpers middlewares bin &&\
	cd controllers && touch index.js &&\
	cd .. && cd middlewares && touch errorHandler.js authentication.js &&\
	cd .. && cd bin && touch www.js && cd .. &&\
	npx sequelize-cli init && cd .. 
database-init:
	cd server && npx sequelize-cli db:create && npx sequelize-cli db:create --env test 
migrate:
	cd server && npx sequelize-cli db:migrate && npx sequelize-cli db:migrate --env test
database-drop:
	cd server && npx sequelize-cli db:drop && npx sequelize-cli db:drop --env test 
database-reset:
	cd server && npx sequelize-cli db:drop && npx sequelize-cli db:drop --env test &&\
	npx sequelize-cli db:create && npx sequelize-cli db:create --env test &&\
	npx sequelize-cli db:migrate && npx sequelize-cli db:migrate --env test
backend-run:
	cd server && nodemon bin/www.js
backend-test:
	cd server && npx jest --runInBand --detectOpenHandles --forceExit
frontend-init:
	npm init vue@latest &&\
    cd frontend && npm install && npm i --save axios pinia vue-router && npm run dev
frontend-run:
	cd frontend && npm run dev