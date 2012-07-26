// Creates the namespace if not exists
var vd = vd || [];

var vd.FileDrop = null;

// use (function($) { ... }) to ensure no conflict with other libraries
// like jQuery
(function ($){
	
	/**
	 * FileDrop : class that transforms an HTML element into a File Droppable
	 *            element.
	 * Usage : var fileDrop = new vd.FileDrop(element, options);
	 * 	where: 
	 *    - 'element' can be a css selector (in string) or a Element object
	 *    - 'options' is an array of options :
	 *         * overClass : the class to set to the element when the user
	 *                       is dragging an object in the drop zone
	 *         * onDragLeave : handler called when the user leave the drop zone
	 *         * onDropEnter : handler called when the user drag an item over
	 *                         the drop zone
	 *         * onDragOver : 
	 *         * onDrop : handler called when the user drop an item in the
	 *                    the drop zone
	 */
	vd.FileDrop = new Class({
		Implements: [Options],
		initialize: function(containerOrSelector, options) {
			
			this.setOptions(options);
			
			if( typeof(containerOrSelector) == 'string' ) {
				this.container = $$(containerOrSelector)[0];
			} else {
				this.container = containerOrSelector;
			}
			
			this._bind();
		},
		_bind: function() {
			var self = this;
			
			// Declares 4 events as native events.
			Object.append(Element.NativeEvents, {
				dragenter: 2,
				dragleave: 2,
				dragover: 2,
				drop: 2
			});
			
			this.container.addEvents({
				// When the user's mouse leave the element (without dropping the
				// dragged element)
				dragleave: function(event) {
					event.preventDefault();
					
					if( self.options.overClass && self.options.overClass != null ) {
						self.container.removeClass(self.options.overClass);
					}
					
					if( typeof(self.options.dragleave) == 'function' ) {
						self.options.onDragLeave.call(self, event);
					}
				}.bind(this),
				 // When the user's mouve enters in the drop zone
				'dragenter': function(event) {
					event.preventDefault();
					
					if( self.options.overClass && self.options.overClass != null ) {
						self.container.addClass(self.options.overClass);
					}
					
					if( typeof(self.options.dragenter) == 'function' ) {
						self.options.onDragEnter.call(self, event);
					}
				}.bind(this),
				// When the user's mouse moves over the drop zone
				dragover: function(event) {
					event.preventDefault();
					
					if( typeof(self.options.dragover) == 'function' ) {
						self.options.onDragOver.call(self, event);
					}
				}.bind(this),
				// When the user drop an item in the drop zone
				drop: function(event) {
					event.preventDefault();
					
					if( self.options.overClass && self.options.overClass != null ) {
						self.container.removeClass(self.options.overClass);
					}
					
					if( typeof(self.options.onDrop) == 'function' ) {
						self.options.onDrop.call(self, event.event.dataTransfer.files, event);
					}
				}.bind(this)
			});
		},
		/**
		 * Alias for FileDrop.toElement(). Deprecated
		 */
		getElement: function() {
			return this.container;
		},
		/**
		 * Returns the Element Object
		 */
		toElement: function() {
			return this.getElement();
		},
		/**
		 * Availables options for this class
		 */
		options: {
			overClass: null,
			onDragLeave: function(event) {},
			onDragEnter: function(event) {},
			onDragOver: function(event) {},
			onDrop: function(files, event) {}
		},
		container: null
	});

})(document.id);