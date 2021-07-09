let UrlModel = require('../models/url.js')


module.exports = {
    create : async (req, res) =>{
        const { name, bio, website } = req.body;
        const user = await User.create({
            name,
            bio,
            website
        })

        return res.send(user)
    },

    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },
    postsByUser : async (req, res) => {
       const { id } = req.params;
       const user = await User.findById(id).populate('posts');

        res.send(user.posts);
    }
}
