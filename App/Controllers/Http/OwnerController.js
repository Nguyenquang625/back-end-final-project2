const OwnerService = require('../../Service/OwnerService');
class OwnerController{
    constructor(){
        this.ownerService = OwnerService;
    }
    async getMatchIns({req,res,next}, id){
        const result = await this.ownerService.getMatchIns(id);
        return res.json(result);
    }
    async getAllTeamMembers({req,res,next}){
        const {team_id} = req.user;
        const result = await this.ownerService.getAllTeamMembers(team_id);
        return res.json(result);
    }
    async addWorkDetail({req,res,next}){
        const {body} = req;
        const result = await this.ownerService.addWorkDetail(body);
        return res.json(result);
    }
    async getWorkDetailsByInspectionId({req,res,next}){
        const {inspection_id} = req.body;
        const result = await this.ownerService.getWorkDetailsByInspectionId(inspection_id);
        return res.json(result);
    }
    async updateProgress({req,res,next}){
        const {body} = req;
        const result = await this.ownerService.updateProgress(body);
        return res.json(result);
    }
    async getDataNotify({req,res,next}){
        const result = await this.ownerService.getDataNotify();
        return res.json(result);
    }
    async sendReport({req,res,next}){
        const {body} = req;
        const result = await this.ownerService.sendReport(body);
        return res.json(result);
    }
    async getInspectionByMultiCondtion({req,res,next}){
        const result = await this.ownerService.getInspectionByMultiCondtion(req.query, req.user);
        return res.json(result);
    }
    async getTeam({req,res,next}){
        const result = await this.ownerService.getTeam(req.user);
        return res.json(result);
    }
}
module.exports = new OwnerController();