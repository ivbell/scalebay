const pg = require('pg')
const bcrypt = require('bcrypt')

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    port: 5432,
    database: 'scalebay-db',
}

const pool = new pg.Pool(config)

async function createAdminUser() {
    const query = `
    INSERT INTO public."admin" (password, email) VALUES ($1, $2) RETURNING *
  `

    const password = process.argv[3] || Math.floor(Math.random() * 100001).toString()

    const hashPassword = await bcrypt.hash(password, 15)
    const email = process.argv[2]

    const admin = [hashPassword, email]
    await pool
        .query(query, admin)
        .then(() => console.log(`Login - ${email}, password - ${password} | Admin created`))
        .catch((e) => console.log(e))
}

createAdminUser()
