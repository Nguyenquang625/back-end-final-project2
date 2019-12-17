const MemberService = require('../../Service/MemberService');
class MemberController{
    constructor(){
        this.memberService = MemberService;
    }
    async getWorkDetails({req,res,next}){
        const {user} = req
        const result = await this.memberService.getWorkDetails(user);
        return res.json(result);
    }
    async getInspections({req,res,next}){
        const result = await this.memberService.getInspections();
        return res.json(result);
    }
    async editWorkDetail({req,res,next}){
        const {body} = req;
        const result = await this.memberService.editWorkDetail(body);
        return res.json(result);
    }
    
    async addWorkNotify({req,res,next}){
        const {body} = req;
        const {user} = req;
        const result = await this.memberService.addWorkNotify(body, user);
        return res.json(result);
    }
}
module.exports = new MemberController();