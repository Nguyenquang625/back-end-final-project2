const WorkDetailModel = require('../Models/WorkDetailModel');

class MemberService{
    constructor() {
        this.workDetailModel = WorkDetailModel;
    }
    async getWorkDetails(user){
        try {
            if(!user.id){
                return{
                    message: 'Invailid_user',
                    data : null
                }
            }
            const result = this.workDetailModel.query().where('user_id', user.id);
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
        
    }
}
module.exports = new MemberService();