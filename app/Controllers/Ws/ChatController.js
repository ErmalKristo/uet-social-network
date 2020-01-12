'use strict'
const User = use('App/Models/User')
const Chat = use('App/Models/Chat')

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  
  onMessage (message) {
	const sender =  User.find(message.sender)
	let _this = this
	sender.then( useri => {
		console.log(message)
		this.saveChat(message).then( chat => {
			
			message['name'] = useri.name
			message['avatar'] = useri.avatar
			message['created_at'] = chat.created_at
			
			_this.socket.broadcastToAll('message', message)
		})
		
	})
  }
  
  async saveChat(message) {
	let chat = new Chat()
	
	chat.from_user = message.sender
	chat.to_user = message.receiver
	chat.message = message.body
	
	await chat.save()
	
	return chat
	
	
  }
}

module.exports = ChatController
