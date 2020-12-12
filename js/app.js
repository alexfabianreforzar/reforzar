function backToTop() {
    $('html, body').animate({
        scrollTop: 0
    });
}

function openGallery(elem) {
    $('#carouselGallery .carousel-indicators').empty();
    $('#carouselGallery .carousel-inner').empty();
    $('#gallery img').each(function(index) {
        let active = '';
        if ($(elem).find('img').attr('src') === $(this).attr('src')) {
            active = 'active';
        }
        $('#carouselGallery .carousel-indicators').append('<li data-target="#carouselGallery" data-slide-to="' + index + '" class="' + active + '"></li>');
        $('#carouselGallery .carousel-inner').append('<div class="carousel-item ' + active + '"><img class="d-block w-100" src="' + $(this).attr('src') + '" alt="..."/></div>');
    });
    
    $('#galleryModal').modal('show');
}

$(document).ready(function() {
    $('#gallery .gallery-photo').click(function() {
        openGallery($(this));
    });
    
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
});
