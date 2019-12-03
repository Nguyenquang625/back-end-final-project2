const Model = require('./Model');

class StatusModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'status';
    }
}

module.exports = StatusModel;