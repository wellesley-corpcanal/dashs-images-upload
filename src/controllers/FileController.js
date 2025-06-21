class FileController {
  create(req, res) {
    console.log(req.file);

    const { originalname: name, size, filename: key } = req.file;

    const file = {
      name,
      size,
      key,
      url: `${process.env.APP_URL}/files/${key}`,
    };

    return res.json(file);
  }
}

module.exports = new FileController(); 