let LAQtw = {};
LAQtw.init = function(){
  let self =this;
  self.header = $('header');
  self.main = $('main');
  self.topOffset = self.header.find('.navbar.fixed-top').height()+10;


  // link a name scroll
  $('a[href^="#"]').on('click', function() {
    let speed = 500;
    let href= $(this).attr("href");
    if (href.length == 1 && (href == "#" || href == "")) {return true;}
    let target = $(href == "#" || href == "" ? 'html' : href);
    if (target.length == 0) return false;
    let position = target.offset().top - self.topOffset;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    if (href == '#top-page') return false;
    return true;
  });

  // nav menu toggle
  self.initNavMenuToggle();

  // self.goTopBtnOnBottom = false;
  // $(window).scroll(function(){
  //   let windHeight = $(window).height();
  //   let goTopBtn = $('#gotop');
  //   let scrollTop = $(document).scrollTop();
  //   if (scrollTop <= 500) {
  //     goTopBtn.fadeOut(400);
  //   } else if (goTopBtn.css("display") == 'none' && !self.goTopBtnOnBottom) {
  //     goTopBtn.fadeIn(500);
  //   }
  //   if (self.isSmp) {
  //     let bottomLimit = $('footer').position().top;
  //     if ((scrollTop+windHeight) > bottomLimit && !self.goTopBtnOnBottom) {
  //       goTopBtn.fadeOut(400);
  //       self.goTopBtnOnBottom = true;
  //     } else if ((scrollTop+windHeight) < bottomLimit && self.goTopBtnOnBottom) {
  //       goTopBtn.fadeIn(400);
  //       self.goTopBtnOnBottom = false;
  //     }
  //   }
  // })


}
LAQtw.initNavMenuToggle = function() {
  let self = this;
  let headerBtn = self.header.find('.header-btn');
  let navMenuTgg = self.header.find('.nav-menu-tgg');
  let opened = 'opened';
  headerBtn.find('.btn').on('click', function(){
    let thisBtn = $(this);
    let menuTarget = thisBtn.data('target');
    navMenuTgg.fadeOut();
    let thisMenu = null;
    navMenuTgg.each(function(){
      let _navMenu = $(this);
      if (_navMenu.data('type') === menuTarget) {
        thisMenu = _navMenu
      }
    })
    if (thisMenu === null) return;

    if (thisBtn.hasClass(opened)) {
      thisBtn.removeClass(opened);
      thisMenu.fadeOut();
    } else {
      thisBtn.addClass(opened);
      thisMenu.fadeIn();
    }
    thisBtn.blur();
    return false;
  })

  $(document).on('click',function(e) {
    if(navMenuTgg.is(':visible') &&
      !$(e.target).closest('.nav-menu-tgg').length &&
      !$(e.target).closest('.header-btn').length) {
      headerBtn.find('.btn').removeClass(opened);
      navMenuTgg.fadeOut();
    }
  });
}

LAQtw.isSmp = function() {
  let ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
    return true;
  }
  return false;
}
$(function(){ LAQtw.init(); })