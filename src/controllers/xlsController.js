const xlsx = require('xlsx');
const UserModel = require('../models/UserModel');
const CarModel = require('../models/CarModel');
const path = require('path');

module.exports = {
    async index(req, res) {
        const user = await UserModel.findAll({
            where: {
                id: req.userId
            },
            attributes: ['id', 'name', 'email'],
            include: {
                model: CarModel,
                attributes: ['model', 'year', 'chassi'],
                where: {
                    user_id: req.userId
                },
                as: 'car'
            },
            raw: true,
            nest: true,
        });

        const workSheetColumnNames = ['ID', 'Name', 'Email', 'Car Model', 'Car Year', 'Car Chassi'];
        const workSheetName = 'Users';
        const filePath = './uploads/users.xlsx';

        const exportUsersToExcel = (user, workSheetColumnNames, workSheetName, filePath) => {
            const data = user.map(user => {
                return [user.id, user.name, user.email, user.car.model, user.car.year, user.car.chassi];
            });
            const workBook = xlsx.utils.book_new();
            const workSheetData = [
                workSheetColumnNames,
                ...data
            ];
            const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
            xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
            xlsx.writeFile(workBook, path.resolve(filePath));
            return true;
        }
        exportUsersToExcel(user, workSheetColumnNames, workSheetName, filePath);
    }
};