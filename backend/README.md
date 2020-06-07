to run tests spawn the docker-compose to spin up a sampel mysql instance

    docker-compose -f docker-compose.test.yml up -d
    
ENVS

    DATABASE_ADDRESS='localhost'
    DATABASE_USER='root'
    DATABASE_PASSWORD='testpassword'
    DATABASE_PORT=6603
    SERVICE_PORT=3001
    DATABASE_NAME=test_db
    LOGIN_JWT_SECRET=login_jwt_secret 
    LOGIN_JWT_EXPIRATION=1h