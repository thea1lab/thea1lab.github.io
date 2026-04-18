jQuery(function ($) {
	"use strict";

	/* ========================================================================= */
	/*	Lab Steps — toggle radios without focus-scroll
	/* ========================================================================= */

		document.querySelectorAll('.feature-explorer .step-item[for]').forEach(function (label) {
			label.addEventListener('click', function (e) {
				var radio = document.getElementById(label.getAttribute('for'));
				if (!radio) return;
				e.preventDefault();
				if (!radio.checked) {
					radio.checked = true;
					radio.dispatchEvent(new Event('change', { bubbles: true }));
				}
			});
			label.addEventListener('keydown', function (e) {
				if (e.key !== 'Enter' && e.key !== ' ') return;
				e.preventDefault();
				label.click();
			});
		});

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

	/* Language selector is handled via inline onchange on the <select> element */


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

	/* ========================================================================= */
	/*	Contact Form — accessible validation + AJAX submit
	/* =========================================================================  */

		var $contactForm = $('#contact-form');
		if ($contactForm.length) {
			var $submitBtn = $('#contact-submit');

			function setFieldError(field, msg) {
				var errorEl = document.getElementById(field.id + '-error');
				if (!errorEl) return;
				field.setAttribute('aria-invalid', 'true');
				errorEl.textContent = msg;
				errorEl.hidden = false;
			}

			function clearFieldError(field) {
				var errorEl = document.getElementById(field.id + '-error');
				if (!errorEl) return;
				field.removeAttribute('aria-invalid');
				errorEl.textContent = '';
				errorEl.hidden = true;
			}

			// Clear errors on input
			$contactForm.on('input change', '.form-control', function () {
				clearFieldError(this);
			});

			$contactForm.on('submit', function (e) {
				e.preventDefault();
				var form = this;
				var fields = form.querySelectorAll('[required]');
				var firstInvalid = null;
				var statusEl = document.getElementById('form-status');

				for (var i = 0; i < fields.length; i++) {
					clearFieldError(fields[i]);
					if (!fields[i].value.trim()) {
						var reqMsg = $contactForm.data('error-required') || 'This field is required.';
						setFieldError(fields[i], reqMsg);
						if (!firstInvalid) firstInvalid = fields[i];
					} else if (fields[i].type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields[i].value)) {
						var emailMsg = $contactForm.data('error-email') || 'Please enter a valid email address.';
						setFieldError(fields[i], emailMsg);
						if (!firstInvalid) firstInvalid = fields[i];
					}
				}

				if (firstInvalid) {
					firstInvalid.focus();
					return;
				}

				// Disable button to prevent double-submit
				$submitBtn.prop('disabled', true);
				statusEl.hidden = true;

				var payload = {
					name: form.name.value,
					email: form.email.value,
					subject: form.subject.value,
					message: form.message.value
				};

				// Include optional fields if present and filled
				if (form.company && form.company.value) {
					payload.company = form.company.value;
				}
				if (form.stage && form.stage.value) {
					payload.stage = form.stage.value;
				}

				// Include Turnstile token if present
				var turnstileInput = form.querySelector('[name="cf-turnstile-response"]');
				if (turnstileInput) {
					payload['cf-turnstile-response'] = turnstileInput.value;
				}

				fetch(form.action, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				})
				.then(function (res) { return res.json(); })
				.then(function (data) {
					if (data.ok) {
						statusEl.textContent = $contactForm.data('success-msg') || 'Message sent!';
						statusEl.setAttribute('role', 'status');
						statusEl.hidden = false;
						form.reset();
						if (window.turnstile && window._turnstileWidgetId !== null) turnstile.reset(window._turnstileWidgetId);
					} else {
						statusEl.textContent = $contactForm.data('error-msg') || 'Something went wrong.';
						statusEl.setAttribute('role', 'alert');
						statusEl.hidden = false;
					}
				})
				.catch(function () {
					statusEl.textContent = $contactForm.data('error-msg') || 'Something went wrong.';
					statusEl.setAttribute('role', 'alert');
					statusEl.hidden = false;
				})
				.finally(function () {
					$submitBtn.prop('disabled', false);
});
			});
		}

});
