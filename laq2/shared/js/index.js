let LAQtop = {};
LAQtop.init = function() {
  let self = this;
  self.slideSpeed = 1200;
  self.slidePause = 4000;
  new WOW().init();

  let topSlide = $('.t-slider');
  if (topSlide.length > 0){
    topSlide.bxSlider({
      auto: true,
      speed:self.slideSpeed,
      pause:self.slidePause,
      mode: 'fade',
      infiniteLoop:true,
      pager:false,
      controls:false,
      autoControls: false,
      stopAuto:false,
      onSliderLoad: function(index) {
        if (index === 0) {
          self.runCopyAnimate(1)
        }
      },
      onSlideNext: function(element) {
        let slItem = $(element);
        if (slItem.find('.s01').length > 0) {
          self.runCopyAnimate(1);
        }
        if (slItem.find('.s02').length > 0) {
          self.runCopyAnimate(2);
        }
        if (slItem.find('.s03').length > 0) {
          self.runCopyAnimate(3);
        }
        if (slItem.find('.s04').length > 0) {
          self.runCopyAnimate(4);
        }
      },
      onSlidePrev: function(element) {
        // console.log('on slider prev : '+index);
      }
    });
  }

  // line up slick 
  let lineupCont = LAQtw.main.find('.lineup-cont');
  let lineupSlick = lineupCont.find('.sl-lineup').slick({
    dots:false,
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: 2,

    arrows: false,
    autoplay: false,
    infinite:false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint:1200,
        settings: {
          centerPadding: '80px'
        }
      },
      {
        breakpoint:993,
        settings: {
          centerPadding:'60px'
        }
      },
      {
        breakpoint:768,
        settings: {
          slidesToShow: 1,
          centerPadding:'30px'
        }
      }
    ]
  })
  lineupSlick.slick('slickNext');
  $('.lineup-cont .overlay.prev').on('click', function(){
    lineupSlick.slick('slickPrev');
  })
  $('.lineup-cont .overlay.next').on('click', function(){
    lineupSlick.slick('slickNext');
  })
  // line up prev,next mouse event
  let ulCtrlMouse = lineupCont.find('#lu-ctrl-mouse');
  let ulOverlay = lineupCont.find('.overlay');
  let ulOverlayNext = lineupCont.find('.overlay.next');
  let ulOverlayPrev = lineupCont.find('.overlay.prev');
  ulOverlayNext.on('mouseover',function(e){
    ulCtrlMouse.fadeIn();
    ulCtrlMouse.addClass('next');
  })
  ulOverlayPrev.on('mouseover',function(e){
    ulCtrlMouse.fadeIn();
    ulCtrlMouse.addClass('prev');
  })
  ulOverlay.on('mouseout', function(e){
    ulCtrlMouse.fadeOut();
    ulCtrlMouse.removeClass('prev');
    ulCtrlMouse.removeClass('next');
  })
  ulOverlay.on('mousemove', function(e){
    //カーソルの座標位置を取得
    let x=e.clientX;
    let y=e.clientY;
    
    //ストーカー要素のcssを書き換える用    
    setTimeout(function(){
      ulCtrlMouse.css({
        "opacity":"1",
        "top":y+"px",
        "left":x+"px"
      });
    },120); //カーソルより遅れる時間を指定
  })


  // faq qa 
  let faq = $('main .faq-cont');
  faq.find('.qa-a').slideUp(100);
  faq.find('.qa-box .btn-tgg').on('click', function(){
    let _this = $(this);
    let _plus = _this.find('.plus');
    let _min = _this.find('.minus');
    let ans = _this.parents('.qa-box').find('.qa-a');
    if (_plus.is(':visible')) {
      _plus.hide();
      _min.show();
      ans.slideDown();
    } else {
      _plus.show();
      _min.hide();
      ans.slideUp();
    }
  })

}
LAQtop.runCopyAnimate = function(target) {
  let self = this;
  let topSlide = $('.t-slider');
  let CLASSNAME = "visibled";
  let TIMEOUT = self.slidePause - 500;
  let slCopyTarget = topSlide.find('.s0'+target+' .t-copy .tl');

  let hideTarget = ((target-1)==0) ? 4 : (target-1);
  topSlide.find('.s0'+hideTarget+' .t-copy .tl').removeClass(CLASSNAME);

  setTimeout(() => {
    slCopyTarget.addClass(CLASSNAME);
    // setTimeout(() => {
    //   slCopyTarget.removeClass(CLASSNAME);
    // }, TIMEOUT);
  }, self.slideSpeed/2);
}

$(function(){ LAQtop.init() })