var view = document.getElementById('view');
var loader = document.querySelector('.loader');
var originalHref = 'http://khaleesi.unisem.mx';

view.addEventListener('load', function () {
  var winFrame = this.contentWindow;
  console.log(winFrame.location.href)
  if (winFrame.location.href == 'http://khaleesi.unisem.mx/admin/') {
    winFrame.location.href = 'http://khaleesi.unisem.mx/admin/track/tarea/?all=&status__exact=0';
  } else {
    loader.className = 'loader hide';
  }

  winFrame.onbeforeunload = function(e) {
    loader.className = 'loader';
  };

  winFrame.popup = function (url, title, w, h) {
    var left = parseInt((screen.availWidth/2)-(w/2));
    var top = parseInt((screen.availHeight/2)-(h/2));
    var w_str = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,';
    w_str += 'width='+w+', height='+h+', top='+top+', left='+left;
    w_str += 'screenX='+left+',screenY='+top;

    var win = winFrame.open(url, title, w_str);
    //win.zoomLevel = 0.5;
    
    window.GPLUS_TIMER = setInterval(function() {
        if(win && win.closed) {
          clearTimeout(window.GPLUS_TIMER);
          winFrame.location.href = originalHref;
        }        
    }, 200);
    
    return win;
  };
});
