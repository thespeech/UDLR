$(document).ready(function() {
	var currentState = 'home'; //Records which 'page' the website is on.
	var brick = $('.brick'); //Allow jquery to work on these elements.
	var wood = $('.wood');
	var sky = $('.sky');
	var logo = $('#logo');
	var shadow = $('#shadow');
	var contactUs = $('#contactUs');
	var contactUsBody = $('#contactUsBody');
	var supportedBy = $('#supportedBy');
	var screenSize = $('#screensize');
	var aboutUs = $('#aboutUs');
	var aboutUsBody = $('#aboutUsBody');
	var lastelement=null;
	var alreadyInEdge = false;
	var fadeOutUpArrow = false;
	var mutexScroll = true;
	//Initialize window height and width on first load.
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var randomClouds=[$('#middle-1'),$('#middle-2'),$('#middle-3'),$('#front-1'),$('#front-2')];
	var backClouds=[$('#back2'), $('#back3')];
	var frontClouds=[$('#front-1'), $('#front-2')];
	var middleClouds=[$('#middle-1'), $('#middle-2'), $('#middle-3')];
	var infiniteBrick=[$('#brick1'), $('#brick2'), $('#brick3')];
	var infiniteWood=[$('#wood1'), $('#wood2'), $('#wood3')];
	var topWordArrow=$('#topWordArrow');
	var leftWordArrow=$('#leftWordArrow');
	var rightWordArrow=$('#rightWordArrow');
	var downWordArrow=$('#downWordArrow');
	var keyNav = false;

		//Use original CSS values for ratios.
	/*
	var logoHeightPercentage = (logo.height()/$(window).height()) * 100;
	var logoWidthPercentage = (logo.width()/$(window).width()) * 100;
	*/

	//Run the actual functions.
	
	bgHover(brick);
	bgHover(wood);
	arrowClick('#uparrow');
	arrowClick('#downarrow');
	arrowClick('#leftarrow');
	arrowClick('#rightarrow');
	hoverEdges();
	initializeBrick();
	initializeWood();
	keyboardNav();



	function showTextArrow(newText, direction)
	{
		if(direction == 'up')
		{
			topWordArrow.text(newText);
			topWordArrow.velocity("stop");
			topWordArrow.velocity({
				top:"6%",
				opacity: "1"}, 322);
		}
		else if(direction == 'down')
		{
			downWordArrow.text(newText);
			downWordArrow.velocity("stop");
			downWordArrow.velocity({
				bottom:"6%",
				opacity: "1"}, 322);
		}
		else if(direction == 'left')
		{
			leftWordArrow.text(newText);
			leftWordArrow.velocity("stop");
			leftWordArrow.velocity({
				left:"2%",
				opacity: "1"}, 322);
		}
		else if(direction == 'right')
		{
			rightWordArrow.text(newText);
			rightWordArrow.velocity("stop");
			rightWordArrow.velocity({
				right:"2%",
				opacity: "1"}, 322);
		}
	}

	function hideTextArrow(direction)
	{
		if(direction == 'up')
		{
			topWordArrow.velocity("stop");
			topWordArrow.velocity({
				opacity: "0"}, 322, function(){
					topWordArrow.empty();
					topWordArrow.css({color: "rgba(0, 0, 0, 0.4)"});
					topWordArrow.css({"top":"8%"});
				});
		}
		else if(direction == 'down')
		{
			downWordArrow.velocity("stop");
			downWordArrow.velocity({
				opacity: "0"}, 322, function(){
					downWordArrow.empty();
					downWordArrow.css({color: "rgba(0, 0, 0, 0.4)"});
					downWordArrow.css({"bottom":"8%"});
				});
		}
		else if(direction == 'left')
		{
			leftWordArrow.velocity("stop");
			leftWordArrow.velocity({
				opacity: "0"}, 322, function(){
					leftWordArrow.empty();
					leftWordArrow.css({color: "rgba(0, 0, 0, 0.4)"});
					leftWordArrow.css({"left":"4%"});
				});
		}
		else if(direction == 'right')
		{
			rightWordArrow.velocity("stop");
			rightWordArrow.velocity({
				opacity: "0"}, 322, function(){
					rightWordArrow.empty();
					rightWordArrow.css({color: "rgba(0, 0, 0, 0.4)"});
					rightWordArrow.css({"right":"4%"});
				});
		}
	}

	function contextArrowText(direction)
	{
		if(currentState == 'home')
		{
			if(direction == 'up')
			{
				return 'about us';
			}
			else if(direction == 'down')
			{
				return 'contact us';
			}
			else if(direction == 'left')
			{
				return 'events';
			}
			else if(direction == 'right')
			{
				return 'projects';
			}
		}
		else if(currentState == 'about')
		{
			if(direction == 'down')
			{
				return 'home';
			}
		}
		else if(currentState == 'contact')
		{
			if(direction == 'up')
			{
				return 'home';
			}
		}
	}
	

	function keyboardNav()
	{
		keyNav=true;
		document.onkeydown = function(e) {
			switch (e.keyCode) {
			case 37:
				flashArrow('left');
				flashTextArrow('left');
				navPage('#leftarrow');
				break;
			case 38:
				flashArrow('up');
				flashTextArrow('up');
				navPage('#uparrow');
				break;
			case 39:
				flashArrow('right');
				flashTextArrow('right');
				navPage('#rightarrow');
				break;
			case 40:
				flashArrow('down');
				flashTextArrow('down');
				navPage('#downarrow');
				break;
			}
		}
	}


	function flashTextArrow(direction)
	{
		showTextArrow(contextArrowText(direction), direction);
		if(direction == 'up')
		{
			topWordArrow.css({color: "white"});
		}
		else if(direction == 'down')
		{
			downWordArrow.css({color: "white"});
		}
		else if(direction == 'left')
		{
			leftWordArrow.css({color: 'white'});
		}
		else if(direction == 'right')
		{
			rightWordArrow.css({color: 'white'});
		}
		setTimeout(function(){hideTextArrow('up');
							  hideTextArrow('down');
							  hideTextArrow('left');
							  hideTextArrow('right');
							 }, 322);
	}

	function flashArrow(direction)
	{
		if(direction == 'left')
		{
			$('#leftwhite').velocity("stop");
						$('#leftwhite').velocity({'opacity':'1'}, 300, function()
											{
												$('#leftwhite').stop().velocity({
													'opacity':'0'}, 300);
											});
				}
		else if(direction == 'right')
		{
			$('#rightwhite').velocity("stop");
						$('#rightwhite').velocity({'opacity':'1'}, 300, function()
											 {
												 $('#rightwhite').stop().
													 velocity({
														 'opacity':'0'}, 300);
											 });		
		}
		else if(direction == 'up')
		{
			$('#upwhite').velocity("stop");
			$('#upwhite').velocity({'opacity':'1'}, 300, function()
								   {
									   $('#upwhite').velocity({
										   'opacity':'0'}, 300);
								   });
		}
		else if(direction == 'down')
		{
			$('#downwhite').velocity("stop");
			$('#downwhite').velocity({'opacity':'1'}, 300, function()
									 {
										 $('#downwhite').velocity({
											 'opacity':'0'}, 300);
									 });
		}
	}
	
	function initializeWood()
	{
		infiniteWood[0].css({"left": "-130%"});
		infiniteWood[2].css({"left": "110%"});
	}

	function initializeBrick()
	{
		//Set initial positions of bricks
		infiniteBrick[0].css({"left": "-245%"});
		infiniteBrick[2].css({"left": "145%"});
	}
	
	function stopClouds()
	{
		frontClouds=[$('#front-1'), $('#front-2')]; //Reset front clouds to stop them properly.
		frontClouds.forEach(function(element)
							{
								element.velocity("stop");
							});
		middleClouds.forEach(function(element)
							 {
								 element.velocity("stop");
							 });
		
		$('#back').velocity("stop"); //Stop every cloud's animation.
		
	}
	
	function spawnClouds() //Run this only when the up arrow is pressed.
	{
		//6 clouds to randomize. All should be more or less visible.
		//Minimum percentage from top of cloud spawn: 77%, no greater
		//
		frontClouds=[$('#front-1'), $('#front-2')];
		var currentFront = frontClouds.shift(); //Pop the cloud off the array.
		var leftPercent = 0;
		leftPercent = Math.floor((Math.random()*5));
		currentFront.css({"top":(Math.floor(Math.random()*56))+"%",
						  "left":(Math.floor(Math.random()*50))+"%"});
		animateFrontCloud(currentFront, true);
		middleClouds.forEach(function(element)
							 {
								 element.css({"top":(Math.floor((Math.random()*5))+10)+"%",
											  "left":leftPercent+"%"});
								 leftPercent+=(Math.floor((Math.random()*5)+25));
								 animateMiddleCloud(element, true);
								 
							 });
		$('#back').css({"top":"-180%",
						"left":"0%"});
		animateBackCloud($('#back'), true); 
	}

	
	function animateBackCloud(element, firsttime)
	{
		if(currentState=='about')
		{
			element.css({"top":"0%",
						 "left":"-180%"});
			element.show();
			var newSpeed=160;
			element.velocity("stop");
			element.velocity({left:"50%"}, newSpeed*1000, "linear", function(){
				animateBackCloud(backClouds.shift(), false);
				element.velocity("stop");
				element.velocity({left:"180%"}, newSpeed*1000, "linear", function() {
					backClouds.push(element);
				});
			});
		}

	}

	function animateMiddleCloud(element, firsttime)
	{
		if(currentState=='about')
		{
			if(!firsttime)
			{
				element.css({"top":(Math.floor((Math.random()*0))+10)+"%",
							 "left": "-120%"});

			}
			element.show();
			var newSpeed=Math.floor((Math.random()*15)+82);
			element.velocity("stop");
			element.velocity({left:"100%"}, newSpeed*1000, "linear", function(){
				animateMiddleCloud(element, false);
			});
		}
	}


	function animateFrontCloud(element, firsttime)
	{
		if(currentState=='about')
		{
			if(!firsttime)
			{
				element.css({"top":(Math.floor((Math.random()*50))-2)+"%",
							 "left": "-100%"});
			}
			element.show();
			var newSpeed=Math.floor((Math.random()*10)+50);
			element.velocity("stop");
			element.velocity({left:"100%"}, newSpeed*1000, "linear", function(){
				frontClouds.push(element);
				element=frontClouds.shift();
				animateFrontCloud(element, false);
			});
		}
	}
	

	
	function hoverEdges() //Do arrow fading stuff.
	{
		var movedArrow="";
		$(document).on("mousemove", function(event){
			var edgePercentHeight = $(window).height() * 0.15;
			var edgePercentWidth = $(window).width() * 0.13; //Recalculate every mouse movement.
			if(fadeOutUpArrow == false)
			{
				if((event.pageY < edgePercentHeight) || //Top
				   ((($(window).height() - event.pageY) < edgePercentHeight)) || //Bottom
				   (event.pageX < edgePercentWidth) || //Left
				   ((($(window).width() - event.pageX) < edgePercentWidth))) //Right
				{
					
					if(alreadyInEdge == false) //The last mouse position not near the edge.
					{
						//$(".arrow").velocity({"opacity": "1"}, 350);
						setTimeout(function(){
							arrowSlide();
						}, 322);

						//Check especially which edge is being activated.
						//Revert the original activated arrow if it is not the current one,
						//then activate the new one.

						alreadyInEdge = true; //Set last mouse pos to be near edge.
					}
				}
				else
				{
					if(alreadyInEdge == true) //Converse.
					{
						$(".arrow").velocity("stop");
						$(".arrow").velocity({"opacity": "0"}, 322, function()
													{
														revertArrow();
													});
						
						hideTextArrow('up');
						hideTextArrow('down');
						hideTextArrow('left');
						hideTextArrow('right');

						alreadyInEdge = false;
					}
				}
			}
		});
	}
	
	function arrowSlide()
	{
		$('#uparrow').velocity({
			top:"0%",
			opacity: "1"}, 322);
		showTextArrow(contextArrowText('up'), 'up');
		$('#downarrow').velocity({
			bottom:"0%",
			opacity: "1"}, 322);
		showTextArrow(contextArrowText('down'), 'down');
		$('#leftarrow').velocity({
			left:"-2%",
			opacity: "1"}, 322);
		showTextArrow(contextArrowText('left'), 'left');
		$('#rightarrow').velocity({
			right:"-2%",
			opacity: "1"}, 322);
		showTextArrow(contextArrowText('right'), 'right');
	}

	function revertArrow(arrow)
	{
		$('#uparrow').css({
			top:"4%"});
		$('#leftarrow').css({
			left:"2%"});
		$('#rightarrow').css({
			right:"2%"});
		$('#downarrow').css({
			bottom:"4%"});
	}

	function navPage(arrow){
		if(mutexScroll == true)
		{
			if(arrow =='#uparrow')
			{
				flashTextArrow('up');
				flashArrow('up');
			}
			else if(arrow == '#downarrow')
			{
				flashTextArrow('down');
				flashArrow('down');
			}
			else if(arrow == '#leftarrow')
			{
				flashTextArrow('left');
				flashArrow('left');
			}
			else if(arrow == '#rightarrow')
			{
				flashTextArrow('right');
				flashArrow('right');
			}
			mutexScroll = false;
			if(currentState == 'home') //Check state
			{
				if(arrow == '#uparrow')
				{
					fadeOutUpArrow = true;
					currentState="about";
					spawnClouds();
					setTimeout(function(){
						wood.velocity({top:"100%"}, 300);
						logo.velocity({top:"100%"}, 300);
						shadow.velocity({top:"100%"}, 300);
						brick.velocity({top:"77%",
											   left: "-100%",
											   width: "300%",
											   height: "150%"
											  }, 300, function()
											  {
												  aboutUs.css("visibility", "visible");
												  aboutUs.velocity({
													  top: '69%'
												  },50);
												  //aboutUsBody.css("visibility", "visible");
												  aboutUsBody.velocity({
													  'opacity': '1'
												  }, {duration: 150, queue: false});
											  });			
						
						focusAndFade(sky, 0.0, brick, 7.0); 
						currentState = 'about';
						
					}, 100); //Set timeout to let clouds load a bit longer.

					$('#uparrow').velocity({opacity: 0}, 322, function() {
						$('#uparrow').css({display: "none"});
						fadeOutUpArrow = false;
					});
					
				}
				else if(arrow == '#downarrow')
				{
					focusAndFade(wood, 0, brick, 5.0);
					var scale = 0.90;
					var w = brick.width();
					var h = brick.height();
					brick.data('w',w).data('h',h);

					
					//Get percentage of width:
					var widthPercentage = (100*(logo.width()))/(screenSize.width());
					var heightPercentage = (100*(logo.height()))/(screenSize.height());
					logo.velocity({
						width: (widthPercentage/2)+'%',
						top: '15%',
						left:'40.5%',
					}, {duration: 150, queue: false});
					
					shadow.velocity({
						width: (widthPercentage/2)+'%',
						top: '16%',
						left:'40.5%',
					}, {duration: 150, queue: false});


					brick.velocity({ //Just use percentages so window can scale.
						width: "150%",
						height: "100%",
						left: '-25%',
						top: '-15%'
					},  {duration: 150, queue: false});
					
					wood.velocity({
						top: '33%',
						left: '0%',
						width: '100%',
						height: '100%'
					},  {duration: 150, queue: false, complete: function() {
						contactUs.css("visibility", "visible");
						contactUs.velocity({
							top: '26.3%'
						}, {duration: 50, queue: false});
						contactUsBody.velocity({
							opacity: 1
						}, {duration: 150, queue: false});
						supportedBy.velocity({
							opacity: 1
						}, {duration: 150, queue: false});
					}});
					
					currentState = 'contact';
				}
				else if(arrow=='#leftarrow')
				{
					mutexScroll = false;
					infiniteWood[1].velocity({
						left: '110%'}, 300);
					infiniteWood[0].velocity({
						left: '-10%'}, 300, function() {
							var temp = infiniteWood[1];
							infiniteWood[1] = infiniteWood[0];
							infiniteWood[0] = temp;
							infiniteWood[0].css({"left":"-130%"});
						});
					
					infiniteBrick[1].velocity({
						left: '+=5%'}, 300); //Shove current away
					infiniteBrick[2].velocity({
						left: '+=5%'}, 300);
					infiniteBrick[0].velocity({
						left: '+=5%'}, 300, function()
											  {
												  var leftBrickPercent = infiniteBrick[0].position().left / infiniteBrick[0].parent().width() * 100;
												  if((leftBrickPercent+5)>0)
												  {
													  var temp = infiniteBrick[0];
													  infiniteBrick[0] = infiniteBrick[2];
													  infiniteBrick[2] = infiniteBrick[1];
													  infiniteBrick[1] = temp;
													  infiniteBrick[0].css({"left":((leftBrickPercent-195)+"%")});
												  }
											  });
					logo.velocity({
						left: '+=100%'}, 300);
					shadow.velocity({
						left: '+=100%'}, 300);
				}
				else if(arrow=='#rightarrow')
				{
					mutexScroll = false;
					infiniteWood[1].velocity({
						left: '-130%'}, 300);
					infiniteWood[2].velocity({
						left: '-10%'}, 300, function()
											 {
												 var temp = infiniteWood[1];
												 infiniteWood[1] = infiniteWood[2];
												 infiniteWood[2] = temp;
												 infiniteWood[2].css({"left":"110%"});
											 });
					infiniteBrick[1].velocity({
						left: '-=5%'}, 300); //Shove current away
					infiniteBrick[0].velocity({
						left: '-=5%'}, 300);
					infiniteBrick[2].velocity({
						left: '-=5%'}, 300, function()
											  {
												  var rightBrickPercent = infiniteBrick[2].position().left / infiniteBrick[0].parent().width() * 100;
												  if((rightBrickPercent-5)<0)
												  {
													  var temp = infiniteBrick[2];
													  infiniteBrick[2] = infiniteBrick[0];
													  infiniteBrick[0] = infiniteBrick[1];
													  infiniteBrick[1] = temp;
													  infiniteBrick[2].css({"left":((rightBrickPercent+195)+"%")});
												  }
											  });
					logo.velocity({
						left: '-=100%'}, 300);
					shadow.velocity({
						left: '-=100%'}, 300);
				}
			}
			
			else if(currentState=="about")
			{
				if(arrow=='#downarrow')
				{
					lastelement = null;
					aboutUs.css("visibility", "hidden");
					aboutUs.velocity({
						top: '77%'
					});
					aboutUsBody.velocity({
						'opacity': '0'
					}, {duration: 150, queue: false});
					stopClouds();
					focusAndFade(wood, 0, brick, 5.0);
					wood.stop().velocity({top:"80%"}, 300, function()
										 {
											 initializeWood();
										 });
					logo.stop().velocity({top:"36.5%"}, 300);
					shadow.stop().velocity({top:"38%"}, 300);
					brick.stop().velocity({top:"-5%",
										   left: "-50%",
										   width: "200%",
										   height: "auto"
										  }, 300, function()
										  {
											  initializeBrick();
										  });			
					
					$('#uparrow').css({display:"block"});
						fadeOutUpArrow = false;
						currentState="home";
						
					}
				}
				else if(currentState=="contact")
				{
					if(arrow=='#uparrow')
					{
						lastelement = null;
						focusAndFade(wood, 0, brick, 5);
						var scale = 0.90;
						var w = brick.width();
						var h = brick.height();
						brick.data('w',w).data('h',h);

						contactUs.css("visibility", "hidden");
							contactUs.velocity({
							top: '33%'
							}, {duration: 100, queue: false});

						contactUsBody.velocity({opacity: 0},{duration: 10, queue: false});
						supportedBy.velocity({opacity: 0}, {duration: 10, queue: false});
						
						brick.velocity({ //Just use percentages so window can scale.
							width: "200%",
							height: "auto",
							left: '-50%',
							top: '-5%'
						},  {duration: 150, queue: false, complete: function()
									   {
										   initializeBrick(); //Lazy, resolves uncertainty
									   }});
						
						wood.velocity({
							top: '80%',
							left: '-10%',
							width: '120%',
							height: '120%'
						}, {duration: 300, queue: false, complete: function() {
							initializeWood();
						}});

						//Get percentage of width:
						var widthPercentage = (100*(logo.width()))/(screenSize.width());
						var heightPercentage = (100*(logo.height()))/(screenSize.height());
						logo.velocity({
							width: (widthPercentage*2)+'%',
							top: '36.5%',
							left:'33.5%',
							},
									 {queue:false, duration:200});
						
						shadow.velocity({
							width: (widthPercentage*2)+'%',
							top: '38%',
							left:'33.5%',
							},
									   {queue:false, duration:200});

						
						currentState = 'home';
					}
				}
			setTimeout(function(){mutexScroll = true},500);
			$(".arrow").velocity({"opacity": "0"}, 322, function()
													{
														revertArrow();
													});

			
		}
	}
	
	function arrowClick(element) {
		var arrow = element;
		element = $(element);
		element.click(
			function() {
				navPage(arrow);
				setTimeout(function(){hideTextArrow('up');
									  hideTextArrow('down');
									  hideTextArrow('left');
									  hideTextArrow('right');
									 }, 322);
			}
		);
	};

	function focusAndFade(element1, blurRad1, element2, blurRad2)
	{ 
		element1.velocity({opacity: 1},{
			duration: 200,
			progress: function(elements, complete, remaining, start) {
				var curPercent=complete;
				curPercent *= blurRad1;
				element1.css({
								"-webkit-filter":"blur("+curPercent+"px)",
								"filter":"blur("+curPercent+"px)",
								"-moz-filter":"blur("+curPercent+"px)",
								"-o-filter":"blur("+curPercent+"px)",
								"-ms-filter":"blur("+curPercent+"px)"
							});


			}
		});
		element2.velocity({opacity: 1},{
			duration:  200,
			progress: function(elements, complete, remaining, start) {
				var curPercent=complete;
				curPercent *= blurRad2;
				element2.css({
								"-webkit-filter":"blur("+curPercent+"px)",
								"filter":"blur("+curPercent+"px)",
								"-moz-filter":"blur("+curPercent+"px)",
								"-o-filter":"blur("+curPercent+"px)",
								"-ms-filter":"blur("+curPercent+"px)"
							});


			}
		}); 
			};

	function bgHover(element) {
		element.hover(
			function() {
				if(currentState == 'home')
				{
				if(element == brick && (lastelement == wood || lastelement == null))
					{
						if(lastelement !== null)
						{
							focusAndFade(brick, 0.0, wood, 5.0);
						}
						else if(lastelement == null)
						{
							focusAndFade(brick, 0.0, wood, 5.0);
						}
						lastelement = brick;
					}
				else if(element == wood && (lastelement == brick || lastelement == null))
				{
						if(lastelement !== null)
						{
							focusAndFade(wood, 0.0, brick, 5.0);
						}
					else if(lastelement == null)
					{
						focusAndFade(wood, 0.0, brick, 5.0);
					}
						lastelement = wood;

				}
				}
			});
	};
	
});
