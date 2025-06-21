const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const FileController = require('./controllers/FileController');

routes.post('/files', multer(multerConfig).single('file'), FileController.create);

module.exports = routes; 