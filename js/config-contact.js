/* --------------------------------------------------------------------------
 * File        : contact.js
 * Version     : 1.0
 * Author      : Indonez Team
 * Author URI  : http://indonez.com
 *
 * Indonez Copyright 2015 All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * javascript handle initialization
 		1. Map Configuration
		2. Email Configuration
 *
 * -------------------------------------------------------------------------- */


(function($) {

    "use strict";

    var themeApp = {

            theme_contact_page: function() {

                var loc = window.location;
                var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
                var template_url = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));

                //----------- 1. Map Configuration ----------- 
                var map = new GMaps({
                    el: '#impx-map',
                    lat: 40.81215,
                    lng: -73.92773,
                    zoom: 14,
                    zoomControl: true,
                    zoomControlOpt: {
                        style: 'SMALL',
                        position: 'TOP_RIGHT'
                    },
                    panControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    overviewMapControl: false
                });

                map.addMarker({
                    lat: 40.81150,
                    lng: -73.92782,
                    icon: template_url + "images/map-marker.png"
                });

                //----------- 2. Email Configuration -----------
                $('#buttonsend').click(function() {

                    var name = $('#name').val();
                    var subject = $('#subject').val();
                    var email = $('#email').val();
                    var message = $('#message').val();

                    $('.loading').fadeIn('fast');

                    if (name != "" && subject != "" && email != "" && message != "") {

                        $.ajax({
                            url: template_url + 'sendemail.php',
                            type: 'POST',
                            data: "name=" + name + "&subject=" + subject + "&email=" + email + "&message=" + message,
                            success: function(result) {
                                $('.loading').fadeOut('fast');
                                if (result == "email_error") {
                                    $('#email').css({ "background": "#FFFCFC", "border": "1px solid #ffadad" }).next('.uk-form-help-inline').text('!');
                                } else {
                                    $('#name, #subject, #email, #message').val("", "Name", "Subject", "Email", "Message");
                                    $('<div class="uk-alert uk-alert-success uk-text-center uk-margin-medium-bottom" data-uk-alert><p>Your message has been sent successfully. Thank you!</p></div>').insertBefore('#contact-form');
                                    $('.uk-alert').fadeOut(5000, function() { $(this).remove(); });
                                }
                            }
                        });
                        return false;

                    } else {
                        $('.loading').fadeOut('fast');
                        if (name == "", "Name") $('#name').css({ "background": "#FFFCFC", "border": "1px solid #ffadad" }).next('.uk-form-help-inline').text('!');
                        if (subject == "", "Subject") $('#subject').css({ "background": "#FFFCFC", "border": "1px solid #ffadad" }).next('.uk-form-help-inline').text('!');
                        if (email == "", "Email") $('#email').css({ "background": "#FFFCFC", "border": "1px solid #ffadad" }).next('.uk-form-help-inline').text(' !');
                        if (message == "", "Message") $('#message').css({ "background": "#FFFCFC", "border": "1px solid #ffadad" }).next('.uk-form-help-inline').text('!');
                        return false;
                    }
                });

                $('#name, #subject, #email,#message').focus(function() {
                    $(this).css({ "border": "none", "background": "#fafafa", "border": "1px solid #ccc" }).next('.uk-form-help-inline').text('*');
                });
            },

            // theme init
            theme_init: function() {
                themeApp.theme_contact_page();
            }

        } //end themeApp


    jQuery(document).ready(function($) {

        themeApp.theme_init();

    });

})(jQuery);