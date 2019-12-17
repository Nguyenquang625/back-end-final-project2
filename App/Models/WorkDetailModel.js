const Model = require('./Model');

class WorkDetailModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'work_details';
    }
}

module.exports = WorkDetailModel;