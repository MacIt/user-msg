# bash
docker run --name msg-pg -e POSTGRES_USER=testuser -e POSTGRES_PASSWORD=msgpgdb -e POSTGRES_DB=postgres -d -p 5432:5432 postgres 