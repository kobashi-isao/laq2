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

  // sec feature scroll
}
$(function(){ LAQtop.init() })