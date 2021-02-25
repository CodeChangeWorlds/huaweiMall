$(function () {
  $('#nav').load('../views/nav.html')
  $('#header').load('../views/header.html')
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
  $.ajax({
    url: '../dataBase.json',
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (json) {
      var domStr = ''
      $.each(json, function (index, item) {
        for (let i = 0; i < item.mobileList.length; i++) {
          domStr += `
          <li>
          <div class="pro-panels">
            <a href="../../views/detail.html?id=${i}&data=mobileList">
              <div class="p-img">
                <img src="${item.mobileList[i].imgSrc}" alt="">
              </div>
              <div class="p-title">${item.mobileList[i].title}</div>
              <div class="p-price">
                <em>¥${item.mobileList[i].price}起 </em>
                <span>多款可选</span>
              </div>
              <div class="p-label">
                <span>购机赠券</span>
                <span>赠送积分</span>
              </div>
              <div class="p-comment">
                <b>
                  <span>${item.mobileList[i].grade}</span>人评价
                </b>
                <b>${item.mobileList[i].rating}</b>%好评
              </div>
            </a>
          </div>
        </li>
        `
        }
      })
      $('#promo-list').append(domStr)
    }
  })
})