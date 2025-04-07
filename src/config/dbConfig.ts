import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('myapp', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
