const Model = require('./Model');

class TeamModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'team';
    }
}

module.exports = TeamModel;