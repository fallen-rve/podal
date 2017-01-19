'use strict';
const $ = require('jquery');

// @TODO injectable html
// @TODO create event handler functions
// @TODO default parameters

$(document).ready(function(){
    $('.podal-box').on('click', function(e) {
        e.stopPropagation();
    });

    $('.podal-wrapper, .podal-close').on('click', function() {
        PowerModal({show: false});
    });

    $(window).on('resize', function(){
        var $podalBox = $('.podal-box'),
            $podalWrapper = $('.podal-wrapper');
        $podalBox.css('top', ($podalWrapper.height() / 2) - ($podalBox.height() / 2));
    });

});

var podal, PowerModal;

export default podal = PowerModal = function Podal(action) {
    var $podalWrapper = $('.podal-wrapper'),
        $podalBox = $('.podal-box');

    /* Global Settings */
    const speed = typeof action.speed !== 'undefined' ? setProperty('speed', action) : 0, /* in ms */
        delay = typeof action.delay !== 'undefined' ? setProperty('delay', action) : 0; /* default no delay */

    $.each(action, function(state, value) {
        switch (state) {
            case 'show':
                if (value === true) {
                    $podalWrapper.fadeIn(speed);
                    $podalBox.css('top', ($podalWrapper.height() / 2) - ($podalBox.height() / 2));
                } else if (value === false) {
                    $podalWrapper.delay(delay).fadeOut(speed, function() {
                        PowerModal({ processing: false });
                    });
                }

                break;
            case 'processing':
                var loaderWrapper, loaderContent, $loaded;
                var icon = "",
                    cls = "",
                    loaded = "podal-loader",
                    message = action.message,
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

    function setProperty(index, action) {
        let value = action[index];
        delete action[index];
        return value;
    }
};

if (typeof window !== 'undefined') {
  window.podal = window.PowerModal = podal;
} else {
  console.error('Something went very wrong');
}
