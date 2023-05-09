const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
      },
  });
  const upload = multer({ storage: storage }); 
module.exports = {upload } 