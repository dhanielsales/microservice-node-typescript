const config = {
  client: 'pg',
  connection: process.env.SQL_DATABASE_URL,
  searchPath: ['knex', 'public'],
  migrations: {
    tableName: 'migrations',
  },
};

export default config;
