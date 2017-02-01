'use strict';
import styles from '../css/podal.css';
import $ from 'jquery';
import defaults from './modules/defaults';
import extendClass from './modules/utils';
import * as dom from './modules/dom';

// @TODO injectable html
// @TODO create event handler functions
// @TODO default parameters
// @TODO make close icon :after
(function IIFE() {
    let podalBox = document.querySelector('.podal-box');
    podalBox.onclick = e => e.stopPropagation();

    document.querySelector('.podal-wrapper').onclick = () => podal({show: false});
    document.querySelector('.podal-close').onclick = () => podal({show: false});
})();

let podal = function (action) {
    let params = extendClass(defaults, action);
    let $podalWrapper = $('.podal-wrapper'),
        $podalBox = $('.podal-box');

    $.each(action, function (state, value) {
        switch (state) {
            case 'show':
                if (value === true) {
                    podal.show();
                    // $podalWrapper.fadeIn(params.speed);
                } else if (value === false) {
                    podal.close();
                    // $podalWrapper.delay(params.delay).fadeOut(params.speed, function () {
                        // podal({processing: false});
                        // $('.podal-alert').closest('.podal-wrapper').remove();
                    // });
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

};
podal.processing = (toggle) => {
    console.log(toggle);
};

podal.showPodal = podal.show = () => {
    let podal = dom.getPodal();

    if (dom.isVisible(podal)) {
        console.log('it\'s already open!');
    }

    podal.style.opacity = '';
    podal.style.display = '';
    dom.removeClass(podal, 'podal-hidden');
};

podal.closePodal = podal.close = () => {
    let podal = dom.getPodal();
    if (!dom.isVisible(podal)) {
        console.log('It\'s already closed!');
    }
    dom.addClass(podal, 'podal-hidden');
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = podal;
} else {
    window.podal = window.PowerModal = podal;
}
