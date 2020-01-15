(function ($) {
  $(document).ready(function () {
    getChats()

    // Only connect when username is available
    if (window.username) {
      startChat()
    }
  })
})(jQuery)

let ws = null

function startChat () {
  ws = adonis.Ws().connect()

  ws.on('open', () => {
    subscribeToChannel()
  })

  ws.on('error', () => {

  })
}

function subscribeToChannel () {
  const chat = ws.subscribe('chat')

  chat.on('error', () => {
    $('.connection-status').removeClass('connected')
  })

  chat.on('message', (message) => {
    console.log(message)
    selfMessage(message)
    // $('.messages').append(`
    // <div class="message"><h3> ${message.username} </h3> <p> ${message.body} </p> </div>
    // `)
  })
}

function selfMessage (message) {
  $('.chatbox__body').append(`
		<div class="chatbox__body__message chatbox__body__message--left">

		<div class="chatbox_timing">
			<ul>
				<li><a href="#"><i class="fa fa-clock-o"></i> ${message.created_at}</a></li>
			</ul>
		</div>

		<img src="${message.avatar}" alt="Picture">
		<div class="clearfix"></div>
		<div class="ul_section_full">
			<ul class="ul_msg">
				<li><strong>${message.name}</strong></li>
				<li>${message.body}</li>
			</ul>
			<div class="clearfix"></div>

		</div>

		</div>
	`)

  scrollToBottom()
}

function getChats () {
  $.getJSON('/user/chats', function (response) {
    // console.log(response)
    renderChats(response)
  })
}

function renderChats (chatsList) {
  const chatsNumber = chatsList.length
  for (i = 0; i < chatsNumber; i++) {
    friendId = getFriendId(chatsList[i])
    buildChatWidget(friendId)
    if (window.username == chatsList[i].from_user) {
      myMessage(friendId, chatsList[i])
    } else {
      friendMessage(friendId, chatsList[i])
    }
  }
}

function getFriendId (message) {
  if (message.from_user == window.username) {
    return message.to_user
  }

  return message.from_user
}

function initChat (friendId) {
  let chatRightPosition = getMaxRight()
  var $chatbox = $('div[data-user-id=' + friendId + '].chatbox')
  $chatbox.css('right', chatRightPosition)
  $chatboxTitle = $('div[data-user-id=' + friendId + '] > .chatbox__title')
  $chatboxTitleClose = $('div[data-user-id=' + friendId + '] .chatbox__title__close')
  $chatboxTitle.on('click', function () {
    $chatbox.toggleClass('chatbox--tray')
    scrollToBottom()
  })
  $chatboxTitleClose.on('click', function (e) {
    e.stopPropagation()
    $chatbox.addClass('chatbox--closed')
  })
  $chatbox.on('transitionend', function () {
    if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove()
  })

  $('div[data-user-id=' + friendId + ']').find('#chat-input').keyup(function (e) {
    if (e.which === 13) {
      e.preventDefault()
      $('div[data-user-id=' + friendId + ']').find('#btn-chat').click()
    }
  })

  $('div[data-user-id=' + friendId + ']').find('#btn-chat').click(function (e) {
    e.preventDefault()
    const message = $('#chat-input').val()
    $('div[data-user-id=' + friendId + ']').find('#chat-input').val('')
    let receiver = $(e.target).closest('.chatbox').attr('data-user-id')
    ws.getSubscription('chat').emit('message', {
      sender: window.username,
      receiver: receiver,
      body: message
    })
  })
}

function buildChatWidget (friendId) {
  if (!$('div[data-user-id=' + friendId + ']').length) {
    let chatTemplate = $('#chat-template').html()
    chatTemplate = $(chatTemplate).attr('data-user-id', friendId)
    $('#chats').append(chatTemplate)

    initChat(friendId)
  }
}

function getMaxRight () {
  let chatsLength = $('.chatbox--tray').length - 2
	 return (chatsLength * 305) + 35
  if (chatsLength) {
    let leftMost = $($('.chatbox--tray')[chatsLength]).css('right').match(/\d+/)[0]
  }
}

function myMessage (friendId, message) {
  console.log(message)
  $('div[data-user-id=' + friendId + '] > .chatbox__body').append(`
		<div class="chatbox__body__message chatbox__body__message--right">
		
			<div class="chatbox_timing">
				<ul>
					<li><a href="#"><i class="fa fa-clock-o"></i> ${message.created_at}</a></li>
				</ul>
			</div>
	
            <img src="${window.myavatar}" alt="Picture">
			<div class="clearfix"></div>
			<div class="ul_section_full">
			<ul class="ul_msg">
			<li>${message.message}</li>
			</ul>
			<div class="clearfix"></div>
			<ul class="ul_msg2">
			</ul>
			</div>
			 
		</div>
	`)
}

function friendMessage (friendId, message) {
  $('div[data-user-id=' + friendId + '] > .chatbox__body').append(`
		<div class="chatbox__body__message chatbox__body__message--left">
		
			<div class="chatbox_timing">
				<ul>
					<li><a href="#"><i class="fa fa-clock-o"></i> ${message.created_at}</a></li>
				</ul>
			</div>
            <img src="https://www.gstatic.com/webp/gallery/2.jpg" alt="Picture">
			<div class="clearfix"></div>
			<div class="ul_section_full">
				<ul class="ul_msg">
					<li>${message.message}</li>
				</ul>
			<div class="clearfix"></div>
				<ul class="ul_msg2">
				</ul>
			</div>
			 
        </div>
	`)
}

function scrollToBottom () {
  var height = 0
  $('.chatbox__body__message ').each(function (i, value) {
    height += parseInt($(this).height())
  })

  height += ''

  $('.chatbox__body').animate({ scrollTop: height })
}
