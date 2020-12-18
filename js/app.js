function backToTop() {
    $('html, body').animate({
        scrollTop: 0
    });
}

function getFilename(path) {
    return path.split('/').pop().split('.')[0];
}

function getCarouselIndicator(src, index) {
    return '<li id="' + getFilename(src) + 'Indicator" class="carousel-indicator" data-target="#carouselGallery" data-slide-to="' + index + '"></li>';
}

function getCarouselItem(src, alt) {
    return '<div id="' + getFilename(src) + 'Item" class="carousel-item"><img class="d-block w-100" src="' + src + '" alt="' + alt + '"/></div>';
}

function openGallery(elem) {
    $('#carouselGallery .carousel-indicator').removeClass('active');
    $('#carouselGallery .carousel-item').removeClass('active');
    $('#' + getFilename($(elem).attr('src')) + 'Indicator').addClass('active');
    $('#' + getFilename($(elem).attr('src')) + 'Item').addClass('active');
    
    $('#galleryModal').modal('show');
}

function initGallery() {
    $('#gallery .gallery-photo').click(function() {
        openGallery($(this).children());
    });

    $('#gallery img').each(function(index) {
        $('#carouselGallery .carousel-indicators').append(getCarouselIndicator($(this).attr('src'), index));
        $('#carouselGallery .carousel-inner').append(getCarouselItem($(this).attr('src'), $(this).attr('alt')));
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
           scrollTop: $($(this).attr('href')).offset().top - 100
        });
    });

    initGallery();
});
