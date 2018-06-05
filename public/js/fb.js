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
function sizeEmbed() {
    var imgHeight = $('.bbfb-thumb').height(); //Find thumbnail height
    $('.bbfb-video').css('height', imgHeight); //Set that as the height of the parent div
}
sizeEmbed(); //Call it on page load
$(window).resize(sizeEmbed); //Call it again if the window is resized