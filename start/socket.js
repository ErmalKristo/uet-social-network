const Ws = use('Ws')

Ws.channel('chats', ({ socket }) => {
  console.log('a new subscription for chats topic')
})