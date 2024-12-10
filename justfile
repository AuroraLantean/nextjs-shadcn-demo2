#!/usr/bin/env just --justfile
# https://github.com/casey/just

set dotenv-required
set dotenv-load
#set export   ... to export all variables below as the environment variables
alias s0 := dbstatus
alias s1 := dbstart
dirpath := "/mnt/sda3/"
#time := datetime("%Y")
#time := datetime("%Y_%m_%d__%H_%M_%S")
# hello is recipe's dirpath
#hello:#echo datetime("%Y_%m_%d__%H_%M_%S")
hello:
	echo "run"
	bun dev
#hello2:
#  echo "Hello World $HASHCOST $time"

fmtlint:
	bunx biome check --write ./src
fmt:
	bunx biome format --write ./src
lint:
	bunx biome lint --write ./src
dev:
	bun dev
build:
	bun build
start:
	bun start
clean:
	rm -r node_modules
install:
	pnpm install
dbstatus:
	systemctl status postgresql
dbstart:
	sudo systemctl start postgresql
dbstop:
	sudo systemctl stop postgresql
dbrestart:
	sudo systemctl restart postgresql
dbmigrate:
	pnpm dlx prisma migrate dev
	
serve:
  @echo "Starting server with database $DB_POSTGRES_URL"
  ./server --database $DB_POSTGRES_URL --port $123

js:
  #!/usr/bin/env node
  console.log('Greetings from JavaScript!')