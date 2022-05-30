import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.PG_DATABASE_NAME as string,
  process.env.PG_USER as string,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_DOMAIN,
    dialect: 'postgres',
    port: Number(process.env.PG_PORT),
  }
);
