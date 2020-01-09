'use strict'

const userService = make('App/Services/UserService')
class UserController {
  async index ({ auth, request, view, response }) {
    try {
		const authUser = await auth.getUser()	
		let usersList = await userService.getUsers()
		//usersList = usersList.toJSON()
		for (let key in usersList.rows){
			if(usersList.rows.hasOwnProperty(key)){
				usersList.rows[key]['isFriend'] = false;
				if(await userService.userHasFriend(authUser, usersList.rows[key].id) ) {
					usersList.rows[key]['isFriend'] = true;
				}
			 }
		}

	  // return response.json({'success': '200','message': usersList}) 
      return view.render('users', {  users : usersList.toJSON() })
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }	
	
}

module.exports = UserController
