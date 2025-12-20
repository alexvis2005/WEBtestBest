// js/index.js - Главный файл скриптов (исправленный и дополненный)

document.addEventListener('DOMContentLoaded', function () {
	// Инициализация компонентов
	initPreloader()
	initScrollEffects()
	initSmoothScroll()
	initFormSubmission()
	initAnimations()
	initSectionAnimations()
	initAdvantageAnimations()
	initTiltEffects()
	updateCopyrightYear()
	initModalForm()
})

function initPreloader() {
	const preloader = document.querySelector('.preloader')
	if (preloader) {
		// Показываем прелоадер минимум 1 секунду
		setTimeout(() => {
			preloader.classList.add('hidden')
		}, 1000)

		// На случай если страница грузится дольше
		window.addEventListener('load', function () {
			setTimeout(() => {
				preloader.classList.add('hidden')
			}, 1000)
		})
	}
}

function initScrollEffects() {
	// Header scroll effect
	const header = document.querySelector('.header')
	const scrollTopBtn = document.querySelector('.scroll-top')

	if (header) {
		window.addEventListener('scroll', function () {
			// Header effect
			if (window.scrollY > 50) {
				header.classList.add('scrolled')
			} else {
				header.classList.remove('scrolled')
			}

			// Scroll to top button
			if (scrollTopBtn) {
				if (window.scrollY > 300) {
					scrollTopBtn.classList.add('visible')
				} else {
					scrollTopBtn.classList.remove('visible')
				}
			}
		})
	}

	// Scroll to top functionality
	if (scrollTopBtn) {
		scrollTopBtn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		})
	}
}

function initSectionAnimations() {
	const sections = document.querySelectorAll('section[id]')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('fade-in')
					observer.unobserve(entry.target)
				}
			})
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -100px 0px',
		},
	)

	sections.forEach(section => {
		section.style.opacity = '0'
		observer.observe(section)
	})
}

function initAdvantageAnimations() {
	const advantages = document.querySelectorAll('.advantage-item')

	if (advantages.length === 0) return

	advantages.forEach((advantage, index) => {
		advantage.style.opacity = '0'
		advantage.style.transform = 'translateY(30px)'
		advantage.style.transition = `opacity 0.5s ease ${
			index * 0.1
		}s, transform 0.5s ease ${index * 0.1}s`
	})

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1'
					entry.target.style.transform = 'translateY(0)'
				}
			})
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
		},
	)

	advantages.forEach(advantage => observer.observe(advantage))
}

function initSmoothScroll() {
	// Плавный скролл для якорных ссылок
	document.querySelectorAll('.smooth-scroll').forEach(link => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href')

			if (href && href.startsWith('#')) {
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

					// Обновляем активную ссылку в меню
					updateActiveNavLink(href)
				}
			}
		})
	})

	// Обновление активной ссылки при скролле
	const sections = document.querySelectorAll('section[id]')
	const navLinks = document.querySelectorAll('.nav-link')

	function updateActiveNavLinkOnScroll() {
		const scrollPosition = window.scrollY + 100
		let currentSectionId = ''

		sections.forEach(section => {
			const sectionTop = section.offsetTop
			const sectionHeight = section.clientHeight
			const sectionId = section.getAttribute('id')

			if (
				scrollPosition >= sectionTop &&
				scrollPosition < sectionTop + sectionHeight
			) {
				currentSectionId = sectionId
			}
		})

		// Обновляем активную ссылку только если нашли секцию
		if (currentSectionId) {
			navLinks.forEach(link => {
				link.classList.remove('active')
				if (
					link.getAttribute('href') === `#${currentSectionId}` ||
					(link.getAttribute('href') === 'index.html' &&
						currentSectionId === 'home')
				) {
					link.classList.add('active')
				}
			})
		}
	}

	if (sections.length > 0 && navLinks.length > 0) {
		// Инициализируем при загрузке
		updateActiveNavLinkOnScroll()

		// Обновляем при скролле
		window.addEventListener('scroll', updateActiveNavLinkOnScroll)
	}
}

function updateActiveNavLink(href) {
	document.querySelectorAll('.nav-link').forEach(link => {
		link.classList.remove('active')
		if (link.getAttribute('href') === href) {
			link.classList.add('active')
		}
	})
}

function initFormSubmission() {
	const forms = document.querySelectorAll('.repair-form')

	forms.forEach(form => {
		form.addEventListener('submit', function (e) {
			e.preventDefault()

			// Собираем данные формы
			const formData = new FormData(this)
			const data = Object.fromEntries(formData)

			// Валидация
			if (!validateForm(data)) {
				return
			}

			// Показываем индикатор загрузки
			const submitBtn = this.querySelector('button[type="submit"]')
			if (!submitBtn) return

			const originalText = submitBtn.textContent
			submitBtn.textContent = 'Отправка...'
			submitBtn.disabled = true

			// Имитация отправки на сервер
			setTimeout(() => {
				// Здесь должен быть реальный запрос к серверу
				console.log('Форма отправлена:', data)

				// Показываем сообщение об успехе
				showNotification(
					'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
					'success',
				)

				// Сбрасываем форму
				this.reset()

				// Закрываем модальное окно, если оно открыто
				const modal = document.getElementById('repairModal')
				if (modal && modal.classList.contains('active')) {
					modal.classList.remove('active')
					document.body.style.overflow = 'auto'
				}

				// Восстанавливаем кнопку
				submitBtn.textContent = originalText
				submitBtn.disabled = false
			}, 1500)
		})
	})
}

function validateForm(data) {
	// Проверка телефона
	if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
		showNotification('Пожалуйста, введите корректный номер телефона', 'error')
		return false
	}

	// Проверка email
	if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
		showNotification('Пожалуйста, введите корректный email', 'error')
		return false
	}

	return true
}

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
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
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

function initAnimations() {
	// Анимация элементов при скролле
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
	}

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Добавляем анимацию для карточек услуг
				if (entry.target.classList.contains('service-card')) {
					entry.target.style.opacity = '1'
					entry.target.style.transform = 'translateY(0)'
				}

				observer.unobserve(entry.target)
			}
		})
	}, observerOptions)

	// Наблюдаем за карточками услуг
	document.querySelectorAll('.service-card').forEach(card => {
		card.style.opacity = '0'
		card.style.transform = 'translateY(30px)'
		card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		observer.observe(card)
	})
}

function initTiltEffects() {
	// Инициализация Vanilla Tilt для карточек
	if (typeof VanillaTilt !== 'undefined') {
		const serviceCards = document.querySelectorAll('.service-card')
		if (serviceCards.length > 0) {
			VanillaTilt.init(serviceCards, {
				max: 15,
				speed: 400,
				glare: true,
				'max-glare': 0.3,
				scale: 1.05,
				perspective: 1000,
			})
		}
	}
}

function updateCopyrightYear() {
	const yearElement = document.querySelector('.footer-bottom p')
	if (yearElement) {
		const currentYear = new Date().getFullYear()
		yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear)
	}
}

function initModalForm() {
	const modal = document.getElementById('repairModal')
	const openButtons = document.querySelectorAll('.modal-open-btn')
	const closeButton = modal?.querySelector('.close-modal')

	if (!modal) return

	// Открытие модального окна
	openButtons.forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			modal.classList.add('active')
			document.body.style.overflow = 'hidden'
		})
	})

	// Закрытие модального окна
	closeButton?.addEventListener('click', () => {
		modal.classList.remove('active')
		document.body.style.overflow = 'auto'
	})

	// Закрытие при клике вне окна
	modal.addEventListener('click', e => {
		if (e.target === modal) {
			modal.classList.remove('active')
			document.body.style.overflow = 'auto'
		}
	})

	// Закрытие по ESC
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			modal.classList.remove('active')
			document.body.style.overflow = 'auto'
		}
	})
}

// Экспортируем функции для использования на других страницах
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		initPreloader,
		initScrollEffects,
		initSmoothScroll,
		initFormSubmission,
		initAnimations,
		initSectionAnimations,
		initAdvantageAnimations,
		initTiltEffects,
		updateCopyrightYear,
		initModalForm,
	}
}
