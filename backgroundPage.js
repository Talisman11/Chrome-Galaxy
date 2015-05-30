var tabsID = new Array();
var tabsURL= new Array();
var tabsBase = new Array();
var tabsTitle = new Array();


  chrome.tabs.query({currentWindow:true},function(tabs){
      for(var i =0; i<tabs.length;i++)
      {
          tabsID[i]=tabs[i].id;
          tabsURL[i]=tabs[i].url;
          tabsTitle[i]=tabs[i].title;

          var parser = document.createElement('a');
          parser.href = tabs[i].url;
          tabsBase[i] = parser.hostname;

      }
      
      localStorage.setItem("tabsLength",tabs.length);

  })


  chrome.tabs.query({currentWindow:true},function(tabs){
      for(var i=0; i<tabsID.length;i++)
      {
          console.log(tabsID[i] + " - " + tabsURL[i]);
          console.log(">>> " + tabsBase[i]);
      }
  })

function sortTabs(){
    tabsBase.sort();
};


var artsEntertainment = ["netflix", 
                        "facebook", 
                        "youtube", 
                        "tumblr",
                        "twitter",
                        "myspace", 
                        "enjin",
                        "spotify",
                        "soundcloud",
                        "wikia",
                        "nexon",
                        "pandora", 
                        ".fm", 
                        "nba",
                        "imslp",
                        "pinterest",
                        "instagram",
                        "flickr",
                        "vk",
                        "vine",
                        "omegle",
                        "ign",
                        "gamefaqs",
                        "gamespot",
                        "nvidia",
                        "kotaku",
                        "n4g",
                        "amd",
                        "intel",
                        "escapistmagazine",
                        "pcgamer",
                        "gamefront",
                        "cosmopolitan",
                        "mwomercs", 
                        "reddit", 
                        "4chan", 
                        "xkcd",
                        "imdb"
                    ];
var workAcademics = [".edu", 
                    ".gov",
                    "collegeboard",
                    "apcentral",
                    "stackoverflow", 
                    "w3schools", 
                    "mail.", 
                    "developer.",
                    "piazza",
                    "linkedin",
                    "plus.google",
                    "drive.google",
                    "glassdoor",
                    "wikipedia",
                    "webassign"
                    ];
var shopping = ["ebay", 
                "amazon", 
                "walmart", 
                "bestbuy", 
                "target",
                "meijers", 
                "autozone",
                "kbb",
                "chrome.google"
            ];
var miscellaneous = ["google", 
                    "yahoo", 
                    "bing", 
                    "msn",
                    "cnn", 
                    "bbc", 
                    "huffingtonpost",
                    "nytimes",
                    "dailymail",
                    "nbc",
                    "foxnews",
                    "washingtonpost",
                    "theguardian",
                    "wsj",
                    "abcnews",
                    "usatoday",
                    "latimes",
                    "yelp"
                ];

var database = [artsEntertainment, workAcademics, shopping, miscellaneous];

var artsEntertainment_C = [];
var workAcademics_C = [];
var shopping_C = [];
var miscellaneous_C = [];
var categorized = [artsEntertainment_C, workAcademics_C, shopping_C, miscellaneous_C];

function cTabObject(x,y,z,a){
  this.tabID = x;
  this.tabBase = y;
  this.tabURL = z;
  this.tabTitle = a.substring(0,20) + "...";
}


chrome.tabs.query({currentWindow:true},function(tabs){
    for (var i = 0; i < tabsBase.length; i++){ //pick from tabsBase

      for (var j = 0; j < database.length; j++){ //scan through database
        
        var added = false;
        for (var k = 0; k <database[j].length; k++){ //scan through database[j] for matches
          if (tabsBase[i].indexOf(database[j][k]) != -1){
            categorized[j].push(new cTabObject(tabsID[i],tabsBase[i],tabsURL[i],tabsTitle[i]));
            added=true;
            break;
          }
        }
        if (added)
          break;
      }
      if (added == false)
        categorized[3].push(new cTabObject(tabsID[i],tabsBase[i],tabsURL[i],tabsTitle[i]));
    }
});

chrome.tabs.query({currentWindow:true},function(tabs){
  for (var i = 0; i < categorized.length; i++) {
    for (var j = 0; j < categorized[i].length; j++) {
      console.log(i + " " + categorized[i][j].tabBase);
    }
  }
});


var circles = new Array();

function Circle(x,y,rad,color) {
   this.x = x;
    this.y=y;
    this.rad=rad;
    this.color=color;
    this.left = x - rad;
   this.top = y - rad;
   this.right = x + rad;
   this.bottom = y + rad;
   this.centerX = x - 8;
   this.centerY = y - 8;
}
var circlesAE = [];
var circlesW = [];
var circlesS = [];
var circlesM = [];

chrome.tabs.query({currentWindow:true},function(tabs){

  var level = 50;
  var t = 0;
      for(var i=0;i < categorized[0].length; i++){
          if ( i % 8 == 0 && i != 0){
            level += 50;
          }
          t += Math.PI/4;
         // t += Math.PI/(4*(levelCount+1));
          circlesAE[i] = new Circle(187 + Math.round(Math.cos(t)*level), 125 + Math.round(Math.sin(t)*level),15,'red');
      }

      level = 10;
      t = 0;

      for(var i=0;i < categorized[1].length; i++){
          if ( i % 8 == 0)
            level += 45;
          t += Math.PI/4;
          circlesW[i] = new Circle(562 + Math.round(Math.cos(t)*level), 125 + Math.round(Math.sin(t)*level),15,'red');
      }
      level = 10;
      t = 0;

      for(var i=0;i < categorized[2].length; i++){
          if ( i % 8 == 0)
            level += 45;
          t += Math.PI/4;
          circlesS[i] = new Circle(187 + Math.round(Math.cos(t)*level), 375 + Math.round(Math.sin(t)*level),15,'red');
      }
      level = 10;
      t = 0;

      for(var i=0;i < categorized[3].length; i++){
          if ( i % 8 == 0)
            level += 45;
          t += Math.PI/4;
          circlesM[i] = new Circle(562 + Math.round(Math.cos(t)*level), 375 + Math.round(Math.sin(t)*level),15,'red');
      }
});
chrome.tabs.query({currentWindow:true},function(tabs){
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

      //Draws titles of sections
    context.font="12px Verdana";
    context.fillText("Entertainment/Arts",10,20);
    context.fillText("Work/Education",615,20);
    context.fillText("Shopping",10,495);
    context.fillText("Misc",700,495);

    //Draws blackholes
    var blackHoleArrayX = [187,562];
    var blackHoleArrayY = [125,375]
    context.fillStyle = 'black';
    for(var i=0;i<3;i++){
        for(var j=0;j<2;j++){
            context.beginPath();
            context.arc(blackHoleArrayX[i], blackHoleArrayY[j], 10, 0, 2*Math.PI,false);
            context.stroke();
            context.closePath();
            context.fill();
        }
    }
//aE
    for(var i=0;i<circlesAE.length;i++){
        context.fillStyle = circlesAE[i].color;
        context.beginPath();
        context.arc(circlesAE[i].x, circlesAE[i].y, circlesAE[i].rad, 0, 2*Math.PI,false);
        context.stroke();
        context.closePath();
        
        var grd = context.createRadialGradient(circlesAE[i].x, circlesAE[i].y, 0, circlesAE[i].x, circlesAE[i].y, circlesAE[i].rad);
            grd.addColorStop(0.75, 'transparent');
            grd.addColorStop(1, 'white');
            context.fillStyle = grd;
            context.fill();
            context.fillStyle = 'green';
            if(i==0||i==6||i==7)
              context.fillText(categorized[0][i].tabTitle,circlesAE[i].centerX+10,circlesAE[i].top);
            if(i==1)
              context.fillText(categorized[0][i].tabTitle,circlesAE[i].centerX-20,circlesAE[i].bottom+15);
            if(i==2||i==3||i==4)
                    context.fillText(categorized[0][i].tabTitle,circlesAE[i].centerX-50,circlesAE[i].top);
            if(i==5)
               context.fillText(categorized[0][i].tabTitle,circlesAE[i].centerX-20,circlesAE[i].top);
    }
    for(var i=0;i<circlesAE.length;i++){
     base_image = new Image();
     base_image.src = 'http://www.google.com/s2/favicons?domain_url='+categorized[0][i].tabURL;
     context.drawImage(base_image,circlesAE[i].centerX ,circlesAE[i].centerY);
    }
//work
    for(var i=0;i<circlesW.length;i++){
        context.fillStyle = circlesW[i].color;
        context.beginPath();
        context.arc(circlesW[i].x, circlesW[i].y, circlesW[i].rad, 0, 2*Math.PI,false);
        context.stroke();
        context.closePath();
        
        var grd = context.createRadialGradient(circlesW[i].x, circlesW[i].y, 0, circlesW[i].x, circlesW[i].y, circlesW[i].rad);
            grd.addColorStop(0.75, 'transparent');
            grd.addColorStop(1, 'white');
            context.fillStyle = grd;
            context.fill();
            context.fillStyle = 'green';
            
            if(i==0||i==6||i==7)
              context.fillText(categorized[1][i].tabTitle,circlesW[i].centerX+10,circlesW[i].top);
            if(i==1)
              context.fillText(categorized[1][i].tabTitle,circlesW[i].centerX-20,circlesW[i].bottom+15);
            if(i==2||i==3||i==4)
                    context.fillText(categorized[1][i].tabTitle,circlesW[i].centerX-50,circlesW[i].top);
            if(i==5)
               context.fillText(categorized[1][i].tabTitle,circlesW[i].centerX-20,circlesW[i].top);
    }
    for(var i=0;i<circlesW.length;i++){
     base_image = new Image();
     base_image.src = 'http://www.google.com/s2/favicons?domain_url='+ categorized[1][i].tabURL;
     context.drawImage(base_image,circlesW[i].centerX ,circlesW[i].centerY);
    }
//shopping
   for(var i=0;i<circlesS.length;i++){
        context.fillStyle = circlesS[i].color;
        context.beginPath();
        context.arc(circlesS[i].x, circlesS[i].y, circlesS[i].rad, 0, 2*Math.PI,false);
        context.stroke();
        context.closePath();
        
        var grd = context.createRadialGradient(circlesS[i].x, circlesS[i].y, 0, circlesS[i].x, circlesS[i].y, circlesS[i].rad);
            grd.addColorStop(0.75, 'transparent');
            grd.addColorStop(1, 'white');
            context.fillStyle = grd;
            context.fill();
            context.fillStyle = 'green';
            if(i==0||i==6||i==7)
              context.fillText(categorized[2][i].tabTitle,circlesS[i].centerX+10,circlesS[i].top);
            if(i==1)
              context.fillText(categorized[2][i].tabTitle,circlesS[i].centerX-20,circlesS[i].bottom+15);
            if(i==2||i==3||i==4)
                    context.fillText(categorized[2][i].tabTitle,circlesS[i].centerX-50,circlesS[i].top);
            if(i==5)
               context.fillText(categorized[2][i].tabTitle,circlesS[i].centerX-20,circlesS[i].top);
    }
    for(var i=0;i<circlesS.length;i++){
     base_image = new Image();
     base_image.src = 'http://www.google.com/s2/favicons?domain_url='+ categorized[2][i].tabURL;
     context.drawImage(base_image,circlesS[i].centerX ,circlesS[i].centerY);
    }
//misc
  for(var i=0;i<circlesM.length;i++){
        context.fillStyle = circlesM[i].color;
        context.beginPath();
        context.arc(circlesM[i].x, circlesM[i].y, circlesM[i].rad, 0, 2*Math.PI,false);
        context.stroke();
        context.closePath();
        
        var grd = context.createRadialGradient(circlesM[i].x, circlesM[i].y, 0, circlesM[i].x, circlesM[i].y, circlesM[i].rad);
            grd.addColorStop(0.75, 'transparent');
            grd.addColorStop(1, 'white');
            context.fillStyle = grd;
            context.fill();
            context.fillStyle = 'green';

            if(i==0||i==6||i==7)
              context.fillText(categorized[3][i].tabTitle,circlesM[i].centerX+10,circlesM[i].top);
            if(i==1)
              context.fillText(categorized[3][i].tabTitle,circlesM[i].centerX-20,circlesM[i].bottom+15);
            if(i==2||i==3||i==4)
                    context.fillText(categorized[3][i].tabTitle,circlesM[i].centerX-50,circlesM[i].top);
            if(i==5)
               context.fillText(categorized[3][i].tabTitle,circlesM[i].centerX-20,circlesM[i].top);            
    }
    for(var i=0;i<circlesM.length;i++){
     base_image = new Image();
     base_image.src = 'http://www.google.com/s2/favicons?domain_url='+categorized[3][i].tabURL;
     context.drawImage(base_image,circlesM[i].centerX ,circlesM[i].centerY);
    }
});

//AE
$('#myCanvas').click(function (e) {
   var clickedX = e.pageX - this.offsetLeft;
   var clickedY = e.pageY - this.offsetTop;
   for (var i = 0; i < circlesAE.length; i++) {
       if (clickedX < circlesAE[i].right && clickedX > circlesAE[i].left && clickedY > circlesAE[i].top && clickedY < circlesAE[i].bottom) {
           //alert ('clicked number ' + (i + 1));
            chrome.tabs.update(categorized[0][i].tabID,{active: true});
       }
   }
});
//W
$('#myCanvas').click(function (e) {
   var clickedX = e.pageX - this.offsetLeft;
   var clickedY = e.pageY - this.offsetTop;
   for (var i = 0; i < circlesW.length; i++) {
       if (clickedX < circlesW[i].right && clickedX > circlesW[i].left && clickedY > circlesW[i].top && clickedY < circlesW[i].bottom) {
           //alert ('clicked number ' + (i + 1));
            chrome.tabs.update(categorized[1][i].tabID,{active: true});
       }
   }
});
//S
$('#myCanvas').click(function (e) {
   var clickedX = e.pageX - this.offsetLeft;
   var clickedY = e.pageY - this.offsetTop;
   for (var i = 0; i < circlesS.length; i++) {
       if (clickedX < circlesS[i].right && clickedX > circlesS[i].left && clickedY > circlesS[i].top && clickedY < circlesS[i].bottom) {
           //alert ('clicked number ' + (i + 1));
            chrome.tabs.update(categorized[2][i].tabID,{active: true});
       }
   }
});
//M
$('#myCanvas').click(function (e) {
   var clickedX = e.pageX - this.offsetLeft;
   var clickedY = e.pageY - this.offsetTop;
   for (var i = 0; i < circlesM.length; i++) {
       if (clickedX < circlesM[i].right && clickedX > circlesM[i].left && clickedY > circlesM[i].top && clickedY < circlesM[i].bottom) {
           //alert ('clicked number ' + (i + 1));
            chrome.tabs.update(categorized[3][i].tabID,{active: true});
       }
   }
});

