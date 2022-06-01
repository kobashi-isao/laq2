/* 
トップSlickズームアウト＆インジケータ

有効にするには、html側のscriptタグのtype属性を"module"にする必要性がある。
例）<script src="/shared/js/index.js?2022051402" type="module"></script>
必要なjsファイルにインポートする時は、
＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
import { SetTopSlickSlider } from './setTopSlickSlider.js';
＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
初期化：
＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  const topSliderClassNameParams = '.t-slider'; // トップビジュアルのスライドを格納しているコンテンナを参照する時に必要
  const topSlidePrefixStringParams = '.s'; // .s01,.s02,.s03などを参照する時に必要
  const topSlideNumbersTextColorArrayParams = ['#1C1C1C','#1C1C1C','#1C1C1C','#fff']; //スライドが切替る時にインジケータの文字色を変更する時に参照
  const topSlideCopyTextColorArrayParams = ['#1C1C1C','#fff','#fff','#fff']; //各スライドのコピーや商品名の文字色を変更する時に参照
  new SetTopSlickSlider( topSliderClassNameParams, topSlidePrefixStringParams, topSlideNumbersTextColorArrayParams, topSlideCopyTextColorArrayParams); //トップビジュアルスライドの初期化
＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
※setIntervalだとスマホが省エネモード時に処理が遅くなるため、requestAnimationFrameに変更
*/
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
let animStartTime;

let topCssStyle;
let topSliderTime;//アニメーションの長さ（秒）//css変数(--top-slider-anim-time)から参照
let topSlide, topSliderBar, topSliderTick, topSliderPercentTime;

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
    slideItems.each(function(i){ $(this).css('color', topSlideCopyTextColorArray[i])});

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
        const topSlideItemsClassStrings = selectedSliderClassName + ' .sl-cont .t-copy .tl';
        const topSlidePrevItemsClassStrings = prevSliderClassName + ' .sl-cont .t-copy .tl';
        const topSlideItems = $(topSlideItemsClassStrings);
        const topPrevSlideItems = $(topSlidePrevItemsClassStrings);
        topSlideCurrentNumber = selectedItem;
        topSlideDotsContainerText.css('color', topSlideNumbersTextColorArray[topSlideCurrentNumber]);
        (currentSlide >= slick.slideCount) ? topSlideCurrentNumber = 1 : topSlideCurrentNumber = parseInt(selectedItem + 1);

        if(currentSlide === (slick.slideCount - 1)){
            const topSlideLastItemsClassName = slidePrefixString + ('0' + parseInt(slick.slideCount)).slice(-2);
            const topSlideLastItemsClassStrings = topSlideLastItemsClassName + ' .sl-cont .t-copy .tl';
            const topLastSlideItems = $(topSlideLastItemsClassStrings);
            topLastSlideItems.each(function(){ $(this).removeClass('visibled')});
        }
        topSlideDotsContainerCurrentCountText.text(('0' + topSlideCurrentNumber).slice(-2));
        topPrevSlideItems.each(function(){$(this).removeClass('visibled')});
        topSlideItems.each(function(){$(this).addClass('visibled')});

        if(currentSlide === (slick.slideCount - 1)){
            const topSlideLastItemsClassName = slidePrefixString + ('0' + parseInt(slick.slideCount)).slice(-2);
            const topSlideItemBGImageLast= $(topSlideLastItemsClassName + ' .sl-bg');
            const topSlideItemBGImageLastSP= $(topSlideLastItemsClassName + ' .sl-bg-sp');
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
        resetIndicatorProgressbar();
        startIndicatorProgressbar();
        topSliderBar.css({
            height: 100 + "%"
        });

    });

    topSlide.on('afterChange', function(e, slick, currentSlide, nextSlide){
        // topSlide.slick('slickPause');
        let selectedItem = nextSlide;
        const selectedSliderClassName = slidePrefixString + ('0' + parseInt(selectedItem + 1)).slice(-2);
        const prevSliderClassName = slidePrefixString + ('0' + parseInt(selectedItem)).slice(-2);
        const topSlideItemBGImage = $(prevSliderClassName + ' .sl-bg');
        const topSlideItemBGImageNext = $(selectedSliderClassName + ' .sl-bg');
        const topSlideItemBGImageSP = $(prevSliderClassName + ' .sl-bg-sp');
        const topSlideItemBGImageNextSP = $(selectedSliderClassName + ' .sl-bg-sp');

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
    
    });

    
    topSlide.slick({
        dots: false,
        infinite: true,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        // speed: 500,
        // autoplaySpeed: 5000,
        // dotsClass: 'slide-dots',
        // appendDots: $('.slide-dots-container-dots'),
        accessibility: false,
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
    startIndicatorProgressbar();    
    //topSlide.slick('slickPlay');
    // $('.slick-dots li button').on('click', function(e){
    //   e.stopPropagation();
    // });
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


function startIndicatorProgressbar() {
    resetIndicatorProgressbar();
    topSliderPercentTime = 0;
    // topSliderTick = setInterval(intervalIndicator, 10);
    // topSliderTick = requestAnimationFrame(intervalIndicator);
    animStartTime = Date.now();
    intervalIndicator();

}

function intervalIndicator() {
    //topSliderPercentTime += (1 / (Number(topSliderTime) + 0.1)) + 1;
    topSliderPercentTime = Math.min(1, (Date.now() - animStartTime) / (Number(topSliderTime) * 1000));
    topSliderBar.css({
        height: (topSliderPercentTime*100) + "%"
    });
    if (topSliderPercentTime >= 1) {
        topSlide.slick('slickNext');
        startIndicatorProgressbar();
    }else{
        topSliderTick = requestAnimationFrame(intervalIndicator);
    }
}

function resetIndicatorProgressbar() {
    topSliderBar.css({
        height: 0 + '%'
    });
    //clearTimeout(topSliderTick);
    cancelAnimationFrame(topSliderTick);
}