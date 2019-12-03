const Model = require('./Model');

class OwnerInnerJoinInspection extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'owner';
    }
    static get relationMappings(){
        const Inspection = require('./InspectionModel');
        return {
            insI: {
              relation: Model.HasManyRelation,
              modelClass: Inspection,
              join: {
                from: 'owner.id',
                to: 'inspection.owner_id'
              }
            }
          }
    }
    
    
    
}

module.exports = OwnerInnerJoinInspection;