$(document).ready(function() {
  $("#resize").css({
    'width': ($("#search").width() + 'px')
  });
});
var eventFired = 0;

 $(document).ready(function() {
if ($(window).width() < 1440) {
  var val = 1440-$(window).width();
  $("#code").css({"left":(-val)/4})
}
else {
    eventFired = 1;
}
});

$(window).on('resize', function() {
  $("#resize").css({
    'width': ($("#search").width() + 'px')
});
    if (!eventFired) {
        if ($(window).width() < 1440) {
          var val = 1440-$(window).width();
          $("#code").css({"left":(-val)/4})
          
        }
    }
});

function placeItem(){
  console.log($("label[class=itm]").length);
  document.getElementById("e"+document.getElementById("sloti").value).src = document.getElementById("stream").src;
  document.getElementById("e"+document.getElementById("sloti").value).style.setProperty('position','absolute');
  if(document.getElementById("amnti").value> 1){
    if ($("#e"+document.getElementById("sloti").value+"a").length > 0) {
      document.getElementById("e"+document.getElementById("sloti").value+"a").remove();
    }
    var labl = document.createElement("label");
    labl.id = "e"+document.getElementById("sloti").value+"a";
    labl.className = "itm";
    labl.innerHTML = document.getElementById("amnti").value;
    document.getElementById("d"+document.getElementById("sloti").value).appendChild(labl);
    var elem = document.getElementById("e"+document.getElementById("sloti").value+"a");
   // elem.style.setProperty('position','absolute');

  }
}

function removeItem(){
  $("#e"+document.getElementById("sloti").value).removeAttr("src");
    console.log(document.getElementById("e"+document.getElementById("sloti").value+"a").innerHTML);
    document.getElementById("e"+document.getElementById("sloti").value+"a").remove();
}

function clearAll(){
  let i = 1;
  let u = 1;
while(i <= document.getElementById("name").value){
    $("#e"+i).removeAttr("src");
    i++;
  }
  if ($("label[class=itm]").length > 0) {
    while(u <=  document.getElementById("name").value){
      $("#e"+u+"a").remove();
      u++;
    }
    
  }

}