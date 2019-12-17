const Model = require('./Model');

class OwnerModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'owner';
    }
}

module.exports = OwnerModel;