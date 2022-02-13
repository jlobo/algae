#!/bin/sh
cd /app

if [ "$#" -eq 1 ] && [ "$1" = "-m" ]; then
    echo "Migratingmigrating database..."
    npx sequelize-cli db:migrate:status >&- 2>&- \
        || npx sequelize-cli db:create  || return 1
    
    npx sequelize-cli db:migrate || return 1
elif [ "$#" -gt 0 ] ; then
    echo "Invalid argument: [-m] To migrate database"
    return 1
fi

node src/app.js