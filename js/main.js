document.addEventListener('DOMContentLoaded', function () {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = Array.from(document.querySelectorAll('.dots i'));

    // Banner 自动轮播
    if (slides.length > 0) {
        let current = 0;
        let timer = null;

        function showSlide(index) {
            current = (index + slides.length) % slides.length;
            slides.forEach(function (slide, i) {
                slide.classList.toggle('active', i === current);
            });
            dots.forEach(function (dot, i) {
                dot.classList.toggle('on', i === current);
            });
        }

        function startAutoPlay() {
            clearInterval(timer);
            timer = setInterval(function () {
                showSlide(current + 1);
            }, 4000);
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                showSlide(index);
                startAutoPlay();
            });
        });

        showSlide(0);
        startAutoPlay();

        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', function () {
                clearInterval(timer);
            });
            hero.addEventListener('mouseleave', function () {
                startAutoPlay();
            });
        }
    }

    // 手机端菜单
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('.nav nav');
    if (menu && nav) {
        menu.addEventListener('click', function () {
            nav.classList.toggle('open');
        });
    }

    // 返回顶部
    const topButton = document.getElementById('top');
    if (topButton) {
        window.addEventListener('scroll', function () {
            topButton.style.display = window.scrollY > 400 ? 'block' : 'none';
        });
        topButton.addEventListener('click', function () {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // 数字滚动
    const nums = document.querySelectorAll('[data-num]');
    let countStarted = false;
    function countNumbers() {
        if (countStarted || nums.length === 0) return;
        let visible = false;
        nums.forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight) visible = true;
        });
        if (!visible) return;
        countStarted = true;
        nums.forEach(function (el) {
            const target = parseInt(el.getAttribute('data-num'), 10) || 0;
            let value = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const counter = setInterval(function () {
                value += step;
                if (value >= target) {
                    value = target;
                    clearInterval(counter);
                }
                el.textContent = value;
            }, 35);
        });
    }
    window.addEventListener('scroll', countNumbers);
    countNumbers();
});
