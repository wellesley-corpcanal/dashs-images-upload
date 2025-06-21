const logger = require('../lib/Logger');

class FileController {
  create(req, res, next) {
    try {
      if (!req.file) {
        // Isso pode acontecer se o filtro de arquivo do multer rejeitar o arquivo
        // ou se nenhum arquivo for enviado.
        throw new Error('Arquivo não enviado ou tipo de arquivo inválido.');
      }

      const { originalname: name, size, filename: key } = req.file;

      const file = {
        name,
        size,
        key,
        url: `${process.env.APP_URL}/files/${key}`,
      };

      return res.status(201).json(file);
    } catch (error) {
      logger.error('Falha ao processar o upload do arquivo', error);
      return next(error);
    }
  }
}

module.exports = new FileController(); 