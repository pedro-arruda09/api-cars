const UserModel = require('../models/UserModel');

module.exports = {
    store(data) {
        return UserModel.findOne(data)
    }
}