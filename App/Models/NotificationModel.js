const Model = require('./Model');

class NotifiCationModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'notification';
    }
}

module.exports = NotifiCationModel;