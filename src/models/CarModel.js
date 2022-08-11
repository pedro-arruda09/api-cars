const { Model, DataTypes } = require('sequelize');

class Car extends Model {
    static init(sequelize) {
        super.init({
            model: { type: DataTypes.STRING },
            year: {
                type: DataTypes.INTEGER,
                defaultValue: '',
            },
            chassi: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
        }, {
            sequelize,
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Car;