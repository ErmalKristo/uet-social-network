'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatsSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
	  table.string('from_user', 80).notNullable()
	  table.string('to_user', 80).notNullable()
	  table.text('message').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatsSchema
