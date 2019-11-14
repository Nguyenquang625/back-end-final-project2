const AuthService = require('../../Service/AuthService');
class AuthController{
    constructor(){
        this.authService = AuthService;
    }
    async login({req,res,next}){
        const {body} = req;
        const result = await this.authService.login(body);
        return res.json(result);
    }
    // async testMulter({req,res,next}){
    //     const result = await this.authService.testMulter(req);
    //     return res.json(result);
    // }
    async getProfile({req,res, next}){
        const {body} = req;
        const result = await this.authService.getProfile(body);
        return res.json(result)
    }
    async getInfo({req,res,next}){
        const result = await this.authService.getInfo();
        return res.json(result)
    }
}
module.exports = new AuthController();