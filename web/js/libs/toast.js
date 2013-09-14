// TODO: The whole free library thing

var Toast = (function () {
	var toast;
	
	var preset = {
		DEFAULT_DURATION: 2000
	};

	return Toast;

	function Toast (options)
	{
		if (options !== undefined && options.text !== undefined) {
			
			createToast(options.text);

			if (options.duration !== undefined || options.duration > 0) {
				showToast(options.duration);
			} 
			else {
				showToast(preset.DEFAULT_DURATION);
			}
		}
		else {
			throw new Error('Insufficient amount of data to create toast.');
		}
	}


	function createToast (text)
	{		
		toast = $('<div />')
		.attr('id', 'toast')
		.css('zIndex', '10000')
		.css('background-color', '#323232')
		.css('width', '67%')
		.css('-webkit-box-shadow','#444 0px 3px 2px -2px inset, #222 0px 0px 8px')
		.css('box-shadow', '#444 0px 3px 2px -2px inset, #222 0px 0px 8px')
		.css('border-radius', '2px')
		.css('padding', '7px 3px')
		.css('position', 'absolute')
		.css('bottom', '12%')
		.css('marginLeft', (document.width - document.width*0.67)/2 + 'px')
		.css('overflow', 'hidden')
		.css('text-align', 'center')
		.css('color', '#FFF')
		.css('font-size', '13px')
		.css('line-height', '18px')
		.text(text);
	}

	function showToast (duration)
	{
		if (document.getElementById('toast') !== null) {
			$('#toast').remove();
		}

		$('body').append(toast);

		$('#toast').hide().fadeIn('slow').animate({ opacity: '+=0' }, duration).fadeOut('slow', function(){ this.remove()});
	}
}());