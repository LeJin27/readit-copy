import {Pool} from 'pg'
import dotenv from "dotenv";
dotenv.config()

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

export { pool }
