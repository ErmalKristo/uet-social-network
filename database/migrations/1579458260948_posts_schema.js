'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
	  table.integer('user_id').unsigned()
	  table.text('post_text', 'longtext').notNull()
	  table.integer('pelqime').unsigned().default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
