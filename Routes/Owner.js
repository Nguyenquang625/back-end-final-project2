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
router.put('/updateprogress', (req, res, next)=>{
    OwnerController.updateProgress({req,res,next});
})
router.get('/getdatanotify', (req, res, next)=>{
    OwnerController.getDataNotify({req,res,next});
})
router.post('/sendreport', (req, res, next)=>{
    OwnerController.sendReport({req,res,next});
})
router.get('/getinspectionbymulticondtion', (req, res, next)=>{
    OwnerController.getInspectionByMultiCondtion({req,res,next});
})
router.get('/getteam', (req, res, next)=>{
    OwnerController.getTeam({req,res,next});
})
module.exports = router;