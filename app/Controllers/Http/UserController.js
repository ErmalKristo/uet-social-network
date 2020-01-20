'use strict'

const userService = make('App/Services/UserService')
class UserController {
  async index ({ auth, request, view, response }) {
    try {
      const authUser = await auth.getUser()
      let usersList = await userService.getUsers()
      // usersList = usersList.toJSON()
      for (let key in usersList.rows) {
        if (usersList.rows.hasOwnProperty(key)) {
          usersList.rows[key]['isFriend'] = false
          if (await userService.userHasFriend(authUser, usersList.rows[key].id)) {
            usersList.rows[key]['isFriend'] = true
          }
		  let TotalFollowing = await usersList.rows[key].following().fetch()
		  usersList.rows[key]['totalFollowing'] = TotalFollowing.rows.length
		  
		  let TotalFollowed = await usersList.rows[key].followed().fetch()
		  usersList.rows[key]['totalFollowed'] = TotalFollowed.rows.length
		  
		  
		}
      }

	  // return response.json({'success': '200','message': usersList})
      return view.render('users', { users: usersList.toJSON() })
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  async getUserChats ({ auth, request, response }) {
    try {
      const authUser = await auth.getUser()
      const chats = await userService.getUserChats(authUser.id)
	
      response.type('application/json')
      response.send(chats)
    } catch (e) {
      console.log(e)
      response.send('{"error"}')
    }
  }

  async getChatSession ({ auth, request, response, params }) {
    try {
	  const authUser = await auth.getUser()

      const chats = await userService.getChatSessionWithUser(authUser.id, params.user_id)

      response.type('application/json')
      response.send(chats.toJSON())
    } catch (e) {
      console.log(e)
      response.send('{"error"}')
    }
  }
  
  async closeChat({  auth, request, response, params  }){
	  
	  try {
	    const authUser = await auth.getUser()
	    await userService.closeChat(authUser.id, params.user_id)
	  } catch (e) {
        console.log(e)
        response.send('{"error"}')
    }
	
  }
  
  async createPost({  auth, request, response  }){
	try {
	  // console.log(request.all())
	  const authUser = await auth.getUser()
	  const post = await userService.createPost(authUser.id, request.input('post_message'))
	  
	  response.send(post)
	} catch (e) {
      console.log(e)
      response.send('{"error"}')
    }	  
  }
  
  async likePost({  auth, request, response  }){
	try {
	  const authUser = await auth.getUser()
	  const post = await userService.likePost(authUser.id, request.input('post_id'))
	  
	  response.send(post)
	} catch (e) {
      console.log(e)
      response.send('{"error"}')
    }	  
  }
}

module.exports = UserController
