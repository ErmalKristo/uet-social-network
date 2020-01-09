'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FriendsSchema extends Schema {
  up () {
    this.create('friends', (table) => {
      table.increments()
	  table.string('user_id').notNullable()
      table.string('friend_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('friends')
  }
}

module.exports = FriendsSchema
