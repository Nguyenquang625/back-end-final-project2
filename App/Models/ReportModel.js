const Model = require('./Model');

class ReportModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'report';
    }
}

module.exports = ReportModel;