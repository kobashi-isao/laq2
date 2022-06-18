// Js to set class and style for splash section
$(function(){
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 500);
  $('.splash').addClass('fade-in');

  setTimeout(() => {
    $('.splash').removeClass('fade-in');
  }, 2500);

  setTimeout(() => {
    $('.intro').css('top', '-100vh');
    $('#overlay').css('top', '-100vh');
  }, 4000);
});
