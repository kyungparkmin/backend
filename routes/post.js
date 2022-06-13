const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { isLoggedIn } = require('./middlewares');
const controller = require('../controllers/post');
const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads폴더가 없어 uploads폴더를 생성합니다');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'uploads/');
    },
    filename(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits : { fileSize: 5 * 1024 * 1024 },
});

router.get('/', controller.viewAll);
router.get('/:id', controller.view);
router.post('/write', isLoggedIn, upload.single('img'), controller.post);
router.post('/edit/:id', isLoggedIn, controller.edit);
router.get('/remove/:id', isLoggedIn, controller.remove);
router.post('/comment/add', isLoggedIn, controller.comment);


module.exports = router;