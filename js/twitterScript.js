
app.controller('twitterSontroller',function($scope){

		
		$scope.data="Lets see how it works!!!";
		$("#tweetMessage").attr("data-text",$scope.data);
		$.getScript("http://platform.twitter.com/widgets.js");

});
