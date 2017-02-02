'use strict';
import styles from '../css/podal.css';
import $ from 'jquery';
import defaults from './modules/defaults';
import extendClass from './modules/utils';
import * as dom from './modules/dom';
import {podalClasses} from './modules/classes';

// @TODO injectable html
// @TODO create event handler functions
// @TODO make close icon :after
(function IIFE() {
    document.querySelector(`.${podalClasses.wrapper}`).addEventListener('click', (e) => {
        if (dom.hasClass(e.target, podalClasses.close) || dom.hasClass(e.target, podalClasses.wrapper)) {
            podal.close();
            return;
        }
        e.stopPropagation();
    });

})();
let podalParams = extendClass({}, defaults);

let podal = function (action) {
    podalParams = extendClass(defaults, action);
    let $podalBox = $(`.${podalClasses.box}`);

    if (typeof action === "undefined") {
        return {
            open: podal.open,
            close: podal.close,
            process: podal.process
        };
    }

    $.each(action, function (state, value) {
        switch (state) {
            case 'show':
                if (value === true) {
                    podal.open();
                } else if (value === false) {
                    podal.close();
                }

                break;
            case 'processing':
                let loaderWrapper, loaderContent, $loaded, $loadingBox, icon, cls, loaded;
                icon = "";
                cls = "";
                loaded = podalClasses.loaded;
                $loadingBox = $loaded = $(podalClasses.loading);

                switch (value) {
                    case 'save':
                        icon = "fa-floppy-o";
                        break;
                    case 'load':
                        icon = "fa-hdd-o";
                        break;
                    case 'success':
                        icon = "fa-check";
                        cls = podalClasses.success;
                        break;
                    case 'failed':
                        icon = "fa-times";
                        cls = podalClasses.failed;
                        break;
                    case 'deleted':
                        icon = "fa-trash-o";
                        cls = podalClasses.failed;
                        break;
                    default:
                        loaded = "";
                        $loadingBox.delay(podalParams.delay).fadeOut(podalParams.speed, function() {
                            $loadingBox.remove();
                            $(this).remove();
                        });
                        return;
                }

                loaderWrapper = `<div class='${podalClasses.loading}'></div>`;
                loaderContent = `<div class='${loaded} ${cls}'></div><i class='fa fa-processing ${icon}'></i><p>${podalParams.message}</p>`;

                if (dom.isVisible(loaded)) {
                    $loaded.delay(podalParams.delay).html(loaderContent);
                    $loaded.children('.podal-loader').addClass('pop');
                    break;
                }

                $podalBox.delay(podalParams.delay).prepend($(loaderWrapper).append(loaderContent).fadeIn(podalParams.speed));

                break;
            default:
                break;
        }
    });

};
podal.process = (toggle) => {
    podal.preProcess(podalParams.preProcess);
    console.log(toggle);
    podal.postProcess(podalParams.postProcess);
};

podal.openPodal = podal.open = () => {
    //@TODO handle fade in
    let modal = dom.getPodal();

    if (dom.isVisible(modal)) {
        console.log('it\'s already open!');
    }

    modal.style.opacity = '';
    modal.style.display = '';
    dom.removeClass(modal, podalClasses.hidden);
};

podal.closePodal = podal.close = () => {
    //@TODO handle fade out
    let modal = dom.getPodal();
    if (!dom.isVisible(modal)) {
        console.log('It\'s already closed!');
    }
    dom.addClass(modal, podalClasses.hidden);
    podal.process(false);
};

podal.preProcess  = (callback) => { if (typeof callback === "function") { callback(); } else { console.error("preProcess callback must be a function!"); } };
podal.postProcess = (callback) => { if (typeof callback === "function") { callback(); } else { console.error("postProcess Callback must be a function!"); } };

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = podal;
} else {
    window.podal = window.PowerModal = podal;
}
