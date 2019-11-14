const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../App/Middlewares/AuthMiddleware')
const AdminController = require('../App/Controllers/Http/AdminController');


router.use((req,res,next)=>{
    AuthMiddleWare.auth({req,res,next});
})
router.get('/getinspection', (req, res, next)=>{
    AdminController.getInspection({req,res,next});
})
router.put('/updateinspect', (req, res, next)=>{
    AdminController.updateInspect({req,res,next});
})
router.delete('/deleteinspect/:id', (req, res, next)=>{
    const id = req.params.id;
    AdminController.deleteInspect({req,res,next}, id);
})
router.post('/insertinspect', (req, res, next)=>{
    AdminController.addIns({req,res,next});
})
module.exports = router;