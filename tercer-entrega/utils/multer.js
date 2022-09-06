import multer from 'multer';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagenes')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({ storage: storage });

export default { upload}
