document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('aroha-theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('is-dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('is-dark');
            const nextTheme = document.body.classList.contains('is-dark') ? 'dark' : 'light';
            localStorage.setItem('aroha-theme', nextTheme);
        });
    }

    const track = document.getElementById('hero-carousel-track');
    if (track) {
        const slides = track.children.length;
        const dots = document.querySelectorAll('.hero-carousel-dot');
        const prevBtn = document.getElementById('hero-carousel-prev');
        const nextBtn = document.getElementById('hero-carousel-next');
        let currentSlide = 0;
        let autoSlideInterval;

        const goToSlide = (index) => {
            if (index < 0) index = slides - 1;
            if (index >= slides) index = 0;
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('is-active');
                } else {
                    dot.classList.remove('is-active');
                }
            });
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 2500);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
                resetAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
                resetAutoSlide();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoSlide();
            });
        });

        goToSlide(0);
        startAutoSlide();
    }

    const toggles = document.querySelectorAll('input[name="pricing-toggle"]');
    const servicesContainer = document.getElementById('pricing-services');
    const coursesContainer = document.getElementById('pricing-courses');

    if (toggles.length && servicesContainer) {
        toggles.forEach((toggle) => {
            toggle.addEventListener('change', (e) => {
                if (e.target.value === 'services') {
                    servicesContainer.classList.remove('is-hidden');
                    if (coursesContainer) {
                        coursesContainer.classList.add('is-hidden');
                    }
                } else {
                    servicesContainer.classList.add('is-hidden');
                    if (coursesContainer) {
                        coursesContainer.classList.remove('is-hidden');
                    }
                }
            });
        });
    }

    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('is-open');
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
