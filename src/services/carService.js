const CarModel = require('../models/CarModel');

module.exports = {
    index(filter) {
        return CarModel.findAll({
            attributes: ['id', 'model', 'year', 'chassi'],
            where: filter
        });
    },

    async store(req) {
        const findCar = await CarModel.findOne({
            where: {
                chassi: req.data.chassi
            }
        })

        if (findCar) {
            throw new Error("Car registered.")
        }

        const data = {
            year: req.data.year,
            model: req.data.model,
            chassi: req.data.chassi,
            user_id: req.userId
        }

        try {
            const user = await CarModel.create(data);

            return user;
        } catch (e) {
            throw e;
        }
    },

    async show(filter) {
        const car = await CarModel.findOne({
            where: filter
        });

        if (!car) {
            throw new Error('Car does not exist.');
        }

        return car;
    },

    async update(data, id, user_id) {
        const car = await CarModel.update(data, {
            where: { id, user_id },
        }, {
            returning: true,
        });

        if (!car) {
            throw new Error('Car was not found.');
        }
        return car;
    },

    async delete(filter) {
        await this.show(filter);

        return CarModel.destroy({
            where: filter
        });
    }
};