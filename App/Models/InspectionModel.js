const Model = require('./Model');

class InspectionModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'inspection';
    }
}

module.exports = InspectionModel;