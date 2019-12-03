const AdminService = require('../../Service/AdminService')
class AdminController{
    constructor(){
        this.adminService = AdminService;
    }
    async getInspection({req,res,next}){
        const {user} = req;
        const result  = await this.adminService.getInspection(user);
        return res.json(result);
    }
    async updateInspect({req,res,next}){
        const {body} = req;
        const result  = await this.adminService.updateInspect(body);
        return res.json(result);
    }
    async deleteInspect({req,res,next}, id){
        const result  = await this.adminService.deleteInspect(id);
        return res.json(result);
    }
    async addIns({req,res,next}){
        const {body} = req;
        const result  = await this.adminService.addIns(body);
        return res.json(result);
    }
    async getallManager({req,res,next}){
        const result  = await this.adminService.getallManager();
        return res.json(result);
    }
    async getAllMembers({req,res,next}){
        const result  = await this.adminService.getAllMembers();
        return res.json(result);
    }
    async setAdmin({req,res,next}){
        const {body} = req;
        const result = await this.adminService.setAdmin(body);
        return res.json(result);
    }
    async setOwner({req,res,next}){
        const {body} = req;
        const result = await this.adminService.setOwner(body);
        return res.json(result);
    }
    async setMember({req,res,next}){
        const {body} = req;
        const result = await this.adminService.setMember(body);
        return res.json(result);
    }
    async banAccount({req,res,next}){
        const {body} = req;
        const result = await this.adminService.banAccount(body);
        return res.json(result);
    }
    async unbanAccount({req,res,next}){
        const {body} = req;
        const result = await this.adminService.unbanAccount(body);
        return res.json(result);
    }
    async getInspectionByTitle({req,res,next}){
        const result = await this.adminService.getInspectionByTitle(req.query);
        return res.json(result);
    }
}
module.exports = new AdminController();