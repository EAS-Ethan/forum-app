
const { query } = require('../../helpers/db.js')
module.exports = async (req, res) => {
    const { title, image } = req.body
    const category_id = req.params.id
    const { id } = req.user.id


    const { insertId } = await query(`
        INSERT INTO posts (categories_id, user_id, title, image , upvotes, downvotes)
        VALUES (${category_id},${user_id})
    `);

    res.json({ id: insertId })
}
