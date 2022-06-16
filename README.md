# monks-and-mages-db-service

DB layer for monksandmages.com

See related project: https://github.com/lijim/monks-and-mages

The vision for this db-service is a DB service that the webserver can access.

This DB service will:

- Talk to auth0 about authentication concerns via Bearer tokens passed via the consuming API
- Make DB queries and writes via Sequelize: https://sequelize.org/

Starting commands:

1. `npx prisma migrate dev` to set up your local database (make sure to first install postgreSQL and ideally your DB debugging software of choice, e.g TablePlus)
2. Run this db-service, the [reverse proxy service](https://github.com/lijim/monks-and-mages-reverse-proxy), and the [main game app](https://github.com/lijim/monks-and-mages)
3. Visit the site at http://localhost:4001/
4. The api can be accessed now at http://localhost:4001/api
