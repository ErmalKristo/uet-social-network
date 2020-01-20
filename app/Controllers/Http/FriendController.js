'use strict'
const { validateAll } = use('Validator')
const users = make('App/Services/UserService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with friends
 */
class FriendController {
  /**
   * Show a list of all friends.
   * GET friends
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    try {
      const loginID = await auth.getUser()
      const userFriends = await users.getUserFriends(loginID)

      for (let key in userFriends.rows) {
		 
        if (userFriends.rows.hasOwnProperty(key)) {
          
		  let TotalFollowing = await userFriends.rows[key].following().fetch()
		  userFriends.rows[key]['totalFollowing'] = TotalFollowing.rows.length
		  
		  let TotalFollowed = await userFriends.rows[key].followed().fetch()
		  userFriends.rows[key]['totalFollowed'] = TotalFollowed.rows.length
		  
		}
      }	  
	  
      return view.render('friends', { userFriends: userFriends.toJSON() })
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  /**
   * Follow a new friend.
   * POST friend
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async follow ({ auth, request, response, params }) {
    try {
      const loginID = await auth.getUser()
      const friend_id = params.friend_id

      if (friend_id == loginID.id) {
        return response.json({ 'error': 'Ju nuk mund te beni follow veteveten!' })
      }
      await users.followUser(loginID, friend_id)

      return response.json({ 'success': '200', 'message': 'U shtua me sukses' })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Unfollow a new friend.
   * POST friend
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async unfollow ({ request, response }) {
    try {
      const friend_id = request.only(['user_id'])
      const friend = await users.findUserById(friend_id)
    } catch (e) {
      console.log(e)
    }
  }

  async userProfile ({ request, view, response, params }) {
    try {
      const user_id = params.user_id
      const user = await users.findUserById(user_id)

      return view.render('account.user_profile', { user: user })
    } catch (e) {
      console.log(e)

      // response.redirect('/login')
    }
  }

  /**
   * Create/save a new friend.
   * POST friends
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Delete a friend with id.
   * DELETE friends/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FriendController
