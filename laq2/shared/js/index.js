let LAQtop = {};
LAQtop.init = function() {
  let self = this;

  let topSlide = $('.t-slider');
  if (topSlide.length > 0){
    topSlide.bxSlider({
      auto: true,
      speed:1200,
      pause:4000,
      mode: 'fade',
      infiniteLoop:true,
      pager:false,
      controls:false,
      autoControls: false
    });
  }

  // line up slick 
  let lineupSlick = LAQtw.main.find('.sl-lineup').slick({
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
          centerPadding:'40px'
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
$(function(){ LAQtop.init() })