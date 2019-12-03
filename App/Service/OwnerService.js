const InspectionModel= require('../Models/InspectionModel');
const OwnerInnerJoinInspection = require('../Models/OwnerInnerJoinInspection');
const UserModel = require('../Models/UserModel');
const WorkDetailModel = require('../Models/WorkDetailModel')
class OwnerService{
    constructor(){
        this.inspectionModel = InspectionModel;
        this.ownerInnerJoinInspection = OwnerInnerJoinInspection;
        this.userModel = UserModel;
        this.workDetailModel = WorkDetailModel;
    }
    async getMatchIns(id){
        try {
            const result = await this.ownerInnerJoinInspection.query().eager('insI').where('user_id', id);
            if(!result.length){
                return{
                    message : 'no_data',
                    data: null
                }
            }
            return{
                message: 'get_ins_matched',
                data : result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getAllTeamMembers(team_id){
        if(!team_id){
            return{
                message: 'header_missing',
                data : null
            }
        }
        const result = await this.userModel.query().where('team_id', team_id).where('level', 1);
        if(!result){
            return{
                message: 'team_not_exists',
                data : null
            }
        }
        return{
            message: 'get_members_sucess',
            data: result
        }
    }
    async addWorkDetail(body){
        if(!body.title){
            return{
                message: 'data_missing',
                data: null
            }
        }
        const insert = await this.workDetailModel.query().insert(body);
        if(!insert){
            return{
                message: 'query_error',
                data: null
            }
        }
        return {
            message: 'insert_success',
            data : insert
        }
    }
    async getWorkDetailsByInspectionId(inspection_id){
        try {
            if(!inspection_id){
                return{
                    message: 'id_not_exists',
                    data: null
                }
            }
            const result = await this.workDetailModel.query().where('inspection_id', inspection_id);
            if(!result.length){
                return{
                    message: 'query_error',
                    data: null
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
}
module.exports = new OwnerService();