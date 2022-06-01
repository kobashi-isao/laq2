// export function SetTopSlickSlider(){
//     console.log('hello!');
// }
export let topCssStyle;
export let topSliderTime;//アニメーションの長さ（秒）//css変数(--top-slider-anim-time)から参照
export let topSlide, topSliderBar, topSliderTick, topSliderPercentTime;

export function SetTopSlickSlider(_sliderclassname, _slideprefix, _topslidenumberstextcolorarray, _topslidecopytextcolorarray){
  let sliderClassName = _sliderclassname;
  let slidePrefixString = _slideprefix;
  topSlide = $(sliderClassName);
  let topSlideNumbersTextColorArray = _topslidenumberstextcolorarray;
  let topSlideCopyTextColorArray = _topslidecopytextcolorarray;
  let topSlideDotsContainerText = $('.slide-dots-container span');
  let topSlideDotsContainerCurrentCountText = $('.slide-dots-container-current-number span');
  let topSlideDotsContainerTotalCountText = $('.slide-dots-container-total-number span');
  let topSlideCurrentNumber;
  topCssStyle = getComputedStyle(document.body);
  topSliderTime = topCssStyle.getPropertyValue('--top-slider-anim-time').slice(0, -1); //アニメーションの長さ（秒）//css変数(--top-slider-anim-time)から参照

  topSliderBar = $('.slide-dots-container-slider-progress-bar');

  if (topSlide.length > 0){
    //set font color for copies from array
    let slideInnerClasses = sliderClassName + ' .slide-inner .sl-cont';
    let slideItems = $(slideInnerClasses);
    slideItems.each(function(i){ $(this).css('color', topSlideCopyTextColorArray[i])})

    topSlide.on('init', function(e, slick, direction){
        const selectedSliderClassName = slidePrefixString + "01";
        const prevSliderClassName = slidePrefixString + ('0' + parseInt(slick.slideCount)).slice(-2);
        const topSlidePrevItemsClassStrings = prevSliderClassName + ' .sl-cont .t-copy .tl';
        const topSlideItemsClassStrings = selectedSliderClassName + ' .sl-cont .t-copy .tl';
        const topSlideItems = $(topSlideItemsClassStrings);
        const topPrevSlideItems = $(topSlidePrevItemsClassStrings);
        topSlideCurrentNumber = 1;
        topSlideDotsContainerText.css('color', topSlideNumbersTextColorArray[topSlideCurrentNumber]);
        topSlideDotsContainerTotalCountText.text(('0' + slick.slideCount).slice(-2));
        topSlideDotsContainerCurrentCountText.text(('0' + topSlideCurrentNumber).slice(-2));
        topPrevSlideItems.each(function(){ $(this).removeClass('visibled')});
        topSlideItems.each(function(){ $(this).addClass('visibled')});
        const topSlideItemBGImageCurrent = $(selectedSliderClassName + ' .sl-bg');
        const topSlideItemBGImageCurrentSP = $(selectedSliderClassName + ' .sl-bg-sp');
        //console.log(topSlideItemsClassStrings);
        topSlideItemBGImageCurrent.css({
            '-webkit-transform' : 'scale(1.05) !important',
            '-moz-transform'    : 'scale(1.05) !important',
            '-ms-transform'     : 'scale(1.05) !important',
            '-o-transform'      : 'scale(1.05) !important',
            'transform'         : 'scale(1.05) !important'
        });
        topSlideItemBGImageCurrentSP.css({
            '-webkit-transform' : 'scale(1.05) !important',
            '-moz-transform'    : 'scale(1.05) !important',
            '-ms-transform'     : 'scale(1.05) !important',
            '-o-transform'      : 'scale(1.05) !important',
            'transform'         : 'scale(1.05) !important'
        });

    });

    topSlide.on('beforeChange', function(e, slick, currentSlide, nextSlide){
        // topSlide.slick('slickPause');
        let selectedItem = nextSlide;
        const selectedSliderClassName = slidePrefixString + ('0' + parseInt(selectedItem + 1)).slice(-2);
        const prevSliderClassName = slidePrefixString + ('0' + parseInt(selectedItem)).slice(-2);
        const topSlideItemBGImage = $(prevSliderClassName + ' .sl-bg');
        const topSlideItemBGImageNext = $(selectedSliderClassName + ' .sl-bg');
        const topSlideItemBGImageSP = $(prevSliderClassName + ' .sl-bg-sp');
        const topSlideItemBGImageNextSP = $(selectedSliderClassName + ' .sl-bg-sp');
        //console.log("bc");
        resetProgressbar();
        startProgressbar();
        topSliderBar.css({
            height: 100 + "%"
        });

        // console.log("selectedSliderClassName = " + selectedSliderClassName);
        // const topSlideItemBGImageCurrent = $(selectedSliderClassName + ' .sl-bg');
        // const topSlideItemBGImageCurrentSP = $(selectedSliderClassName + ' .sl-bg-sp');

        // console.log(topSlideItemBGImageCurrent);

        // topSlideItemBGImageCurrent.css({
        //     '-webkit-transform' : 'scale(1.05)',
        //     '-moz-transform'    : 'scale(1.05)',
        //     '-ms-transform'     : 'scale(1.05)',
        //     '-o-transform'      : 'scale(1.05)',
        //     'transform'         : 'scale(1.05)'
        // });
        // topSlideItemBGImageCurrentSP.css({
        //     '-webkit-transform' : 'scale(1.05)',
        //     '-moz-transform'    : 'scale(1.05)',
        //     '-ms-transform'     : 'scale(1.05)',
        //     '-o-transform'      : 'scale(1.05)',
        //     'transform'         : 'scale(1.05)'
        // });

      // console.log(topSlideItemBGImage.attr('class'));
      topSlideItemBGImage.css({
        '-webkit-transform' : 'scale(1.05)',
        '-moz-transform'    : 'scale(1.05)',
        '-ms-transform'     : 'scale(1.05)',
        '-o-transform'      : 'scale(1.05)',
        'transform'         : 'scale(1.05)'
      });
      topSlideItemBGImageNext.css({
        '-webkit-transform' : 'scale(1.05)',
        '-moz-transform'    : 'scale(1.05)',
        '-ms-transform'     : 'scale(1.05)',
        '-o-transform'      : 'scale(1.05)',
        'transform'         : 'scale(1.05)'
      });
      topSlideItemBGImageSP.css({
        '-webkit-transform' : 'scale(1.05)',
        '-moz-transform'    : 'scale(1.05)',
        '-ms-transform'     : 'scale(1.05)',
        '-o-transform'      : 'scale(1.05)',
        'transform'         : 'scale(1.05)'
      });
      topSlideItemBGImageNextSP.css({
        '-webkit-transform' : 'scale(1.05)',
        '-moz-transform'    : 'scale(1.05)',
        '-ms-transform'     : 'scale(1.05)',
        '-o-transform'      : 'scale(1.05)',
        'transform'         : 'scale(1.05)'
      });
      const topSlideItemsClassStrings = selectedSliderClassName + ' .sl-cont .t-copy .tl';
      const topSlidePrevItemsClassStrings = prevSliderClassName + ' .sl-cont .t-copy .tl';
      const topSlideItems = $(topSlideItemsClassStrings);
      const topPrevSlideItems = $(topSlidePrevItemsClassStrings);
      topSlideCurrentNumber = selectedItem;
      topSlideDotsContainerText.css('color', topSlideNumbersTextColorArray[topSlideCurrentNumber]);
      (currentSlide >= slick.slideCount) ? topSlideCurrentNumber = 1 : topSlideCurrentNumber = parseInt(selectedItem + 1);

      if(currentSlide === (slick.slideCount - 1)){
        //console.log("bc last");
        const topSlideLastItemsClassName = slidePrefixString + ('0' + parseInt(slick.slideCount)).slice(-2);
        const topSlideLastItemsClassStrings = topSlideLastItemsClassName + ' .sl-cont .t-copy .tl';
        const topLastSlideItems = $(topSlideLastItemsClassStrings);
        topLastSlideItems.each(function(){ $(this).removeClass('visibled')});
        const topSlideItemBGImageLast= $(topSlideLastItemsClassName + ' .sl-bg');
        const topSlideItemBGImageLastSP= $(topSlideLastItemsClassName + ' .sl-bg-sp');
        //console.log("topSlideLastItemsClassName = " + topSlideLastItemsClassName);
        topSlideItemBGImageLast.css({
          '-webkit-transform' : 'scale(1.05)',
          '-moz-transform'    : 'scale(1.05)',
          '-ms-transform'     : 'scale(1.05)',
          '-o-transform'      : 'scale(1.05)',
          'transform'         : 'scale(1.05)'
        });
        topSlideItemBGImageLastSP.css({
          '-webkit-transform' : 'scale(1.05)',
          '-moz-transform'    : 'scale(1.05)',
          '-ms-transform'     : 'scale(1.05)',
          '-o-transform'      : 'scale(1.05)',
          'transform'         : 'scale(1.05)'
        });
      }
      topSlideDotsContainerCurrentCountText.text(('0' + topSlideCurrentNumber).slice(-2));
      topPrevSlideItems.each(function(){$(this).removeClass('visibled')});
      topSlideItems.each(function(){$(this).addClass('visibled')});
    });

    
    topSlide.slick({
      dots: true,
      infinite: true,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      // speed: 500,
      // autoplaySpeed: 5000,
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
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 767,
          settings: {
            centerMode: false,
          }
        },
      ],

    });

    topSlide.slick('slickPause');
    startProgressbar();
    
    //topSlide.slick('slickPlay');


    $('.slick-dots li button').on('click', function(e){
      e.stopPropagation();
    });
    
    //$(window).on('resize orientationchange', function() {
        // topSlide.slick('resize');
        // resetProgressbar();
        // startProgressbar();
        // topSliderBar.css({
        //     height: 100 + "%"
        // });
        //location.reload();
    //});

    }
}


function startProgressbar() {
    resetProgressbar();
    topSliderPercentTime = 0;
    topSliderTick = setInterval(interval, 10);
    // console.log(topSliderTime);
}

function interval() {
    topSliderPercentTime += 1 / (Number(topSliderTime - .5) + 0.1);
    topSliderBar.css({
        height: topSliderPercentTime + "%"
    });
    if (topSliderPercentTime >= 100) {
        topSlide.slick('slickNext');
        startProgressbar();
    }
}

function resetProgressbar() {
    topSliderBar.css({
        height: 0 + '%'
    });
    clearTimeout(topSliderTick);
}