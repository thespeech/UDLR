

$(document).ready(function() {
	var currentState = 'home';
	var brick = $('.brick'); //Allow jquery to work on these elements.
	var wood = $('.wood');
	var sky = $('.sky');
	var logo = $('#logo');
	var shadow = $('#shadow');
	var contactUs = $('#contactUs');
	var screenSize = $('#screensize');
	var lastelement;
	var alreadyInEdge = false;
	var fadeOutUpArrow = false;
	bgHover(brick);
	bgHover(wood);
	
	arrowClick('#uparrow', 'bounce');
	arrowClick('#downarrow', 'bounce');
	arrowClick('#leftarrow', 'bounce');
	arrowClick('#rightarrow', 'bounce');
	hoverEdges();

	function cloudsAnimate()
	{
		
	}
	
	function hoverEdges() //Do arrow fading stuff.
	{
		$(document).on("mousemove", function(event){
			var edgePercentHeight = $(window).height() * 0.1;
			console.log(edgePercentHeight);
			var edgePercentWidth = $(window).width() * 0.04;
			console.log("x: " + event.pageX + ", y: " + event.pageY);
			console.log("Screen height: " + $(window).height());
			if(fadeOutUpArrow == false)
			{
			if((event.pageY < edgePercentHeight) ||
			   ((($(window).height() - event.pageY) < edgePercentHeight)) ||
			  (event.pageX < edgePercentWidth) ||
			   ((($(window).width() - event.pageX) < edgePercentWidth)))
			{
				if(alreadyInEdge == false)
				{
					$(".arrow").stop().velocity({"opacity": "1"}, 250);
					alreadyInEdge = true;
				}
				console.log(alreadyInEdge);
			}
			else
			{
				$(".arrow").stop().velocity({"opacity": "0"}, 250);
				alreadyInEdge = false;
				console.log(alreadyInEdge);
			}
			}
		});
	}
		
	function arrowClick(element, animation) {
		var arrow = element;
		element = $(element);
		element.click(
			function() {
				element.addClass('animated ' + animation);
				
				if(currentState == 'home') //Check state
				{
					if(arrow == '#uparrow')
					{
					
						fadeOutUpArrow = true;
						wood.stop().velocity({top:"100%"}, 500);
						logo.stop().velocity({top:"100%"}, 500);
						shadow.stop().velocity({top:"100%"}, 500);
									brick.stop().velocity({top:"77%",
									   left: "-100%",
									   width: "300%",
									   height: "150%"
											  }, 500, function()
											  {
											 
											  });			
													    
						focusAndFade(sky, 0.0, brick, 8.0); 
												currentState = 'about';
						$('#uparrow').fadeOut("slow", function() {
							$('#uparrow').hide();
							fadeOutUpArrow = false;
						});
						
					}
					else if(arrow == '#downarrow')
					{
						console.log(brick.height());
						console.log(brick.width());
						focusAndFade(wood, 0, brick, 8);
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
							height: (heightPercentage/2)+'%',
							top: '15%',
							left:'40.5%',
							},
									 {queue:false, duration:200});
						
						shadow.velocity({
							width: (widthPercentage/2)+'%',
							height: (heightPercentage/2)+'%',
							top: '16%',
							left:'40.5%',
							},
									   {queue:false, duration:200});

						
						currentState = 'contact';
					}
				}
				
				//wait for animation to finish before removing classes
				window.setTimeout( function() {
					element.removeClass('animated ' + animation);
				}, 2000);
			}
		);
	};

	function focusAndFade(element1, blurRad1, element2, blurRad2)
	{
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
					lastelement = brick;
					focusAndFade(brick, 6.0, wood, 5.0);
				}
				else if(element == wood && (lastelement == brick || lastelement == null))
				{
					lastelement = wood;
					focusAndFade(wood, 5.0, brick, 6.0);
				}
				}
			});
	};
	
});
