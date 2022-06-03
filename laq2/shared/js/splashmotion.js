// Js to set class and style for splash section
$(function(){
  $('.splash').addClass('fade-in');

  setTimeout(() => {
    $('.splash').removeClass('fade-in');
  }, 2500);

  setTimeout(() => {
    $('.intro').css('top', '-100vh');
  }, 4000);
});
