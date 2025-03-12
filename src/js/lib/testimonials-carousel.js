import Glide from '@glidejs/glide';

(function () {
	function minTwoDigits ( n ) {
		return `00${n}`.slice( -2 );
	}

    // Adding Event Listeners to Touch and Click Events
	function customEventListener ( element, functionCall ) {
		const eventName = typeof window.ontouchstart === 'undefined' ?
			'click' :
			'touchstart';

		element.addEventListener( eventName, functionCall )
	}

    /**
	 * Careers Testimonials Carousel
	 */
	const testimonialsCarousel = document.getElementById( 'testimonials-carousel' );
	const testimonialsCurrentItemContainer = document.getElementById( 'testimonials-carousel-nav-pagination-count-current' );
	const testimonialsTotalItemsContainer = document.getElementById( 'testimonials-carousel-nav-pagination-count-total' );
    const totalSlides = document.querySelector( '#testimonials-carousel .glide__slides' ).childElementCount;
    const testimonialsNavButtonPrevious = document.getElementById( 'testimonials-carousel-nav-button-previous' );
    const testimonialsNavButtonNext = document.getElementById( 'testimonials-carousel-nav-button-next' );
	let glideCarousel;


	function onTestimonialsCarouselChange ( newIndex ) {
		testimonialsCurrentItemContainer.innerHTML = minTwoDigits( newIndex );
	}

	function initCarousel() {
        glideCarousel = new Glide( '#testimonials-carousel', {
            perView: 3,
            focusAt: 'center',
            type: 'carousel',
			gap: 60,
			keyboard: false,
			breakpoints: {
				1440: {
					gap: 40
				},
				1200: {
					gap: 30
				},
				1024: {
					gap: 20
				},
				768: {
					gap: 0
				}
			}
        });

        glideCarousel.on( 'mount.before', function () {
            testimonialsCurrentItemContainer.innerHTML = '01';	testimonialsTotalItemsContainer.innerHTML = minTwoDigits( totalSlides );
        });

		glideCarousel.on( 'move', function () {
			onTestimonialsCarouselChange( glideCarousel.index + 1 );
		});

        glideCarousel.mount();
	}

	function handleResize() {
		const m = window.innerWidth < 1024 ? 'enable' : 'disable';
		glideCarousel[m]();
	}

	if ( typeof( testimonialsCarousel ) !== 'undefined' && testimonialsCarousel !== null ) {
		customEventListener( testimonialsNavButtonPrevious, function() {
			glideCarousel.go( '<' );
		});

		customEventListener( testimonialsNavButtonNext, function () {
			glideCarousel.go( '>' );
		});

		initCarousel();
		handleResize();
		window.addEventListener( 'resize', handleResize );
	}
})();
