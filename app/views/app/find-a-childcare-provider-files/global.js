jQuery.noConflict();
jQuery(document).ready(function ($) {

    //display the carousel tabs
    $('.featured .tabs').show();
    $('.featured .tabs').tabs('.panes .pane');

    //temporary fix for Highway navigation link to www.essexhighways.org
    $("a[title='Transport and Roads']").attr("href", "http://www.essexhighways.org");

    //Stop enter key operatoin in DixerIt control
    //Open DixerIt menu when user clicks with mouse
    var dixerItName = $('input[id$="imagebuttonDixerIt"]').attr('name').toString();

    var mousePressed = -1;
    $('input[id$="imagebuttonDixerIt"]').mousedown(function (e) {
        WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(dixerItName, "", true, "", "", false, false));
        mousePressed = 0;
    });

    $('input[id$="imagebuttonDixerIt"]').click(function () {
        if (mousePressed < 0)
            return false;
        else {
            mousePressed = -1;
            return true;
        }
    });
    //End of Stop enter key operatoin in DixerIt control

    animateCarousel();

    function animateCarousel() {
        var items = $('.featured .tabs li');
        var carouselInterval = 10000;
        var animate = true;
        var index = 0;

        if (items.length > 0) {
            var carouselTimerId = window.setInterval(function () {

                if (!animate)
                    return;

                index++;
                if (index > items.length)
                    index = 0;

                var item = $('li:nth-child( ' + (index + 1) + ' ) a', '.featured .tabs');
                if (item != null)
                    item.click();
            }, carouselInterval);
        }

        items.mouseenter(function () {
            animate = false;
        });

        items.mouseleave(function () {
            animate = true;
        });
    }
});
