var vd = vd || [];

var vd.FileDrop = null;

(function ($){

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
			
			Object.append(Element.NativeEvents, {
				dragenter: 2,
				dragleave: 2,
				dragover: 2,
				drop: 2
			});
			
			this.container.addEvents({
				dragleave: function(event) {
					event.preventDefault();
					
					if( self.options.overClass && self.options.overClass != null ) {
						self.container.removeClass(self.options.overClass);
					}
					
					if( typeof(self.options.dragleave) == 'function' ) {
						self.options.onDragLeave.call(self, event);
					}
				}.bind(this),
				'dragenter': function(event) {
					event.preventDefault();
					
					if( self.options.overClass && self.options.overClass != null ) {
						self.container.addClass(self.options.overClass);
					}
					
					if( typeof(self.options.dragenter) == 'function' ) {
						self.options.onDragEnter.call(self, event);
					}
				}.bind(this),
				dragover: function(event) {
					event.preventDefault();
					
					if( typeof(self.options.dragover) == 'function' ) {
						self.options.onDragOver.call(self, event);
					}
				}.bind(this),
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
		getElement: function() {
			return this.container;
		},
		toElement: function() {
			return this.getElement();
		},
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