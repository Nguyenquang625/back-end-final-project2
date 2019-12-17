const UserModel = require('../Models/UserModel');

class SocketService{
    constructor(){
        this.userModel =UserModel;
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
}
module.exports = new SocketService();