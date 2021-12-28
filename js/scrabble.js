var dict = {
	"A": 1,
	"B": 5,
	"C": 2,
	"D": 5,
	"E": 1,
	"F": 5,
	"G": 8,
	"H": 8,
	"I": 1,
	"L": 3,
	"M": 3,
	"N": 3,
	"O": 1,
	"P": 5,
	"Q": 10,
	"R": 2,
	"S": 2,
	"T": 2,
	"U": 3,
	"V": 5,
	"Z": 8
};

var validKeys = [ 
	8, //backspace
	35, 36, // end/home
	37, 39, // left/right arrow
	46, //canc
	65, 66, 67, 68, 69, 70, 71, 72, 73, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 90
];

$(function() {
	function reset() {
		$('#word').val('').focus();
		$('input[name^="mult"][value=1]').each(function(index, value) {
			$(this).prop('checked', true);
		});
		$('input[name="bingo"][value=0]').each(function(index, value) {
			$(this).prop('checked', true);
		});
		$('input[name="wordMult"][value=1]').each(function(index, value) {
			$(this).prop('checked', true);
		});
		$('#total').html(0);
	}

	function calcTotal() {
		var letterTotals = 0;
		var chars = $('#word').val().split("");
		chars.forEach(function(currentValue, index) {
			var multiplierName = 'mult' + (index+1);
			letterTotals += (dict[currentValue.toUpperCase()] * $('input[name="' + multiplierName + '"]:checked').val());
		});
		letterTotals = letterTotals * parseInt($('input[name="wordMult"]:checked').val());
		letterTotals += parseInt($('input[name="bingo"]:checked').val());
		$('#total').html(letterTotals);
	}

	reset();

	$('#word')
	.keydown(function(event){
	  if (validKeys.indexOf(event.which) < 0) {
	   event.preventDefault();
	  }
	})
	.keyup(function(){
	  var chars = $(this).val().split("");
	  $('.word-letter').each(function(index, value) {
		  if (index < chars.length) {
			$(this).html('<span class="sub fs-3">' + chars[index].toUpperCase() + '</span><span class="sub fs-7">' + dict[chars[index].toUpperCase()] + '</span>');
		  } else {
			$(this).html('');
		  }
		  calcTotal();
		});
	});

	$('.letter-mult').click(function() {
	  var $radios = $(this).parent().children('input[name^="mult"]');
	  var colorClasses = ["btn-secondary", "btn-primary", "btn-success", "btn-light"];
	  var $checked = $radios.filter(':checked');
	  var $next = $radios.eq($radios.index($checked) + 1);
	  if (!$next.length) {
		$next = $radios.first();
	  }
	  $next.prop("checked", true);
	  var newValue = $radios.filter(':checked').val();
	  $(this)
		.removeClass(colorClasses.join(" "))
		.addClass(colorClasses[newValue-1])
		.text(newValue + 'x');
	  calcTotal();
	});
	
	$('#toggleBingo').click(function() {
	  var $radios = $(this).parent().children('input[name="bingo"]');
	  var colorClasses = ["btn-secondary", "btn-primary"];
	  var $checked = $radios.filter(':checked');
	  var $next = $radios.eq($radios.index($checked) + 1);
	  if (!$next.length) {
		$next = $radios.first();
	  }
	  $next.prop("checked", true);
	  var newValue = $radios.filter(':checked').index();
	  $(this)
		.removeClass(colorClasses.join(" "))
		.addClass(colorClasses[newValue]);
	  calcTotal();
	});
	
	$('#toggleWordMult').click(function() {
	  var $radios = $(this).parent().children('input[name="wordMult"]');
	  var colorClasses = ["btn-secondary", "btn-primary", "btn-success", "btn-light"];
	  var $checked = $radios.filter(':checked');
	  var $next = $radios.eq($radios.index($checked) + 1);
	  if (!$next.length) {
		$next = $radios.first();
	  }
	  $next.prop("checked", true);
	  var newValue = $radios.filter(':checked').val();
	  $(this)
		.removeClass(colorClasses.join(" "))
		.addClass(colorClasses[newValue-1])
		.text('Parola ' + newValue + 'x');
	  calcTotal();
	});
	
	$('#reset').click(function() {
		location.reload();
	});
});