$(document).ready(function() {
	var currentState = 'home'; //Records which 'page' the website is on.
	var brick = $('.brick'); //Allow jquery to work on these elements.
	var wood = $('.wood');
	var sky = $('.sky');
	var logo = $('#logo');
	var shadow = $('#shadow');
	var contactUs = $('#contactUs');
	var screenSize = $('#screensize');
	var aboutUs = $('#aboutUs');
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

		//Use original CSS values for ratios.
	/*
	console.log(logo.height());
	console.log($(window).height());
	var logoHeightPercentage = (logo.height()/$(window).height()) * 100;
	var logoWidthPercentage = (logo.width()/$(window).width()) * 100;
	console.log(logoHeightPercentage + "%");
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
	
	function initializeWood()
	{
		infiniteWood[0].css({"left": "-130%"});
		infiniteWood[2].css({"left": "110%"});
	}

	function initializeBrick()
	{
		//Set initial positions of bricks
		infiniteBrick[0].css({"left": "-250%"});
		infiniteBrick[2].css({"left": "150%"});
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
		console.log(frontClouds);
		var currentFront = frontClouds.shift(); //Pop the cloud off the array.
		var leftPercent = 0;
		leftPercent = Math.floor((Math.random()*5));
		console.log(currentFront);
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
			var edgePercentHeight = $(window).height() * 0.05;
			var edgePercentWidth = $(window).width() * 0.04; //Recalculate every mouse movement.
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
						arrowSlide();

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
						console.log("Fading.");
						$(".arrow").stop().velocity({"opacity": "0"}, 250, function()
													{
														revertArrow();
													});
				alreadyInEdge = false;
				}
			}
			}
		});
	}
	
	function arrowSlide()
	{
		var movedArrow="";
			$('#uparrow').velocity({
				top:"2%",
				opacity: "1"}, 100);
			movedArrow="up";
			$('#downarrow').velocity({
				bottom:"2%",
				opacity: "1"}, 100);
			movedArrow="bottom";
			$('#leftarrow').velocity({
				left:"0%",
				opacity: "1"}, 100);
			movedArrow="left";
			$('#rightarrow').velocity({
				right:"0%",
				opacity: "1"}, 100);
			movedArrow="right";
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
	
	function arrowClick(element) {
		var arrow = element;
		element = $(element);
		element.click(
			function() {
				if(mutexScroll == true)
				{
				if(currentState == 'home') //Check state
				{
					if(arrow == '#uparrow')
					{
						fadeOutUpArrow = true;
						currentState="about";
						spawnClouds();
						setTimeout(function(){
						wood.stop().velocity({top:"100%"}, 300);
						logo.stop().velocity({top:"100%"}, 300);
						shadow.stop().velocity({top:"100%"}, 300);
									brick.stop().velocity({top:"77%",
									   left: "-100%",
									   width: "300%",
									   height: "150%"
											  }, 300, function()
														  {
															  aboutUs.css("visibility", "visible");
															  aboutUs.velocity({
																  top: '69%'
															  });
											  });			
													    
						focusAndFade(sky, 0.0, brick, 7.0); 
							currentState = 'about';
						}, 100); //Set timeout to let clouds load a bit longer.

						$('#uparrow').fadeOut("slow", function() {
							$('#uparrow').hide();
							fadeOutUpArrow = false;
						});
					
					}
					else if(arrow == '#downarrow')
					{
						console.log(brick.height());
						console.log(brick.width());
						focusAndFade(wood, 0, brick, 5);
						var scale = 0.90;
						var w = brick.width();
						var h = brick.height();
						brick.data('w',w).data('h',h);

						brick.velocity({ //Just use percentages so window can scale.
							width: "150%",
							height: "100%",
							left: '-25%',
							top: '-15%'
						},  150);
						
						wood.velocity({
							top: '33%',
							left: '0%',
							width: '100%',
							height: '100%'
						},  200,'swing', function() {
							contactUs.css("visibility", "visible");
							contactUs.velocity({
							top: '26.3%'
							});
						});

						//Get percentage of width:
						var widthPercentage = (100*(logo.width()))/(screenSize.width());
						var heightPercentage = (100*(logo.height()))/(screenSize.height());
						logo.velocity({
							width: (widthPercentage/2)+'%',
							top: '15%',
							left:'40.5%',
							},
									 {queue:false, duration:200});
						
						shadow.velocity({
							width: (widthPercentage/2)+'%',
							top: '16%',
							left:'40.5%',
							},
									   {queue:false, duration:200});

						
						currentState = 'contact';
					}
					else if(arrow=='#leftarrow')
					{
						mutexScroll = false;
						infiniteWood[1].velocity({
							left: '110%'}, 300);
						infiniteWood[0].velocity({
							left: '-10%'}, 300);
						infiniteBrick[1].velocity({
							left: '150%'}, 300); //Shove current away
						infiniteBrick[0].velocity({
							left: '-50%'}, 300, function()
												  {
													  var temp = infiniteBrick[1];
													  infiniteBrick[1]=infiniteBrick[0];
													  infiniteBrick[0]=temp;
													  infiniteBrick[0].css({"left":"-250%"});
													  temp = infiniteWood[1];
													  infiniteWood[1] = infiniteWood[0];
													  infiniteWood[0] = temp;
													  infiniteWood[0].css({"left":"-130%"});
													  mutexScroll = true;
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
							left: '-10%'}, 300);
						infiniteBrick[1].velocity({
							left: '-150%'}, 300); //Shove current away
						infiniteBrick[2].velocity({
							left: '-50%'}, 300, function()
												  {
													  var temp = infiniteBrick[1];
													  infiniteBrick[1]=infiniteBrick[2];
													  infiniteBrick[2]=temp;
													  infiniteBrick[2].css({"left":"150%"});
													  temp = infiniteWood[1];
													  infiniteWood[1] = infiniteWood[2];
													  infiniteWood[2] = temp;
													  infiniteWood[2].css({"left":"110%"});
													  
													  mutexScroll = true;
												  }); //Move right brick in
						logo.velocity({
							left:'-=100%'}, 300);
						shadow.velocity({
							left:'-=100%'}, 300);
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
						stopClouds();
						focusAndFade(wood, 0, brick, 0);
						wood.stop().velocity({top:"80%"}, 300);
						logo.stop().velocity({top:"36.5%"}, 300);
						shadow.stop().velocity({top:"38%"}, 300);
									brick.stop().velocity({top:"-5%",
									   left: "-50%",
									   width: "200%",
									   height: "auto"
											  }, 300, function()
											  {
												  initializeBrick();
												  initializeWood();
											  });			
													     
						$('#uparrow').fadeIn("slow", function() {
							$('#uparrow').show();
							fadeOutUpArrow = false;
						});
						currentState="home";
						
					}
				}
				else if(currentState=="contact")
				{
					if(arrow=='#uparrow')
					{
						lastelement = null;
						console.log(brick.height());
						console.log(brick.width());
						focusAndFade(wood, 0, brick, 0);
						var scale = 0.90;
						var w = brick.width();
						var h = brick.height();
						brick.data('w',w).data('h',h);

						contactUs.css("visibility", "hidden");
							contactUs.velocity({
							top: '33%'
							});
						
						brick.velocity({ //Just use percentages so window can scale.
							width: "200%",
							height: "auto",
							left: '-50%',
							top: '-5%'
						},  150, function()
									   {
										   initializeBrick(); //Lazy, resolves uncertainty
										   initializeWood();
									   });
						
						wood.velocity({
							top: '80%',
							left: '-10%',
							width: '120%',
							height: '120%'
						},  200,'swing', function() {
						});

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
					
				}
			}
		);
	};

	function focusAndFade(element1, blurRad1, element2, blurRad2)
	{
		console.log("Doing it!");
		$({blurRadius: blurRad1}).animate({blurRadius: 0}, {
						duration: 200,
						easing: 'swing',
						step: function() {
							element1.css({
								"-webkit-filter":"blur("+this.blurRadius+"px)",
								"filter":"blur("+this.blurRadius+"px)",
								"-moz-filter":"blur("+this.blurRadius+"px)",
								"-o-filter":"blur("+this.blurRadius+"px)",
								"-ms-filter":"blur("+this.blurRadius+"px)"
							});
						}
							});
		$({blurRadius: 0}).animate({blurRadius: blurRad2}, {
						duration: 200,
						easing: 'swing',
			step: function() {
							element2.css({
								"-webkit-filter":"blur("+this.blurRadius+"px)",
								"filter":"blur("+this.blurRadius+"px)",
								"-moz-filter":"blur("+this.blurRadius+"px)",
								"-o-filter":"blur("+this.blurRadius+"px)",
								"-ms-filter":"blur("+this.blurRadius+"px)"
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
							focusAndFade(brick, 5.0, wood, 5.0);
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
							focusAndFade(wood, 5.0, brick, 5.0);
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
