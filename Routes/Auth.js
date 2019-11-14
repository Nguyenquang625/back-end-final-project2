const express = require('express');
const router = express.Router();
const AuthController = require('../App/Controllers/Http/AuthController');
const { validationResult } = require('express-validator')
const registerValidator = require('../App/Validators/registerValidator')
const multer = require('multer')
const path = require('path');
const jwt = require('json-web-token');

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// })

// const upload = multer({
//     storage: storage
// }).single('file');

// router.post('/register', registerValidator,(req,res,next)=>{
//     const errors = validationResult(req);
//     console.log(errors);
//     AuthController.register({req,res,next});
// // })
// router.post('/testMulter', (req,res,next)=>{
//     upload(req,res,(err)=>{
//         if(err){
//             console(err);
//         }
//         console.log(req.body)
//     })
// })

router.post('/login', (req, res, next) => {
    AuthController.login({ req, res, next });
})
router.get('/getInfo', (req, res, next) => {
    AuthController.getInfo({ req, res, next });
})
router.post('/insertUser', (req, res, next) => {
    AuthController.insertUser({ req, res, next });
})
module.exports = router;