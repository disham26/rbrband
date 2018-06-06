(function() {
    if ($('.bbfb-video').length == 0) return;
    $('.bbfb-video').each(function() {
         var fb = this,
         id = this.id;
        $(fb).click( function() {
            var href = $(this).attr('data-link');
            $(this).empty();
            $(this).append('<div class="fb-video" data-allowfullscreen="true" data-width="160" data-href="'+href+'"></div>');
            //Re-parse the parent
            FB.XFBML.parse(document.getElementById(id));
            //Autoplay
            FB.Event.subscribe('xfbml.ready', function(msg) {
                if (msg.type === 'video') {
                    msg.instance.play();
                }
            });
        });
    });
})();
