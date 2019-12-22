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
router.get('/getallmanager', (req, res, next)=>{
    AdminController.getallManager({req,res,next});
})
router.get('/getallmembers', (req, res, next)=>{
    AdminController.getAllMembers({req,res,next});
})
router.put('/setadmin', (req, res, next)=>{
    AdminController.setAdmin({req,res,next});
})
router.put('/setowner', (req, res, next)=>{
    AdminController.setOwner({req,res,next});
})
router.put('/setmember', (req, res, next)=>{
    AdminController.setMember({req,res,next});
})
router.put('/banaccount', (req, res, next)=>{
    AdminController.banAccount({req,res,next});
})
router.put('/unbanaccount', (req, res, next)=>{
    AdminController.unbanAccount({req,res,next});
})
router.get('/getinspectionbytitle', (req, res, next)=>{
    AdminController.getInspectionByTitle({req,res,next});
})
router.post('/adduser', (req, res, next)=>{
    AdminController.addUser({req,res,next});
})
router.get('/getmemberbyname', (req, res, next)=>{
    AdminController.getMemberByName({req,res,next});
})
router.put('/closeinspection', (req, res, next)=>{
    AdminController.closeInspection({req,res,next});
})
router.put('/reopeninspection', (req, res, next)=>{
    AdminController.reOpenInspection({req,res,next});
})
router.put('/updateuserprofile', (req, res, next)=>{
    AdminController.updateUserProfileByAdmin({req,res,next});
})
router.post('/addchat', (req, res, next)=>{
    AdminController.addChat({req,res,next});
})
router.get('/getchatlog', (req, res, next)=>{
    AdminController.getChatLog({req,res,next});
})
module.exports = router;