$(function () {
  if (localStorage.getItem('goods')) {
    // 获取购物车数据
    const goodsArr = JSON.parse(localStorage.getItem('goods'))
    // 渲染购物车列表数据
    function getLocalData(id, data, num) {
      $.ajax({
        url: '../dataBase.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
          var domStr = ''
          $.each(json, function (index, item) {
            domStr += `
                  <li class="minicart-goods-item">
                    <div class="pro-info clearfix">
                      <div class="checked l">
                        <i class="icon-choose-normal"></i>
                        <input type="checkbox">
                      </div>
                      <div class="img l">
                        <a href="../../views/detail.html?data=${data}&id=${id}"><img src="${item[data][id].imgSrc}" alt=""></a>
                      </div>
                      <div class="title r">
                        <a href="../../views/detail.html?data=${data}&id=${id}">${item[data][id].title}</a>
                      </div>
                      <div class="p-status r">
                        <div class="p-price">
                        ¥<b>${item[data][id].price}</b>
                          <strong>
                            <i>x</i>
                            <span>${num}</span>
                          </strong>
                        </div>
                      </div>
                    </div>
                  </li>
                `
          })
          $('.minicart-goods').append(domStr)
        }
      })
    }
    for (let i = 0; i < goodsArr.length; i++) {
      // 渲染购物车列表数据
      getLocalData(goodsArr[i].id, goodsArr[i].data, goodsArr[i].num)
    }
    $('.minicart-goods').on('click', '.checked', function () {
      let flag = $(this).find('input').prop('checked')
      let price = 0
      if (flag) {
        $(this).find('i').css({
          'backgroundColor': 'red',
          'border': 'none'
        })
        $.each($(this).find('input'), function () {
          $.each($('.checked input:checked'), function () {
            price += parseInt($(this).parents('.checked').siblings('.p-status').find('b').text());
          })
        })
        $('.settlement span b').text('¥' + price)
      } else {
        $(this).find('i').css({
          'backgroundColor': 'white',
          'border': '1px solid #979797'
        })
        $.each($(this).find('input'), function () {
          $.each($('.checked input:checked'), function () {
            price += parseInt($(this).parents('.checked').siblings('.p-status').find('b').text());
          })
        })
        $('.settlement span b').text('¥' + price)
      }

    })
  } else {
    let newLi = `<div class="minicart-empty">
                    <p><span class="icon-minicart"></span></p>
                    <p>您的购物车是空的，赶紧选购吧~</p>
                  </div>`
    $('.dropdown-minicart').html(newLi)
  }
  if (localStorage.getItem('ShowUser')) {
    const user = localStorage.getItem('ShowUser')
    let html = `<span>${user}</span>`
    $('.login').html(html)
  } else {
    let html = ` <a href="../views/login.html">请登录</a>
    <a href="../views/registration.html">&nbsp;注册</a>`
    $('.login').html(html)
  }
})