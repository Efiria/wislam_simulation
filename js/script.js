$( document ).ready(function() {
	console.log( "ready!" );

	var stage = new createjs.Stage("simulation")

	stage.mouseMoveOutside = true; 

	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 5);

	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.addChild(circle);
	stage.addChild(dragger);

	dragger.on("pressmove",function(evt) {
				// currentTarget will be the container that the event listener was added to:
				evt.currentTarget.x = evt.stageX;
				evt.currentTarget.y = evt.stageY;
				// make sure to redraw the stage to show the change:
				stage.update();   
			});

	stage.update();

});