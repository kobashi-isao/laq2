$(function(){ 

  if (!LAQtw.isSmp) {
    return;
  }
  const bottleSize = parseInt($('.js-bottole').css('width'));
  const minBottleSize = 121;
  const bottleSizePer = (bottleSize  - minBottleSize ) / 100

  function calcBottleSize() {
    const bottle = $('.js-bottole');
    const bottleSmallEndTop = $('.js-bottle-small-end') ? $('.js-bottle-small-end').offset().top : 1000000
    const bottleSmallStartTop = $('.js-bottle-small-start') ? $('.js-bottle-small-start').offset().top : 0;
    const bottlePosititon = bottle.offset().top;
    const positionPer =  1 - ((bottlePosititon - bottleSmallStartTop) / (bottleSmallEndTop - bottleSmallStartTop))
    const width = positionPer > 0
      ? minBottleSize + (bottleSizePer * positionPer * 100)
      : minBottleSize;
    bottle.css('width', width + 'px');
    
  }
  $(window).scroll(calcBottleSize);
  calcBottleSize();
});
