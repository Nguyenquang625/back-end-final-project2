const express = require('express');
const router = express.Router();
const NoAuthController = require('../App/Controllers/Http/NoAuthController');


router.get('/getteams', (req, res, next)=>{
    NoAuthController.getTeams({req,res,next});
})
router.get('/getstatus', (req, res, next)=>{
    NoAuthController.getStatus({req,res,next});
})
router.get('/getowners', (req, res, next)=>{
    NoAuthController.getOwners({req,res,next});
})
module.exports = router;