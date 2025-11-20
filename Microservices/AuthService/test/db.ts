

import { Pool } from 'pg'
import * as fs from 'fs'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

const run = async (file: string) => {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  let statement = ''
  let firstLine = true
  for (let line of lines) {
    line = line.trim()

    if (firstLine) {
      firstLine = false
      continue // Skip the first line
    }

    if (!line.startsWith('--')) {
      statement += ' ' + line + '\n'
      if (line.endsWith(';')) {
        await pool.query(statement)
        statement = ''
      }
    }
  }
}

const reset = async () => {
  await run('sql/test_schema.sql')
  await run('sql/test_data.sql')
}

const shutdown = () => {
  pool.end()
}

export { reset, shutdown }
