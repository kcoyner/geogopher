#!/bin/bash

if [ -f $HOME/.pgpass ]; then
  echo "` chmod 0600 $HOME/.pgpass `"

  echo " ` psql -h stn4.homelinux.com -p 5432 -U webapplogin  geogophertesting  -f ./scripts/postgres_db_create.sql` "

  echo " ` psql -h stn4.homelinux.com -p 5432 -U webapplogin  geogophertesting  -f ./scripts/postgres_db_insert_sample_data.sql` "

else
   echo "You need a .pgpass file in your home directory with proper DB
   credentials"
fi
