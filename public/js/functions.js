$(function () {
  $('.following-link').click(function (e) {
	   let _this = this
	    e.preventDefault()
    console.log($(this))
    let user_id = $(this).attr('data-user-id')
    $.getJSON('/user/follow/' + user_id, function (response) {
      console.log(response)
      if (response.success == '200') {
        if ($(_this).attr('data-friendship-status') == 'following') {
          $(_this).html('<i class="fa fa-user-plus"></i> Follow')
          $(_this).attr('data-friendship-status', 'not-following')
        } else {
          console.log($(_this).children('i'))
          $(_this).html('<i class="fa fa-undo"></i> Unfollow')
          $(_this).attr('data-friendship-status', 'following')
        }
      }
    })
  })
})
