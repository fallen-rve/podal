(function IIFE() {
    $('.podal-box').on('click', function(e) {
        e.stopPropagation();
    });

    $('.podal-wrapper, .podal-close').on('click', function() {
        $.podal({show: false});
    });

    $(window).on('resize', function(){
        var $podalBox = $('.podal-box'),
            $podalWrapper = $('.podal-wrapper');
        $podalBox.css('top', ($podalWrapper.height() / 2) - ($podalBox.height() / 2));
    });
    
})();

$.podal = function(action) {
    var $podalWrapper = $('.podal-wrapper'),
        $podalBox = $('.podal-box');
    if (action.show === true) {
        $podalWrapper.show();
        $podalBox.css('top', ($podalWrapper.height() / 2) - ($podalBox.height() / 2));
    } else if (action.show === false) {
        $podalWrapper.hide();
    }
};
