var captionFade = null;

function backToTop() {
    $('html, body').animate({
        scrollTop: 0
    });
}

function getFilename(path) {
    return path.split('/').pop().split('.')[0];
}

function getCarouselIndicator(src) {
    return '<li id="' + getFilename(src) + 'Indicator" class="carousel-indicator" data-target="#carouselGallery" data-slide-to="' + $('#carouselGallery .carousel-indicator').length + '"></li>';
}

function getCarouselItem(src) {
    return '<div id="' + getFilename(src) + 'Item" class="carousel-item justify-content-center">CAROUSEL_ITEM</div>';
}

function getCarouselImg(src, alt, title) {
    return getCarouselItem(src).replace('CAROUSEL_ITEM', '<img class="d-block w-100" src="' + src + '" alt="' + alt + '"/>' + getCarouselCaption(title));
}

function getCarouselCaption(title) {
    return title !== undefined ? '<div class="carousel-caption"><p class="image-text">' + title + '</p></div>' : '';
}

function getCarouselVideo(src) {
    return getCarouselItem(src).replace('CAROUSEL_ITEM', '<video controls><source src="' + src + '" type="video/mp4">Video no soportado.</video>');
}

function stopVideos() {
    $('#carouselGallery video').each(function() {
        $(this)[0].pause();
        $(this)[0].currentTime = 0;
    });
}

function setCaptionFade(elem) {
    let caption = $(elem).find('.carousel-caption');

    if (caption.length > 0) {
        clearTimeout(captionFade);
        captionFade = setTimeout(function() {
            caption.fadeOut();
        }, 5000);
        caption.show();
    }
}

function openGallery(elem) {
    $('#carouselGallery .carousel-indicator').removeClass('active');
    $('#carouselGallery .carousel-item').removeClass('active');

    if (!elem) {
        elem = $('#gallery img')[0];
    }

    let filename = getFilename($(elem).attr('src'));

    $('#' + filename + 'Indicator').addClass('active');
    $('#' + filename + 'Item').addClass('active');

    setCaptionFade($('#' + filename + 'Item'));

    $('#galleryModal').modal('show');
}

function initGallery() {
    $('#gallery .gallery-photo').click(function() {
        openGallery($(this).children());
    });

    $('#gallery img').each(function() {
        $(this).parent().append('<div class="overlay"><i class="fa fa-search-plus icon-zoom-in"></i></div>');
        $('#carouselGallery .carousel-indicators').append(getCarouselIndicator($(this).attr('src')));
        $('#carouselGallery .carousel-inner').append(getCarouselImg($(this).attr('src'), $(this).attr('alt'), $(this).parent().attr('title')));
    });

    let videos = [
        'videos/video1.mp4',
        'videos/video2.mp4',
        'videos/video3.mp4'
    ];

    videos.forEach(function(src) {
        $('#carouselGallery .carousel-indicators').append(getCarouselIndicator(src));
        $('#carouselGallery .carousel-inner').append(getCarouselVideo(src));
    });

    $('#carouselGallery').on('slide.bs.carousel', function(e) {
        stopVideos();
        setCaptionFade(e.relatedTarget);
    });

    $('#galleryModal').on('hide.bs.modal', function() {
        stopVideos();
    });
}

$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTopBtn').fadeIn();
        } else {
            $('#backToTopBtn').fadeOut();
        }
    });

    $('body').scrollspy({
        target: '#navbarMenu',
        offset: 300
    });

    $('.nav-link').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 75
        });
    });

    initGallery();
});
