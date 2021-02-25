$(function () {
	if (localStorage.getItem('goods')) {
		// 获取购物车数据
		var goodsArr = JSON.parse(localStorage.getItem('goods'))
		// 获取所有数据
		$.ajax({
			url: '../data/goods.json',
			type: 'get',
			dataType: 'json',
			success: function (json) {
				var domStr = ''
				$.each(json, function (index, item) {
					$.each(goodsArr, function (i, obj) {
						if (item.id === obj.id) {
							domStr += `
				              <li>
				                <input type="checkbox">
				                <img src="${item.img_src}" alt="">
				                <h3>${item.desc}</h3>
				                <p>${item.price}</p>
				                <a class="changeNum_left" data_id="${obj.id}">+</a>
				                <span>${obj.num}</span>
				                <a class="changeNum_rights" data_id="${obj.id}">-</a>
				                <strong id="totals">${(obj.num * item.price)}</strong>
				                <em data-id="${item.id}">删除</em>
				              </li>
				              `

						}
					})
				})
				$('.list').html(domStr)
			}
		})

		// 点击全部
		$(".head input").click(function () {
			if ($(this).prop('checked')) {
				$('.list li input').prop('checked', true)
			} else {
				$('.list li input').prop('checked', false)
			}
		})
		//选中商品
		$(".list").on('click', 'li input', function () {
			// 判断是否要全选
			$('.list li input').each(function (index, ele) {
				if (!$(ele).prop('checked')) { //未选中
					$(".head input").prop('checked', false)
					return false //结束each循环
				}
				$(".head input").prop('checked', true)
			})
		})

		// 删除商品
		$('.list').on('click', 'li em', function () {
			// 当前点击的商品id
			var id = $(this).attr('data-id')
			$.each(goodsArr, function (index, item) {
				if (item.id === id) {
					goodsArr.splice(index, 1)
					// 判断是否要全选
					$('.list li input').each(function (index, ele) {
						if (!$(ele).prop('checked')) { //未选中
							$('.head input').prop('checked', false)
							return false //结束each循环
						}
						$('.head input').prop('checked', true)
					})
					return false
				}
			})

			// 删除dom结构
			$(this).parent().remove()
			// 更新本地存储的数据
			localStorage.setItem('goods', JSON.stringify(goodsArr))
			if (goodsArr.length <= 0) {
				localStorage.removeItem('goods')
				var newLi = '<li>购物车暂无数据！</li>'
				$('.list').html(newLi)
			}
		})

		//增加商品数量
		$('.list').on('click', 'li .changeNum_left', function () {
			var totals = Number($(this).siblings('#totals').text())
			var price = Number($(this).siblings('p').text())
			var val = Number($(this).siblings('span').text()) + 1
			var total = Number(val * ($(this).siblings('p').text()))
			$(this).siblings('span').text(val)
			var id = $(this).attr('data_id')
			totals = total
			if (val <= 1) {
				val = 1
			}
			$(this).siblings('strong').text(totals)
			var price = Number($(this).siblings('p').text())
			totals = val * price
			$.each(goodsArr, function (index, item) {
				if (item.id === id) {
					item.num = val
					item.totals = val * price
				}
			})
			localStorage.setItem('goods', JSON.stringify(goodsArr))
		})


		//减少商品数量

		$('.list').on('click', 'li .changeNum_rights', function () {
			var totals = Number($(this).siblings('#totals').text())
			var price = Number($(this).siblings('p').text())
			var val = Number($(this).siblings('span').text()) - 1
			if (val <= 1) {
				val = 1
			}
			var total = Number(val * ($(this).siblings('p').text()))

			$(this).siblings('span').text(val)
			var id = $(this).attr('data_id')
			totals = total
			$(this).siblings('strong').text(totals)
			$.each(goodsArr, function (index, item) {
				if (item.id === id) {
					item.num = val
					item.totals = val * price
				}
			})
			localStorage.setItem('goods', JSON.stringify(goodsArr))
			if (goodsArr.length <= 0) {
				localStorage.removeItem('goods')
				var newLi = '<li>购物车暂无数据！</li>'
				$('.list').html(newLi)
			}
		})


	} else {
		var newLi = '<li>购物车暂无数据！</li>'
		$('.list').html(newLi)
	}
	$(".nav_left_menu").css("display", "none")
})