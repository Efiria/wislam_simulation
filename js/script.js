$( document ).ready(function() {

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

	calculateUserPosition(getWifiInRange(wifiAvailable, draggerUser.x, draggerUser.y))


	draggerUser.on("pressmove",function(evt) {

		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();   

		var wifiConnected = getWifiInRange(wifiAvailable, evt.stageX, evt.stageY);

		if (wifiConnected.nbWifi < 3) {

			evt.stageX = 445
			evt.stageY = 555
			stage.update();

		} else {

			calculateUserPosition(wifiConnected)
		}
		
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
		
		let wifiInRange = []
		var cpt = 0


		wifiAvailable.forEach(function(item){

			var distance = getDistance(item.x, item.y, userx, usery)

			if (distance <= rangewifi) {

				item.children[0].graphics.clear().beginFill("green").drawCircle(0, 0, 10)
				item.distance = distance
				wifiInRange[distance] = item

				cpt ++

				stage.update();

			} else {

				item.children[0].graphics.clear().beginFill("red").drawCircle(0, 0, 10)

				stage.update();

			}

		});

		return {
			wifiInRange : wifiInRange,
			nbWifi : cpt
		}
	}

	function calculateUserPosition(wifiAvailable) {

		var sortedWifi = {}

		//Order les bornes wifi
		if (wifiAvailable.nbWifi > 3) {

			wifiAvailable.wifiInRange.forEach(function(item){

				sortedWifi[item.distance] = item.name

			})

			sortedWifi = Object.keys(sortedWifi)

			for (var i = 3; i < sortedWifi.length; i++) {
				wifiAvailable.wifiInRange.splice(sortedWifi[i], 1)
			}
		} else {

			wifiAvailable.wifiInRange.forEach(function(item){

				sortedWifi[item.distance] = item.name

			})

			sortedWifi = Object.keys(sortedWifi)
		}

		var position1 = {}
		var position2 = {}
		var position3 = {}

		for (var i = 0; i < 3; i++) {
			if (i == 0) {
				position1 = {
					x : wifiAvailable.wifiInRange[sortedWifi[i]].x,
					y : wifiAvailable.wifiInRange[sortedWifi[i]].y,
					distance : wifiAvailable.wifiInRange[sortedWifi[i]].distance
				}
			}

			if (i == 1) {
				position2 = {
					x : wifiAvailable.wifiInRange[sortedWifi[i]].x,
					y : wifiAvailable.wifiInRange[sortedWifi[i]].y,
					distance : wifiAvailable.wifiInRange[sortedWifi[i]].distance
				}

			}

			if (i == 2) {
				position3 = {
					x : wifiAvailable.wifiInRange[sortedWifi[i]].x,
					y : wifiAvailable.wifiInRange[sortedWifi[i]].y,
					distance : wifiAvailable.wifiInRange[sortedWifi[i]].distance
				}
			}

			getTrilateration(position1,position2,position3);
		}
	}

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

