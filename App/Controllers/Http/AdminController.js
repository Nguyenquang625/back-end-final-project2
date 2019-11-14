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
}
module.exports = new AdminController();