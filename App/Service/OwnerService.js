const InspectionModel= require('../Models/InspectionModel');
const OwnerInnerJoinInspection = require('../Models/OwnerInnerJoinInspection');
const UserModel = require('../Models/UserModel');
const WorkDetailModel = require('../Models/WorkDetailModel');
const NotificationModel = require('../Models/NotificationModel');
const ReportModel = require('../Models/ReportModel');
const OwnerModel = require('../Models/OwnerModel');
const TeamModel = require('../Models/TeamModel');
const ChatModel = require('../Models/ChatModel');

class OwnerService{
    constructor(){
        this.inspectionModel = InspectionModel;
        this.ownerInnerJoinInspection = OwnerInnerJoinInspection;
        this.userModel = UserModel;
        this.workDetailModel = WorkDetailModel;
        this.notificationModel = NotificationModel;
        this.reportModel = ReportModel;
        this.ownerModel = OwnerModel;
        this.teamModel =TeamModel;
        this.chatModel = ChatModel;
    }
    async getMatchIns(id){
        try {
            const getId = await this.ownerModel.query().where('user_id', id).first();
            if(!getId){
                return{
                    message : 'this_is_not_an_owner',
                    data: null
                }
            }
            const result = await this.inspectionModel.query().where('owner_id', getId.id);
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
    async updateProgress(body){
        try {
            if(!body.id || !body.progress){
                return{
                    message : 'data_missing',
                    data : null
                }
            }
            await this.workDetailModel.query().update({progress: body.progress}).where('id',body.id);
            const result = await this.workDetailModel.query().where('id',body.id).first();
            if(!result){
                return{
                    message : 'cannot_access_data',
                    data : null
                }
            }
            return{
                message : 'save_success',
                data : result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getDataNotify(user){
        try {
            const result = await this.notificationModel.query().where('checked', 0).where('team_id',user.team_id).orderBy('id','desc').limit(5);
            if(!result.length){
                return{
                    message : 'no_data',
                    data : null
                }
            }
            
            return{
                message : 'get_success',
                data : result
            }
        } catch (error) {
            console.log(error);
        }
    }
    async sendReport(body){
        try {
            console.log(body);
            if(!body.title||!body.data.length|| !body.inspection_id){
                return{
                    message : 'data_required_missing',
                    data : null
                }
            }
            const dataReport ={
                title : body.title,
                data : JSON.stringify(body.data),
                inspection_id : body.inspection_id
            }
            const result = await this.reportModel.query().insert(dataReport);
            if(!result){
                return{
                    message : 'cannot_access_data_server',
                    data : null
                }
            }
            return{
                message : 'report_sent',
                data : result
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async getInspectionByMultiCondtion(query,user){
        
        const getId = await this.ownerModel.query().where('user_id', user.id).first();
        if(!getId){
            return{
                message : 'this_is_not_an_owner',
                data: null
            }
        }
        const result = await this.inspectionModel.query()
        .where('owner_id', getId.id)
        .where('title','like' ,`%${query.title}%`)
        .where('line_location','like' ,`%${query.line_location}%`)
        .where('line_condition','like' ,`%${query.line_condition}%`);
        return{
            message: 'filter_success',
            data : result
        }
    }
    async getTeam(user){
        try {
            const result = await this.teamModel.query().where('id', user.team_id);
            return{
                message: 'filter_success',
                data : result
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getInspectionById(query){
        try {
            const result = await this.inspectionModel.query().where('id', query.id).first();
            if(!result){
                return{
                    message: 'inspection_no_longer_valid',
                    data: null
                }
            }
            return{
                message: 'get_success',
                data: result
            }
        } catch (error) {
            console.log(error);
        }
    }
    async checkedNoti(body){
        try {
            await this.notificationModel.query().update({checked : 1}).where('id',body.id);
            const result = await this.notificationModel.query().where('id',body.id).first();
            if(!result){
                return{
                    message: 'notify_not_found',
                    data: result
                }
            }
            return{
                message: 'get_success',
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async getAdminSocketID(user){
        try {
            const result = await this.userModel.query().where('team_id', user.team_id).where('level', 3).first();
            if(!result){
                return{
                    message: 'this_team_currently_dont_have_admin'
                }
            }
            return{
                message :'get_sucess',
                data : result
            }
        } catch (error) {
            
        }
    }
    async addChat(body,user){
        try {
            if(!body.chatlog){
                return{
                    message :'please_donnot_let_chatbox_empty',
                    data : null
                }
            }
            const getUser = await this.userModel.query().where('id',user.id).first();
            if(!getUser){
                return{
                    message :'user_no_logner_exist',
                    data : null
                }
            }
            const dataInsert = {
                name: getUser.username,
                chatlog: body.chatlog,
                user_id: user.id,
                team_id: user.team_id
            }
            const result = await this.chatModel.query().insert(dataInsert);
            
            return{
                message :'insert_success',
                data : result
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getChatLog(user){
        try {
            if(!user.id){
                return{
                    message :'none_of_user_connect',
                    data : null
                }
            }
            const getUser = await this.userModel.query().where('id',user.id).first();
            if(!getUser){
                return{
                    message :'user_no_logner_exist',
                    data : null
                }
            }
            const result = await this.chatModel.query().where('name', getUser.username).where('team_id', getUser.team_id);

            return{
                message :'get_chatlog_success',
                data : result,
                id : user.id
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new OwnerService();