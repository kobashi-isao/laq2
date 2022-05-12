var LAQtw = {};
LAQtw.init = function(){
  var self =this;
  self.header = $('header');
  self.main = $('main');
  self.topOffset = self.header.find('.navbar.fixed-top').height()
    +self.main.find('#top-menu').height()+10;

  let topSlide = self.main.find('.t-slider');
  if (topSlide.length > 0){
    topSlide.bxSlider({
      auto: true,
      speed: 2000,
      mode: 'fade',
      infiniteLoop:true,
      pager:false,
      controls:false,
      autoControls: false
    });
  }

  // link a name scroll
  $('a[href^="#"]').on('click', function() {
    let speed = 500;
    let href= $(this).attr("href");
    if (href.length == 1 && (href == "#" || href == "")) {return true;}
    var target = $(href == "#" || href == "" ? 'html' : href);
    if (target.length == 0) return false;
    var position = target.offset().top - self.topOffset;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    if (href == '#top-page') return false;
    return true;
  });

  self.goTopBtnOnBottom = false;
  $(window).scroll(function(){
    let windHeight = $(window).height();
    var goTopBtn = $('#gotop-btn');
    var scrollTop = $(document).scrollTop();
    if (scrollTop <= 500) {
      goTopBtn.fadeOut(400);
    } else if (goTopBtn.css("display") == 'none' && !self.goTopBtnOnBottom) {
      goTopBtn.fadeIn(500);
    }
    if (self.isSmp) {
      var bottomLimit = $('footer').position().top;
      if ((scrollTop+windHeight) > bottomLimit && !self.goTopBtnOnBottom) {
        goTopBtn.fadeOut(400);
        self.goTopBtnOnBottom = true;
      } else if ((scrollTop+windHeight) < bottomLimit && self.goTopBtnOnBottom) {
        goTopBtn.fadeIn(400);
        self.goTopBtnOnBottom = false;
      }
    }
  })

  // scroll reveal
  ScrollReveal().reveal('.scro', {
    delay: 100, // アニメーション開始までの時間
    duration: 1000, // アニメーション完了にかかる時間
    origin: 'bottom', // 要素がどの方向から来るか
    distance: '160px', // 移動する距離
    reset: false // フレームインの度に動かすか
  });

}
LAQtw.isSmp = function() {
  let ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
    return true;
  }
  return false;
}
$(function(){ LAQtw.init(); })