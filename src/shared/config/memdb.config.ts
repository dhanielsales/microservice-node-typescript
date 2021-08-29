const config = {
  password: process.env.MEM_DATABASE_PASSWORD,
  host: process.env.MEM_DATABASE_HOST,
  port: Number(process.env.MEM_DATABASE_PORT),
};

export default config;
