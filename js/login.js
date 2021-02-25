$(function () {
  $('#foot').load('../views/footer.html')
  // 切换背景图功能
  var LoginBGFlog1Index = 0
  var LoginBGFlog2Index = 0
  var clickFlog = 0
  $('.checkBGSpan').on('click', function () {
    clickFlog++
    LoginBGFlog1Index = LoginBGFlog2Index
    LoginBGFlog2Index++
    if (LoginBGFlog2Index === $('.loginBImg').length) {
      LoginBGFlog2Index = 0
    }
    $($('.loginBImg')[LoginBGFlog1Index]).removeClass('loginBGShow')
    $($('.loginBImg')[LoginBGFlog2Index]).addClass('loginBGShow')
    // 根据索引不同，切换后登录选项页跳出的动画位置也不同
    if (LoginBGFlog2Index === 0 || LoginBGFlog2Index === 2) {
      animate($1('.loginFun'), attrObj = {
        'left': 700,
        'opacity': 1
      })
    } else if (LoginBGFlog2Index === 1 || LoginBGFlog2Index === 3) {
      animate($1('.loginFun'), attrObj = {
        'left': 80,
        'opacity': 1
      })
    }
    if (clickFlog === 25) {
      alert('瓜皮，再丝滑，点击也要有个度吧，一口气点20多次你也是个人才')
      clickFlog = 0
    }
  })
 
  // 点击手机登录图标切换显示内容
  var LoginTopScanLogWrapFlog = 0
  $('.LoginTopScanLogWrap').on('click', function () {
    clickFlog++
    if (LoginTopScanLogWrapFlog === 0) {
      $('.phoneLoginLog').css('display', 'none')
      $('scanLoginLog').css('display', 'block')
      $('.LoginCentSubmitWrap1').removeClass('showBox')
      $('.LoginCentSubmitWrap2').addClass('showBox')
    } else if (LoginTopScanLogWrapFlog === 1) {
      $('.phoneLoginLog').css('display', 'block')
      $('scanLoginLog').css('display', 'none')
      $('.LoginCentSubmitWrap2').removeClass('showBox')
      $('.LoginCentSubmitWrap1').addClass('showBox')
    } else if (LoginTopScanLogWrapFlog === 2) {
      LoginTopScanLogWrapFlog = 0
      $('.phoneLoginLog').css('display', 'none')
      $('scanLoginLog').css('display', 'block')
      $('.LoginCentSubmitWrap1').removeClass('showBox')
      $('.LoginCentSubmitWrap2').addClass('showBox')
    }
    LoginTopScanLogWrapFlog++
    if (clickFlog === 25) {
      alert('瓜皮，再丝滑，点击也要有个度吧，一口气点20多次你也是个人才')
      clickFlog = 0
    }
  })

  // 登录方式的选项卡切换
  $('.passwordToLoginText1').on('click', function () {
    $('.passwordToLoginText1').css('border-bottom', '2px solid rgb(0, 0, 0)')
    $('.passwordToLoginText2').css('border-bottom', '2px solid transparent')
    $('.passwordToLoginShow0').removeClass('showBox')
    $('.passwordToLoginShow1').removeClass('showBox')
    $('.passwordToLoginShow0').addClass('showBox')
  })
  $('.passwordToLoginText2').on('click', function () {
    $('.passwordToLoginText1').css('border-bottom', '2px solid transparent')
    $('.passwordToLoginText2').css('border-bottom', '2px solid rgb(0, 0, 0)')
    $('.passwordToLoginShow0').removeClass('showBox')
    $('.passwordToLoginShow1').removeClass('showBox')
    $('.passwordToLoginShow1').addClass('showBox')
  })

  // input获取\失去焦点设置样式
  $('.p_userWrap input').on({
    focus: function () {
      $(this).css('border', '2px solid #38ffff')
    },
    blur: function () {
      $(this).css('border', '2px solid transparent')
    }
  })

  // 点击登录判断输入值的是否正确
  $('.LoginButton1').on('click', function () {
    // 第一个输入框的值判断Local中存的键值对的Name值是否有他
    localStorage.removeItem('ShowUser')
    let nameArr = []
    for (var i = 0, len = localStorage.length; i < len; i++) {
      nameArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }
    var LoginUserNameInput = $('.userNameInput').val()
    var i1 = nameArr.findIndex((value) => value.RegistrationUserName === LoginUserNameInput)
    // 第二个输入框密码的值是否填对
    var LoginUserPassWordInput = $('.passWordInput').val()
    if (localStorage.length === 0) {
      $('.RegistrationBGWrap').css('display', 'block')
      $('.LoginAlertBox1').css('display', 'block')
    } else {
      if (i1 === -1) {
        //匹配不到用户名
        $('.loginBGWrap').css('display', 'block!')
        $('.LoginAlertBox1').css('display', 'block')
      } else if (!(LoginUserPassWordInput === JSON.parse(localStorage.getItem(localStorage.key(i1))).RegistrationUserPassword)) { //匹配不到密码
        $('.loginBGWrap').css('display', 'block')
        $('.LoginAlertBox2').css('display', 'block')
      } else { //匹配成功，登录成功
        $('.loginBGWrap').css('display', 'block')
        $('.LoginAlertBox3').css('display', 'block')
        // 设置当前用户名（保存当前登录状态）
        localStorage.setItem('ShowUser', JSON.parse(localStorage.getItem(localStorage.key(i1))).RegistrationUserName)
      }
    }
  })

  // 验证码功能
  $(function () {
    var show_num = [];
    var phoneNumStr = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
    $(".gainVerification").on('click', function () {
      let nameArr = []
      for (var i = 0, len = localStorage.length; i < len; i++) {
        nameArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
      }
      var LoginPhoneNumInput = $('.userPhoneNumberInput').val()
      var i1 = nameArr.findIndex((value) => value.RegistrationUserName === LoginPhoneNumInput)
      if (i1 === -1) {
        // console.log('手机号未被注册，可以登录');
        if (!phoneNumStr.test(LoginPhoneNumInput)) { //手机格式不对
          $('.loginBGWrap').css('display', 'block')
          $('.LoginAlertBox4').css('display', 'block')
          $('.gainVerification0').css('display', 'block')
          $('.gainVerification1').css('display', 'none')
        } else {
          draw(show_num);
          $('.gainVerification0').css('display', 'none')
          $('.gainVerification1').css('display', 'block')
        }
      } else {
        // console.log('该手机号已被注册，请用密码登录');
        $('.loginBGWrap').css('display', 'block')
        $('.LoginAlertBox8').css('display', 'block')
      }
    })
    $(".btnLogin").on('click', function () {
      localStorage.removeItem('ShowUser')
      var LoginPhoneNumInput = $('.userPhoneNumberInput').val()
      var val = $(".input-val").val().toLowerCase();
      var num = show_num.join("");
      if (val == '') { //验证码为空
        $('.loginBGWrap').css('display', 'block')
        $('.LoginAlertBox5').css('display', 'block')
      } else if (val == num) { //验证码正确
        // 保存用户名
        var UserNameLocaStr = 'User'
        var LocaLenthStr = localStorage.length
        var locaKeyStr = UserNameLocaStr + (LocaLenthStr - 1 + 2) //用户名动态添加
        // 设置Json对象往里面设置键值对（电话用户名）
        var UserJson = {}
        UserJson.PhoneUserName = LoginPhoneNumInput
        if (localStorage.length === 0) {
          localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
        } else {
          for (var i = 0, len = localStorage.length; i < len; i++) {
            // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))).RegistrationUserName);
            if (!(LoginPhoneNumInput === JSON.parse(localStorage.getItem(localStorage.key(i))).PhoneUserName)) {
              localStorage.setItem(locaKeyStr, JSON.stringify(UserJson))
              localStorage.setItem('ShowUser', LoginPhoneNumInput)
            } else {
              // 设置当前用户名（保存当前登录状态）
              localStorage.setItem('ShowUser', LoginPhoneNumInput)
            }
          }
        }
        $('.loginBGWrap').css('display', 'block')
        $('.LoginAlertBox6').css('display', 'block')
        $(".input-val").val('')
      } else { //验证码输入错误
        $('.loginBGWrap').css('display', 'block')
        $('.LoginAlertBox7').css('display', 'block')
        $(".input-val").val('')
      }
    })
  })

  //生成并渲染出验证码图形
  function draw(show_num) {
    var canvas_width = $('#canvas').width();
    var canvas_height = $('#canvas').height();
    var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
    var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width
    canvas.height = canvas_height;
    var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length; //获取到数组的长度
    for (var i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
      var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
      // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
      var deg = Math.random() - 0.5; //产生一个随机弧度
      var txt = aCode[j]; //得到随机的一个内容
      show_num[i] = txt.toLowerCase();
      var x = 10 + i * 20; //文字在canvas上的x坐标
      var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";
      context.translate(x, y);
      context.rotate(deg);
      context.fillStyle = randomColor();
      context.fillText(txt, 0, 0);
      context.rotate(-deg);
      context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
      context.strokeStyle = randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
      context.strokeStyle = randomColor();
      context.beginPath();
      var x = Math.random() * canvas_width;
      var y = Math.random() * canvas_height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
    //刷新验证码
    $('.userPhoneNumberInput').on('keyup', function () {
      $('.gainVerification0').css('display', 'block')
      $('.gainVerification1').css('display', 'none')
      context.clearRect(0, 0, canvas.width, canvas.height)
    })
  }

  //得到随机的颜色值
  function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // 点击确认关闭弹窗和遮罩
  $('.OKBtn').on('click', function () {
    $('.loginBGWrap').css('display', 'none')
    $('.LoginAlertBox').css('display', 'none')
  })
})