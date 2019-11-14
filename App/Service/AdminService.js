const InspectionModel = require('../Models/InspectionModel')

class AdminService {
    constructor() {
        this.inspectionModel = InspectionModel;
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
                || !body.status
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
                status : body.status,
                team_id : body.team_id,
                title : body.title
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
}
module.exports = new AdminService();