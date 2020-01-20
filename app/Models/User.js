
const Model = use('Model')
const md5 = require('blueimp-md5')

class User extends Model {
  static get table () {
    return 'users'
  }

  static get primaryKey () {
    return 'id'
  }

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  static get hidden () {
    return ['password']
  }

  static get computed () {
    return ['avatarpath']
  }

  getAvatarpath ({ avatar, email }) {
    if (!avatar) {
      return `http://www.gravatar.com/avatar/${md5(email)}?d=mm&s=60`
    }
    return avatar
  }

  profile () {
    return this.hasMany('App/Models/UsersProfile', 'id', 'user_id')
  }
  
  openChats(){
	  return this.hasMany('App/Models/OpenChat', 'id', 'user_id')
  }

  following () {
  //  return this.hasMany('App/Models/Friend', 'id', 'user_id')
    return this.manyThrough('App/Models/Friend', 'friendsProfile', 'id', 'user_id')
  }

  followed () {
  //  return this.hasMany('App/Models/Friend', 'id', 'user_id')
    return this.manyThrough('App/Models/Friend', 'user', 'id', 'friend_id')
  }
  
  
}

module.exports = User
