const login = require('./handlers/login/post')
const register = require('./handlers/register/post')
const postCategories = require('./handlers/categories/post')
const getCategories = require('./handlers/categories/get')
const postPosts = require('./handlers/post/post')





module.exports = {
    public: [
        { path: "/api/login", handler: login, method: "post" },
        { path: "/api/register", handler: register, method: "post" },

    ],
    private: [
        { path: "/api/categories", handler: postCategories, method: "post" },
        { path: "/api/categories", handler: getCategories, method: "get" },
        { path: "/api/posts:id", handler: postPosts, method: "post" },





    ]
}