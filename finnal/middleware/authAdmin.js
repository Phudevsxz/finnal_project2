const Users = require('../models/userModal')

const authAdmin = async (req, res, next) => {
    try {
        //lấy thông tin của user dựa trên id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if (user.role === 0)
            return res.status(400).json({ msg: "Admin resourse access denied" })

            next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authAdmin