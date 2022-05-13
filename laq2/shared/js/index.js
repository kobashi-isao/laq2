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

}
$(function(){ LAQtop.init() })