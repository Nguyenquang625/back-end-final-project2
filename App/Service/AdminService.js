const InspectionModel = require('../Models/InspectionModel');
const UserInnerJoinOwner = require('../Models/UsersInnerJoinOwner');
const WorkDetailModel = require('../Models/WorkDetailModel');
const UserModel = require('../Models/UserModel');
const OwnerModel = require('../Models/OwnerModel');
const ChatModel = require('../Models/ChatModel');

class AdminService {
    constructor() {
        this.inspectionModel = InspectionModel;
        this.userInnerJoinOwner = UserInnerJoinOwner;
        this.workDetailModel = WorkDetailModel;
        this.userModel = UserModel;
        this.ownerModel = OwnerModel;
        this.chatModel = ChatModel;
    }
    async getInspection(user) {
        try {
            if (!user.id) {
                return {
                    message: 'id_not_found',
                    data: null
                }
            }
            const result = await this.inspectionModel.query();
            if(!result){
                return{
                    message: 'query_error',
                    data : null
                }
            }
            return{
                message:'get_inspectation_success',
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async updateInspect(body){
        try {
            if(    !body.id 
                || !body.description 
                || !body.end_date
                || !body.equipment_require
                || !body.line_condition
                || !body.line_location
                || !body.start_date
                || !body.team_id
                || !body.title
                ){
                return{
                    message: 'no_data',
                    data: null
                }
            }
            const data = {
                description : body.description,
                end_date : body.end_date,
                equipment_require : body.equipment_require,
                line_condition : body.line_condition,
                line_location: body.line_location,
                start_date: body.start_date,
                team_id : body.team_id,
                title : body.title, 
                owner_id : body.owner_id
            };
            await this.inspectionModel.query().update(data).where('id', body.id);
            const result = await this.inspectionModel.query().where('id', body.id);
            if(!result){
                return {
                    message:'update_error',
                    data : null,
                }
            }

            return{
                message : 'update_success',
                data : result
            }

        } catch (error) {
            console.log(error)
        }
    }
    async getallManager(){
        try {
            const result = await this.userInnerJoinOwner.query().eager('owner');
            // return User.query().where("user_id", parent.id)
            // .join('userprojects', 'user.id', '=', 'userprojects.user_id')
            // .join('project', 'project.id', '=', 'userprojects.project_id')
            // .select('user.id', 'userprojects.project_id', 'project.name')
            if(!result.length){
                return{
                    message: 'no_data_match',
                    data : null
                }
            }
            return {
                message: 'get_all_manager_success',
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteInspect(id){
        try {
            if(!id){
                return{
                    message: 'no_data',
                    data: null
                }
            }
            const checkExist = await this.inspectionModel.query().where('id', id).first();
            if(!checkExist){
                return{
                    message:'content_not_available_for_delete',
                    data: null
                }
            }
            await this.workDetailModel.query().delete().where('inspection_id', id);
            const result = await this.inspectionModel.query().delete().where('id',id);
            if(!result){
                return {
                    message : 'query_error',
                    data: null
                }
            }
            return {
                message:'delete_success',
                data : result
            }

        } catch (error) {
            console.log(error)
        }
    }
    async getAllMembers(){
        try {
            const result = await this.userModel.query();
            if(!result.length){
                return {
                    message:'query_error',
                    data : null
                }
            }
            return {
                message:'get_all_members_successs',
                data : result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async addIns(body){
        try {
            if(!body){
                return{
                    message:'data_not_found',
                    data: null
                }
            }
            const data ={
                title: body.title,
                status : body.status,
                line_location : body.line_location,
                line_condition : body.line_condition,
                description : body.description,
                equipment_require : body.equipment_require,
                start_date : body.start_date,
                end_date : body.end_date,
                team_id : body.team_id,
                owner_id : body.owner_id
            }
            const result = await this.inspectionModel.query().insert(data);
            if(!result){
                return{
                    message: 'insert_error',
                    data: null
                }
            }
            return {
                message : 'insert_success',
                data : result
            }
        } catch (error) {
            console.log(error);
        }
    }
    async setAdmin(body){
        if(body.level === 3){
            return {
                message : 'this_user_already_admin',
                data : null
            }
        }
        if(!body.id){
            return {
                message : 'data_not_found',
                data : null
            }
        }
        const result = await this.userModel.query().update({level: 3}).where('id', body.id);
        if(!result){
            return {
                message : 'user_not_found',
                data : null
            }
        }
        const check = await this.userModel.query().where('level', 3).where('team_id', body.team_id).first();
        if(!!check){
            return{
                message:'this_team_already_got_an_Admin',
                data:null
            }
        }
        const user = await this.userModel.query().where('id',body.id).first();
        const checkOwner = await this.ownerModel.query().where('user_id', body.id).first();
        if(!!checkOwner){
            return {
                message : 'set_admin_success',
                data : user
            }
        }
        await this.ownerModel.query().insert({user_id : body.id});
        return {
            message : 'set_admin_success',
            data : user
        }
    }
    async setOwner(body){
        if(body.level === 2){
            return {
                message : 'this_user_already_owner',
                data : null
            }
        }
        if(!body.id){
            return {
                message : 'data_not_found',
                data : null
            }
        }
        const check = await this.userModel.query().where('level', 2).where('team_id', body.team_id).first();
        if(!!check){
            return{
                message: 'this_team_already_have_an_owner',
                data: null
            }
        }
        const result = await this.userModel.query().update({level: 2}).where('id', body.id);
        if(!result){
            return {
                message : 'user_not_found',
                data : null
            }
        }
        const user = await this.userModel.query().where('id',body.id).first();
        const checkOwner = await this.ownerModel.query().where('user_id', body.id).first();
        if(!!checkOwner){
            return {
                message : 'set_owner_success',
                data : user
            }
        }
        await this.ownerModel.query().insert({user_id : body.id});
        return {
            message : 'set_owner_success',
            data : user
        }
    }
    async setMember(body){
        if(body.level === 1){
            return {
                message : 'this_user_already_normal_member',
                data : null
            }
        }
        if(!body.id){
            return {
                message : 'data_not_found',
                data : null
            }
        }
        const result = await this.userModel.query().update({level: 1}).where('id', body.id);
        if(!result){
            return {
                message : 'user_not_found',
                data : null
            }
        }
        const user = await this.userModel.query().where('id',body.id).first();
        
        return {
            message : 'set_member_success',
            data : user
        }
    }
    async banAccount(body){
        if(body.level === 0){
            return {
                message : 'account_already_banned',
                data : null
            }
        }
        if(!body.id){
            return {
                message : 'data_not_found',
                data : null
            }
        }
        const result = await this.userModel.query().update({level: 0}).where('id', body.id);

        if(!result){
            return {
                message : 'cannot_access_data',
                data : null
            }
        }

        const user = await this.userModel.query().where('id',body.id).first();
        return {
            message : 'account_has_been_banned',
            data : user
        }
    }
    async unbanAccount(body){
        if(body.level !== 0){
            return {
                message : 'account_is_not_banned',
                data : null
            }
        }
        if(!body.id){
            return {
                message : 'data_not_found',
                data : null
            }
        }
        
        const result = await this.userModel.query().update({level: 1}).where('id', body.id);

        if(!result){
            return {
                message : 'cannot_access_data',
                data : null
            }
        }

        const user = await this.userModel.query().where('id',body.id).first();
        return {
            message : 'account_has_been_unbanned',
            data : user
        }
    }
    async getInspectionByTitle(query){
        try {
            const result = await this.inspectionModel.query()
            .where('title','like' ,`%${query.title}%`)
            .where('line_location','like' ,`%${query.line_location}%`)
            .where('line_condition','like' ,`%${query.line_condition}%`);
            return {
                message : 'title',
                data : result
            }
        } catch (error) {
            
        }
    }
    async addUser(body){
        if(!body.name){
            return {
                message : 'please_fill_all_information',
                data : null
            }
        }
        const checkUser = await this.userModel.query().where('username', body.username).first();
        if(!!checkUser){
            return{
                message: 'username_already_exists',
                data : null
            }
        }
        const dataInsert ={
            username: body.username,
            password: body.password,
            name: body.name,
            adress: body.adress,
            phone_number: body.phone_number,
            gender: body.gender,
            mail: body.mail,
            level: body.level,
            team_id : body.team_id
        }
        const result = await this.userModel.query().insert(dataInsert);
        if(!result){
            return{
                message: 'cannot_interact_with_server',
                data : null
            }
        }
        return{
            message: 'new_user_has_been_added',
            data : result
        }
    }
    async getMemberByName(query){
        const result = await this.userModel.query()
        .where('name','like' ,`%${query.name}%`);
        if(!result.length){
            return{
                message: 'cannot_access_data',
                data : null
            }
        }
        return{
            message: 'get_member_by_name_success',
            data : result
        }
    }
    async closeInspection(body){
        try {
            if(!body.id){
                return{
                    message: 'data_missing',
                    data: null
                }
            }
            await this.inspectionModel.query().update({status : 3}).where('id', body.id);
            const result = await this.inspectionModel.query().where('id', body.id).first();
            if(!result){
                return{
                    message: 'cannot_access_data',
                    data: null
                }
            }
            return{
                message: 'case_has_been_closed',
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async reOpenInspection(body){
        try {
            if(!body.id){
                return{
                    message: 'data_missing',
                    data: null
                }
            }
            await this.inspectionModel.query().update({status : 2}).where('id', body.id);
            const result = await this.inspectionModel.query().where('id', body.id).first();
            if(!result){
                return{
                    message: 'cannot_access_data',
                    data: null
                }
            }
            return{
                message: 'case_reopended',
                data: result
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async updateUserProfileByAdmin(body){
        try {
            const data = {
                name : body.name,
                username : body.username,
                adress : body.adress,
                mail : body.mail,
                team_id : body.team_id,
            };
            await this.userModel.query().update(data).where('id', body.id);
            const result = await this.userModel.query().where('id', body.id).first();
            if(!result){
                return {
                    message:'update_error',
                    data : null,
                }
            }

            return{
                message : 'update_success',
                data : result
            }

        } catch (error) {
            console.log(error)
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
            const getUser = await this.userModel.query().where('id',body.user.id).first();
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
    async getChatLog(query,user){
        try {
            if(!query.id){
                return{
                    message :'none_of_user_connect',
                    data : null
                }
            }
            const getUser = await this.userModel.query().where('id',query.id).first();
            if(!getUser){
                return{
                    message :'user_no_logner_exist',
                    data : null
                }
            }
            const result = await this.chatModel.query().where('name', getUser.username).where('team_id', getUser.team_id);

            if(!result.length){
                return{
                    message :'chat_log_not_found',
                    data : null
                }
            }
            return{
                message :'get_chatlog_success',
                data : result,
                id : user.id,
                name : getUser.name
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new AdminService();