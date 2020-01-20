
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get('/', 'HomeController.index').as('welcomePage')

Route.get('/login', 'Auth/AuthController.showLogin').as('loginPage')
Route.post('/login', 'Auth/AuthController.postLogin').as('login.store')
Route.get('/logout', 'Auth/AuthController.logout').as('logout')

Route.get('/register', 'Auth/AuthController.showRegister').as('registerPage')
Route.post('/register', 'Auth/AuthController.postRegister').as('register.store')

Route.get('/password/reset', 'Auth/PasswordController.showResetForm').as('reset.form')
Route.post('/password/email', 'Auth/PasswordController.sendResetLinkEmail').as('send.reset.email')
Route.get('/password/token/reset/:token', 'Auth/PasswordController.showResetView')
Route.post('/password/reset', 'Auth/PasswordController.reset').as('reset.password')

Route.get('/contact', 'ContactController.index').as('contact.show')
Route.post('/contact', 'ContactController.sendMessage').as('contact.send')

Route.group(() => {
	  
  Route.get('/account', 'AccountController.edit').as('user.account')
  Route.get('/account/friends', 'FriendController.index').as('user.friends')

  Route.get('/users', 'UserController.index').as('users')
  Route.get('/user/profile/:user_id', 'FriendController.userProfile').as('userProfile')

  Route.post('/account/profile', 'AccountController.update').as('account.update')
  Route.post('/account/photo', 'AccountController.uploadAvatar').as('account.updateAvatar')
  Route.post('/account/password', 'AccountController.changePassword').as('account.updatePwd')
  Route.get('/account/unlink/:provider', 'AccountController.unlinkSocialMediaAccount').as('unlink.sm')
  Route.get('/account/delete', 'AccountController.destroy').as('account.delete')

  Route.get('/user/follow/:friend_id', 'FriendController.follow').as('user.follow')
  Route.get('/user/unfollow/:friend_id', 'FriendController.unfollow').as('user.unfollow')

  Route.get('/user/chats', 'UserController.getUserChats').as('user.chats')
  Route.get('/user/singlechats/:user_id', 'UserController.getChatSession')
  
  Route.get('/user/closechat/:user_id', 'UserController.closeChat').as('user.closeChat')
  
  Route.post('/user/post-message', 'UserController.createPost').as('user.createPost')
  Route.post('/user/post-message/like', 'UserController.likePost').as('user.likePost')

  
}).middleware(['auth'])

Route.get('/api', async ({ view }) => view.render('api'))
