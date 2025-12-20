// js/contacts.js - JavaScript для страницы "Контакты"

document.addEventListener('DOMContentLoaded', function () {
	// Инициализация компонентов
	initContactForm()
	initFAQ()
	initMapPlaceholder()
	initSocialLinks()
	initScrollEffects()
	initAnimations()
	updateCopyrightYear()

	// Инициализация анимации карточек
	animateContactCards()
})

// Форма обратной связи
function initContactForm() {
	const contactForm = document.getElementById('contactForm')

	if (!contactForm) return

	contactForm.addEventListener('submit', function (e) {
		e.preventDefault()

		// Собираем данные формы
		const formData = new FormData(this)
		const data = Object.fromEntries(formData)

		// Валидация
		if (!validateContactForm(data)) {
			return
		}

		// Показываем индикатор загрузки
		const submitBtn = this.querySelector('button[type="submit"]')
		if (!submitBtn) return

		const originalText = submitBtn.textContent
		submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...'
		submitBtn.disabled = true

		// Имитация отправки на сервер
		setTimeout(() => {
			// Здесь должен быть реальный запрос к серверу
			console.log('Контактная форма отправлена:', data)

			// Показываем сообщение об успехе
			showNotification(
				'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
				'success',
			)

			// Сбрасываем форму
			this.reset()

			// Восстанавливаем кнопку
			submitBtn.textContent = originalText
			submitBtn.disabled = false
		}, 1500)
	})
}

// Валидация формы контактов
function validateContactForm(data) {
	// Проверка имени
	if (!data.name || data.name.trim().length < 2) {
		showNotification(
			'Пожалуйста, введите ваше имя (минимум 2 символа)',
			'error',
		)
		return false
	}

	// Проверка телефона
	if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
		showNotification('Пожалуйста, введите корректный номер телефона', 'error')
		return false
	}

	// Проверка email
	if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
		showNotification('Пожалуйста, введите корректный email', 'error')
		return false
	}

	// Проверка сообщения
	if (!data.message || data.message.trim().length < 10) {
		showNotification(
			'Пожалуйста, введите сообщение (минимум 10 символов)',
			'error',
		)
		return false
	}

	return true
}

// FAQ аккордеон
function initFAQ() {
	const faqItems = document.querySelectorAll('.faq-item')

	faqItems.forEach(item => {
		const question = item.querySelector('.faq-question')

		question.addEventListener('click', function () {
			// Закрываем все остальные элементы
			faqItems.forEach(otherItem => {
				if (otherItem !== item && otherItem.classList.contains('active')) {
					otherItem.classList.remove('active')
				}
			})

			// Переключаем текущий элемент
			item.classList.toggle('active')
		})
	})
}

// Заглушка для карты
function initMapPlaceholder() {
	const mapPlaceholder = document.querySelector('.map-placeholder')

	if (mapPlaceholder) {
		mapPlaceholder.addEventListener('click', function () {
			showNotification(
				'Интерактивная карта будет доступна в ближайшее время',
				'info',
			)

			// Анимация клика
			this.style.transform = 'scale(0.98)'
			setTimeout(() => {
				this.style.transform = 'scale(1)'
			}, 200)
		})
	}
}

// Социальные ссылки
function initSocialLinks() {
	const socialLinks = document.querySelectorAll('.social-link-large')

	socialLinks.forEach(link => {
		link.addEventListener('mouseenter', function () {
			const icon = this.querySelector('i')
			if (icon) {
				icon.style.transform = 'rotate(360deg)'
				icon.style.transition = 'transform 0.5s ease'
			}
		})

		link.addEventListener('mouseleave', function () {
			const icon = this.querySelector('i')
			if (icon) {
				icon.style.transform = 'rotate(0deg)'
			}
		})

		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href')
			if (href === '#') {
				e.preventDefault()
				const platform = this.querySelector('i').className.split(' ')[1]
				let message = ''

				switch (platform) {
					case 'fa-vk':
						message = 'Страница ВКонтакте будет доступна в ближайшее время'
						break
					case 'fa-telegram':
						message = 'Telegram канал будет доступен в ближайшее время'
						break
					case 'fa-whatsapp':
						message = 'WhatsApp связь будет доступна в ближайшее время'
						break
					case 'fa-youtube':
						message = 'YouTube канал будет доступен в ближайшее время'
						break
					default:
						message = 'Эта функция скоро будет доступна'
				}

				showNotification(message, 'info')
			}
		})
	})
}

// Эффекты при скролле
function initScrollEffects() {
	const header = document.querySelector('.header')
	const scrollTopBtn = document.querySelector('.scroll-top')

	if (header) {
		window.addEventListener('scroll', function () {
			if (window.scrollY > 50) {
				header.classList.add('scrolled')
			} else {
				header.classList.remove('scrolled')
			}

			if (scrollTopBtn) {
				if (window.scrollY > 300) {
					scrollTopBtn.classList.add('visible')
				} else {
					scrollTopBtn.classList.remove('visible')
				}
			}
		})
	}

	// Кнопка "Наверх"
	if (scrollTopBtn) {
		scrollTopBtn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		})
	}
}

// Анимации
function initAnimations() {
	// Анимация элементов при скролле
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
	}

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Добавляем класс для анимации
				entry.target.classList.add('animate')

				// Конкретные анимации для разных элементов
				if (entry.target.classList.contains('contact-card')) {
					entry.target.style.opacity = '1'
					entry.target.style.transform = 'translateY(0)'
				}

				if (entry.target.classList.contains('faq-item')) {
					setTimeout(() => {
						entry.target.style.opacity = '1'
						entry.target.style.transform = 'translateY(0)'
					}, 100)
				}

				observer.unobserve(entry.target)
			}
		})
	}, observerOptions)

	// Наблюдаем за элементами
	document.querySelectorAll('.contact-card, .faq-item').forEach(element => {
		element.style.opacity = '0'
		element.style.transform = 'translateY(30px)'
		element.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		observer.observe(element)
	})
}

// Анимация контактных карточек
function animateContactCards() {
	const cards = document.querySelectorAll('.contact-card')

	cards.forEach((card, index) => {
		card.addEventListener('mouseenter', function () {
			const icon = this.querySelector('.contact-icon i')
			if (icon) {
				icon.style.transform = 'scale(1.2)'
				icon.style.transition = 'transform 0.3s ease'
			}
		})

		card.addEventListener('mouseleave', function () {
			const icon = this.querySelector('.contact-icon i')
			if (icon) {
				icon.style.transform = 'scale(1)'
			}
		})
	})
}

// Уведомления
function showNotification(message, type = 'success') {
	// Создаем элемент уведомления
	const notification = document.createElement('div')
	notification.className = `notification ${type}`
	notification.textContent = message

	// Стили для уведомления
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${
					type === 'success'
						? '#4CAF50'
						: type === 'error'
						? '#f44336'
						: '#2196F3'
				};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `

	document.body.appendChild(notification)

	// Анимация появления
	setTimeout(() => {
		notification.style.transform = 'translateX(0)'
	}, 100)

	// Автоматическое скрытие через 5 секунд
	setTimeout(() => {
		notification.style.transform = 'translateX(150%)'
		setTimeout(() => {
			notification.remove()
		}, 300)
	}, 5000)
}

// Обновление года в копирайте
function updateCopyrightYear() {
	const yearElement = document.querySelector('.footer-bottom p')
	if (yearElement) {
		const currentYear = new Date().getFullYear()
		yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear)
	}
}

// Плавная прокрутка для якорных ссылок
function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href')

			if (href && href.startsWith('#') && href.length > 1) {
				e.preventDefault()
				const targetId = href.substring(1)
				const targetElement = document.getElementById(targetId)

				if (targetElement) {
					const headerHeight =
						document.querySelector('.header')?.offsetHeight || 80
					const targetPosition =
						targetElement.getBoundingClientRect().top + window.pageYOffset

					window.scrollTo({
						top: targetPosition - headerHeight,
						behavior: 'smooth',
					})
				}
			}
		})
	})
}

// Инициализация маски телефона
function initPhoneMask() {
	const phoneInput = document.querySelector('input[type="tel"]')

	if (phoneInput) {
		phoneInput.addEventListener('input', function (e) {
			let value = this.value.replace(/\D/g, '')

			if (value.length > 0) {
				value = value.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
				this.value = !value[2]
					? value[1]
					: '+7 (' +
					  value[2] +
					  ') ' +
					  value[3] +
					  (value[4] ? '-' + value[4] : '') +
					  (value[5] ? '-' + value[5] : '')
			}
		})
	}
}

// Экспорт функций для глобального использования
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		initContactForm,
		initFAQ,
		initMapPlaceholder,
		initSocialLinks,
		initAnimations,
		updateCopyrightYear,
	}
}
