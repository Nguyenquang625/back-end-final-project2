const WorkDetailModel = require('../Models/WorkDetailModel');
const InspectionModel = require('../Models/InspectionModel');
const NotificationModel = require('../Models/NotificationModel')

class MemberService{
    constructor() {
        this.workDetailModel = WorkDetailModel;
        this.inspectionModel = InspectionModel;
        this.notificationModel =NotificationModel;
    }
    async getWorkDetails(user){
        try {
            if(!user.id){
                return{
                    message: 'Invailid_user',
                    data : null
                }
            }
            const result = await this.workDetailModel.query().where('user_id', user.id);
            if(!result){
                return{
                    message: 'user_not_found',
                    data : null
                }
            }
            return{
                message: 'get_work_details_success',
                data : result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getInspections(){
        try {
            const result  = await this.inspectionModel.query();
            if(!result){
                return{
                    message: 'Data_not_found',
                    data: null
                }
            }
            return{
                message: 'get_ins_success',
                data: result
            }
        } catch (error) {
            console.log(error);
        }
    }
    async editWorkDetail(body){
        try {
            if(!body.description||!body.id){
                return{
                    message: 'data_missing',
                    data: null
                }
            }
            await this.workDetailModel.query().update({description: body.description}).where('id',body.id);
            const result = await this.workDetailModel.query().where('id', body.id);
            if(!result){
                return{
                    message: 'cannot_access_data',
                    data: null
                }
            }
            return{
                message: 'success',
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async addWorkNotify(body, user){
        try {
            if(!body.data||!user.team_id){
                return{
                    message: 'data_missing',
                    data: null
                }
            }
            const dataInsert = {
                data : body.data,
                checked : 0,
                team_id : user.team_id
            }
            const result = await this.notificationModel.query().insert(dataInsert);
            if(!result){
                return{
                    message: 'query_error',
                    data: null
                }
            }
            return{
                message: 'notification_added',
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new MemberService();