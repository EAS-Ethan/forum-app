const { generateSaltAndHash } = require('../../helpers/auth.js')
const { query } = require('../../helpers/db.js')
module.exports = async (req, res) => {
    const { email, username, password } = req.body

    const rows = await query(`
        SELECT * FROM users
        WHERE email = '${email}' 
    `)
    if (rows.length > 0) {
        return res.json({ error: 'email already in use.' })
    }
    const { salt, hash } = generateSaltAndHash(password)

    const { insertId } = await query(`
        INSERT INTO users (email, username, password_hash, password_salt)
        VALUES ('${email}','${username}','${hash}', '${salt}')
    `);

    res.json({ id: insertId })
}
