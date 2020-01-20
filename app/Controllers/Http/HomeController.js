const userService = make('App/Services/UserService')

class HomeController {
  async index ({ view }) {
	const posts = await userService.getPosts()
	
    return view.render('welcome', {'posts' : posts.toJSON()})
  }
}

module.exports = HomeController
