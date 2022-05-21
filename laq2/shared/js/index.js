let LAQtop = {};
LAQtop.init = function() {
  let self = this;
  self.isSmp = LAQtw.isSmp;
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
          centerPadding:'20px'
        }
      }
    ]
  })

  const $beforeButton = $('.lineup-cont .lu-ctrl-mouse#js-lineup-prev');
  const $nextButton = $('.lineup-cont .lu-ctrl-mouse#js-lineup-next');
  const $progressBar = $('.lineup-cont #js-lineup-scroll .handle');

  const $lineUpImg = $('.lineup-cont #js-lineup-img');

  lineupSlick.on('beforeChange', function(_, slick){
    const margin = parseInt(slick.options.centerPadding) / 2 + 'px';
    const height = ($lineUpImg.height() - 80) / 2 + 'px';
    $nextButton.css('right', margin).css('top', height);
    $beforeButton.css('left', margin).css('top', height);
  });
  lineupSlick.on('afterChange', function(_, slick, currentSlide){
    const totalCount = slick.slideCount;
    const slidesToShow = slick.options.slidesToShow
    currentSlide = currentSlide + 1;
    
    if (currentSlide < totalCount) {
      $nextButton.fadeIn();
    } else {
      $nextButton.fadeOut();
    }
    
    if (currentSlide / slidesToShow === 1) {
      $beforeButton.fadeOut();
    } else {
      $beforeButton.fadeIn();
    }

    const width = ( slidesToShow / totalCount ) * 100;
    const left =  slidesToShow === 1
      ? ( 100 / totalCount ) * ((currentSlide / slidesToShow) - 1)
      : ( 100 / totalCount ) * ((currentSlide) -2)
    
    $progressBar
      .css('width', width + '%')
      .css('left', left + '%')
  });

  if (!self.isSmp) {
    lineupSlick.slick('slickNext');
  }
  $('.lineup-cont .lu-ctrl-mouse#js-lineup-prev').on('click', function(){
    lineupSlick.slick('slickPrev');
  })
  $('.lineup-cont .lu-ctrl-mouse#js-lineup-next').on('click', function(){
    lineupSlick.slick('slickNext');
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