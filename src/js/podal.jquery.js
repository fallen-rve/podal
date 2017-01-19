'use strict';

(function IIFE() {
    $('.podal-box').on('click', function(e) {
        e.stopPropagation();
    });

    $('.podal-wrapper, .podal-close').on('click', function() {
        Podal({show: false});
    });

    $(window).on('resize', function(){
        var $podalBox = $('.podal-box'),
            $podalWrapper = $('.podal-wrapper');
        $podalBox.css('top', ($podalWrapper.height() / 2) - ($podalBox.height() / 2));
    });

})();

var Podal = function(action) {
    var $podalWrapper = $('.podal-wrapper'),
        $podalBox = $('.podal-box');

    /* Global Settings */
    const speed = typeof action['speed'] !== 'undefined' ? setProperty('speed', action) : 0, /* in ms */
        delay = typeof action['delay'] !== 'undefined' ? setProperty('delay', action) : 0; /* default no delay */

    $.each(action, function(state, value) {
        switch (state) {
            case 'show':
                if (value == true) {
                    $podalWrapper.fadeIn(speed);
                    $podalBox.css('top', ($podalWrapper.height() / 2) - ($podalBox.height() / 2));
                } else if (value == false) {
                    $podalWrapper.delay(delay).fadeOut(speed, function() {
                        $.podal({ processing: false });
                    });
                }

                break;
            case 'processing':
                let loaderWrapper, loaderContent, $loaded,
                    icon = "",
                    cls = "",
                    loaded = "podal-loader",
                    message = action['message'],
                    $loadingBox = $loaded = $('.podal-loading');

                switch (value) {
                    case 'save':
                        icon = "fa-floppy-o";
                        break;
                    case 'load':
                        icon = "fa-hdd-o";
                        break;
                    case 'success':
                        icon = "fa-check";
                        cls = "podal-success";
                        break;
                    case 'failed':
                        icon = "fa-times";
                        cls = "podal-failed";
                        break;
                    case 'deleted':
                        icon = "fa-trash-o";
                        cls = "podal-failed";
                        break;
                    default:
                        loaded = "";
                        $loadingBox.delay(delay).fadeOut(speed);
                        return;
                }

                loaderWrapper = "<div class='podal-loading'></div>";
                loaderContent = "<div class='" + loaded + " " + cls + "'></div><i class='fa fa-processing " + icon + "'></i><p>" + message + "</p>";

                if ( $loaded.is(":visible") ) {
                    $loaded.delay(delay).html(loaderContent);
                    $loaded.children('.podal-loader').addClass('pop');
                    break;
                }

                $podalBox.delay(delay).prepend( $(loaderWrapper).append(loaderContent).fadeIn(speed) );

                break;
            default:
                break;
        }
    });
};
