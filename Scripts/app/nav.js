(function () {
    $('.navbar a, .pull-right a').on('click', function (event) {
        var href = $(event.target).attr('href');
        scrollTop(href === '#' ? 0 : $(href).offset().top);
        event.preventDefault();
    });

    $('.download a').on('click', function (event) {
        var href = $(event.target).attr('href');
        scrollTop($('#download').offset().top);
        $('.nav-tabs a[href=' + href + ']').click();
        event.preventDefault();
    });

    function scrollTop(value) {
        $('html, body').animate({ scrollTop: value }, 100);
    }
}());