// ============================================
// 1. ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА
// ============================================
const swiper = new Swiper('.room__slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    effect: 'slide',
    speed: 700,
    centeredSlides: true,
    spaceBetween: 20,
    slidesPerView: 1.1,
    loop: true,
    watchSlidesProgress: true,
    breakpoints: {
        480: {
            slidesPerView: 1.2,
            spaceBetween: 16
        },
        640: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2.0,
            spaceBetween: 24
        },
        1024: {
            slidesPerView: 2.4,
            spaceBetween: 30
        },
        1280: {
            slidesPerView: 2.8,
            spaceBetween: 35
        }
    }
});

// ============================================
// 2. МОБИЛЬНОЕ МЕНЮ (БУРГЕР)
// ============================================
const burger = document.querySelector('.header__burger');
const mobileNav = document.querySelector('.header__menu');
const burgerClose = document.querySelector('.header__btn');

// Функция для открытия/закрытия меню
function toggleMenu() {
    mobileNav.classList.toggle('open');
    burger.classList.toggle('close');
    document.body.classList.toggle('stop-scroll');
}

// Открытие по клику на бургер
burger.addEventListener('click', toggleMenu);

// Закрытие по клику на крестик
burgerClose.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку (для мобильной версии)
document.querySelectorAll('.header__menu-item a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// ============================================
// 3. МОДАЛЬНОЕ ОКНО
// ============================================
const modal = document.querySelector('.modal');
const modalOpenBtns = document.querySelectorAll('[href="#modal"]');
const modalCloseBtn = document.querySelector('.modal__btn');

// Функция открытия модалки
function openModal(e) {
    e.preventDefault();
    modal.classList.add('open');
    document.body.classList.add('stop-scroll');
}

// Функция закрытия модалки
function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('stop-scroll');
}

// Открытие по клику на все кнопки "Записаться"
modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
});

// Закрытие по клику на крестик
modalCloseBtn.addEventListener('click', closeModal);

// Закрытие по клику на фон (оверлей)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие по клавише ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});

// ============================================
// 4. ФОРМА В СЕКЦИИ "О НАС"
// ============================================
document.querySelector('.about__form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Собираем данные
    const name = this.querySelector('input[placeholder="Ваше имя"]').value;
    const phone = this.querySelector('input[placeholder="Номер телефона"]').value;
    const question = this.querySelector('input[placeholder="Возраст ребенка или ваш вопрос"]').value;

    // Здесь можно отправить данные на сервер
    console.log('📝 Заявка с формы "О нас":', { name, phone, question });

    // Показываем уведомление
    alert('✅ Спасибо! Мы перезвоним вам в ближайшее время.');

    // Очищаем форму
    this.reset();
});

// ============================================
// 5. ФОРМА В МОДАЛЬНОМ ОКНЕ
// ============================================
document.querySelector('.modal__form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Собираем данные
    const name = this.querySelector('input[placeholder="Имя родителя"]').value;
    const phone = this.querySelector('input[placeholder="Номер телефона для связи*"]').value;
    const age = this.querySelector('input[placeholder="Возраст ребенка (например, 1.5 года)"]').value;
    const comment = this.querySelector('textarea[placeholder="Ваши пожелания или вопросы"]').value;

    // Здесь можно отправить данные на сервер
    console.log('📝 Заявка из модального окна:', { name, phone, age, comment });

    // Показываем уведомление
    alert('✅ Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');

    // Закрываем модалку
    closeModal();

    // Очищаем форму
    this.reset();
});

// ============================================
// 6. ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРЯМ (для всех ссылок)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Пропускаем ссылки на модалку (у них отдельная обработка)
        if (href === '#modal') return;

        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();

            const headerHeight = document.querySelector('.header').offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 7. АКТИВНАЯ ССЫЛКА В ШАПКЕ ПРИ СКРОЛЛЕ (опционально)
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__nav-link, .header__menu-item a');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Добавляем стиль для активной ссылки
const style = document.createElement('style');
style.textContent = `
    .header__nav-link.active {
        color: var(--orange);
        font-weight: 700;
    }
    .header__menu-item a.active {
        color: var(--orange);
        font-weight: 700;
    }
`;
document.head.appendChild(style);

// Обновляем при скролле
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveLink, 50);
});

// Обновляем при загрузке
document.addEventListener('DOMContentLoaded', updateActiveLink);

// ============================================
// 8. ДОПОЛНИТЕЛЬНО: АНИМАЦИЯ ПОЯВЛЕНИЯ (опционально)
// ============================================
// Можно добавить класс для анимации при появлении в viewport
const animateElements = document.querySelectorAll('.teachers__card, .feedback__block, .program__block');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('✅ Сайт полностью готов!');

// ============================================
// 9. LIGHTBOX ДЛЯ ГАЛЕРЕИ (Увеличение фото)
// ============================================
(function initLightbox() {
    // Создаем структуру оверлея
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <button class="lightbox-close" aria-label="Закрыть фото">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
        </button>
        <div class="lightbox-content">
            <button class="lightbox-nav lightbox-prev" aria-label="Предыдущее фото">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
            </button>
            <div class="lightbox-image-wrapper">
                <img src="" alt="Увеличенное фото" class="lightbox-image">
            </div>
            <button class="lightbox-nav lightbox-next" aria-label="Следующее фото">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </button>
        </div>
        <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lightboxOverlay);

    // Получаем элементы
    const overlay = lightboxOverlay;
    const lightboxImg = overlay.querySelector('.lightbox-image');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');
    const counter = overlay.querySelector('.lightbox-counter');

    let currentSlides = [];      // Массив всех слайдов (DOM-элементы)
    let currentIndex = 0;
    let isOpen = false;

    // Функция для сбора всех слайдов с изображениями
    function collectSlides() {
        const slides = document.querySelectorAll('.room__slider .swiper-slide');
        currentSlides = [];
        slides.forEach(slide => {
            const img = slide.querySelector('.room__img img');
            if (img) {
                currentSlides.push({
                    element: slide,
                    img: img,
                    src: img.getAttribute('src') || img.src
                });
            }
        });
    }

    // Открыть лайтбокс по индексу
    function openLightbox(index) {
        if (!currentSlides.length) return;
        if (index < 0) index = currentSlides.length - 1;
        if (index >= currentSlides.length) index = 0;
        currentIndex = index;

        const slide = currentSlides[currentIndex];
        lightboxImg.src = slide.src;
        lightboxImg.alt = slide.img.alt || 'Увеличенное фото';

        // Обновляем счетчик
        counter.textContent = `${currentIndex + 1} / ${currentSlides.length}`;

        // Показываем с анимацией
        overlay.classList.add('active');
        document.body.classList.add('stop-scroll');
        isOpen = true;

        // Управление видимостью стрелок
        updateNavButtons();
    }

    // Закрыть лайтбокс
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.classList.remove('stop-scroll');
        isOpen = false;
        // Сбрасываем src для экономии памяти
        setTimeout(() => {
            if (!isOpen) {
                lightboxImg.src = '';
            }
        }, 400);
    }

    // Обновить состояние кнопок навигации
    function updateNavButtons() {
        if (currentSlides.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }

    // Переключение слайдов
    function goToPrev() {
        if (currentSlides.length <= 1) return;
        openLightbox(currentIndex - 1);
    }

    function goToNext() {
        if (currentSlides.length <= 1) return;
        openLightbox(currentIndex + 1);
    }

    // Обработка кликов по изображениям в слайдере
    function setupSlideListeners() {
        // Собираем слайды при каждом открытии на случай динамического изменения
        const slides = document.querySelectorAll('.room__slider .swiper-slide');
        slides.forEach((slide, index) => {
            // Удаляем старые обработчики, чтобы не плодить
            slide.removeEventListener('click', slideClickHandler);
            // Добавляем новый
            slide.addEventListener('click', slideClickHandler);
            // Сохраняем индекс для обработчика
            slide.dataset.lightboxIndex = index;
        });
        // Обновляем коллекцию
        collectSlides();
    }

    function slideClickHandler(e) {
        // Игнорируем клики по кнопкам навигации внутри слайда
        if (e.target.closest('.swiper-button-next') ||
            e.target.closest('.swiper-button-prev') ||
            e.target.closest('.swiper-pagination')) {
            return;
        }
        const slide = this;
        const index = parseInt(slide.dataset.lightboxIndex);
        if (!isNaN(index) && currentSlides[index]) {
            openLightbox(index);
        }
    }

    // Обработчик клавиатуры
    function handleKeydown(e) {
        if (!isOpen) return;
        if (e.key === 'Escape') {
            closeLightbox();
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            goToPrev();
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            goToNext();
            e.preventDefault();
        }
    }

    // Инициализация событий
    function initEvents() {
        // Закрытие
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.closest('.lightbox-content') === null) {
                closeLightbox();
            }
        });

        // Навигация
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);

        // Клавиатура
        document.addEventListener('keydown', handleKeydown);

        // Свайпы на мобильных
        let touchStartX = 0;
        let touchEndX = 0;
        const wrapper = overlay.querySelector('.lightbox-image-wrapper');
        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            }
        }, { passive: true });

        // Отслеживаем изменения в DOM (для случая, если слайды подгружаются динамически)
        // Простой вариант — пересобирать при каждом обновлении слайдера
        if (swiper) {
            swiper.on('slideChange', () => {
                // Небольшая задержка чтобы DOM обновился
                setTimeout(setupSlideListeners, 100);
            });
            swiper.on('update', () => {
                setTimeout(setupSlideListeners, 100);
            });
        }
    }

    // Запуск
    collectSlides();
    setupSlideListeners();
    initEvents();

    // Первоначальный сбор после загрузки
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(collectSlides, 300);
        setTimeout(setupSlideListeners, 400);
    });

    // Экспортируем функции для использования в консоли при отладке
    window.lightbox = {
        open: openLightbox,
        close: closeLightbox,
        next: goToNext,
        prev: goToPrev
    };

    console.log('✅ Lightbox для галереи инициализирован');
})();