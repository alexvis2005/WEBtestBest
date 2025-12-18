// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация прелоадера
    initPreloader();
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация счетчиков статистики
    initCounters();
    
    // Инициализация кнопки наверх
    initScrollToTop();
    
    // Инициализация адаптивного меню
    initMobileMenu();
    
    // Инициализация плавающих элементов
    initFloatingElements();
});

// Прелоадер
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    
    // Симуляция загрузки с небольшой задержкой для демонстрации
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        content.classList.add('loaded');
        
        // Удаляем прелоадер из DOM после завершения анимации
        setTimeout(() => {
            preloader.remove();
        }, 800);
    }, 2000);
}

// Навигация
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Установка активного пункта меню для текущей страницы
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Для главной страницы
        if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('active');
        }
        // Для других страниц
        else if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Счетчики статистики
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    }
    
    // Функция для запуска счетчиков при прокрутке до секции
    function checkCounterVisibility() {
        const statsSection = document.querySelector('.company-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        // Проверяем, видна ли секция статистики
        if (sectionTop < window.innerHeight - sectionVisible) {
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    }
    
    // Проверяем видимость счетчиков при скролле
    window.addEventListener('scroll', checkCounterVisibility);
    
    // Проверяем при загрузке страницы
    setTimeout(checkCounterVisibility, 1000);
}

// Кнопка "наверх"
function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    
    // Показываем/скрываем кнопку при скролле
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Плавный скролл при клике на кнопку
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Адаптивное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('mobile-open');
            
            // Меняем иконку меню
            const icon = this.querySelector('i');
            if (navbar.classList.contains('mobile-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        if (navbar && navbar.classList.contains('mobile-open') && 
            !navbar.contains(e.target) && e.target !== menuToggle) {
            navbar.classList.remove('mobile-open');
            
            // Восстанавливаем иконку меню
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Закрытие меню при изменении размера окна (если вернулись к десктопу)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbar) {
            navbar.classList.remove('mobile-open');
            
            // Восстанавливаем иконку меню
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Плавающие элементы
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Добавляем случайные параметры для каждого элемента
    floatingElements.forEach((element, index) => {
        // Случайная задержка
        const delay = Math.random() * 10;
        element.style.animationDelay = `${delay}s`;
        
        // Случайная продолжительность
        const duration = 20 + Math.random() * 15;
        element.style.animationDuration = `${duration}s`;
        
        // Случайная начальная позиция
        const top = 10 + Math.random() * 80;
        const left = 5 + Math.random() * 90;
        element.style.top = `${top}%`;
        element.style.left = `${left}%`;
        
        // Случайный размер
        const size = 1.5 + Math.random() * 1.5;
        element.style.fontSize = `${size}rem`;
        
        // Случайная прозрачность
        const opacity = 0.05 + Math.random() * 0.1;
        element.style.opacity = opacity;
    });
}

// Инициализация для страницы отзывов
document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация отзывов
    initReviewsFilter();
    
    // Форма добавления отзыва
    initReviewForm();
    
    // Пагинация
    initReviewsPagination();
});

// Фильтрация отзывов
function initReviewsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reviews = document.querySelectorAll('.review-full');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Показываем/скрываем отзывы
            reviews.forEach(review => {
                if (filterValue === 'all' || review.getAttribute('data-category') === filterValue) {
                    review.style.display = 'block';
                    setTimeout(() => {
                        review.style.opacity = '1';
                        review.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    review.style.opacity = '0';
                    review.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        review.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Форма добавления отзыва
function initReviewForm() {
    const reviewForm = document.querySelector('.review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const rating = document.querySelector('input[name="rating"]:checked');
            const title = document.getElementById('title').value;
            const reviewText = document.getElementById('review-text').value;
            
            // Валидация
            if (!name || !email || !service || !rating || !title || !reviewText) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // В реальном проекте здесь был бы код для отправки данных на сервер
            console.log('Данные отзыва:', {
                name,
                email,
                service,
                rating: rating.value,
                title,
                reviewText
            });
            
            // Показываем сообщение об успехе
            alert('Спасибо за ваш отзыв! После модерации он появится на сайте.');
            
            // Очищаем форму
            reviewForm.reset();
            
            // Сбрасываем рейтинг
            document.querySelectorAll('input[name="rating"]').forEach(input => {
                input.checked = false;
            });
        });
    }
}

// Пагинация отзывов
function initReviewsPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn:not(.pagination-next)');
    const nextButton = document.querySelector('.pagination-next');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // В реальном проекте здесь была бы загрузка новой страницы отзывов
            console.log('Переход на страницу', this.textContent);
        });
    });
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // Находим активную кнопку
            const activeButton = document.querySelector('.pagination-btn.active');
            const currentPage = parseInt(activeButton.textContent);
            
            // В реальном проекте здесь была бы загрузка следующей страницы
            console.log('Переход на следующую страницу', currentPage + 1);
        });
    }
}

// Инициализация для страницы "О нас"
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация счетчиков статистики
    initHeroCounters();
    
    // Инициализация таймлайна
    initTimelineAnimation();
    
    // Инициализация слайдера команды
    initTeamSlider();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
});

// Счетчики статистики в герое
function initHeroCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    }
    
    // Запускаем счетчики при загрузке страницы
    setTimeout(() => {
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }, 1000);
}

// Анимация таймлайна при скролле
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineVisibility() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemVisible = 150;
            
            if (itemTop < window.innerHeight - itemVisible) {
                item.classList.add('visible');
            }
        });
    }
    
    // Проверяем видимость при загрузке и скролле
    window.addEventListener('scroll', checkTimelineVisibility);
    window.addEventListener('load', checkTimelineVisibility);
    
    // Первоначальная проверка
    checkTimelineVisibility();
}

// Слайдер команды
function initTeamSlider() {
    const teamMembers = document.querySelectorAll('.team-member');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    
    // Показываем конкретный слайд
    function showSlide(index) {
        // Скрываем все слайды
        teamMembers.forEach(member => {
            member.classList.remove('active');
        });
        
        // Убираем активный класс у всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем нужный слайд
        teamMembers[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Следующий слайд
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= teamMembers.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Предыдущий слайд
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = teamMembers.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // Обработчики событий для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Обработчики событий для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автопереключение слайдов каждые 5 секунд
    setInterval(nextSlide, 5000);
}

// Анимации при скролле для карточек
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.advantage-card, .value-card, .achievement');
    
    function checkElementsVisibility() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Устанавливаем начальное состояние
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Проверяем видимость при загрузке и скролле
    window.addEventListener('scroll', checkElementsVisibility);
    window.addEventListener('load', checkElementsVisibility);
    
    // Первоначальная проверка
    setTimeout(checkElementsVisibility, 500);
}

// Данные для статей блога
const articlesData = {
    1: {
        category: "Обслуживание",
        title: "Как продлить жизнь жесткому диску",
        date: "15 июня 2023",
        readTime: "5 мин",
        image: "https://avatars.mds.yandex.net/get-altay/12820607/2a000001941bdee7a834b4161694a8893638/XXL_height",
        tags: ["Жесткий диск", "Обслуживание", "SSD", "Бэкап"],
        content: `
            <p>Жесткий диск — один из самых важных компонентов компьютера, так как именно на нем хранятся все ваши данные. Правильное обслуживание может значительно продлить срок его службы и предотвратить потерю важной информации.</p>
            
            <h3>Основные правила эксплуатации HDD/SSD:</h3>
            <ul>
                <li><strong>Стабильное питание:</strong> Используйте качественный блок питания. Скачки напряжения могут повредить диск.</li>
                <li><strong>Температурный режим:</strong> HDD не должен перегреваться. Оптимальная температура — 30-45°C.</li>
                <li><strong>Защита от вибраций:</strong> SSD менее чувствительны к вибрациям, но HDD стоит устанавливать на виброизоляционные крепления.</li>
                <li><strong>Регулярная дефрагментация:</strong> Для HHD проводите дефрагментацию раз в месяц.</li>
                <li><strong>Очистка от пыли:</strong> Пыль ухудшает теплоотвод и может привести к перегреву.</li>
            </ul>
            
            <h3>Мониторинг состояния диска:</h3>
            <p>Используйте программы типа CrystalDiskInfo для отслеживания SMART-параметров. Обращайте внимание на:</p>
            <ul>
                <li>Количество переназначенных секторов</li>
                <li>Температуру диска</li>
                <li>Количество ошибок чтения/записи</li>
                <li>Общее время работы</li>
            </ul>
            
            <h3>Правила для SSD:</h3>
            <ul>
                <li>Не заполняйте диск более чем на 75%</li>
                <li>Отключите дефрагментацию для SSD</li>
                <li>Обновляйте прошивку при наличии обновлений</li>
                <li>Используйте TRIM (включен по умолчанию в Windows 10/11)</li>
            </ul>
            
            <p>Соблюдение этих простых правил поможет сохранить ваши данные в безопасности и продлить срок службы накопителя на годы.</p>
        `
    },
    2: {
        category: "Диагностика",
        title: "Признаки скорой поломки видеокарты",
        date: "3 июня 2023",
        readTime: "7 мин",
        image: "https://avatars.mds.yandex.net/get-altay/12820607/2a000001941bdee7a834b4161694a8893638/XXL_height",
        tags: ["Видеокарта", "Диагностика", "Ремонт", "GPU"],
        content: `
            <p>Видеокарта — один из самых дорогих компонентов компьютера, особенно для геймеров и специалистов по работе с графикой. Своевременное обнаружение проблем может помочь избежать полного выхода из строя и сэкономить деньги.</p>
            
            <h3>Основные признаки проблем:</h3>
            <ul>
                <li><strong>Артефакты на экране:</strong> Появление полос, точек, квадратов или других графических аномалий.</li>
                <li><strong>Синие экраны смерти (BSOD):</strong> Частые ошибки, связанные с драйверами видеокарты.</li>
                <li><strong>Перегрев:</strong> Температура выше 85°C под нагрузкой — тревожный сигнал.</li>
                <li><strong>Шум от кулеров:</strong> Постоянная работа кулеров на максимальных оборотах.</li>
                <li><strong>Самопроизвольные перезагрузки:</strong> Особенно во время игр или работы с графикой.</li>
            </ul>
            
            <h3>Диагностика в домашних условиях:</h3>
            <p>Перед обращением в сервис попробуйте:</p>
            <ol>
                <li>Обновить драйвера видеокарты</li>
                <li>Проверить температуру с помощью MSI Afterburner или HWMonitor</li>
                <li>Протестировать стабильность в FurMark или 3DMark</li>
                <li>Почистить видеокарту от пыли</li>
                <li>Проверить подключение питания</li>
            </ol>
            
            <h3>Когда обращаться в сервис:</h3>
            <ul>
                <li>Артефакты появляются даже на рабочем столе</li>
                <li>Видеокарта не определяется в системе</li>
                <li>Заметны следы перегрева (пожелтела текстолитовая плата)</li>
                <li>Слышен запах гари</li>
                <li>Карта не выдает изображение</li>
            </ul>
            
            <p>Не откладывайте диагностику — вовремя обнаруженная проблема часто решается проще и дешевле.</p>
        `
    },
    3: {
        category: "Советы",
        title: "Как выбрать блок питания для ПК",
        date: "22 мая 2023",
        readTime: "8 мин",
        image: "https://avatars.mds.yandex.net/get-altay/12820607/2a000001941bdee7a834b4161694a8893638/XXL_height",
        tags: ["Блок питания", "Сборка ПК", "Апгрейд", "Электропитание"],
        content: `
            <p>Блок питания — фундамент стабильной работы компьютера. Некачественный БП может стать причиной выхода из строя других компонентов.</p>
            
            <h3>Ключевые параметры выбора:</h3>
            
            <h4>1. Мощность</h4>
            <p>Рассчитывайте с запасом 20-30%. Для офисного ПК достаточно 400-500W, для игрового — 600-850W, для топовых сборок — 1000W+.</p>
            
            <h4>2. Сертификат 80 Plus</h4>
            <ul>
                <li><strong>80 Plus Bronze:</strong> КПД 82-85% — минимальный допустимый уровень</li>
                <li><strong>80 Plus Gold:</strong> КПД 87-90% — оптимальное соотношение цены и качества</li>
                <li><strong>80 Plus Platinum/Titanium:</strong> КПД 90-94% — для энтузиастов</li>
            </ul>
            
            <h4>3. Кабельная система</h4>
            <ul>
                <li><strong>Фиксированные кабели:</strong> Дешевле, но хуже для вентиляции</li>
                <li><strong>Модульные:</strong> Можно подключать только нужные кабели — лучше воздушный поток</li>
                <li><strong>Полумодульные:</strong> Основные кабели фиксированные, остальные — съемные</li>
            </ul>
            
            <h4>4. Защитные функции</h4>
            <p>Обязательные: OVP (защита от перенапряжения), UVP (от пониженного напряжения), OCP (от перегрузки по току), OPP (от перегрузки по мощности).</p>
            
            <h3>Топ-5 производителей:</h3>
            <ol>
                <li>Seasonic</li>
                <li>Corsair</li>
                <li>be quiet!</li>
                <li>EVGA</li>
                <li>Cooler Master</li>
            </ol>
            
            <h3>Распространенные ошибки:</h3>
            <ul>
                <li>Экономия на блоке питания</li>
                <li>Покупка noname-брендов</li>
                <li>Недостаточная мощность</li>
                <li>Игнорирование отзывов и обзоров</li>
            </ul>
            
            <p>Инвестируйте в качественный блок питания — это гарантия стабильной работы и долговечности всей системы.</p>
        `
    },
    4: {
        category: "Настройка",
        title: "Оптимизация Windows 10 для игр",
        date: "14 мая 2023",
        readTime: "10 мин",
        image: "https://avatars.mds.yandex.net/get-altay/12820607/2a000001941bdee7a834b4161694a8893638/XXL_height",
        tags: ["Windows 10", "Оптимизация", "Игры", "Производительность"],
        content: `
            <p>Windows 10 по умолчанию настроена для универсального использования. Специальная оптимизация может дать прирост FPS в играх до 15-20%.</p>
            
            <h3>Безопасная оптимизация:</h3>
            
            <h4>1. Настройки электропитания</h4>
            <p>Выберите схему "Высокая производительность" в Панели управления > Электропитание.</p>
            
            <h4>2. Отключение фоновых процессов</h4>
            <ul>
                <li>В Параметрах > Конфиденциальность > Фоновые приложения отключите всё ненужное</li>
                <li>В Диспетчере задач > Автозагрузка отключите лишние программы</li>
            </ul>
            
            <h4>3. Настройка видеодрайвера</h4>
            <p>Для NVIDIA: в Панели управления NVIDIA установите:</p>
            <ul>
                <li>Управление настройкой 3D > Предпочтительный процессор > Высокопроизводительный процессор NVIDIA</li>
                <li>Вертикальный синхроз (Vsync) > Выкл (если монитор с поддержкой G-Sync/FreeSync)</li>
                <li>Фильтрация текстур > Качество > Высокая производительность</li>
            </ul>
            
            <h4>4. Настройка игры через Панель управления Windows</h4>
            <p>Параметры > Игры > Режим игры > Вкл</p>
            
            <h3>Продвинутая оптимизация (с осторожностью):</h3>
            
            <h4>1. Отключение служб</h4>
            <p>Через services.msc можно отключить:</p>
            <ul>
                <li>Windows Search (если не пользуетесь поиском)</li>
                <li>Superfetch</li>
                <li>Помощник по обновлению Windows</li>
            </ul>
            
            <h4>2. Настройка реестра</h4>
            <p>Только для опытных пользователей! Создавайте резервные копии.</p>
            
            <h4>3. Отключение визуальных эффектов</h4>
            <p>Система > Дополнительные параметры системы > Быстродействие > Обеспечить наилучшее быстродействие.</p>
            
            <h3>Программы для оптимизации:</h3>
            <ul>
                <li>Razer Cortex — безопасная и эффективная</li>
                <li>Winaero Tweaker — для тонкой настройки</li>
                <li>O&O ShutUp10 — для контроля приватности</li>
            </ul>
            
            <p><strong>Важно:</strong> Перед оптимизацией создайте точку восстановления системы!</p>
        `
    },
    5: {
        category: "Обслуживание",
        title: "Как очистить компьютер от пыли",
        date: "5 мая 2023",
        readTime: "6 мин",
        image: "https://avatars.mds.yandex.net/get-altay/12820607/2a000001941bdee7a834b4161694a8893638/XXL_height",
        tags: ["Очистка", "Обслуживание", "Пыль", "Температура"],
        content: `
            <p>Регулярная очистка компьютера от пыли — простой и эффективный способ продлить срок службы компонентов и сохранить производительность.</p>
            
            <h3>Что понадобится:</h3>
            <ul>
                <li>Баллон со сжатым воздухом</li>
                <li>Мягкие кисточки (лучше из натурального ворса)</li>
                <li>Влажные салфетки без спирта</li>
                <li>Отвертки (крестовая и плоская)</li>
                <li>Пылесос с тонкой насадкой (осторожно!)</li>
                <li>Антистатический браслет (рекомендуется)</li>
            </ul>
            
            <h3>Пошаговая инструкция:</h3>
            
            <h4>1. Подготовка</h4>
            <ul>
                <li>Выключите компьютер и отсоедините от сети</li>
                <li>Перенесите в хорошо проветриваемое помещение</li>
                <li>Наденьте антистатический браслет</li>
            </ul>
            
            <h4>2. Разборка</h4>
            <p>Снимите боковую панель. При необходимости снимите видеокарту и кулеры для тщательной очистки.</p>
            
            <h4>3. Очистка компонентов</h4>
            <ul>
                <li><strong>Кулеры:</strong> Зафиксируйте лопасти и продуйте сжатым воздухом</li>
                <li><strong>Радиаторы:</strong> Тщательно продуйте между ребрами</li>
                <li><strong>Материнская плата:</strong> Используйте кисточку для труднодоступных мест</li>
                <li><strong>Блок питания:</strong> Не разбирайте! Только внешняя продувка</li>
            </ul>
            
            <h4>4. Чистка корпуса</h4>
            <p>Протрите внутренние поверхности влажной салфеткой. Очистите пылевые фильтры (если есть).</p>
            
            <h4>5. Сборка</h4>
            <p>Убедитесь, что все компоненты правильно установлены и подключены.</p>
            
            <h3>Частота очистки:</h3>
            <ul>
                <li><strong>Раз в 3-6 месяцев:</strong> Если компьютер на полу или в пыльном помещении</li>
                <li><strong>Раз в 6-12 месяцев:</strong> Для обычных условий</li>
                <li><strong>Сразу при повышении температуры:</strong> Если кулеры стали работать громче</li>
            </ul>
            
            <h3>Чего делать НЕЛЬЗЯ:</h3>
            <ul>
                <li>Использовать пылесос без антистатической защиты</li>
                <li>Чистить включенный компьютер</li>
                <li>Использовать бытовые моющие средства</li>
                <li>Сильно давить на компоненты</li>
            </ul>
            
            <p>Регулярная чистка — лучшая профилактика перегрева и преждевременного выхода из строя.</p>
        `
    },
    6: {
        category: "Безопасность",
        title: "Защита от вирусов и шпионского ПО",
        date: "28 апреля 2023",
        readTime: "9 мин",
        image: "https://avatars.mds.yandex.net/get-altay/12820607/2a000001941bdee7a834b4161694a8893638/XXL_height",
        tags: ["Безопасность", "Антивирус", "Вирусы", "Защита"],
        content: `
            <p>В современном цифровом мире защита компьютера — не роскошь, а необходимость. Рассмотрим комплексный подход к безопасности.</p>
            
            <h3>Многоуровневая защита:</h3>
            
            <h4>1. Антивирусное ПО</h4>
            <p><strong>Платные решения (рекомендуются):</strong></p>
            <ul>
                <li>Kaspersky Internet Security — лучшая защита для Рунета</li>
                <li>ESET NOD32 — минимальное влияние на производительность</li>
                <li>Bitdefender Total Security — максимальный набор функций</li>
            </ul>
            
            <p><strong>Бесплатные варианты:</strong></p>
            <ul>
                <li>Windows Defender (встроен в Windows 10/11) — базовая защита</li>
                <li>Avast Free Antivirus — хороший бесплатный вариант</li>
                <li>Malwarebytes — для дополнительной проверки</li>
            </ul>
            
            <h4>2. Фаервол (брандмауэр)</h4>
            <p>Встроенного фаервола Windows обычно достаточно для домашнего использования. Для продвинутых пользователей — Comodo Firewall.</p>
            
            <h4>3. Защита браузера</h4>
            <ul>
                <li>uBlock Origin — блокировщик рекламы и вредоносных скриптов</li>
                <li>HTTPS Everywhere — принудительное использование защищенных соединений</li>
                <li>NoScript (для продвинутых) — контроль выполнения скриптов</li>
            </ul>
            
            <h3>Правила цифровой гигиены:</h3>
            
            <h4>1. Обновления</h4>
            <p>Всегда устанавливайте обновления:</p>
            <ul>
                <li>Операционной системы</li>
                <li>Антивируса</li>
                <li>Браузера</li>
                <li>Драйверов</li>
            </ul>
            
            <h4>2. Резервное копирование</h4>
            <p>Используйте правило 3-2-1:</p>
            <ul>
                <li>3 копии данных</li>
                <li>2 разных носителя</li>
                <li>1 копия вне дома/офиса</li>
            </ul>
            
            <h4>3. Безопасность паролей</h4>
            <ul>
                <li>Используйте менеджер паролей (Bitwarden, LastPass)</li>
                <li>Включайте двухфакторную аутентификацию</li>
                <li>Не используйте один пароль на разных сайтах</li>
            </ul>
            
            <h3>Распознавание угроз:</h3>
            <p><strong>Типичные признаки заражения:</strong></p>
            <ul>
                <li>Замедление работы компьютера</li>
                <li>Неизвестные процессы в диспетчере задач</li>
                <li>Самопроизвольное открытие рекламы</li>
                <li>Изменение домашней страницы браузера</li>
                <li>Необычная сетевая активность</li>
            </ul>
            
            <h3>Что делать при заражении:</h3>
            <ol>
                <li>Отключитесь от интернета</li>
                <li>Запустите антивирус в безопасном режиме</li>
                <li>Используйте Rescue Disk от вашего антивируса</li>
                <li>При серьезном заражении — переустановите систему</li>
                <li>Восстановите данные из резервной копии</li>
            </ol>
            
            <p>Помните: лучшая защита — это осторожность. Не открывайте подозрительные письма, не скачивайте файлы с неизвестных сайтов, не отключайте антивирус "для скорости".</p>
        `
    }
};

// Открытие модального окна
document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('blogModalOverlay');
    const modal = document.getElementById('blogModal');
    const modalClose = document.getElementById('modalClose');
    const readArticleBtns = document.querySelectorAll('.read-article-btn');
    
    // Функция для открытия модального окна
    function openModal(articleId) {
        const article = articlesData[articleId];
        
        if (!article) return;
        
        // Заполняем данные статьи
        document.getElementById('modalCategory').textContent = article.category;
        document.getElementById('modalTitle').textContent = article.title;
        document.getElementById('modalImage').src = article.image;
        document.getElementById('modalImage').alt = article.title;
        
        // Заполняем мета-информацию
        const modalMeta = document.getElementById('modalMeta');
        modalMeta.innerHTML = `
            <span><i class="far fa-calendar"></i> ${article.date}</span>
            <span><i class="far fa-clock"></i> ${article.readTime}</span>
        `;
        
        // Заполняем содержимое
        document.getElementById('modalContent').innerHTML = article.content;
        
        // Заполняем теги
        const modalTags = document.getElementById('modalTags');
        modalTags.innerHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        // Показываем модальное окно
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }
    
    // Функция для закрытия модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Возвращаем скролл
    }
    
    // Обработчики для кнопок "Читать статью"
    readArticleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article-id');
            openModal(articleId);
        });
    });
    
    // Закрытие по крестику
    modalClose.addEventListener('click', closeModal);
    
    // Закрытие по клику вне модального окна
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Кнопка "Заказать консультацию" в модальном окне
    const modalContactBtn = document.querySelector('.modal-contact');
    if (modalContactBtn) {
        modalContactBtn.addEventListener('click', function() {
            closeModal();
            // Можно добавить переход на страницу контактов или открытие формы
            setTimeout(() => {
                alert('Перенаправляем на страницу контактов...');
                // window.location.href = 'contact.html';
            }, 300);
        });
    }
});