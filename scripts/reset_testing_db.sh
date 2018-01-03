#!/bin/bash

if [ -f $HOME/.pgpass ]; then
  echo "` chmod 0600 $HOME/.pgpass `"

  echo " ` psql -h geogophers-postgresql-db-test.c8nqtytgojtc.us-east-1.rds.amazonaws.com -p 5432 -U webAppLogin  geogophertesting  -f ./scripts/postgres_db_create.sql` "     

  echo " ` psql -h geogophers-postgresql-db-test.c8nqtytgojtc.us-east-1.rds.amazonaws.com -p 5432 -U webAppLogin  geogophertesting  -f ./scripts/postgres_db_insert_sample_data.sql` "     

else
   echo "You need a .pgpass file in your home directory with proper DB
   credentials"
fi
