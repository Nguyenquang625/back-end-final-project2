const Model = require('./Model');

class UserJoinOwner extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'owner';
    }
    static get relationMappings(){
        const User = require('./UserModel');
        return {
            owner: {
              relation: Model.HasOneRelation,
              modelClass: User,
              join: {
                from: 'owner.user_id',
                to: 'users.id'
              }
            }
          }
    }
    
    
    
}

module.exports = UserJoinOwner;