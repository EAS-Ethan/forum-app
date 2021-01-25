
const { query } = require('../../helpers/db.js')
module.exports = async (req, res) => {
    const { name } = req.body

    const rows = await query(`
        SELECT * FROM categories
        WHERE name = '${name}' 
    `)
    if (rows.length > 0) {
        return res.json({ error: 'Category already exists' })
    }


    const { insertId } = await query(`
        INSERT INTO categories (name)
        VALUES ('${name}')
    `);

    res.json({ id: insertId })
}
