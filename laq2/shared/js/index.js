import { SetTopSlickSlider } from './setTopSlickSlider.js';

let LAQtop = {};

LAQtop.init = function() {
  let self = this;
  self.isSmp = LAQtw.isSmp;
  self.slideSpeed = 1200;
  self.slidePause = 4000;
  new WOW().init();

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



window.onload = function(){ 
  
  LAQtop.init();

  /*//////////////////////////////////////////////////////////////////////// Start Set top slider ////////////////////////////////////////////////////////*/
  const topSliderClassNameParams = '.t-slider'; // トップビジュアルのスライドを格納しているコンテンナを参照する時に必要
  const topSlidePrefixStringParams = '.s'; // .s01,.s02,.s03などを参照する時に必要
  const topSlideNumbersTextColorArrayParams = ['#1C1C1C','#1C1C1C','#1C1C1C','#fff']; //スライドが切替る時にインジケータの文字色を変更する時に参照
  const topSlideCopyTextColorArrayParams = ['#1C1C1C','#fff','#fff','#fff']; //各スライドのコピーや商品名の文字色を変更する時に参照
  new SetTopSlickSlider( topSliderClassNameParams, topSlidePrefixStringParams, topSlideNumbersTextColorArrayParams, topSlideCopyTextColorArrayParams); //トップビジュアルスライドの初期化
  /*//////////////////////////////////////////////////////////////////////// End Set top slider ////////////////////////////////////////////////////////*/

  const isSmp = LAQtw.isSmp;
  // line up slick 
  let lineupCont = LAQtw.main.find('.lineup-cont');
  let lineupSlick = lineupCont.find('.sl-lineup').slick({
    dots:false,
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: isSmp ? 1 : 2,
    arrows: false,
    autoplay: false,
    infinite:false,
    autoplaySpeed: 3000,
    initialSlide: isSmp ? 0 : 1,
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
          centerPadding:'20px'
        }
      }
    ]
  })

  const $beforeButton = $('.lineup-cont .lu-ctrl-mouse#js-lineup-prev');
  const $nextButton = $('.lineup-cont .lu-ctrl-mouse#js-lineup-next');
  const $progressBar = $('.lineup-cont #js-lineup-scroll .handle');

  const $lineUpImg = $('.lineup-cont #js-lineup-img');

  calcButtonPosition(true);
  function calcButtonPosition (init = false) {
    const margin = parseInt($('.lineup-cont .slick-list').css('padding-left')) / 2 + 'px';
    const height = ($lineUpImg.height() - 80) / 2 + 'px';
    $nextButton.css('right', margin).css('top', height);
    $beforeButton.css('left', margin).css('top', height);
    if (init) {
      $nextButton.fadeIn();
    }
  }

  // lineupSlick.on('beforeChange', function(_, slick, _, nextSlide){
    lineupSlick.on('beforeChange', function(event, slick, cs, nextSlide){
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

  $('.lineup-cont .lu-ctrl-mouse#js-lineup-prev').on('click', function(){
    lineupSlick.slick('slickPrev');
  })
  $('.lineup-cont .lu-ctrl-mouse#js-lineup-next').on('click', function(){
    lineupSlick.slick('slickNext');
  })

};
