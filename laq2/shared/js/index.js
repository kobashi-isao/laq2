let LAQtop = {};

LAQtop.init = function() {
  let self = this;
  self.isSmp = LAQtw.isSmp;
  self.slideSpeed = 1200;
  self.slidePause = 4000;
  new WOW().init();

    // topSlide.bxSlider({
    //   auto: true,
    //   speed:self.slideSpeed,
    //   pause:self.slidePause,
    //   mode: 'fade',
    //   infiniteLoop:true,
    //   pager:false,
    //   controls:false,
    //   autoControls: false,
    //   stopAuto:false,
    //   onSliderLoad: function(index) {
    //     if (index === 0) {
    //       self.runCopyAnimate(1)
    //     }
    //   },
    //   onSlideNext: function(element) {
    //     let slItem = $(element);
    //     if (slItem.find('.s01').length > 0) {
    //       self.runCopyAnimate(1);
    //     }
    //     if (slItem.find('.s02').length > 0) {
    //       self.runCopyAnimate(2);
    //     }
    //     if (slItem.find('.s03').length > 0) {
    //       self.runCopyAnimate(3);
    //     }
    //     if (slItem.find('.s04').length > 0) {
    //       self.runCopyAnimate(4);
    //     }
    //   },
    //   onSlidePrev: function(element) {
    //     // console.log('on slider prev : '+index);
    //   }
    // });

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

// LAQtop.runCopyAnimate = function(target) {
//   let self = this;
//   let topSlide = $('.t-slider');
//   let CLASSNAME = "visibled";
//   let TIMEOUT = self.slidePause - 500;
//   let slCopyTarget = topSlide.find('.s0'+target+' .t-copy .tl');

//   let hideTarget = ((target-1)==0) ? 4 : (target-1);
//   topSlide.find('.s0'+hideTarget+' .t-copy .tl').removeClass(CLASSNAME);

//   setTimeout(() => {
//     slCopyTarget.addClass(CLASSNAME);
//     // setTimeout(() => {
//     //   slCopyTarget.removeClass(CLASSNAME);
//     // }, TIMEOUT);
//   }, self.slideSpeed/2);
// }

$(function(){ 
  
  LAQtop.init();
  // set top slider: 
  const topSliderClassNameParams = '.t-slider'; // トップビジュアルのスライドを格納しているコンテンナを参照する時に必要
  const topSlidePrefixStringParams = '.s'; // .s01,.s02,.s03などを参照する時に必要
  const topSlideNumbersTextColorArrayParams = ['#1C1C1C','#1C1C1C','#1C1C1C','#fff']; //スライドが切替る時にインジケータの文字色を変更する時に参照
  const topSlideCopyTextColorArrayParams = ['#1C1C1C','#fff','#fff','#fff']; //各スライドのコピーや商品名の文字色を変更する時に参照

  SetTopSlickSlider(topSliderClassNameParams, topSlidePrefixStringParams, topSlideNumbersTextColorArrayParams, topSlideCopyTextColorArrayParams); //トップビジュアルスライドの初期化

//window.onload = function(){
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

  calcButtonPosition();
  function calcButtonPosition () {
    const margin = parseInt($('.slick-list').css('padding-left')) / 2 + 'px';
    const height = ($lineUpImg.height() - 80) / 2 + 'px';
    $nextButton.css('right', margin).css('top', height);
    $beforeButton.css('left', margin).css('top', height);
  }

  lineupSlick.on('beforeChange', function(_, slick, _, nextSlide){
    const totalCount = slick.slideCount;
    const slidesToShow = slick.options.slidesToShow
    const currentSlide = nextSlide + 1;
    
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
    calcButtonPosition();
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

//}

})


// TOP VISUAL SLIDER //////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetTopSlickSlider(_sliderclassname, _slideprefix, _topslidenumberstextcolorarray, _topslidecopytextcolorarray){
  let sliderClassName = _sliderclassname;
  let slidePrefixString = _slideprefix;
  let topSlide = $(sliderClassName);
  let topSlideNumbersTextColorArray = _topslidenumberstextcolorarray;
  let topSlideCopyTextColorArray = _topslidecopytextcolorarray;
  let topSlideDotsContainerText = $('.slide-dots-container span');
  let topSlideDotsContainerCurrentCountText = $('.slide-dots-container-current-number span');
  let topSlideDotsContainerTotalCountText = $('.slide-dots-container-total-number span');
  let topSlideCurrentNumber;

  if (topSlide.length > 0){
    //set font color for copies from array
    let slideInnerClasses = sliderClassName + ' .slide-inner .sl-cont';
    let slideItems = $(slideInnerClasses);
    slideItems.each(function(i){ $(this).css('color', topSlideCopyTextColorArray[i])})

    topSlide.on('init', function(e, slick, direction){
      const selectedSliderClassName = slidePrefixString + "01";
      const prevSliderClassName = slidePrefixString + ('0' + parseInt(slick.slideCount)).slice(-2);
      topSlidePrevItemsClassStrings = prevSliderClassName + ' .sl-cont .t-copy .tl';
      topSlideItemsClassStrings = selectedSliderClassName + ' .sl-cont .t-copy .tl';
      const topSlideItems = $(topSlideItemsClassStrings);
      const topPrevSlideItems = $(topSlidePrevItemsClassStrings);
      topSlideCurrentNumber = 1;
      topSlideDotsContainerText.css('color', topSlideNumbersTextColorArray[topSlideCurrentNumber]);
      topSlideDotsContainerTotalCountText.text(('0' + slick.slideCount).slice(-2));
      topSlideDotsContainerCurrentCountText.text(('0' + topSlideCurrentNumber).slice(-2));
      topPrevSlideItems.each(function(){ $(this).removeClass('visibled')});
      topSlideItems.each(function(){ $(this).addClass('visibled')});
    });

    topSlide.on('beforeChange', function(e, slick, currentSlide, nextSlide){
      // topSlide.slick('slickPause');
      let selectedItem = nextSlide;
      const selectedSliderClassName = slidePrefixString + ('0' + parseInt(selectedItem + 1)).slice(-2);
      const prevSliderClassName = slidePrefixString + ('0' + parseInt(selectedItem)).slice(-2);
      const topSlideItemBGImage = $(prevSliderClassName + ' .sl-bg');
      const topSlideItemBGImageNext = $(selectedSliderClassName + ' .sl-bg');
      // console.log(topSlideItemBGImage.attr('class'));
      topSlideItemBGImage.css({
        '-webkit-transform' : 'scale(1.1)',
        '-moz-transform'    : 'scale(1.1)',
        '-ms-transform'     : 'scale(1.1)',
        '-o-transform'      : 'scale(1.1)',
        'transform'         : 'scale(1.1)'
      });
      topSlideItemBGImageNext.css({
        '-webkit-transform' : 'scale(1)',
        '-moz-transform'    : 'scale(1)',
        '-ms-transform'     : 'scale(1)',
        '-o-transform'      : 'scale(1)',
        'transform'         : 'scale(1)'
      });
      topSlideItemsClassStrings = selectedSliderClassName + ' .sl-cont .t-copy .tl';
      topSlidePrevItemsClassStrings = prevSliderClassName + ' .sl-cont .t-copy .tl';
      const topSlideItems = $(topSlideItemsClassStrings);
      const topPrevSlideItems = $(topSlidePrevItemsClassStrings);
      topSlideCurrentNumber = selectedItem;
      topSlideDotsContainerText.css('color', topSlideNumbersTextColorArray[topSlideCurrentNumber]);
      (currentSlide >= slick.slideCount) ? topSlideCurrentNumber = 1 : topSlideCurrentNumber = parseInt(selectedItem + 1);
      if(currentSlide >= (slick.slideCount - 1)){
        const topSlideLastItemsClassName = slidePrefixString + ('0' + parseInt(slick.slideCount)).slice(-2);
        const topSlideLastItemsClassStrings = topSlideLastItemsClassName + ' .sl-cont .t-copy .tl';
        const topLastSlideItems = $(topSlideLastItemsClassStrings);
        topLastSlideItems.each(function(){ $(this).removeClass('visibled')});
        const topSlideItemBGImageLast= $(topSlideLastItemsClassName + ' .sl-bg');
        topSlideItemBGImageLast.css({
          '-webkit-transform' : 'scale(1)',
          '-moz-transform'    : 'scale(1)',
          '-ms-transform'     : 'scale(1)',
          '-o-transform'      : 'scale(1)',
          'transform'         : 'scale(1)'
        });
      }
      topSlideDotsContainerCurrentCountText.text(('0' + topSlideCurrentNumber).slice(-2));
      topPrevSlideItems.each(function(){$(this).removeClass('visibled')});
      topSlideItems.each(function(){$(this).addClass('visibled')});
    });
    
    topSlide.slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 5000,
      accessibility: false,
      dotsClass: 'slide-dots',
      appendDots: $('.slide-dots-container-dots'),
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      accesibility: false,
      draggable: false,
      swipe: false,
      touchMove: false,

      responsive: [
        {
          breakpoint: 767,
          settings: {
            centerMode: false,
          }
        },
      ],

    });

    $('.slick-dots li button').on('click', function(e){
      e.stopPropagation();
    });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
