// 点击手机登录图标切换显示内容
var RegistrationTopScanLogWrapFlog = 0
$('.RegistrationTopScanLogWrap').on('click', function () {
  clickFlog++
  if (RegistrationTopScanLogWrapFlog === 0) {
    $('.phoneRegistrationLog').css('display', 'none')
    $('scanRegistrationLog').css('display', 'block')
    $('.RegistrationCentSubmitWrap1').removeClass('showBox')
    $('.RegistrationCentSubmitWrap2').addClass('showBox')
  } else if (RegistrationTopScanLogWrapFlog === 1) {
    $('.phoneRegistrationLog').css('display', 'block')
    $('scanRegistrationLog').css('display', 'none')
    $('.RegistrationCentSubmitWrap2').removeClass('showBox')
    $('.RegistrationCentSubmitWrap1').addClass('showBox')
  } else if (RegistrationTopScanLogWrapFlog === 2) {
    RegistrationTopScanLogWrapFlog = 0
    $('.phoneRegistrationLog').css('display', 'none')
    $('scanRegistrationLog').css('display', 'block')
    $('.RegistrationCentSubmitWrap1').removeClass('showBox')
    $('.RegistrationCentSubmitWrap2').addClass('showBox')
  }
  RegistrationTopScanLogWrapFlog++
  if (clickFlog === 25) {
    alert('瓜皮，再丝滑，点击也要有个度吧，一口气点20多次你也是个人才')
    clickFlog = 0
  }
})

// input获取\失去焦点设置样式
// 设置用户名输入框功能
$('.userNameInput').on({
  focus: function () {
    $(this).css('border', '2px solid black')
  },
  blur: function () {
    var RegistrationUserNameInput = $('.userNameInput').val()
    // 先判断首字符是否为字母
    var topEnglishFlog = /^[a-zA-Z]/
    var phoneNumStr = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
    var dole = /@/
    var mailbox = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    var userNamebox = /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/
    if (topEnglishFlog.test(RegistrationUserNameInput)) { //如果有就判断是否为邮箱格式
      if (dole.test(RegistrationUserNameInput)) { //如果是邮箱格式就判断格式对错
        if (!mailbox.test(RegistrationUserNameInput)) { //邮箱格式错误做的事
          $(this).css('border', '2px solid red')
          // console.log('输入的邮箱格式有错误，请仔细检查后重新输入')
        } else {
          $(this).css('border', '2px solid #38ffff')
          // console.log('邮箱格式正确，系统将账号定义为邮箱用户账号')
        }
      } else if (userNamebox.test(RegistrationUserNameInput)) { //如果不是邮箱格式则是用户名格式,那就直接判断用户名格式如果错，做的事
        $(this).css('border', '2px solid #38ffff')
        // console.log('用户名格式正确，系统将账号定义为用户名账号')
      } else {
        $(this).css('border', '2px solid red')
        // console.log('用户名格式错误，请仔细检查后重新输入')
      }
    } else if (dole.test(RegistrationUserNameInput)) { //是邮箱格式判断格式对错
      // console.log('是邮箱格式')
      if (!mailbox.test(RegistrationUserNameInput)) { //邮箱格式错误做的事
        $(this).css('border', '2px solid red')
        // console.log('输入的邮箱格式有错误，请仔细检查后重新输入')
      } else {
        $(this).css('border', '2px solid #38ffff')
        // console.log('邮箱格式正确，系统将账号定义为邮箱用户账号')
      }
    } else if (phoneNumStr.test(RegistrationUserNameInput)) { //匹配手机格式
      $(this).css('border', '2px solid #38ffff')
      // console.log('手机号格式正确，系统将账号定义为手机号用户账号')
    } else if (RegistrationUserNameInput === '') {
      $(this).css('border', '2px solid transparent')
      // console.log('输入的值为空啥也不做')
    } else {
      $(this).css('border', '2px solid red')
      // console.log('输入的手机号格式错误，请仔细检查后重新输入')
    }
  }
})

// 设置密码输入框功能
$('.passWordInput').on({
  focus: function () {
    $(this).css('border', '2px solid #38ffff')
    $(this).keyup(function () {
      var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")
      var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g")
      var enoughRegex = new RegExp("(?=.{6,}).*", "g")
      if ($(this).val() === '') {
        $('.passSecurity span').removeClass()
        //如果空，就删除所有样式
      } else if (false == enoughRegex.test($(this).val())) {
        $('.passSecurity span').removeClass()
        $('.passSecurity #strong').addClass('strong1')
        //密码小于六位的时候，密码强度图片都为灰色 
      } else if (strongRegex.test($(this).val())) {
        $('.passSecurity span').removeClass()
        $('.passSecurity #strong').addClass('strong3')
        $('.passSecurity #stronger').addClass('strong3')
        $('.passSecurity #strongest').addClass('strong3')
        //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
      } else if (mediumRegex.test($(this).val())) {
        $('.passSecurity span').removeClass()
        $('.passSecurity #strong').addClass('strong2')
        $('.passSecurity #stronger').addClass('strong2')
        //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
      } else {
        $('.passSecurity span').removeClass()
        $('.passSecurity #strong').addClass('strong1')
      }
    })
  },
  blur: function () {
    $(this).css('border', '2px solid transparent')
  }
})

// 设置确认密码输入框功能
$('.passWordInput1').on({
  focus: function () {
    if ($('.passWordInput').val() === $(this).val()) {
      $(this).css('border', '2px solid #38ffff')
      // console.log('密码核对正确');
    } else {
      $(this).css('border', '2px solid red')
      // console.log('密码核对错误');
    }
    // console.log($('.passWordInput').val());
    $(this).keyup(function () {
      if ($('.passWordInput').val() === $(this).val()) {
        $(this).css('border', '2px solid #38ffff')
        // console.log('密码核对正确');
      } else {
        $(this).css('border', '2px solid red')
        // console.log('密码核对错误');
      }
    })
  },
  blur: function () {
    $(this).css('border', '2px solid transparent')
  }
})

// 小眼睛功能
var eyeFlog = 0 //标记默认值为掩码
$('.conceal').on('click', function () {
  if (eyeFlog === 0) {
    $('.passWordInput').prop('type', 'text')
    $('.conceal').removeClass('iconyanjing-bi')
    $('.conceal').addClass('iconyanjing-kai')
    eyeFlog = 1
  } else if (eyeFlog === 1) {
    $('.passWordInput').prop('type', 'password')
    $('.conceal').removeClass('iconyanjing-kai')
    $('.conceal').addClass('iconyanjing-bi')
    eyeFlog = 0
  }
})

// passWordInput
// 点击立即注册功能
$('.RegistrationButton').on('click', function () {
  var phoneNumStr = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  var mailbox = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  var RegistrationUserNameInput = $('.userNameInput').val()
  // 先判断首字符是否为字母
  var topEnglishFlog = /^[a-zA-Z]/
  var dole = /@/
  var userNamebox = /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/
  if ($('.userNameInput').val() === '' || $('.passWordInput').val() === '' || $('.passWordInput1').val() === '') {
    // alert('注册失败，输入框内容不能为空，请完成输入框的填写')
    $('.RegistrationBGWrap').css('display', 'block')
    $('.LoginAlertBox4').css('display', 'block')
  } else if (!($('.passWordInput').val() === $('.passWordInput1').val())) {
    // alert('注册失败，确认密码和设置密码不相同')
    $('.RegistrationBGWrap').css('display', 'block')
    $('.LoginAlertBox5').css('display', 'block')
  } else if (topEnglishFlog.test(RegistrationUserNameInput)) { //如果有就判断是否为邮箱格式
    if (dole.test(RegistrationUserNameInput)) { //如果是邮箱格式就判断格式对错
      if (!mailbox.test(RegistrationUserNameInput)) { //邮箱格式错误做的事
        $('.RegistrationBGWrap').css('display', 'block')
        $('.LoginAlertBox3').css('display', 'block')
      } else { //邮箱格式正确
        $('.RegistrationBGWrap').css('display', 'block')
        $('.LoginAlertBox8').css('display', 'block')
        // 保存用户名
        localStorage.removeItem('ShowUser')
        var UserNameLocaStr = 'User'
        var LocaLenthStr = localStorage.length
        var locaKeyStr = UserNameLocaStr + (LocaLenthStr - 1 + 2) //用户名动态添加
        var RegistrationPassWordInput = $('.passWordInput').val()
        // 设置Json对象往里面设置键值对（用户名和密码）
        var UserJson = {}
        UserJson.RegistrationUserName = RegistrationUserNameInput
        UserJson.RegistrationUserPassword = RegistrationPassWordInput
        if (localStorage.length === 0) {
          localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
        } else {
          let nameArr = []
          for (var i = 0, len = localStorage.length; i < len; i++) {
            nameArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
          }
          console.log(nameArr);
          var i1 = nameArr.findIndex((value) => value.RegistrationUserName === RegistrationUserNameInput)
          console.log(i1);
          if (i1 === -1) {
            console.log(i1);
            localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
          } else {
            $('.RegistrationBGWrap').css('display', 'block')
            $('.LoginAlertBox9').css('display', 'block')
          }
        }
      }
    } else if (userNamebox.test(RegistrationUserNameInput)) { //如果不是邮箱格式则是用户名格式,那就直接判断用户名格式如果错，做的事
      $('.RegistrationBGWrap').css('display', 'block')
      $('.LoginAlertBox6').css('display', 'block')
      // 保存用户名
      localStorage.removeItem('ShowUser')
      var UserNameLocaStr = 'User'
      var LocaLenthStr = localStorage.length
      var locaKeyStr = UserNameLocaStr + (LocaLenthStr - 1 + 2) //用户名动态添加
      var RegistrationPassWordInput = $('.passWordInput').val()
      // 设置Json对象往里面设置键值对（用户名和密码）
      var UserJson = {}
      UserJson.RegistrationUserName = RegistrationUserNameInput
      UserJson.RegistrationUserPassword = RegistrationPassWordInput
      if (localStorage.length === 0) {
        localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
      } else {
        let nameArr = []
        for (var i = 0, len = localStorage.length; i < len; i++) {
          nameArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
        console.log(nameArr);
        var i1 = nameArr.findIndex((value) => value.RegistrationUserName === RegistrationUserNameInput)
        console.log(i1);
        if (i1 === -1) {
          console.log(i1);
          localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
        } else {
          $('.RegistrationBGWrap').css('display', 'block')
          $('.LoginAlertBox9').css('display', 'block')
        }
      }
    } else { //用户名错误
      $('.RegistrationBGWrap').css('display', 'block')
      $('.LoginAlertBox1').css('display', 'block')
    }
  } else if (dole.test(RegistrationUserNameInput)) { //是邮箱格式判断格式对错
    if (!mailbox.test(RegistrationUserNameInput)) { //邮箱格式错误做的事
      $('.RegistrationBGWrap').css('display', 'block')
      $('.LoginAlertBox3').css('display', 'block')
    } else { //邮箱格式正确
      $('.RegistrationBGWrap').css('display', 'block')
      $('.LoginAlertBox8').css('display', 'block')
      // 保存用户名
      localStorage.removeItem('ShowUser')
      var UserNameLocaStr = 'User'
      var LocaLenthStr = localStorage.length
      var locaKeyStr = UserNameLocaStr + (LocaLenthStr - 1 + 2) //用户名动态添加
      var RegistrationPassWordInput = $('.passWordInput').val()
      // 设置Json对象往里面设置键值对（用户名和密码）
      var UserJson = {}
      UserJson.RegistrationUserName = RegistrationUserNameInput
      UserJson.RegistrationUserPassword = RegistrationPassWordInput
      if (localStorage.length === 0) {
        localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
      } else {
        let nameArr = []
        for (var i = 0, len = localStorage.length; i < len; i++) {
          nameArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
        console.log(nameArr);
        var i1 = nameArr.findIndex((value) => value.RegistrationUserName === RegistrationUserNameInput)
        console.log(i1);
        if (i1 === -1) {
          console.log(i1);
          localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
        } else {
          $('.RegistrationBGWrap').css('display', 'block')
          $('.LoginAlertBox9').css('display', 'block')
        }
      }
    }
  } else if (phoneNumStr.test(RegistrationUserNameInput)) { //匹配手机格式
    $('.RegistrationBGWrap').css('display', 'block') //手机格式正确
    $('.LoginAlertBox7').css('display', 'block')
    // 保存用户
    localStorage.removeItem('ShowUser')
    var UserNameLocaStr = 'User'
    var LocaLenthStr = localStorage.length
    var locaKeyStr = UserNameLocaStr + (LocaLenthStr - 1 + 2) //用户名动态添加
    var RegistrationPassWordInput = $('.passWordInput').val()
    // 设置Json对象往里面设置键值对（用户名和密码）
    var UserJson = {}
    UserJson.RegistrationUserName = RegistrationUserNameInput
    UserJson.RegistrationUserPassword = RegistrationPassWordInput
    if (localStorage.length === 0) {
      localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
    } else {
      let nameArr = []
      for (var i = 0, len = localStorage.length; i < len; i++) {
        nameArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
      }
      console.log(nameArr);
      var i1 = nameArr.findIndex((value) => value.RegistrationUserName === RegistrationUserNameInput)
      console.log(i1);
      if (i1 === -1) {
        console.log(i1);
        localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
      } else {
        $('.RegistrationBGWrap').css('display', 'block')
        $('.LoginAlertBox9').css('display', 'block')
      }
    }
  } else { //手机格式错误
    $('.RegistrationBGWrap').css('display', 'block')
    $('.LoginAlertBox2').css('display', 'block')
  }
})

// 点击确认关闭弹窗和遮罩
$('.OKBtn').on('click', function () {
  $('.RegistrationBGWrap').css('display', 'none')
  $('.LoginAlertBox').css('display', 'none')
})

// 点击二维码7次清除浏览器所有local数据(清除用户名数据)
var localDataFlog = 0
$('.markedWordText3').on('click', function () {
  localDataFlog++
  if (localDataFlog === 7) {
    localStorage.clear()
    localDataFlog = 0
  }
})