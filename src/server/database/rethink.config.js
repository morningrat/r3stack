export default {
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 28015,
  db: process.env.NODE_ENV === 'testing' ? 'ava' : 'r3stack',
  min: process.env.NODE_ENV === 'production' ? 50 : 3,
  buffer: process.env.NODE_ENV === 'production' ? 50 : 3
}
