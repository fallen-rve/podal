'use strict';

$(document).ready(function() {
    $('.podal-box').on('click', function(e) {
        if ( $(e.target)[0] == $('.podal-close')[0] ) {
            return;
        }
        e.stopPropagation();
    });
    $('body').on('click', '.podal-alert', function(e) {
        e.stopPropagation();
    });
});

var podal = function(action, callback) {
    var $podalWrapper = $('.podal-wrapper'),
        $podalBox = $('.podal-box'),
        isConfirm = false;

    if (typeof callback !== "function") {
        callback = function(){};
    }

    $.each(action, function(state, value) {
        switch (state) {
            case 'show':
                if (value) {
                    $podalWrapper.fadeIn(speed);
                    $podalBox.css('top', ($podalWrapper.height() / 2) - ($podalBox.height() / 2));
                } else if (!value) {
                    $podalWrapper.delay(delay).fadeOut(speed, function() {
                        podal({ processing: false });
                        $('.podal-alert').closest('.podal-wrapper').remove();
                    });
                }

                break;
            case 'processing':
                var icon = "",
                    cls = "",
                    loaded = "podal-loader",
                    $loadingBox = $('.podal-loading');

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
                        $loadingBox.delay(delay).fadeOut(speed, function() {
                            $loadingBox.remove();
                            $(this).remove();
                        });
                        return;
                }

                var loaderWrapper = "<div class='podal-loading'></div>",
                    loaderContent = "<div class='podal-loader " + loaded + " " + cls + "'></div><i class='fa fa-processing " + icon + "'></i><p>" + message + "</p>",
                    $loaded = $('.podal-loading');

                if ( $loaded.is(":visible") ) {
                    $loaded.delay(delay).show(1, function(){
                        $(this).html(loaderContent);
                        if ((icon != 'fa-hdd-o') && (icon != 'fa-floppy-o')) {
                            $loaded.children('.podal-loader').removeClass('podal-loaded').addClass('pop');
                        }
                    });
                    break;
                }

                $podalBox.delay(delay).show(1, function(){
                    $(this).prepend( $(loaderWrapper).append(loaderContent).fadeIn(speed) );
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

                if (cancelText) {
                    cancelElement = "<button type='button' class='alert-cancel'>" + cancelText + "</button>";
                }

                if (confirmText) {
                    confirmElement = "<button type='button' class='alert-confirm'>" + confirmText + "</button>";
                }

                if (deleteText) {
                    deleteElement = "<button type='button' class='alert-delete'>" + deleteText + "</button>";
                }

                if (!cancelText && !confirmText && !deleteText) {
                    styleTop = "style='top: 68%'";
                }

                var podalPopup = "<div class='podal-wrapper'>" +
                    "<div class='podal-box'>" +
                    "<div class='podal-loading podal-alert'>" +
                    "<div class='podal-loader " + loaded + " " + cls + "'></div>" +
                    "<i class='fa fa-processing " + icon + "'></i>" +
                    "<p " + styleTop + ">" + message + "</p>" +
                    "<div class='button-wrapper'>" +
                    cancelElement + confirmElement + deleteElement +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $('body').delay(delay).append(podalPopup);

                var $lastPodal = $('.podal-wrapper:last'),
                    $lastBox = $lastPodal.find('.podal-box'),
                    $lastLoader = $lastBox.find('.podal-loading');

                if (cancelText) {
                    $lastBox.find('.alert-cancel').one('click', function() {
                        $lastPodal.remove();
                    });
                }

                if (confirmText || deleteText) {
                    $lastLoader.show();
                    $lastBox.css('top', ($lastPodal.height() / 2) - 150);
                    $lastPodal.delay(delay).fadeIn(speed);

                    $lastLoader.addClass('pop');

                    $('.alert-delete, .alert-confirm').one('click', function() {
                        $lastPodal.delay(delay).fadeIn(speed, function() {
                            callback(true);
                            $lastPodal.remove();
                        });
                    });
                } else {
                    $lastLoader.show();
                    $lastBox.css('top', ($lastPodal.height() / 2) - 150);
                    $lastPodal.fadeIn(speed, function() {
                        if (delay) {
                            $lastPodal.delay(delay).fadeOut(speed, function() {
                                $lastPodal.remove();
                            })
                        }
                    });
                }

                break;
            default:
                break;
        }
    });
    return callback(isConfirm);
};

function setProperty(index, action) {
    var value = action[index];
    delete action[index];
    return value;
}
