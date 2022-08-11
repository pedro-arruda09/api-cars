const pdf = require('html-pdf');
const CarModel = require('../models/CarModel');
const UserModel = require('../models/UserModel');
const fs = require('fs');

module.exports = {
    async index(req, res) {

        const user = await UserModel.findAll({
            where: {
                id: req.userId
            },
            attributes: ['name', 'id'],
            include: [{
                model: CarModel,
                attributes: ['id', 'model', 'year', 'chassi'],
                where: {
                    user_id: req.userId
                },
                as: 'car'
            }],
            raw: true,
            nest: true
        });

        let carsHtml = '';

        user.forEach(car => {
            carsHtml += `
                <tr>
                    <td>${car.car.id}</td>
                    <td>${car.car.model}</td>
                    <td>${car.car.year}</td>
                    <td>${car.car.chassi}</td>
                </tr>
            `;
        });

        let pdfTemplate = fs.readFileSync('html/header.html', 'UTF-8');

        pdfTemplate = pdfTemplate.replace('{{ userName }}', user.name);
        pdfTemplate = pdfTemplate.replace('{{ carsHtml }}', carsHtml);
6
        try {
            pdf.create(pdfTemplate, {}).toFile("./uploads/meupdf.pdf", err => {

                res.type('pdf');
                res.download('./uploads/meupdf.pdf');
            });
        } catch (e) {
            throw new Error ('Unable to create PDF.');
        }
    }
};