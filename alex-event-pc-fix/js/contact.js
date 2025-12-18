// Инициализация для страницы контактов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация формы
    initContactForm();
    
    // Инициализация FAQ аккордеона
    initFAQAccordion();
    
    // Инициализация анимаций
    initContactAnimations();
});

// Форма контактов
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            const problem = this.querySelector('textarea').value;
            const agree = this.querySelector('input[type="checkbox"]').checked;
            
            // Валидация
            if (!name || !phone || !service || !agree) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // Проверка телефона
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            // В реальном проекте здесь был бы код для отправки данных на сервер
            console.log('Данные заявки:', {
                name,
                phone,
                service,
                problem,
                agree
            });
            
            // Показываем сообщение об успехе
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 15 минут.');
            
            // Очищаем форму
            this.reset();
        });
    }
}

// FAQ аккордеон
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Закрываем все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
}

// Анимации при скролле
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    function checkCardsVisibility() {
        contactCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 100;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Устанавливаем начальное состояние
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Проверяем видимость при загрузке и скролле
    window.addEventListener('scroll', checkCardsVisibility);
    window.addEventListener('load', checkCardsVisibility);
    
    // Первоначальная проверка
    setTimeout(checkCardsVisibility, 500);
}