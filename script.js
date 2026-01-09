// script.js - jQuery-based interactions for the Blue Mountains site


$(document).ready(function() {


    function toggleBackToTop() {
        if ($(window).scrollTop() > 300) {
            $('#backToTop').addClass('visible');
        } else {
            $('#backToTop').removeClass('visible');
        }
    }

    $('#backToTop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    function updateNav() {
        if ($(window).scrollTop() > 100) {
            $('.nav-container').addClass('nav-scrolled');
        } else {
            $('.nav-container').removeClass('nav-scrolled');
        }
    }

    function updateParallax() {
        var scrollTop = $(window).scrollTop();
        $('.hero-background').css('transform', 'translateY(' + (scrollTop * 0.5) + 'px)');

        if (scrollTop > 100) {
            $('#heroContent').addClass('hidden');
        } else {
            $('#heroContent').removeClass('hidden');
        }
    }

    function animateOnScroll() {
        $('.campground-item').each(function() {
            var $el = $(this);
            var elementTop = $el.offset().top;
            var elementBottom = elementTop + $el.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $el.addClass('visible');
            }
        });
    }


    $(window).on('scroll', function() {
        toggleBackToTop();
        updateNav();
        updateParallax();
        animateOnScroll();
    });

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({ scrollTop: target.offset().top - 80 }, 800);
        }
    });

    animateOnScroll();
    updateNav();

    function closeExpanded() {
        $('.campground-item.expanded').removeClass('expanded');
        $('.campground-overlay').remove();
        $('.campground-close').remove();
        $(document).off('keydown.campgroundClose');
    }

    function openExpanded($item) {
        closeExpanded();
        // add overlay
        var $overlay = $('<div class="campground-overlay"></div>');
        $('body').append($overlay);
        // add expanded class and close button
        $item.addClass('expanded');
        var $btn = $('<button class="campground-close" aria-label="Close">✕</button>');
        $item.append($btn);

        $overlay.on('click', function() { closeExpanded(); });
        $btn.on('click', function(e) { e.stopPropagation(); closeExpanded(); });

        // ESC to close
        $(document).on('keydown.campgroundClose', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeExpanded();
            }
        });
    }

    // Click listener on campground items (delegated)
    $(document).on('click', '.campground-item', function(e) {
        if ($(e.target).closest('.campground-close').length) return;
        var $item = $(this);
        // toggle expanded
        if ($item.hasClass('expanded')) {
            closeExpanded();
        } else {
            openExpanded($item);
        }
    });

    // Hide navigation when scrolling away from hero (moved from inline script in index.html)
    (function() {
        var $nav = $('#mainNav');
        var $hero = $('.hero');
        function updateNavVisibility() {
            var heroRect = $hero[0].getBoundingClientRect();
            if (heroRect.bottom <= 0) {
                $nav.fadeOut(300);
            } else {
                $nav.fadeIn(300);
            }
        }
        $(window).on('scroll resize', updateNavVisibility);
        updateNavVisibility();
    })();
});