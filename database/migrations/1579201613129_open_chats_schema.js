'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OpenChatsSchema extends Schema {
  up () {
    this.create('open_chats', (table) => {
      table.increments()
	  table.string('user_id', 80).notNullable()
	  table.string('friend_id', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('open_chats')
  }
}

module.exports = OpenChatsSchema
