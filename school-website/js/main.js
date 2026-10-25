document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.main-slide');
    const dots = document.querySelectorAll('.slide-dot');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (slides.length === 0) return; // Safely exits if on an inner page

    let currentSlideIndex = 0;
    let slideTimer;

    function renderSlide(index) {
        if (index >= slides.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        if(dots.length > 0) dots.forEach(dot => dot.classList.remove('active-dot'));

        slides[currentSlideIndex].classList.add('active');
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active-dot');
        }
    }

    function nextSlide() {
        currentSlideIndex++;
        renderSlide(currentSlideIndex);
        resetAutoCycleTimer();
    }

    function prevSlide() {
        currentSlideIndex--;
        renderSlide(currentSlideIndex);
        resetAutoCycleTimer();
    }

    function startAutoCycleTimer() {
        slideTimer = setInterval(() => {
            currentSlideIndex++;
            renderSlide(currentSlideIndex);
        }, 5000); // Transitions smoothly every 5 seconds
    }

    function resetAutoCycleTimer() {
        clearInterval(slideTimer);
        startAutoCycleTimer();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    if(dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlideIndex = parseInt(e.target.getAttribute('data-index'));
                renderSlide(currentSlideIndex);
                resetAutoCycleTimer();
            });
        });
    }

    renderSlide(currentSlideIndex);
    startAutoCycleTimer();
});
