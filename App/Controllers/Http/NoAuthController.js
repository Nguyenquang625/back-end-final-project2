const NoAuthService = require('../../Service/NoAuthService');
class NoAuthController{
    constructor(){
        this.noAuthService = NoAuthService;
    }
    async getTeams({req,res,next}){
        const result = await this.noAuthService.getTeams();
        return res.json(result);
    }
    async getStatus({req,res,next}){
        const result = await this.noAuthService.getStatus();
        return res.json(result);
    }
    async getOwners({req,res,next}){
        const result = await this.noAuthService.getOwners();
        return res.json(result);
    }
}
module.exports = new NoAuthController();