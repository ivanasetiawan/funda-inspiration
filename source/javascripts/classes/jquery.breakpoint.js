
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	// Create the defaults once
	var pluginName = 'breakpoint';
	var defaults = {
		breakpoints: [480, 768, 1160],
		label: ['XS', 'SM', 'MD', 'LG'],
		fireOnInit: true
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.$element = $(element);

		this.options = $.extend( {}, defaults, options );

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		
		// Initialize plugin
		
		init: function() {
			
			console.log('init plugin ' + this._name);

			this.orientation = this.getOrientation();
			this.currentView = false;
			
			this.addEventListeners();
			if (this.options.fireOnInit) {
				this.handleWindowResize();	
			}
		
		},

		
		// Add event listeners
		
		addEventListeners: function () {
		
			if (!$.isNumeric(this.orientation)) {
				this.$element.resize($.proxy(this, 'handleWindowResize'));	
			} else {
				this.$element.bind('orientationchange', $.proxy(this, 'handleOrientationChange'));
			}
			this.$element.on('breakpoint:fire', $.proxy(this, 'handleWindowResize'));
		
		},

		
		// Return view based on given width (CSS breakpoints)
		//
		// @Argument 				- Integer, current window width
		
		getView : function (size) {
		
			var view = false;

			for (var i = 0, iLength = this.options.breakpoints.length; i < iLength; i++) {
				if (!view && size < this.options.breakpoints[i]) {
					return this.options.label[i];
				}
			}
			return this.options.label[this.options.breakpoints.length];
			
		},

		// Return orientation; default 0
		
		getOrientation: function () {
		
			return window.orientation < 0 ? Math.abs(window.orientation) : false;
		
		},

		
		// Handle window resize event
		
		handleWindowResize: function () {
			
			var windowWidth = this.$element.width();
			var newView = this.getView(windowWidth);
			var switchView = this.currentView !== newView;

			if (switchView) {
				this.resize(newView);
			}

		},

		
		// Handle orientation change event
		
		handleOrientationChange: function () {
			
			this.resize(this.getView(this.$element.width()));

		},

		
		// Fire resize event
		//
		// @Argument 				- String, either 'XXS', 'XS', 'SM', 'MD', 'LG' and 'XL'
		
		resize: function (view) {

			this.currentView = view;
			console.log('breakpoint switch', view);
			this.$element.trigger('breakpoint:switch', view);

		}

	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
				
			}
		});
	};

})( jQuery, window, document );