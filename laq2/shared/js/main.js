let LAQtw = {};
LAQtw.init = function(){
  let self =this;
  self.isSmp = self.isSmp();
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

  // scroll bg
  self.initScrollBgColor();


}
LAQtw.initNavMenuToggle = function() {
  let self = this;
  let headerBtn = self.header.find('.header-btn');
  let navMenuTgg = self.header.find('.nav-menu-tgg');
  let opened = 'opened';
  headerBtn.find('.btn').on('click', function(){
    let thisBtn = $(this);
    thisBtn.blur();
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
      headerBtn.find('.btn').removeClass(opened);
      thisBtn.addClass(opened);
      thisMenu.fadeIn();
    }
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

LAQtw.initScrollBgColor = function() {
  let self = this;
  let scrTarget = $('.scroll-bg');
  let onBg ='on-bg';
  if (scrTarget.length == 0) return;

  $(window).scroll(function(){
    let scrollTop = $(document).scrollTop();
    scrTarget.each(function(){
      let _target = $(this);
      let targetLimit = _target.position().top
        - self.topOffset - 50;
      if (!_target.hasClass(onBg) && scrollTop > targetLimit) {
        _target.addClass(onBg);
      } else if (_target.hasClass(onBg) && scrollTop < targetLimit) {
        _target.removeClass(onBg);
      }
    })
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