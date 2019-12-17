const TeamModel = require('../Models/TeamModel');
const StatusModel = require('../Models/StatusModel');
const UserJoinOwner = require('../Models/UserJoinOwner');

class NoAuthService{
    constructor(){
        this.teamModel = TeamModel;
        this.statusModel = StatusModel;
        this.userJoinOwner =UserJoinOwner ;
    }
    async getTeams(){
        try {
            const result = await this.teamModel.query();
            if(!result){
                return{
                    message: 'query_error',
                    data: null
                }
            }
            return{
                message: 'get_teams_sucess',
                data : result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getStatus(){
        try {
            const result = await this.statusModel.query();
            if(!result){
                return{
                    message: 'query_error',
                    data: null
                }
            }
            return{
                message: 'get_status_sucess',
                data : result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getOwners(){
        const result = await this.userJoinOwner.query().eager('owner');
        if(!result){
            return{
                message: 'query_error',
                data: null
            }
        }
        return{
            message: 'get_owner_sucess',
            data : result
        }
        try {
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new NoAuthService();