$(function () {
  $('#shopcart-nav').load('../views/shopcart-nav.html')
  $('#shopcart-header').load('../views/shopcart-header.html')
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
  if (localStorage.getItem('goods')) {
    // 获取购物车数据
    const goodsArr = JSON.parse(localStorage.getItem('goods'))
    // 渲染购物车列表数据
    function getLocalData(id, data, num, i) {
      $.ajax({
        url: '../dataBase.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
          var domStr = ''
          $.each(json, function (index, item,) {
            domStr += `
                <div class="sc-pro-list clearfix" data-id="${i}">
                  <input type="checkbox" class="checkbox">
                  <div class="sc-pro-main clearfix">
                    <a href="../../views/detail.html?data=${data}&id=${id}" target="_blank" class="pro-img">
                      <img
                        src="${item[data][id].imgSrc}"
                        alt="">
                    </a>
                    <ul class="clearfix l">
                      <li>
                        <a href="../../views/detail.html?data=${data}&id=${id}" target="_blank">
                          <div class="p-name">${item[data][id].title}</div>
                        </a>
                      </li>
                      <li id="price">
                        <div class="p-price">
                          ¥<span>${item[data][id].price}</span>
                        </div>
                      </li>
                      <li>
                        <div class="p-stock">
                          <i class="minus" data-id="${id}" data="${data}">-</i>
                          <input type="text" value="${num}">
                          <i class="plus" data-id="${id}" data="${data}">+</i>
                        </div>
                      </li>
                      <li id="total">
                        <div class="p-price-total">¥<span>${item[data][id].price}</span></div>
                      </li>
                      <li>
                        <div class="p-del">删除</div>
                      </li>
                    </ul>
                  </div>
                </div>
                `
          })
          $('#shopcart-content').append(domStr)
        }
      })
    }
    for (let i = 0; i < goodsArr.length; i++) {
      // 渲染购物车列表数据
      getLocalData(goodsArr[i].id, goodsArr[i].data, goodsArr[i].num, i)
    }
    // shopcart-content里面内容ajax请求完数据后触发
    $('#shopcart-content').ajaxComplete(function () {
      // 阻止输入框输入
      $('.p-stock input').focus(function () {
        $(this).blur()
      })
      // 判断数量是否为1
      $.each($('#shopcart-content').find('.sc-pro-list'), function () {
        if ($(this).find('.p-stock input').prop('value') === '1') {
          $(this).find('.p-stock .minus').addClass('disabled')
        }
      })
      // 小计
      $.each($('#shopcart-content').find('.sc-pro-list'), function (i) {
        if ($(this).attr('data-id') == i) {
          let num = Number($(this).find('.p-stock input').prop('value'))
          let price = Number($(this).find('.p-price span').text())
          $(this).find('#total span').text(num * price)
        }
      })
    })
    // 删除商品
    $('.sc-pro').on('click', '.p-del', function () {
      let a = $(this)
      let del = a.parents('.sc-pro').find('.p-del')
      // 当前点击的商品id
      $.each(goodsArr, function (index) {
        if (del[index] === a[0]) {
          goodsArr.splice(index, 1)
          return false
        }
      })
      // 删除dom结构
      $(this).parents('.sc-pro-list').remove()
      add()
      totalPrice()
      selectOne()
      // 更新本地存储的数据
      localStorage.setItem('goods', JSON.stringify(goodsArr))
      if (goodsArr.length <= 0) {
        localStorage.removeItem('goods')
        let newLi = `<div class="minicart-empty">
                      <span class="icon-minicart"></span>
                      <p>您的购物车里什么也没有哦~</p>
                      <a href="../views/index.html" class="btn">去逛逛</a>
                    </div>`
        $('#shopcart-goods').html(newLi)
      }
    })
    // 全选删除
    $('#delAll').click(function () {
      $.each($('.sc-pro-list input:checked'), function (index, k) {
        let data = $(k).siblings('.sc-pro-main').find('.plus').attr('data')
        let id = $(k).siblings('.sc-pro-main').find('.plus').attr('data-id')
        $.each(goodsArr, function (i, item) {
          if (data === item.data && id === item.id) {
            goodsArr.splice(i, 1)
            return false
          }
        })
        // 删除dom结构
        $(this).parents('.sc-pro-list').remove()
        add()
        totalPrice()
        // 更新本地存储的数据
        localStorage.setItem('goods', JSON.stringify(goodsArr))
        selectOne()
        if (goodsArr.length <= 0) {
          localStorage.removeItem('goods')
          let newLi = `<div class="minicart-empty">
                      <span class="icon-minicart"></span>
                      <p>您的购物车里什么也没有哦~</p>
                      <a href="../views/index.html" class="btn">去逛逛</a>
                    </div>`
          $('#shopcart-goods').html(newLi)
        }
      })
    })
    //数目减
    change('.minus', 0)
    //数目加
    change('.plus', 1)
    function change(select, flag) {
      $('.sc-pro').on('click', select, function () {
        let price = parseFloat($(this).parents('li').siblings('#price').find('span').text());
        let id = $(this).attr('data-id')
        let data = $(this).attr('data')
        let num = $(this).siblings('input').val();
        let check = $(this).parents('.sc-pro-list').find('.checkbox').prop('checked')
        if (flag) {
          num++
          $.each(goodsArr, function (i, item) {
            if (data === item.data && id === item.id) {
              item.num = num
            }
          })
          $(this).siblings('.minus').removeClass('disabled')
        } else {
          num--
          if (num <= 1) {
            $(this).addClass('disabled')
            num = 1
          }
          $.each(goodsArr, function (index, item) {
            if (data === item.data && id === item.id) {
              item.num = num
            }
          })
        }
        $(this).siblings('input').attr('value', num);
        // 小计
        $(this).parents('li').siblings('#total').find('span').text(Number(price * num))
        if (check) {
          add()
          totalPrice()
        }
        localStorage.setItem('goods', JSON.stringify(goodsArr))
      })
    }
    // 多选
    $(".checkAll input").click(function () {
      let flag = $(this).prop("checked");
      if (flag) {
        $('#shopcart-content .checkbox').prop('checked', true)
        $(".checkAll input").prop('checked', true)
        totalPrice()
        add()
      } else {
        $('#shopcart-content .checkbox').prop('checked', false)
        $(".checkAll input").prop('checked', false)
        $('.sc-total-price span').text('¥0.00')
        $('.total-choose b').text(0)
      }
    })
    // 单选
    function selectOne() {
      var CH = $(".sc-pro-list .checkbox").length-1; //列表长度
      if($('.sc-pro-list input:checked').is(':checked')){
        $.each($('.sc-pro-list input:checked'), function (i, k) {
          if (i === CH) {
            $(".checkAll input").prop('checked', true)
          } else {
            $(".checkAll input").prop('checked', false)
          }
        })
      }else{
        $(".checkAll input").prop('checked', false)
      }
    }
    $('.sc-pro').on('click', '.sc-pro-list input', function () {
      selectOne()
      totalPrice()
      add()
    })
    // 计数
    function add() {
      let totle = 0
      $.each($('.sc-pro-list input:checked'), function () {
        totle += parseInt($(this).siblings('.sc-pro-main').find('.p-stock input').prop('value'));
      })
      $('.total-choose b').text(totle)
    }
    // 总计
    function totalPrice() {
      let price = 0
      $.each($('.sc-pro-list input:checked'), function () {
        price += parseInt($(this).siblings('.sc-pro-main').find('.p-price-total span').text());
      })
      $('.sc-total-price span').text('¥' + price)
    }
  } else {
    let newLi = `<div class="minicart-empty">
                    <span class="icon-minicart"></span>
                    <p>您的购物车里什么也没有哦~</p>
                    <a href="../views/index.html" class="btn">去逛逛</a>
                  </div>`
    $('#shopcart-goods').html(newLi)
  }
})