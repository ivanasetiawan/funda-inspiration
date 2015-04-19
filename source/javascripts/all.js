// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//= require_tree ./vendor/
//= require_tree ./classes/

$(document).ready(function() {
	var $window 				= $(window);

	////////
	// Flickity
	if ( $( ".gallery-flickity" ).length ) {
		var flkty = new Flickity( '.gallery-flickity', {
			freeScroll: true,
			wrapAround: true
		});		
	}

	////////

	////////
	// Blazy
	;(function() {
		var bLazy = new Blazy({

			offset: 500,

			breakpoints: [
				{
					width: 744, // Max-width
					src: 'data-src-sm'
				},
				{
					width: 980, // Max-width
					src: 'data-src-md'
				},
				{
					width: 1200, // Max-width
					src: 'data-src-lg'
				},
				{
					width: 1600, // Max-width
					src: 'data-src-xl'
				}
			],

			success: function(element) {
			}
		});
	})();
	////////

	////////
	// Menu behaviour
	(function( $ ){
		 $.fn.menuBehaviour = function(event) {
				var menuUrl 				= $(this).find('.menu__main > li > a'),
						mainNavList 		= $(this).find('.menu__main > li'),
						hamburgerMenu 	= $(this).find('.menu__hamburger'),
						closeBtn 				= $(this).find('.menu__close'),
						searchBtn 			= $(this).find('.menu__search > .icon-search');

				menuUrl.click(function(event) {
					event.preventDefault();

					if(!$(this).parents('li').hasClass('show-sub')) {
						mainNavList.removeClass('show-sub');
						$(this).parents('li').addClass('show-sub');
						$('body').addClass('menu-active');
					} else {
						$(this).parents('li').removeClass('show-sub');
						$('body').removeClass('menu-active');
					}

				});

				hamburgerMenu.click(function(event) {
					
					event.preventDefault();

					$(this).parents('.menu').addClass('active');
					$('body').addClass('menu-active');
					$(this).parents('.menu').find('.menu__nav').addClass('show-menu');
				});

				closeBtn.click(function(event) {
					
					event.preventDefault();

					$(this).parents('.menu').removeClass('active');
					$('body').removeClass('menu-active');
					$(this).parents('.menu').find('.menu__nav').removeClass('show-menu');
					$(this).parents('.menu').find('.menu__search').removeClass('show-search');
				});

				searchBtn.click(function(event) {
					event.preventDefault();
					$(this).parents('.menu__search')
						.addClass('show-search')
						.find('input')
						.focus();
				});

				////////
				// Sticky behaviour

				var getScrollPosition = $(this).outerHeight(),
						getWidth = $(this).outerWidth(),
						getPositionleft = $(this).offset().left;

				$window.scroll(function(event) {
					if ($(this).scrollTop() >= getScrollPosition) {
						$('.js_menu').addClass('is-sticky');
						$('body').css({
							'padding-top': getScrollPosition
						});
						$('.js_menu').css({
							'width': getWidth,
							'left': getPositionleft
						});
					} else {
						$('.js_menu').removeClass('is-sticky');
						$('body').css({
							'padding-top': 0
						});
						$('.js_menu').css({
							'width': 'auto',
							'left': 0
						});
					}
				});

				$window.on('resize', function() {
					getWidth = $('.site-wrapper').outerWidth(),
					getPositionleft = $('.site-wrapper').offset().left;

					if ($(this).scrollTop() >= getScrollPosition) {
						$('.js_menu').css({
							'width': getWidth,
							'left': getPositionleft
						});
					} else {
						$('.js_menu').css({
							'width': 'auto',
							'left': 0
						});
					}
				});
				////////

				return this;
		 }; 
	})( jQuery );

	$('.js_menu').menuBehaviour();

	////////


	////////
	// Breakpoints
	$window.on('breakpoint:switch', function (event, view) {

	});
	
	$window.breakpoint();
	////////

	
	////////
	// Toggle behaviour
	(function( $ ){
		$.fn.jsToggle = function(event) {
			var toggleTrigger = $(this).find('.js_toggle__trigger'),
					toggleLists 	= $(this).find('.categories__has-sub'),
					toggleTarget 	= $(this).find('.js_toggle__target'),
					toggleSelect 	= $(this).find('.js_toggle__select');

			toggleTrigger.click(function(event) {

					if(!$(this).parents('li').hasClass('show-sub')) {
						toggleLists.removeClass('show-sub');
						$(this).parents('li').addClass('show-sub');
					} else {
						$(this).parents('li').removeClass('show-sub');
					}

			});

			// Toggle behaviour select
			toggleSelect.click(function(event) {

				if(!$(this).parents('.js_toggle').hasClass('show-select')) {
					$(this).parents('.js_toggle')
						.removeClass('update-selected')
						.addClass('show-select');
				} else {
					$(this).parents('.js_toggle').removeClass('show-select');
				}

			});
			// When a link is clicked, make sure that the "Categories" is updated
			$(this).find('a').click(function(event) {
				var getText = $(this).text();
				toggleSelect.find('span').text(getText);
				$(this).parents('.js_toggle').addClass('update-selected').removeClass('show-select');
			});
			// End: Toggle behaviour select

			return this;
		 }; 
	})( jQuery );

	$('.js_toggle').jsToggle();
	////////


	////////
	// Magnific Popup
	$('.popup-modal').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom',

		preloader: false,
		focus: '#username',
		modal: true
	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	$('.popup-image').magnificPopup({type:'image'});
	
	$('.popup-video').magnificPopup({
		type:'iframe',

		iframe: {
			patterns: {

				youtube: {
					index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

					id: 'v=', // String that splits URL in a two parts, second part should be %id%
					// Or null - full URL will be returned
					// Or a function that should return %id%, for example:
					// id: function(url) { return 'parsed id'; } 

					src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
				}
			}	
		}
	});
	////////

});