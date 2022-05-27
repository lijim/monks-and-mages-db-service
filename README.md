# monks-and-mages-db-service
DB layer for monksandmages.com

See related project: https://github.com/lijim/monks-and-mages

The vision for this db-service is a DB service that the webserver can access.  

This DB service will: 
- Talk to auth0 about authentication concerns via Bearer tokens passed via the consuming API
- Make DB queries and writes via Sequelize: https://sequelize.org/
