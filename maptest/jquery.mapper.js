(function($) {

	$.fn.mapper = function(opts) {
		
		var settings = $.extend({
			//
		}, opts);
	
		return this.each(function() {
			var _address = $(this).html(),
				_href = encodeURIComponent($(this).text());
			
			if ($.browser.android) {
				_href = 'http://maps.google.com/?saddr=Current%20Location&daddr=' + _href;
			} else if ($.browser.iphone) {
				_href = 'http://maps.apple.com/?saddr=current_location&daddr=' + _href;
			} else if ($.browser.mobile && $.browser.platform == 'windows phone') {
				_href = 'maps:' + _href;
			} else {
				return;
			}
			
			$(this).replaceWith($("<a/>", {"href" : _href}).html(_address));
		
		});
		
	}

}(jQuery));