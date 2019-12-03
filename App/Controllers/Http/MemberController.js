const MemberService = require('../../Service/MemberService');
class MemberController{
    constructor(){
        this.memberService = MemberService;
    }
    async getTeams({req,res,next}){
        const {user} = req
        const result = await this.memberService.getWorkDetails(user);
        return res.json(result);
    }
 
}
module.exports = new MemberController();