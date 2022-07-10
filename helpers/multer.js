const multer = require('multer')
const path = require('path')

// where and how the file will be stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})


// reject unsupported images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    //reject file
    cb({ message: 'Unsupported file format' }, false)
  }
}

// actual thing to be called when uploading the images
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
})

module.exports = upload
