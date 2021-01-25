const { query } = require('../../helpers/db.js')
module.exports = async (req, res) => {
    const result = await query(`
            SELECT name FROM categories
        `)
    res.json(result)
}