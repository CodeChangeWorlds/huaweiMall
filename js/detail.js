$(function () {
  $('#nav').load('../../views/nav.html')
  $('#header').load('../../views/header.html')
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
  $('.show').mouseover(function (e) {
    e.stopPropagation();
    $('.mask').show()
    $('.magnifier').show()
  })
  $('.show').mousemove(function (e) {
    var x = e.clientX - $('.magnifierBox .show').offset().left - $('.mask').width() / 2;
    var y = e.clientY - $('.magnifierBox .show').offset().top - $('.mask').height() / 2;
    //限制下移动范围
    var maxLeft = $('.magnifierBox .show').width() - $('.mask').width();
    var maxTop = $('.magnifierBox .show').height() - $('.mask').height();
    if (x <= 0) {
      x = 0;
    }
    if (x >= maxLeft) {
      x = maxLeft;
    }
    if (y <= 0) {
      y = 0;
    }
    if (y >= maxTop) {
      y = maxTop;
    }
    $('.mask').css({ 'left': x, 'top': y });
    //算下比例
    var widthNum = $('.magnifier img').width() / $('.show img').width();
    var heightNum = $('.magnifier img').height() / $('.show img').height();
    $('.magnifier img').css({
      'left': -(widthNum * x),
      'top': -(heightNum * y)
    })
  })
  $('.show').mouseout(function (e) {
    e.stopPropagation();
    $('.mask').hide()
    $('.magnifier').hide()
  })
  // 阻止输入框输入
  $('.product-stock-text').focus(function () {
    $(this).blur()
  })
  // 获取url中的某个参数值
  function getUrlParam(key) {
    let url = location.href;
    let searchStr = url.split('?')[1];
    let reg = new RegExp('[&]?' + key + '=([^&#]*)[&]?', 'i');
    let arr = searchStr.match(reg);
    return (RegExp.$1);
  }
  let id = getUrlParam('id');
  let data = getUrlParam('data')
  function getData(id, data) {
    $.ajax({
      url: '../dataBase.json',
      type: 'get',
      dataType: 'json',
      cache: false,
      success: function (json) {
        let price = ''
        let title = ''
        let img = ''
        let add = ''
        $.each(json, function (index, item) {
          price = `<b>¥</b>${item[data][id].price}`
          title = `<h1>${item[data][id].title}</h1>`
          img = `<img src="${item[data][id].imgSrc}">`
          add = `<span class="add">加入购物车</span>`
        })
        $('#product-price').append(price)
        $('#product-title').append(title)
        $('.magnifierBox .show').append(img)
        $('.magnifierBox .magnifier').append(img)
        $('.product-buttonmain').prepend(add)
      }
    })
  }
  getData(id, data)
  // 加减商品
  $('.pro-quantity-plus').click(function () {
    $('.product-stock input').attr('value', function (i, k) {
      let a = Number(k)
      a++
      $('.product-stock input').attr('value', a)
      if (a > 1) {
        $('.pro-quantity-minus').removeClass('disabled')
      }
    })
  })
  $('.pro-quantity-minus').click(function () {
    $('.product-stock input').attr('value', function (i, k) {
      let a = Number(k)
      a--
      $('.product-stock input').attr('value', a)
      if (a <= 1) {
        $('.pro-quantity-minus').addClass('disabled')
        $('.product-stock input').attr('value', 1)
      }
    })
  })
  // 点击加入购物车
  $('#product').on('click', '.product-buttonmain .add', function () {
    // 存储商品id和数量
    let id = getUrlParam('id');//当前点击商品的id
    let data = getUrlParam('data');//当前商品类别
    var goodsArr = []//购物车数据的数组
    if (localStorage.getItem('goods')) {
      goodsArr = JSON.parse(localStorage.getItem('goods'))
    }
    // 标记购物车是否已有该商品
    let flag = false
    // 判断购物车是否已有该商品
    $.each(goodsArr, function (index, item) {
      if (item.id === id && item.data === data) {//购物车已该商品
        item.num++//商品数量+1
        flag = true
      }
    })
    if (!flag) {
      // push一个商品对象到goodsArr
      goodsArr.push({ "id": id, "data": data, "num": $('.product-stock input').attr('value') })
    }
    // 数据更新到本地存储
    localStorage.setItem('goods', JSON.stringify(goodsArr))
  })
})