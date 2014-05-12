
app.controller('facebookPageController',function($scope){
	$scope.isLoggedin=false;

	 $.ajaxSetup({ cache: true });
	  $.getScript('http://connect.facebook.net/en_UK/all.js', function(){
	    FB.init({
	      appId: '784731164879253',
	    });     
	    
	   // FB.getLoginStatus(updateStatusCallback);
	  });

	  $scope.checkLoginStatus=function(){
	  	FB.getLoginStatus(function(response) {
		     		console.log(JSON.stringify(response));
		  if (response.status === 'connected') {
		    console.log("connected");
		    $scope.uid = response.authResponse.userID;
		    $scope.accessToken = response.authResponse.accessToken;
		    $scope.isLoggedin=true;
		  } else if (response.status === 'not_authorized') {
		  	alert("You are not Logged In, Control will be transferred to Facebook Login");
		  	$scope.login();
		  } else {
		    alert("You are not Logged In, Control will be transferred to Facebook Login");
		  	//$("#login").trigger('click');
		  	$scope.login();
		  }
		 });
	  };

	  $scope.login=function(){
	  	FB.login(function(response) {
		   if (response.authResponse) {
		     console.log('Welcome!  Fetching your information.... ');
		     FB.api('/me', function(response) {
		       console.log('Good to see you, ' + response.name + '.');
		       $scope.isLoggedin=true;
		     });
		   } else {
		     console.log('User cancelled login or did not fully authorize.');
		   }
	 });
	  };

	  $scope.share=function(){
	  	//$("#loginStatus").trigger("click");
	  	$scope.checkLoginStatus();
     	if(!$scope.isLoggedin){
     		$scope.login();
     	}
     	else{
	  FB.ui({
	    method: 'feed',
	    name: $("#name").val(),
	    link: $("#link").val(),
	    picture: "http://localhost:8080/Photo/images/pool.jpg",
	    caption: $("#caption").val(),
	    description: $("#desc").val()
	  	},
	  function(response) {
	    if (response && response.post_id) {
	      alert('Post was published.');
	    } else {
	      alert('Post was not published.');
	    }
	  });
	}
	  };

	  $scope.logout=function(){
	  	FB.logout(function(response){
     		console.log(JSON.stringify(response));
     		if(response.authResponse.accessToken)
     			alert("Logged Out Successfully");
     		else
     			alert("Error in Log Out...Please Try later!");
     	});
	  };


	});

	 
    
/* 

	  FB.ui({
	    method: 'feed',
	    name: 'Facebook Dialogs',
	    link: 'https://developers.facebook.com/docs/dialogs/',
	    picture: 'http://fbrell.com/f8.jpg',
	    caption: 'Reference Documentation',
	    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
	  	},

 */
    

