const Knex = require('knex')
const config = require("../knexfile")[process.env.NODE_ENV || "development"]
const { Model } = require('objection')
const knexConnection = Knex(config)

Model.knex(knexConnection)


class Mutation extends Model {
  static get tableName () {
    return 'mutations'
  }

  static get relationMappings () {
    return {
      Conversation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Conversation,
        join: {
          from: 'mutations.conversationId',
          to: 'conversations.id'
        }
      }
    }
  }
}

 class Conversation extends Model {
    static get tableName () {
      return 'conversations'
    }
  
    static get relationMappings () {
      return {
        mutations: {
          relation: Model.HasManyRelation,
          modelClass: Mutation,
          join: {
            from: 'conversations.id',
            to: 'mutations.conversationId'
          }
        }
      }
    }
  }
      

  module.exports = { Conversation, Mutation }