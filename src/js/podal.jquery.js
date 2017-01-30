'use strict';
import styles from '../css/podal.css';
import $ from 'jquery';
import defaults from './modules/defaults';
import extendClass from './modules/utils';

// @TODO injectable html
// @TODO create event handler functions
// @TODO default parameters
// @TODO make close icon :after
(function IIFE() {
    let podalBox = document.querySelector('.podal-box');
    podalBox.onclick = e => e.stopPropagation();

    document.querySelector('.podal-wrapper').onclick = () => PowerModal({show: false});
    document.querySelector('.podal-close').onclick = () => PowerModal({show: false});
})();

let podal, PowerModal;

export default podal = PowerModal = function (action) {
    let params = extendClass({}, defaults);
    let $podalWrapper = $('.podal-wrapper'),
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
                        $('.podal-alert').closest('.podal-wrapper').remove();
                    });
                }

                break;
            case 'processing':
                let loaderWrapper, loaderContent, $loaded, $loadingBox, icon, cls, loaded;
                icon = "";
                cls = "";
                loaded = "podal-loader";
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
                        loaded = "podal-loaded";
                        break;
                    case 'failed':
                        icon = "fa-times";
                        cls = "podal-failed";
                        loaded = "podal-loaded";
                        break;
                    case 'deleted':
                        icon = "fa-trash-o";
                        cls = "podal-failed";
                        loaded = "podal-loaded";
                        break;
                    default:
                        loaded = "";
                        $loadingBox.delay(params.delay).fadeOut(params.speed, function() {
                            $loadingBox.remove();
                            $(this).remove();
                        });
                        return;
                }

                loaderWrapper = "<div class='podal-loading'></div>";
                loaderContent = "<div class='" + loaded + " " + cls + "'></div><i class='fa fa-processing " + icon + "'></i><p>" + params.message + "</p>";

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
