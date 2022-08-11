const UserService = require('../services/userService');
const utils = require('../utils/utils');

module.exports = {
    async index(req, res) {
        try {
            const users = await UserService.index(req.userId);

            return utils.handleResponse(res, users);
        } catch (e) {
            return utils.handleError(res, 'Unable to view users.')
        }
    },

    async store(req, res) {
        try {
            const createUser = await UserService.store(req);

            return utils.handleResponse(res, createUser);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const user = await UserService.show(req.userId);

            return utils.handleResponse(res, user);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async update(req, res) {
        try {
            const changes = req.data;
            const filter = {
                id: req.userId
            };
        
            await UserService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch(e) {
            console.log(e);
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            if (!req.userId) {
                return res.status(400).json({
                    errors: ['ID was not sent.']
                })
            }

            await UserService.delete({
                id: req.userId,
            });

            return utils.handleResponse(res, 'The user was deleted succesfully.');
        } catch (e) {
            return utils.handleError(res, e);
        }
    }
}