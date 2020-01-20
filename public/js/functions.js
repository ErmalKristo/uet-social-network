$(function () {
  $('.following-link').click(function (e) {
	   let _this = this
	    e.preventDefault()
    let user_id = $(this).attr('data-user-id')
    $.getJSON('/user/follow/' + user_id, function (response) {
      if (response.success == '200') {
        if ($(_this).attr('data-friendship-status') == 'following') {
          $(_this).html('<i class="fa fa-user-plus"></i> Follow')
          $(_this).attr('data-friendship-status', 'not-following')
        } else {
          $(_this).html('<i class="fa fa-undo"></i> Unfollow')
          $(_this).attr('data-friendship-status', 'following')
        }
      }
    })
  })
  
  $('.card-link').click(function(e) {
	  e.preventDefault()
	  let postId = $(this).closest('.gedf-card').attr('data-post-id')
	  let user_post = {
			'post_id': postId,
			'_csrf' : $('input[name=_csrf]').val()
		}
		let thisPost = this
	$.post('/user/post-message/like', user_post).done(function(response){

	$("div[data-post-id="+postId+"]").find('.pelqime').html(response)

	})
  })
  
  $('#post-message').click(function (e) {
	e.preventDefault()
	let message = $('#message').val()
	if(!$('#message').val()) {
		return;
	}
	let user_post = {
			'post_message': message,
			'_csrf' : $('input[name=_csrf]').val()
			}
	$.post('/user/post-message', user_post).done(function(response){
		$('#message').val('')
		location.reload(); 
	})
  })
})
