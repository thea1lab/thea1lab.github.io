/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});

jQuery(function ($) {
	"use strict";


	/* ========================================================================= */
	/*	Auto close Navbar when click on link
	/* ========================================================================= */

		$('.navbar-collapse a').click(function () {
			$(".navbar-collapse").collapse('hide');
		});

		$('.navbar-collapse').on('shown.bs.collapse hidden.bs.collapse', function () {
			var isExpanded = $(this).hasClass('show');
			$('.navbar-toggler').attr('aria-expanded', String(isExpanded));
		});

	/* ========================================================================= */
	/*	Language selector
	/* ========================================================================= */

		$('#select-language').on('change', function () {
			location = this.value;
		});


	/* ========================================================================= */
	/*	lazy load initialize
	/* ========================================================================= */

		if (window.lozad) {
			const observer = lozad(); // lazy loads elements with default selector as ".lozad"
			observer.observe();
		}

	/* ========================================================================= */
	/*	Magnific popup
	/* =========================================================================  */
		if ($.fn.magnificPopup) {
			$('.image-popup').magnificPopup({
				type: 'image',
				removalDelay: 160, //delay removal by X to allow out-animation
				callbacks: {
					beforeOpen: function () {
						// just a hack that adds mfp-anim class to markup
						this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
						this.st.mainClass = this.st.el.attr('data-effect');
					}
				},
				closeOnContentClick: true,
				midClick: true,
				fixedContentPos: false,
				fixedBgPos: true
			});
		}

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
	/* =========================================================================  */

		var containerEl = document.querySelector('.shuffle-wrapper');
		if (containerEl && window.Shuffle) {
			var Shuffle = window.Shuffle;
			var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
				itemSelector: '.shuffle-item',
			buffer: 1
		});

		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			var input = evt.currentTarget;
			if (input.checked) {
				myShuffle.filter(input.value);
			}
		});
	}

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */

		if ($.fn.slick && $("#testimonials").length) {
			$("#testimonials").slick({
				infinite: true,
				arrows: false,
				autoplay: true,
				autoplaySpeed: 4000
			});
		}

});
