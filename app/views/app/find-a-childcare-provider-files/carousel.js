jQuery.noConflict();

jQuery(document).ready(function($) {

		   
	// hide labels
	$('.jshide').hide();

	// HTML5 placeholder="" fallback
	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur().parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});
	
	// font size switcher
	$('#fontSize_large').click(function() {
		$('body').addClass('text_120');
		$('body').removeClass('text_150');
		$('#fontSize_normal').css('text-decoration', 'none');
		$('#fontSize_large').css('text-decoration', 'underline');
		$('#fontSize_larger').css('text-decoration', 'none');
		
		$('.fontSize a').removeClass('cur');
		$(this).addClass('cur');
		
		$.cookie('fontSize', 'large');
		
		return false;
	});
	$('#fontSize_larger').click(function() {
		$('body').removeClass('text_120');
		$('body').addClass('text_150');
		$('#fontSize_normal').css('text-decoration', 'none');
		$('#fontSize_large').css('text-decoration', 'none');
		$('#fontSize_larger').css('text-decoration', 'underline');
		
		$('.fontSize a').removeClass('cur');
		$(this).addClass('cur');
		
		$.cookie('fontSize', 'larger');
		
		return false;
	});
	$('#fontSize_normal').click(function() {
		$('body').removeClass('text_120');
		$('body').removeClass('text_150');
		$('#fontSize_normal').css('text-decoration', 'underline');
		$('#fontSize_large').css('text-decoration', 'none');
		$('#fontSize_larger').css('text-decoration', 'none');
		
		$('.fontSize a').removeClass('cur');
		$(this).addClass('cur')
		
		$.cookie('fontSize', 'normal');
		
		return false;
	});
	
	$(document).ready(function() {
  	$('#fontSize_normal').css('text-decoration', 'underline');
	});
	
	// switch stylesheet
	$('#styleContrast').click(function() {
		$('#highContrast').attr({
			href: 'highcontrast.css'
		});
		
		$('#styleNormal').removeClass('cur');
		$(this).addClass('cur');
		
		$('#logo img').attr('src', 'images/hicontrast/logo.png');
		
		$.cookie('stylesheet', 'highcontrast');
		
		return false;
	});
	$('#styleNormal').click(function() {
		$("#highContrast").attr({
			href: '#'
		});

		$('#styleContrast').removeClass('cur');
		$(this).addClass('cur');
		
		$('#logo img').attr('src', 'images/logo.png');
		
		$.cookie('stylesheet', 'normal');
		
		return false;
	});

	// cookies
	var stylesheet = $.cookie('stylesheet');
	if(stylesheet == 'highcontrast') {
		$('#highContrast').attr({
			href: 'highcontrast.css'
		});
		
		$('#styleNormal').removeClass('cur');
		$('#styleContrast').addClass('cur');
		
		$('#logo img').attr('src', 'images/hicontrast/logo.png');
	}
	if(stylesheet == 'normal') {
		$("#highContrast").attr({
			href: '#'
		});

		$('#styleContrast').removeClass('cur');
		$('#styleNormal').addClass('cur');
		
		$('#logo img').attr('src', 'images/logo.png');
	}
	
	var fontSize = $.cookie('fontSize');
	if(fontSize == 'large') {
		$('body').addClass('text_120');
		$('body').removeClass('text_150');
		
		$('.fontSize a').removeClass('cur');
		$('#fontSize_large').addClass('cur');

	}
	if(fontSize == 'larger') {
		$('body').removeClass('text_120');
		$('body').addClass('text_150');
		
		$('.fontSize a').removeClass('cur');
		$('#fontSize_larger').addClass('cur');
		
	} 
	if(fontSize == '' || fontSize == 'normal') {
		$('body').removeClass('text_120');
		$('body').removeClass('text_150');
		
		$('.fontSize a').removeClass('cur');
		$('#fontSize_normal').addClass('cur')

	}

});