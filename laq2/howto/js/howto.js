$(function(){

  /* アコーディオンの開閉 */
  $(".acc_header").on("click",function(){
     $(this).closest('li').toggleClass("open");
     $(this).closest('li').find('.acc_body').slideToggle(250);
  });

});
