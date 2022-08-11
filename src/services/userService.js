const { findByPk } = require('../models/UserModel');
const UserModel = require('../models/UserModel');

module.exports = {
    index() {
        return UserModel.findAll({
            attributes: ['name', 'email']
        });
    },

    async store(req) {
        const findUser = await UserModel.findOne({
            where: {
                email: req.data.email
            }
        })

        if (findUser) {
            throw new Error("Email registered.")
        }

        try {
            const user = await UserModel.create(req.data);

            return user;
        } catch (e) {
            throw e;
        }
    },

    async show(filter) {
        const user = await UserModel.findOne({
            where: filter
        });

        if (!user) {
            throw new Error('User does not exist.');
        }

        return user;
    },

    async update(filter, changes) {
        return UserModel.update(changes, {
            where: filter,
            individualHooks: true
        });
    },

    async delete(filter) {
        await this.show(filter);

        return UserModel.destroy({
            where: filter
        });
    }
};