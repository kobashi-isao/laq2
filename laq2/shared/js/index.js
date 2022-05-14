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
    },120);//カーソルより遅れる時間を指定
  })

}

// $(function(){
  
//   //カーソル要素の指定
//   var cursor=$("#cursor");
//   //ちょっと遅れてついてくるストーカー要素の指定  
//   var stalker=$("#stalker");
  
//   //mousemoveイベントでカーソル要素を移動させる
//   $(document).on("mousemove",function(e){
//     //カーソルの座標位置を取得
//     var x=e.clientX;
//     var y=e.clientY;
//     //カーソル要素のcssを書き換える用
//     cursor.css({
//       "opacity":"1",
//       "top":y+"px",
//       "left":x+"px"
//     });
//     //ストーカー要素のcssを書き換える用    
//     setTimeout(function(){
//       stalker.css({
//         "opacity":"1",
//         "top":y+"px",
//         "left":x+"px"
//       });
//     },140);//カーソルより遅れる時間を指定
    
//   });
// });

$(function(){ LAQtop.init() })