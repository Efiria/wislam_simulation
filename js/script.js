$( document ).ready(function() {
	console.log( "ready!" );

	$('.loader').hide();
	$('.container').show();

	var rangewifi = 400;
	$("#rangeWifi").html("portée : " + rangewifi);
	$("#wifiRange1").val(rangewifi);


	var stage = new createjs.Stage("simulation")

	stage.mouseMoveOutside = true; 

	createWifiBorne('Wifi 1', 200, 180)
	createWifiBorne('Wifi 2', 470, 180)
	createWifiBorne('Wifi 3', 735, 180)

	createWifiBorne('Wifi 4', 330, 395)
	createWifiBorne('Wifi 5', 500, 515)
	createWifiBorne('Wifi 6', 725, 410)

	var wifiAvailable = getWifiBorne()

	var user = new createjs.Shape();
	user.graphics.beginFill("yellow").drawCircle(0, 0, 10);

	var labeluser = new createjs.Text("user", "14px Arial", "#00000");
	labeluser.textAlign = "center";
	labeluser.y = -30;

	var draggerUser = new createjs.Container(); 
	draggerUser.x = 445
	draggerUser.y = 555
	draggerUser.name = 'user'
	draggerUser.addChild(user,labeluser);
	stage.addChild(draggerUser);

	getWifiInRange(wifiAvailable, draggerUser.x, draggerUser.y)

	draggerUser.on("pressmove",function(evt) {

		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();   

		var wifiConnected = getWifiInRange(wifiAvailable, evt.stageX, evt.stageY);

		/*var distanceborne1 = getDistance(evt.stageX,evt.stageY,dragger1.x,dragger1.y)
		var distanceborne2 = getDistance(evt.stageX,evt.stageY,dragger2.x,dragger2.y)
		var distanceborne3 = getDistance(evt.stageX,evt.stageY,dragger3.x,dragger3.y)

		if (distanceborne1 >= rangewifi) { $("#distWifi1").css("background-color", "red")} else { $("#distWifi1").css("background-color", "green")}
		if (distanceborne2 >= rangewifi) { $("#distWifi2").css("background-color", "red")} else { $("#distWifi2").css("background-color", "green")}
		if (distanceborne3 >= rangewifi+50) { $("#distWifi3").css("background-color", "red")} else { $("#distWifi3").css("background-color", "green")}
		
		var position1 = {
			x : dragger1.x,
			y : dragger1.y,
			distance : distanceborne1
		}

		var position2 = {
			x : dragger2.x,
			y : dragger2.y,
			distance : distanceborne2
		}

		var position3 = {
			x : dragger3.x,
			y : dragger3.y,
			distance : distanceborne3
		}

		getTrilateration(position1,position2,position3);
*/
	});
	
	stage.update();

	//----------------------

	function createWifiBorne(nameWifi, x, y) {
		
		var wifidisplay = new createjs.Shape();
		wifidisplay.graphics.beginFill("red").drawCircle(0, 0, 10);
		wifidisplay.name = 'borneWifi'

		var wifirange = new createjs.Shape();
		wifirange.graphics.beginFill("blue").drawCircle(0, 0, rangewifi);
		wifirange.alpha = 0.03
		wifirange.name = 'rangeWifi'

		var wificontainer = new createjs.Container(); 
		wificontainer.name = nameWifi
		wificontainer.x = x
		wificontainer.y = y

		wificontainer.addChild(wifidisplay,wifirange);
		stage.addChild(wificontainer);

		stage.update();
	}

	function getWifiBorne() {

		var bornesWifi = []

		stage.children.forEach(function(item){

			if (item.name.toString().includes('Wifi')) {
				bornesWifi.push(item)
			}
		});

		return bornesWifi
	}

	function getWifiInRange(wifiAvailable, userx, usery) {
		
		var wifiInRange = []

		wifiAvailable.forEach(function(item){

			var distance = getDistance(item.x, item.y, userx, usery)

			if (distance <= rangewifi) {

			console.log(distance)

				item.children[0].graphics.clear().beginFill("green").drawCircle(0, 0, 10)
				wifiInRange.push(item)

				stage.update();

			} else {

				item.children[0].graphics.clear().beginFill("red").drawCircle(0, 0, 10)

				stage.update();

			}

		});

		console.log(wifiInRange)
		return wifiInRange
	}


	//Si utilisateur est +400 distance d'une borne alors elle n'est pas choisi pour la triangulation
	//Si plus de 2 bornes sont disponible pour la triangulation alors on prends les deux plus proches

	//racine de (xb-xa)² + (yb-ya)²

	//Cette partie sert a simuler la porter d'une borne wifi.

	//Calcule distance avec borne 1

	
/*
	if (distanceborne1 >= rangewifi) { $("#distWifi1").css("background-color", "red") } else { $("#distWifi1").css("background-color", "green") }
	if (distanceborne2 >= rangewifi) { $("#distWifi2").css("background-color", "red") } else { $("#distWifi2").css("background-color", "green") }
	if (distanceborne3 >= rangewifi) { $("#distWifi3").css("background-color", "red") } else { $("#distWifi3").css("background-color", "green") }

		var position1 = {
			x : dragger1.x,
			y : dragger1.y,
			distance : distanceborne1
		}

		var position2 = {
			x : dragger2.x,
			y : dragger2.y,
			distance : distanceborne2
		}

		var position3 = {
			x : dragger3.x,
			y : dragger3.y,
			distance : distanceborne3
		}
	
	getTrilateration(position1,position2,position3);*/


	function getTrilateration(position1, position2, position3) {
	    var xa = position1.x;
	    var ya = position1.y;
	    var xb = position2.x;
	    var yb = position2.y;
	    var xc = position3.x;
	    var yc = position3.y;
	    var ra = position1.distance;
	    var rb = position2.distance;
	    var rc = position3.distance;

	    var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
	    var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
	    var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
	    var x = ((y * (ya - yb)) - T) / (xb - xa);

	    $("#posUserX").html("<p> x : " + Math.round(x) + "</p>");
	    $("#posUserY").html("<p> y : " + Math.round(y) + "</p>");
	    
	    // return {
	    //     x: Math.round(x),
	    //     y: Math.round(y) 
	    // };
	}
	

	function getDistance(xa, ya, xb, yb) {
		
		var distance = Math.round(Math.sqrt(Math.pow((xb - xa),2) + Math.pow((yb - ya),2)))

		return distance
	}

});

