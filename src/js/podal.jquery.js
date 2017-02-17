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
    document.body.addEventListener('click', (e) => {
        if (dom.hasClass(e.target, podalClasses.close) || dom.hasClass(e.target, podalClasses.wrapper)) {
            podal.close();
            return;
        }
        e.stopPropagation();
    });

})();
let podalParams = extendClass({}, defaults);

let podal = function(action, callback = () => {}) {
    podalParams = extendClass(defaults, action);
    let podalBox = document.querySelector(`.${podalClasses.box}`),
        isConfirm = false;
    if (typeof action === "undefined") {
        return {
            open: podal.open,
            close: podal.close,
            process: podal.process
        };
    }

    if (typeof callback !== "function") {
        console.error("Callback must be a function!");
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
                    $loaded.delay(podalParams.delay).show(1, function() {
                        $(this).html(loaderContent);
                        if ((icon !== 'fa-hdd-o') && (icon !== 'fa-floppy-o')) {
                            $loaded.children('.podal-loader').removeClass('podal-loaded').addClass('pop');
                        }
                    });
                    break;
                }

                $podalBox.delay(podalParams.delay).show(1, function() {
                    $(this).prepend($(loaderWrapper).append(loaderContent).fadeIn(podalParams.peed));
                });

                break;
            case 'confirm':
                switch (value) {
                    case 'warning':
                        cls = "podal-warning";
                        loaded = "podal-loaded";
                        icon = "fa-exclamation";
                        break;
                    case 'delete':
                        cls = "podal-failed";
                        loaded = "podal-loaded";
                        icon = "fa-trash";
                        break;
                    case 'load':
                        cls = "podal-loading";
                        loaded = "fa-loading";
                        icon = "fa-hdd-o";
                        break;
                    case 'failed':
                        cls = "podal-failed";
                        loaded = "podal-loaded";
                        icon = "fa-times";
                        break;
                    case 'success':
                        cls = "podal-success";
                        loaded = "podal-loaded";
                        icon = "fa-check";
                        break;
                    default:
                        cls = "";
                        return;
                }

                var cancelElement = "",
                    confirmElement = "",
                    deleteElement = "",
                    styleTop = "";

                if (podalParams.cancelText) {
                    cancelElement = `<button type='button' class='alert-cancel'>${podalParams.cancelText}</button>`;
                }

                if (podalParams.confirmText) {
                    confirmElement = `<button type='button' class='alert-confirm'>${podalParams.confirmText}</button>`;
                }

                if (podalParams.deleteText) {
                    deleteElement = `<button type='button' class='alert-delete'>${podalParams.deleteText}</button>`;
                }

                if (!podalParams.cancelText && !podalParams.confirmText && !podalParams.deleteText) {
                    styleTop = "style='top: 68%'";
                }

                var podalPopup = `
                <div class='${podalClasses.box}'>
                    <div class='${podalClasses.loading} ${podalClasses.alert}'>
                        <div class='${podalClasses.loader} ${loaded} ${cls}'></div>
                        <i class='fa fa-processing ${icon}'></i>
                        <p ${styleTop}>${podalParams.message}</p>
                        <div class='button-wrapper'>
                            ${cancelElement} ${confirmElement} ${deleteElement}
                        </div>
                    </div>
                </div>
                `.replace(/(^|\n)\s*/g, '');

                let podalContainer = document.createElement('div');
                podalContainer.className = podalClasses.wrapper;
                podalContainer.innerHTML = podalPopup;

                document.body.appendChild(podalContainer);

                var lastPodal = document.body.querySelector('.podal-wrapper:last-child');
                console.log(lastPodal);
                var lastBox = lastPodal.querySelector('.podal-box');
                var lastLoader = lastBox.querySelector('.podal-loading');

                if (podalParams.cancelText) {
                    lastBox.querySelector('.alert-cancel').onclick = function() {
                        document.body.removeChild(lastPodal);
                    };
                }

                if (podalParams.confirmText || podalParams.deleteText) {
                    lastLoader.style.display = '';
                    lastPodal.delay(podalParams.delay).fadeIn(podalParams.speed);

                    lastLoader.addClass('pop');

                    $('.alert-delete, .alert-confirm').one('click', function() {
                        lastPodal.delay(podalParams.delay).fadeIn(podalParams.speed, function() {
                            callback(true);
                            lastPodal.remove();
                        });
                    });
                } else {
                    lastLoader.style.display = 'block';
                    dom.fadeIn(lastPodal, function() {
                        dom.delay(function(){
                            console.log("callback!");
                            dom.fadeOut(lastPodal, function() {
                                console.log("callback!");
                                document.body.removeChild(lastPodal);
                            }, podalParams.speed);
                        }, podalParams.delay)
                    }, podalParams.speed);
                }

                break;
            default:
                break;
        }
    });
    return callback(isConfirm);
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
    dom.removeClass(modal, podalClasses.hide);
};

podal.closePodal = podal.close = () => {
    //@TODO handle fade out
    let modal = dom.getPodal();
    if (!dom.isVisible(modal)) {
        console.log('It\'s already closed!');
    }
    dom.addClass(modal, podalClasses.hide);
    podal.process(false);
};

podal.preProcess = (callback) => {
    if (typeof callback === "function") {
        callback();
    } else {
        console.error("preProcess callback must be a function!");
    }
};
podal.postProcess = (callback) => {
    if (typeof callback === "function") {
        callback();
    } else {
        console.error("postProcess Callback must be a function!");
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = podal;
} else {
    window.podal = window.PowerModal = podal;
}
