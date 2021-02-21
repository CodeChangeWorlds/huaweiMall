// jq ready方法简写
$(function () {
  $('#nav').load('../views/nav.html')
  $('#header').load('../views/header.html')
  $('#main').load('../views/main.html')
  $('#foot').load('../views/footer.html')
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 500) {
      $('#hungBar-top').fadeIn();
    }
    else {
      $('#hungBar-top').fadeOut();
    }
  })
  $('#hungBar-top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  })
})