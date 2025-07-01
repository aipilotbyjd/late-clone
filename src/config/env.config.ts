export default () => ({
  port: parseInt(process.env.PORT || '3000'),
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
});
