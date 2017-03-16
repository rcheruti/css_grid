$(function(){
  
  //===========   Menu   =================
  var menuPanel = $('.menuPanel');
  $('.menuBtn').on('click touchstart', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    
    if(menuPanel.is('.active')){
      menuPanel.removeClass('active');
    }else{
      menuPanel.addClass('active');
    }
  });
  menuPanel.on('click touchstart', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
  });
  $(document).on('click touchstart', function(ev){
    ev.preventDefault();
    menuPanel.removeClass('active');
  });
  
  
  $('[s-to]').on('click touchstart', function(ev){
    ev.preventDefault();
    
    var sel = $(this).attr('s-to');
    var el = $(sel);
    if(el.length){
      document.body.scrollTop = el[0].offsetTop - 20 ;
    }
  });
  
  
  
  
  //===========   Examples   =================
  
  
  
  
  
});