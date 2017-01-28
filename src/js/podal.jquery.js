'use strict';
import styles from '../css/podal.css'
import $ from 'jquery';
import defaults from './modules/defaults';
import extendClass from './modules/utils';

// @TODO injectable html
// @TODO create event handler functions
// @TODO default parameters
(function IIFE() {
    document.querySelector('.podal-box').onclick = (e) => e.stopPropagation();

    document.querySelector('.podal-wrapper').onclick = () => PowerModal({show: false});
    document.querySelector('.podal-close').onclick = () => PowerModal({show: false});
})();

var podal, PowerModal;

export default podal = PowerModal = function (action) {
    var params = extendClass({}, defaults);
    var $podalWrapper = $('.podal-wrapper'),
        $podalBox = $('.podal-box');

    /* Global Settings */
    params.speed   = typeof action.speed !== 'undefined' ? setProperty('speed', action)   : defaults.speed;
    params.delay   = typeof action.delay !== 'undefined' ? setProperty('delay', action)   : defaults.delay;
    params.message = typeof action.delay !== 'undefined' ? setProperty('message', action) : defaults.message;

    params.cancelText  = typeof action.cancelText  !== 'undefined' ? setProperty('cancelText', action)  : defaults.cancelText;
    params.confirmText = typeof action.confirmText !== 'undefined' ? setProperty('confirmText', action) : defaults.confirmText;
    params.deleteText  = typeof action.deleteText  !== 'undefined' ? setProperty('deleteText', action)  : defaults.deleteText;

    $.each(action, function (state, value) {
        switch (state) {
            case 'show':
                if (value === true) {
                    $podalWrapper.fadeIn(params.speed);
                } else if (value === false) {
                    $podalWrapper.delay(params.delay).fadeOut(params.speed, function () {
                        PowerModal({processing: false});
                    });
                }

                break;
            case 'processing':
                var loaderWrapper, loaderContent, $loaded, $loadingBox, icon, cls, loaded, message;
                icon = "";
                cls = "";
                loaded = "podal-loader";
                message = action.message;
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
                        $loadingBox.delay(params.delay).fadeOut(params.speed);
                        return;
                }

                loaderWrapper = "<div class='podal-loading'></div>";
                loaderContent = "<div class='" + loaded + " " + cls + "'></div><i class='fa fa-processing " + icon + "'></i><p>" + message + "</p>";

                if ($loaded.is(":visible")) {
                    $loaded.delay(params.delay).html(loaderContent);
                    $loaded.children('.podal-loader').addClass('pop');
                    break;
                }

                $podalBox.delay(params.delay).prepend($(loaderWrapper).append(loaderContent).fadeIn(params.speed));

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
    window.podal = window.PowerModal = PowerModal;
} else {
    console.error('Something went very wrong');
}
