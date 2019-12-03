const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../App/Middlewares/AuthMiddleware')
const OwnerController = require('../App/Controllers/Http/OwnerController');


router.use((req,res,next)=>{
    AuthMiddleWare.auth({req,res,next});
})
router.get('/getmatchins', (req, res, next)=>{
    const {id} = req.user
    OwnerController.getMatchIns({req,res,next}, id);
})
router.get('/getallteammembers', (req, res, next)=>{
    OwnerController.getAllTeamMembers({req,res,next});
})
router.post('/addworkdetail', (req, res, next)=>{
    OwnerController.addWorkDetail({req,res,next});
})
router.post('/getworkwdetailsbyinspectionid', (req, res, next)=>{
    OwnerController.getWorkDetailsByInspectionId({req,res,next});
})
module.exports = router;