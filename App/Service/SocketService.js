const UserModel = require('../Models/UserModel');
const NotificationModel = require('../Models/NotificationModel');
const jwt = require('jsonwebtoken');

class SocketService{
    constructor(){
        this.userModel =UserModel;
        this.notificationModel =NotificationModel;
    }
    async updateSocketId(idU,idS){
        try {
            await this.userModel.query().update({socket_id : idS}).where('id',idU);
            const result = await this.userModel.query().where('id',idU).first();
            if(!result){
                return{
                    message : 'cannot_access_data',
                    data : null
                }
            }
            return{
                message : 'socket_updated',
                data : result
            }
        } catch (error) {
            console.log(error);
        }
    }
    async insertNotification(body){
        try {
            const data = {
                id: body.workDetail.id,
                title: body.workDetail.title,
                description: body.description,
                progress: body.workDetail.progress,
                user_id: body.workDetail.user_id,
                inspection_id: body.workDetail.inspection_id
            }
            const user = jwt.verify(body.token,Env.APP_KEY);
            const dataInsert = {
                data : JSON.stringify(data),
                checked : 0,
                team_id : user.team_id
            }
            const result = await this.notificationModel.query().insert(dataInsert);
            return{
                result
            }
        } catch (error) {
            
        }
    }
    async getSocketId(token){
        try {
            const user = jwt.verify(token,Env.APP_KEY);
            const result = await this.userModel.query().where('team_id', user.team_id).where('level', 2).first();
            if(!result){
                return{
                    message: 'this_team_currently_dont_have_owner'
                }
            }
            return{
                socket_id : result.socket_id
            }
        } catch (error) {
            
        }
    }
}
module.exports = new SocketService();