export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    schema: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    type: process.env.DB_TYPE,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: Number(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
});
