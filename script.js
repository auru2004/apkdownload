document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 18, 25, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(15, 18, 25, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(15, 18, 25, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.textAlign = 'center';
        }
    });

    // Simple animation for elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .testimonial-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && items.length > 0) {
        let currentIndex = 0;
        const itemWidth = items[0].getBoundingClientRect().width + 20; // Width + gap
        const maxIndex = items.length - 1; // Simple strict scrolling for now, or use infinite logic

        // Clone items for infinite look (optional, but let's stick to simple scrolling first with auto-reset)

        function updateCarousel() {
            const translateX = -(currentIndex * itemWidth);
            track.style.transform = `translateX(${translateX}px)`;
        }

        function nextSlide() {
            if (currentIndex < maxIndex - 2) { // Show 3 items roughly, stop before end
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        }

        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                // go to end? let's just stop or loop
                currentIndex = maxIndex - 2;
                if (currentIndex < 0) currentIndex = 0;
            }
            updateCarousel();
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        // Auto play
        let timer = setInterval(nextSlide, 3000); // 3 seconds

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(nextSlide, 3000);
        }

        // Adjust for resize
        window.addEventListener('resize', () => {
            // Optional: recalculate itemWidth if responsive
        });
    }
});
