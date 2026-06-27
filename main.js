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