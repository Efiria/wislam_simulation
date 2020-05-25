$( document ).ready(function() {
	console.log( "ready!" );

	var stage = new createjs.Stage("simulation")

	stage.mouseMoveOutside = true; 

	var wifi1 = new createjs.Shape();
	wifi1.graphics.beginFill("red").drawCircle(0, 0, 10);

	var range1 = new createjs.Shape();
	range1.graphics.beginFill("blue").drawCircle(0, 0, 400);
	range1.alpha = 0.05
	range1.mouseEnabled = false

	var label1 = new createjs.Text("Wifi1", "14px Arial", "#00000");
	label1.textAlign = "center";
	label1.y = -30;

	var dragger1 = new createjs.Container();
	dragger1.x = 200
	dragger1.y = 180;
	dragger1.addChild(wifi1,range1,label1);
	stage.addChild(dragger1);

	$("#posWifi1").html("x : " + dragger1.x + "</br> y : " + dragger1.y);

	dragger1.on("pressmove",function(evt) {
		// currentTarget will be the container that the event listener was added to:
		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		// make sure to redraw the stage to show the change:
		stage.update();   
		$("#posWifi1").html("x : " + evt.stageX + " </br> y : " + evt.stageY);
	});



	var wifi2 = new createjs.Shape();
	wifi2.graphics.beginFill("red").drawCircle(0, 0, 10);

	var range2 = new createjs.Shape();
	range2.graphics.beginFill("blue").drawCircle(0, 0, 400);
	range2.alpha = 0.05
	range2.mouseEnabled = false

	var label2 = new createjs.Text("Wifi2", "14px Arial", "#00000");
	label2.textAlign = "center";
	label2.y = -30;

	var dragger2 = new createjs.Container();
	dragger2.x = 680
	dragger2.y = 290
	dragger2.addChild(wifi2,range2,label2);
	stage.addChild(dragger2);

	$("#posWifi2").html("x : " + dragger2.x + "</br> y : " + dragger2.y);
	
	dragger2.on("pressmove",function(evt) {
		// currentTarget will be the container that the event listener was added to:
		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		// make sure to redraw the stage to show the change:
		stage.update();   
	});

	var wifi3 = new createjs.Shape();
	wifi3.graphics.beginFill("red").drawCircle(0, 0, 10);

	var range3 = new createjs.Shape();
	range3.graphics.beginFill("blue").drawCircle(0, 0, 450);
	range3.alpha = 0.05
	range3.mouseEnabled = false

	var label3 = new createjs.Text("Wifi3", "14px Arial", "#00000");
	label3.textAlign = "center";
	label3.y = -30;

	var dragger3 = new createjs.Container(); 
	dragger3.x = 485
	dragger3.y = 405
	dragger3.addChild(wifi3,range3,label3);
	stage.addChild(dragger3);

	$("#posWifi3").html("x : " + dragger3.x + "</br> y : " + dragger3.y);

	dragger3.on("pressmove",function(evt) {
		// currentTarget will be the container that the event listener was added to:
		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		// make sure to redraw the stage to show the change:
		stage.update();   
	});


	var user = new createjs.Shape();
	user.graphics.beginFill("yellow").drawCircle(0, 0, 10);

	var draggerUser = new createjs.Container(); 
	draggerUser.x = 445
	draggerUser.y = 555
	draggerUser.addChild(user);
	stage.addChild(draggerUser);

	draggerUser.on("pressmove",function(evt) {
		// currentTarget will be the container that the event listener was added to:
		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		// make sure to redraw the stage to show the change:
		stage.update();   
	});
	

	stage.update();



	console.log()



});