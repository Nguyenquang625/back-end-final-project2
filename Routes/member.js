const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../App/Middlewares/AuthMiddleware')
const MemberController = require('../App/Controllers/Http/MemberController');


router.use((req,res,next)=>{
    AuthMiddleWare.auth({req,res,next});
})
router.get('/getworkdetails', (req, res, next)=>{
    MemberController.getWorkDetails({req,res,next});
})

router.get('/getinspections', (req, res, next)=>{
    MemberController.getInspections({req,res,next});
})

router.put('/editworkdetail', (req, res, next)=>{
    MemberController.editWorkDetail({req,res,next});
})

router.post('/addworknotify', (req, res, next)=>{
    MemberController.addWorkNotify({req,res,next});
})
module.exports = router;