chrome.runtime.onMessage.addListener(function transfer(config, sender){
    // Create new div for the magnifier
    $('body').after('<div id="_magnify_scope"><div id="_bottom_layer"></div></div>');

    var imageUrl = config.snapshot_url;
    var strength = config.magnifier_str;
    var magniSize = config.magnifier_size;
    // Remove the listener since it's no longer needed
    chrome.runtime.onMessage.removeListener(transfer);

    var magnifier = document.getElementById("_bottom_layer");
    magnifier.style.background = "url('" + imageUrl + "') no-repeat";
    magnifier.style.transform = "scale(" + strength + ")";
    magnifier.style.width = magniSize/strength + "px";
    magnifier.style.height = magniSize/strength + "px";
    magnifier.style.boxShadow = "0 0 0 " + 7/strength + "px rgba(255, 255, 255, 0.85), " +
        "0 0 " + 7/strength + "px " + 7/strength + "px rgba(0, 0, 0, 0.25), " +
        "inset 0 0 " + 40/strength + "px "+ 2/strength + "px rgba(0, 0, 0, 0.25)";

    $('#_magnify_scope').mousemove(function(mm_event){
        // Fade-in and fade-out the glass if the mouse is inside the page
        if(mm_event.pageX < $(this).width()-1 && mm_event.pageY < $(this).height()-4 && mm_event.pageX > 0 && mm_event.pageY > 0)
        {
            $('#_bottom_layer').fadeIn(100);
        }
        else
        {
            $('#_bottom_layer').fadeOut(100);
        }

        if($('#_bottom_layer').is(':visible'))
        {
            // Calculate the relative position of large image
            var x_offset = Math.round(mm_event.pageX - $('#_bottom_layer').width()/2)*-1;
            var y_offset = Math.round(mm_event.pageY - $('#_bottom_layer').height()/2)*-1;
            var bg_position = x_offset + "px " + y_offset + "px";

            // Move the magnifying glass with the mouse
            var x_position = mm_event.pageX - $('#_bottom_layer').width()/2;
            var y_position = mm_event.pageY - $('#_bottom_layer').height()/2;

            $("#_bottom_layer").css({left: x_position, top: y_position, backgroundPosition: bg_position});
        };
    });

    $('#_bottom_layer').keydown(function(kd_event){
        $('#_magnify_scope').remove();
    });

    $('#_bottom_layer').mousedown(function(md_event){
        $('#_magnify_scope').remove();
    });



});