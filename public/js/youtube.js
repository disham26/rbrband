    /* Light YouTube Embeds by @labnol */
    /* Web: http://labnol.org/?p=27941 */

    document.addEventListener("DOMContentLoaded",
        function() {
            var div, n,
                v = document.getElementsByClassName("youtube-player");
            for (n = 0; n < v.length; n++) {
                div = document.createElement("div");
              /*  div.setAttribute("data-id", v[n].dataset.id);
                div.innerHTML = labnolThumb(v[n].dataset.id);*/
                  if (v[n].id.startsWith("SoundCloud")){
                div.setAttribute("data-id", v[n].id);
                div.innerHTML = labnolThumbSC(v[n].id);
                div.onclick = labnolIframeSC;
                v[n].appendChild(div);
                  }else if(v[n].id.startsWith("Google")){
                div.setAttribute("data-id", v[n].id);
                div.innerHTML = labnolThumbGP(v[n].id);
                /*div.onclick = labnolIframeGP;*/
                v[n].appendChild(div);
                  } else{
                  div.setAttribute("data-id", v[n].id);
                div.innerHTML = labnolThumb(v[n].id);
                div.onclick = labnolIframe;
                v[n].appendChild(div);
            }
            }
        });

    function labnolThumb(id) {
        var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
            play = '<div class="play"></div>';
        return thumb.replace("ID", id) + play;
    }
    function labnolThumbSC(id) {
        var thumb = '<img src="https://i1.sndcdn.com/avatars-000324856366-20cmxf-t500x500.jpg" style="height:180px;width:320px;">',
            play = '<div class="playSC"></div>';
        return thumb + play;
    }

    function labnolThumbGP(id) {       


         /* var  play = '<div class="playGP"></div>';*/
         var play= '<iframe src="https://drive.google.com/file/d/GPID/preview"></iframe>'
        return play.replace("GPID", id.split("Google")[1]);
    }




    function labnolIframe() {
        var iframe = document.createElement("iframe");
        var embed = "https://www.youtube.com/embed/ID?autoplay=1";
        iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "1");
        this.parentNode.replaceChild(iframe, this);
    }
    function labnolIframeSC() {
        var iframe = document.createElement("iframe");
        var embed = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/SCID&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
        iframe.setAttribute("src", embed.replace("SCID", this.dataset.id.split("SoundCloud")[1]));
        iframe.setAttribute("frameborder", "no");
        iframe.setAttribute("allowfullscreen", "1");
        this.parentNode.replaceChild(iframe, this);
    }

    function labnolIframeGP() {
        var iframe = document.createElement("iframe");
        var embed = "https://drive.google.com/file/d/GPID/preview";
        iframe.setAttribute("src", embed.replace("GPID", this.dataset.id.split("Google")[1]));
        iframe.setAttribute("frameborder", "no");
        iframe.setAttribute("allowfullscreen", "1");
        this.parentNode.replaceChild(iframe, this);
    }
