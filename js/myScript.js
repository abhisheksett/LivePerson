

var app=angular.module('myApp',['ngRoute']);

app.controller('mainController',function($scope){

  console.log("In controller");
  //Declaring scope level variables
  $scope.lpc=null;

  $scope.myOnLoad=function(){
    $scope.lpc=new lpChat();
    console.log($scope.lpc);
  };

  $scope.requestChat=function(){
    $scope.lpc.requestChat();
  };

  $scope.myOnInit=function(){
    console.log("chat Initiated");
  };

  $scope.myOnError=function(errorObj){
    console.log("chat Error:"+errorObj.id);
  }

  $scope.lpChatConfig = {  
    apiKey : 'c79c8ed0b4954984a600a7a5d20f6296',
    lpNumber : '1234',  
    jsApiSrcDomain: 'dev.liveperson.net',
    onLoad : $scope.myOnLoad, 
    onInit : $scope.myOnInit,
    onError : $scope.myOnError
    /*onStart : $scope.myOnStart,  
    onStop : $scope.myOnStop,
    onState : $scope.myOnState,  
    onAgentTyping : $scope.myOnTyping,
    onUrlPush : $scope.myOnPush,  
    onLine : $scope.myOnLine,
    onAvailability: $scope.myOnAvailability,
    onResume : $scope.myOnResume,  
    onAccountToAccountTransfer: $scope.myOnAccountToAccountTransfer*/};

    $scope.lpChatConfig.lpAddScript = function(src, ignore) {  
      console.log("In controller 2");
      var c = $scope.lpChatConfig;  
      if(typeof(c.lpProtocol)=='undefined'){  
        c.lpProtocol = "https";  
      }  
      if (typeof(src) == 'undefined' || typeof(src) == 'object') {  
        src = c.lpChatSrc ? c.lpChatSrc : '/hcp/html/lpChatAPIv2.js';  
      }  
      if (src.indexOf('http') != 0) {  
        src = c.lpProtocol + "://" + c.jsApiSrcDomain + src + '?site=' + c.lpNumber;  
      } else {  
        if (src.indexOf('site=') < 0) {  
            if (src.indexOf('?') < 0) {  
                src = src + '?';  
            } else {  
                src = src + '&';  
                src = src + 'site=' + c.lpNumber;  
            }  
        }  
    }  
    console.log(src);
    var s = document.createElement('script');  
    s.setAttribute('type', 'text/javascript');  
    s.setAttribute('charset', 'iso-8859-1');  
    s.setAttribute('src', src);  
    document.getElementsByTagName('head').item(0).appendChild(s); 
    $scope.myOnLoad(); 
    }  
  if (window.attachEvent) {  
    window.attachEvent('onload', $scope.lpChatConfig.lpAddScript);  
  } else {  
    window.addEventListener('load', $scope.lpChatConfig.lpAddScript, false);  
  }  

});