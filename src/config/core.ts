export default {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 8000,
  jwtSecretKey:
    process.env.JWT_SECRET_KEY || 'GUYhKAiuyi8rywOrhhIUHU2rIYoiHhkj',
};
