const Model = require('./Model');

class ChatModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'chat';
    }
}

module.exports = ChatModel;