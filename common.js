$(document).ready(function() {
    // Responsive unit calculation
    function updateRV() {
        const width = $(window).width();
        let rv;
        
        if (width <= 375) {
            rv = width / 375;
        } else if (width <= 750) {
            rv = width / 750 + 0.5;
        } else if (width <= 1200) {
            rv = width / 1200 + 0.8;
        } else {
            rv = 1.2;
        }
        
        document.documentElement.style.setProperty('--rv', rv + 'px');
    }

    // Update on load and resize
    updateRV();
    $(window).on('resize', updateRV);

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Fade in animation on scroll
    function checkFadeIn() {
        $('.c-m-fade-chain01, .c-m-fade-chain02, .c-m-fade-chain03').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).removeClass('is-m-hide').addClass('is-m-show');
            }
        });
    }

    // Initialize fade elements
    $('.c-m-fade-chain01, .c-m-fade-chain02, .c-m-fade-chain03').addClass('is-m-hide');

    // Check on scroll and load
    $(window).on('scroll', checkFadeIn);
    checkFadeIn();

    // FAQ accordion
    $('.p-m-index-faq__question').on('click', function() {
        const $item = $(this).closest('.p-m-index-faq__item');
        const $answer = $item.find('.p-m-index-faq__answer');
        const $icon = $(this).find('.p-m-index-faq__icon');

        if ($answer.is(':visible')) {
            $answer.slideUp(300);
            $icon.text('+');
        } else {
            $('.p-m-index-faq__answer').slideUp(300);
            $('.p-m-index-faq__icon').text('+');
            $answer.slideDown(300);
            $icon.text('−');
        }
    });

    // Initialize FAQ
    $('.p-m-index-faq__answer').hide();

    // Voice slider with Swiper (if Swiper is loaded)
    if (typeof Swiper !== 'undefined') {
        const voiceSwiper = new Swiper('.p-m-index-voice__slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // Header background on scroll
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        const $header = $('.l-m-header');
        
        if (scrollTop > 50) {
            $header.css('background', 'rgba(255, 255, 255, 0.98)');
        } else {
            $header.css('background', 'rgba(255, 255, 255, 0.95)');
        }
    });

    // Button hover effects
    $('.c-m-btn').hover(
        function() {
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Plan card hover effects
    $('.p-m-index-plan__item').hover(
        function() {
            if (!$(this).hasClass('p-m-index-plan__item--featured')) {
                $(this).css('transform', 'translateY(-8px) scale(1.02)');
            }
        },
        function() {
            if (!$(this).hasClass('p-m-index-plan__item--featured')) {
                $(this).css('transform', 'translateY(0) scale(1)');
            }
        }
    );

    // Modal functionality (if needed for demos)
    function openModal(content) {
        const modalHTML = `
            <div class="c-m-modal-overlay">
                <div class="c-m-modal">
                    <div class="c-m-modal__header">
                        <h3>デモ動画</h3>
                        <button class="c-m-modal__close">&times;</button>
                    </div>
                    <div class="c-m-modal__content">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalHTML);
        $('.c-m-modal-overlay').fadeIn(300);
        
        $('.c-m-modal__close, .c-m-modal-overlay').on('click', function(e) {
            if (e.target === this) {
                $('.c-m-modal-overlay').fadeOut(300, function() {
                    $(this).remove();
                });
            }
        });
    }

    // Demo button clicks
    $('.c-m-btn--outline').on('click', function(e) {
        e.preventDefault();
        openModal('<p>デモ動画をここに表示します。</p>');
    });

    // Form validation (if forms are added)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Newsletter signup (if added)
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        
        if (validateEmail(email)) {
            // Show success message
            alert('登録ありがとうございます！');
        } else {
            alert('有効なメールアドレスを入力してください。');
        }
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    $(window).on('scroll', debounce(function() {
        checkFadeIn();
    }, 100));

    // Lazy loading for images (basic implementation)
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            const $img = $(this);
            const rect = this.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                $img.attr('src', $img.attr('data-src'));
                $img.removeAttr('data-src');
            }
        });
    }

    $(window).on('scroll', debounce(lazyLoadImages, 200));
    lazyLoadImages(); // Initial load

    // Analytics tracking (placeholder)
    function trackEvent(eventName, eventData) {
        // Implement your analytics tracking here
        console.log('Event tracked:', eventName, eventData);
    }

    // Track CTA clicks
    $('.c-m-btn--primary').on('click', function() {
        const buttonText = $(this).text().trim();
        trackEvent('cta_click', { button_text: buttonText });
    });

    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.className.split(' ')[0];
                trackEvent('section_view', { section: sectionName });
            }
        });
    }, { threshold: 0.5 });

    // Observe all main sections
    $('section[class*="p-m-index-"]').each(function() {
        sectionObserver.observe(this);
    });
});