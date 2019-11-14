const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

class AuthService{
    constructor(){
        this.userModel =UserModel;
    }
    async login(body){
        try {
            if(!body.username || !body.password){
                return {
                    message: 'username or password is required',
                    data: null
                }
            }
            const user = await this.userModel.query().where('username', body.username).first();
            if(!user){
                return {
                    message: 'user_is_not_exist',
                    data: null
                }
            }
            
            const checkpass = await this.userModel.query().where('username', body.username).where('password',body.password).first();
            if(!checkpass){
                return{
                    message: 'wrong_password',
                    data: null
                }
            }
            const token= jwt.sign({
                id : checkpass.id,
                team_id : checkpass.team_id,
              }, Env.APP_KEY, { expiresIn: "7d" });
            return{
                message: 'login_success',
                data : checkpass,
                token : token
            }
        } catch (error) {
            console.log('service error : ' + error);
        }
    }
    async insertUser(body){
        if(!body.username || !body.password){
            return {
                message: 'username or password is required',
                data: null
            }
        }
        const checkUsers = await this.userModel.query().where("username", body.username).first();
        if(checkUsers){
            return{
                message:"user_already_exist",
                data: null
            }
        }
        const data = {
            username:body.username,
            password:body.password
        }
        const newUser = await this.userModel.query().insert(data);
        if(!newUser){
            return{
                message:"cannot_insert_user",
                data:null
            }
        }
        return{
            message:"insert_success",
            data:newUser
        }
    }
    async getInfo(){
        const users = await this.userModel.query();
        if(!users){
            return{
                message:"error",
                data:null
            }
        }
        return{
            message: "get_info_success",
            data: users
        }
    }
    async getProfile(body){
        try {
            return{
                message: "ok"
            }
        } catch (error) {
            console.log(error);
        }
    }
    // async testMulter(req){
    //     try {
    //         //console.log(req.file)
    //         return{
    //             message:"done"
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}
module.exports = new AuthService();