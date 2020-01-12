(function($) {
    $(document).ready(function() {

 
		getChats()
		
		
		// Only connect when username is available
		if (window.username) {
			startChat()
		}
	
    });
})(jQuery);



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

function selfMessage(message){
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
	`);
	
	scrollToBottom()
}

function getChats(){
	$.getJSON('/user/chats', function(response){
		//console.log(response)
		renderChats(response)
	})	
}

function renderChats(chatsList){
	const chatsNumber = chatsList.length
	for(i = 0; i<chatsNumber;i++) {
		friendId = getFriendId(chatsList[i])
		buildChatWidget(friendId)
		if(window.username == chatsList[i].from_user) {
			myMessage(friendId,chatsList[i])
		} else {
			friendMessage(friendId,chatsList[i])
		}
		
		console.log(chatsList[i])
	}
}

function getFriendId(message){
	if(message.from_user == window.username) {
		return message.to_user
	}
	
	return message.from_user;
}

function initChat(friendId){
		
        var $chatbox = $('div[data-user-id='+friendId+'].chatbox')
        $chatboxTitle = $('div[data-user-id='+friendId+'] > .chatbox__title')
        $chatboxTitleClose = $('div[data-user-id='+friendId+'] .chatbox__title__close')
        $chatboxTitle.on('click', function() {
            $chatbox.toggleClass('chatbox--tray');
			scrollToBottom()
        });
        $chatboxTitleClose.on('click', function(e) {
            e.stopPropagation();
            $chatbox.addClass('chatbox--closed');
        });
        $chatbox.on('transitionend', function() {
            if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
        });	
}

function  buildChatWidget(friendId){
	if(!$('div[data-user-id='+friendId+']').length) {
		let chatTemplate = $('#chat-template').html();
		chatTemplate = $(chatTemplate).attr('data-user-id', friendId)
		$('#chats').append(chatTemplate)
		
		initChat(friendId)
	}
}

function myMessage(friendId, message){
	$('div[data-user-id='+friendId+'] > .chatbox__body').append(`
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
			<li><strong>My Name</strong></li>
			<li>${message.message}</li>
			</ul>
			<div class="clearfix"></div>
			<ul class="ul_msg2">
			</ul>
			</div>
			 
		</div>
	`)
}

function friendMessage(friendId, message){
	$('div[data-user-id='+friendId+'] > .chatbox__body').append(`
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
					<li><strong>Person Name</strong></li>
					<li>${message.message}</li>
				</ul>
			<div class="clearfix"></div>
				<ul class="ul_msg2">
				</ul>
			</div>
			 
        </div>
	`)
}


function scrollToBottom(){
	var height = 0;
	$('.chatbox__body__message ').each(function(i, value){
		height += parseInt($(this).height());
	});

	height += '';

	$('.chatbox__body').animate({scrollTop: height});
}

$('#chat-input').keyup(function (e) {
	if (e.which === 13) {
		e.preventDefault()
		$("#btn-chat").click();
	}	
})

$("#btn-chat").click(function(e){
	e.preventDefault()
	const message = $("#chat-input").val()
	$("#chat-input").val('')
	let receiver = $(e.target).closest(".chatbox").attr('data-user-id')
	ws.getSubscription('chat').emit('message', {
		sender: window.username,
		receiver: receiver,
		body: message,
	})
	return
})