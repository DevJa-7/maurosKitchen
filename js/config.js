/* --------------------------------------------------------------------------
 * File        : config.js
 * Version     : 1.0
 * Author      : IMediapixel
 * Author URI  : http://themeforest.net/user/imediapixel
 *
 * Indonez Copyright 2016 All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * javascript handle initialization
      1. Event Countdown
      2. Product Rating
      3. Price Range
 *
 * -------------------------------------------------------------------------- */
(function($){

	"use strict";
	
	var themeApp = {
		//---------- 1. Product Desc Slider -----------
	    event_countdown:function() {
		    var event_countdown = $('.impx-event-clock').countdown('2016/06/10', function(event) {
			$(this).html(event.strftime(''
				+ '<div class="impx-event-day"><h2>%D</h2> <span>days</span></div> '
				+ '<div class="impx-event-hour"><h2>%H</h2> <span>hr</span></div> '
				+ '<div class="impx-event-minute"><h2>%M</h2> <span>min</span></div> '
				+ '<div class="impx-event-second"><h2>%S</h2> <span>sec</span></div>'));
			});
	    },

	    //---------- 2. Product Rating -----------
		product_rating:function() {
			//Product Rating
			var star0 = $('.0star-rating');
			var star1 = $('.1star-rating');
			var star2 = $('.2star-rating');
			var star3 = $('.3star-rating');
			var star4 = $('.4star-rating');
			var star5 = $('.5star-rating');

			star0.rating({
	            theme: 'fontawesome-stars',
	            initialRating: '0'
	        });

	        star1.rating({
	            theme: 'fontawesome-stars',
	            initialRating: '1'
	        });

	        star2.rating({
	            theme: 'fontawesome-stars',
	            initialRating: '2'
	        });

	        star3.rating({
	            theme: 'fontawesome-stars',
	            initialRating: '3'
	        });

	        star4.rating({
	            theme: 'fontawesome-stars',
	            initialRating: '4'
	        });

	        star5.rating({
	            theme: 'fontawesome-stars',
	            initialRating: '5'
	        });
        },

        //---------- 3. Product Rating -----------
		price_range:function() {
			$( "#slider-range" ).slider({
              range: true,
              min: 0,
              max: 8000,
              values: [ 0, 8000 ],
              slide: function( event, ui ) {
                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
              }
            });
            $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
              " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        },

        //---------- 4. Counter -----------
		impx_counter:function() {
			$( ".impx-timer" ).countTo();
        },

	  // theme init
      theme_init:function(){
      	 themeApp.event_countdown();
      	 themeApp.product_rating();
      	 themeApp.price_range();
      	 themeApp.impx_counter();
      }
		
	}//end themeApp
	
	
	jQuery(document).ready(function($){
	   	   
		themeApp.theme_init();

    });
	
})(jQuery);