/*------------------------------------
	Theme Name: Prestige
	Start Date : 17-April-2017
	End Date : 
	Last change: 
	Version: 1.0
	Assigned to:
	Primary use:
---------------------------------------*/
/*	

	+ Gallery
	+ Team Shape
	+ Responsive Caret
	+ Expand Panel Resize
	+ Sticky Menu
	
	+ Document On Ready
		- Scrolling Navigation
		- Set Sticky Menu
		- Responsive Caret
		- Expand Panel
		- Collapse Panel
		- Search
		- Revolution Slider
		- Gallery
		- Counter Section
		- Blog Carousel
		- Team Carousel
		- Team Section
	
	+ Window On Scroll
		- Set Sticky Menu
		
	+ Window On Resize
		- Expand Panel Resize
		
	+ Window On Load
		- Site Loader
		
*/

(function($) {

	"use strict"
	
	/* + Gallery */
	function gallery() {
		if($(".gallery-section .gallery-list").length) {
			var $container = $(".gallery-list");
			$container.isotope({
				layoutMode: 'fitRows',
				percentPosition: true,
				itemSelector: ".gallery-box",
				gutter: 0,
				transitionDuration: "0.5s",
			});
			
			$("#filters a").on("click",function(){
				$('#filters a').removeClass("active");
				$(this).addClass("active");
				var selector = $(this).attr("data-filter");
				$container.isotope({ filter: selector });		
				return false;
			});
		}
	}
	
	/* + Team Shape */
	function team_shape() {
		$(".team-box > h3").each(function (i) {
			var team_title = $(".team-box > h3").eq(i).height();
			$(".team-box > h3").eq(i).append("<span></span>");
			$(".team-box > h3 > span").eq(i).css("border-bottom-width", team_title+22);
		});
	}
	
	/* + Responsive Caret* */
	function menu_dropdown_open(){
		var width = $(window).width();
		if($(".ownavigation .nav li.ddl-active").length ) {
			if( width > 991 ) {
				$(".ownavigation .nav > li").removeClass("ddl-active");
				$(".ownavigation .nav li .dropdown-menu").removeAttr("style");
			}
		} else {
			$(".ownavigation .nav li .dropdown-menu").removeAttr("style");
		}
	}
	
	/* + Expand Panel Resize * */
	function panel_resize(){
		var width = $(window).width();
		if( width > 991 ) {
			if($(".header_s #slidepanel").length ) {
				$(".header_s #slidepanel").removeAttr("style");
			}
		}
	}
	
	/* + Sticky Menu */
	function sticky_menu() {
		var menu_scroll = $(".header_s").offset().top;
		var scroll_top = $(window).scrollTop();
		
		if ( scroll_top > menu_scroll ) {
			$(".header_s .menu-block").addClass("navbar-fixed-top animated fadeInDown");
		} else {
			$(".header_s .menu-block").removeClass("navbar-fixed-top animated fadeInDown"); 
		}
	}
	
	/* + Document On Ready */
	$(document).on("ready", function() {

		/* - Scrolling Navigation* */
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Set Sticky Menu* */
		if( $(".header_s").length ) {
			sticky_menu();
		}
		
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').on("click", function(e) {
	
			var $anchor = $(this);
			
			$("html, body").stop().animate({ scrollTop: $($anchor.attr("href")).offset().top - 49 }, 1500, "easeInOutExpo");
			
			e.preventDefault();
		});

		/* - Responsive Caret* */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Expand Panel * */
		$("#slideit").on("click", function() {
			$("#slidepanel").slideDown(1000);
			$("html").animate({ scrollTop: 0 }, 1000);
		});	

		/* - Collapse Panel * */
		$("#closeit").on("click", function() {
			$("#slidepanel").slideUp("slow");
			$("html").animate({ scrollTop: 0 }, 1000);
		});	
		
		/* Switch buttons from "Log In | Register" to "Close Panel" on click * */
		$("#toggle a").on("click", function() {
			$("#toggle a").toggle();
		});
		
		/* - Search * */
		if($(".search-box").length){
			$("#search").on("click", function(){
				$(".search-box").addClass("active")
			});
			$(".search-box span").on("click", function(){
				$(".search-box").removeClass("active")
			});
		}
		
		panel_resize();
		
		/* - Revolution Slider */
		if($(".slider-section").length){
			$("#home-slider1").revolution({
				sliderType:"standard",
				delay:6000,
				responsiveLevels:[1920,1025,768,480],
				gridwidth:[1920,1025,768,480],
				gridheight:[757,600,500,400],
				navigation: {
					arrows:{
						enable:true,
						style:"uranus",
						hide_onmobile:true,
						hide_onleave:true,
						left: {
							h_align:"left",
							v_align:"center",
							h_offset:53,
							v_offset:0
						},
						right: {
							h_align:"right",
							v_align:"center",
							h_offset:53,
							v_offset:0
						}
					},
					bullets: {
						enable:false,
						style:"zeus",
						hide_onmobile:true,
						hide_under:767,
						hide_onleave:false,
						direction:"horizontal",
						h_align:"center",
						v_align:"bottom",
						h_offset:0,
						v_offset:40,
						space:20,
						tmp:''
					}
				},
			});
		}
	
		
		/* - Gallery */
		if($(".gallery-detail").length){
			var url;
			$(".gallery-detail").magnificPopup({
				delegate: " > a.zoom",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
				}
			});
		}
		
		/* - Gallery2 */
		$(document).ready(function() {
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: true,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
		
				fixedContentPos: false
			});
		});

		
		/* - Counter Section */
		$(".counter-section").each(function ()
		{		
			var $this = $(this);
			var myVal = $(this).data("value");	

			$this.appear(function()
			{
				var skill_item_count = 0;
				var skills_count = 0;

				skill_item_count = $( "[id*='skill_count-']" ).length;

				for(var i=1; i<=skill_item_count; i++)
				{
					skills_count = $( "[id*='skill_count-"+i+"']" ).attr( "data-skills_percent" );
					$("[id*='skill_count-"+i+"']").animateNumber({ number: skills_count }, 2000);
				}
			});				
		});
		
		/* - Blog Carousel */
		if( $(".blog-carousel").length ) {
			if($('html[dir="rtl"]').length) {
				$(".blog-carousel").owlCarousel({
					loop: true,
					margin: 30,
					nav: true,
					dots: false,
					rtl: true,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						768:{
							items: 2
						}
					}
				});
			} else {
				$(".blog-carousel").owlCarousel({
					loop: true,
					margin: 30,
					nav: true,
					dots: false,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						768:{
							items: 2
						}
					}
				});
			}
		}
		
		/* - Team Carousel */
		if( $(".team-carousel").length ) {
			if($('html[dir="rtl"]').length) {
				$(".team-carousel").owlCarousel({
					loop: true,
					margin: 30,
					nav: true,
					dots: false,
					rtl: true,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						768:{
							items: 3
						},
						992:{
							items: 4
						}
					}
				});
			} else {
				$(".team-carousel").owlCarousel({
					loop: true,
					margin: 30,
					nav: true,
					dots: false,
					autoplay: true,
					responsive:{
						0:{
							items: 1
						},
						568:{
							items: 2
						},
						700:{
							items: 3
						},
						1200:{
							items: 4
						}
					}
				});
			}
		}
				
		/* - Team Section */
		if( $(".team-section").length ) {
			team_shape();
		}
				
		/* - Color Switcher */
		if( $('#choose_color').length ) {

			 $("#default").on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/default.css");
				return false;
			});
			
			$("#green" ).on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/green.css");
				return false;
			});
			
			$("#skyblue").on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/skyblue.css");
				return false;
			});
			
			$("#orange").on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/orange.css");
				return false;
			});
			
			$("#coral" ).on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/coral.css");
				return false;
			});

			$("#cyan" ).on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/cyan.css");
				return false;
			});

			$("#khaki" ).on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/khaki.css");
				return false;
			});

			$("#pink" ).on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/pink.css");
				return false;
			});

			$("#slateblue" ).on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/slateblue.css");
				return false;
			});

			$("#gold" ).on("click", function() {
				$("#color" ).attr("href","assets/css/color-schemes/gold.css");
				return false;
			});
			
			// picker buttton
			$(".picker_close").on("click", function() {
				$("#choose_view").removeClass("position");
				$("#choose_color").toggleClass("position");
			});
		}
		
		$(".color-switcher-block li a").on("click", function() {
		  $(".color-switcher-block li").removeClass("active");
			$(this).parent().addClass("active");
		});
		
	});	/* - Document On Ready /- */
	
	/* + Window On Scroll */
	$(window).on("scroll",function() {
		/* - Set Sticky Menu* */
		if( $(".header_s").length ) {
			sticky_menu();
		}
	});
	
	/* + Window On Resize */ 
	$( window ).on("resize",function() {
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Expand Panel Resize */
		panel_resize();
		menu_dropdown_open();
		
		/* - Team Section */
		if( $(".team-section").length ) {
			team_shape();
		}
	});
	
	/* + Window On Load */
	$(window).on("load",function() {
		/* - Site Loader* */
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
		gallery();
	});

})(jQuery);