
const { query } = require('../../helpers/db.js')
const { checkHash, generateBearerToken } = require('../../helpers/auth.js')

module.exports = async (req, res) => {
    const { email, password } = req.body

    const [user] = await query(`
  SELECT * FROM users 
  WHERE email = '${email}'
  `)

    if (!user) {
        return res.json({ error: 'invalid email or password.' })
    }

    if (!checkHash(password, user.password_salt, user.password_hash)) {
        return res.json({ error: 'invalid email or password.' })
    }

    delete user.password_hash
    delete user.password_salt

    const token = generateBearerToken({ ...user })
    res.json({
        user,
        token
    })

}