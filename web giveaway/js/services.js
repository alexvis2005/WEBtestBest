// js/services.js - Скрипты для страницы Услуги (исправленный)

document.addEventListener('DOMContentLoaded', function () {
	initPreloader()
	initScrollEffects()
	initSmoothScroll()
	initMobileMenu()
	initAnimations()
	initFAQAccordion()
	initServiceForm()
	initTiltEffects()
	initStatsCounter()
	initParallaxEffect()
	initProcessAnimation()
	initOrderButtons()
	updateCopyrightYear()
})

// В функции initPreloader() добавьте:
function initPreloader() {
	const preloader = document.querySelector('.preloader')
	if (preloader) {
		// Устанавливаем начальное состояние
		preloader.style.opacity = '1'
		preloader.style.visibility = 'visible'
		preloader.style.transition = 'opacity 0.5s ease, visibility 0.5s ease'

		// Показываем прелоадер минимум 1 секунду
		setTimeout(() => {
			preloader.style.opacity = '0'
			preloader.style.visibility = 'hidden'
			preloader.style.pointerEvents = 'none'
		}, 1000)

		// На случай если страница грузится дольше
		window.addEventListener('load', function () {
			setTimeout(() => {
				preloader.style.opacity = '0'
				preloader.style.visibility = 'hidden'
				preloader.style.pointerEvents = 'none'
			}, 1000)
		})
	}
}

function initScrollEffects() {
	// Header scroll effect
	const header = document.querySelector('.header')
	const scrollTopBtn = document.querySelector('.scroll-top')

	if (header) {
		// Проверяем начальное состояние
		if (window.scrollY > 50) {
			header.classList.add('scrolled')
		}

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

function initSmoothScroll() {
	// Плавный скролл для якорных ссылок
	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href')

			if (href && href.startsWith('#') && href !== '#') {
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

function initMobileMenu() {
	const hamburger = document.querySelector('.hamburger')
	const navMenu = document.querySelector('.nav-menu')

	if (hamburger && navMenu) {
		hamburger.addEventListener('click', function () {
			hamburger.classList.toggle('active')
			navMenu.classList.toggle('active')

			// Блокируем скролл на body при открытом меню
			if (navMenu.classList.contains('active')) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = 'auto'
			}
		})

		// Закрытие меню при клике на ссылку
		document.querySelectorAll('.nav-link').forEach(link => {
			link.addEventListener('click', () => {
				hamburger.classList.remove('active')
				navMenu.classList.remove('active')
				document.body.style.overflow = 'auto'
			})
		})
	}
}

function initAnimations() {
	// Анимация появления элементов
	const animateElements = () => {
		const elements = document.querySelectorAll('.page-hero, .services-intro')

		elements.forEach(element => {
			element.style.opacity = '0'
			element.style.transform = 'translateY(20px)'
			element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
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

		elements.forEach(element => observer.observe(element))
	}

	// Анимация для карточек услуг
	const animateServiceCards = () => {
		const serviceCards = document.querySelectorAll('.service-category')

		serviceCards.forEach((card, index) => {
			card.style.opacity = '0'
			card.style.transform = 'translateY(30px)'
			card.style.transition = `opacity 0.5s ease ${
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

		serviceCards.forEach(card => observer.observe(card))
	}

	animateElements()
	animateServiceCards()
}

// FAQ Accordion
function initFAQAccordion() {
	const faqItems = document.querySelectorAll('.faq-item')

	faqItems.forEach(item => {
		const question = item.querySelector('.faq-question')

		question.addEventListener('click', () => {
			// Close all other items
			faqItems.forEach(otherItem => {
				if (otherItem !== item && otherItem.classList.contains('active')) {
					otherItem.classList.remove('active')
					const otherAnswer = otherItem.querySelector('.faq-answer')
					otherAnswer.style.maxHeight = '0'
					otherAnswer.style.paddingBottom = '0'
				}
			})

			// Toggle current item
			item.classList.toggle('active')
			const answer = item.querySelector('.faq-answer')

			if (item.classList.contains('active')) {
				answer.style.maxHeight = answer.scrollHeight + 'px'
			} else {
				answer.style.maxHeight = '0'
			}
		})
	})
}

// Form Submission
function initServiceForm() {
	const serviceForm = document.querySelector('.service-form')
	const successModal = document.getElementById('successModal')
	const closeModalBtns = document.querySelectorAll(
		'.close-modal, .close-modal-btn',
	)

	if (serviceForm) {
		serviceForm.addEventListener('submit', function (e) {
			e.preventDefault()

			// Get form data
			const formData = new FormData(this)
			const serviceType = this.querySelector('select[name="service"]').value
			const serviceName = this.querySelector(
				'select[name="service"] option:checked',
			).text

			// Basic validation
			if (!validateForm(formData)) {
				return
			}

			// Show loading state
			const submitBtn = this.querySelector('button[type="submit"]')
			const originalText = submitBtn.textContent
			submitBtn.textContent = 'Отправка...'
			submitBtn.disabled = true

			// Simulate API call
			setTimeout(() => {
				console.log('Service request submitted:', {
					name: formData.get('name'),
					phone: formData.get('phone'),
					email: formData.get('email'),
					service: serviceName,
					description: formData.get('description'),
				})

				// Show success modal
				if (successModal) {
					successModal.classList.add('active')
					document.body.style.overflow = 'hidden'
				}

				// Reset form
				this.reset()

				// Restore button
				submitBtn.textContent = originalText
				submitBtn.disabled = false
			}, 1500)
		})
	}

	// Close modal functionality
	closeModalBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			successModal.classList.remove('active')
			document.body.style.overflow = 'auto'
		})
	})

	// Close modal on outside click
	if (successModal) {
		successModal.addEventListener('click', e => {
			if (e.target === successModal) {
				successModal.classList.remove('active')
				document.body.style.overflow = 'auto'
			}
		})
	}

	// Close modal on Escape key
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && successModal.classList.contains('active')) {
			successModal.classList.remove('active')
			document.body.style.overflow = 'auto'
		}
	})
}

function validateForm(formData) {
	const name = formData.get('name')
	const phone = formData.get('phone')

	// Check required fields
	if (!name || !phone) {
		alert('Пожалуйста, заполните обязательные поля')
		return false
	}

	// Phone validation
	const phoneRegex = /^[\d\s\-\+\(\)]+$/
	if (!phoneRegex.test(phone)) {
		alert('Пожалуйста, введите корректный номер телефона')
		return false
	}

	return true
}

// Tilt effects for service cards
function initTiltEffects() {
	if (typeof VanillaTilt !== 'undefined') {
		const serviceCards = document.querySelectorAll('.service-category')
		if (serviceCards.length > 0) {
			VanillaTilt.init(serviceCards, {
				max: 10,
				speed: 400,
				glare: true,
				'max-glare': 0.2,
				scale: 1.02,
				perspective: 1000,
			})
		}
	}
}

// Анимация счетчика статистики
function initStatsCounter() {
	const statNumbers = document.querySelectorAll('.stat-number')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const element = entry.target
					const target = parseInt(element.dataset.count)
					const duration = 2000 // 2 секунды
					const step = target / (duration / 16) // 60fps
					let current = 0

					const counter = setInterval(() => {
						current += step
						if (current >= target) {
							current = target
							clearInterval(counter)
						}
						element.textContent = Math.round(current)
					}, 16)

					element.style.animation = 'countUp 0.5s ease forwards'
					observer.unobserve(element)
				}
			})
		},
		{
			threshold: 0.5,
		},
	)

	statNumbers.forEach(number => observer.observe(number))
}

// Параллакс эффект для карточек услуг
function initParallaxEffect() {
	const serviceCards = document.querySelectorAll('.service-category')

	window.addEventListener('mousemove', e => {
		const mouseX = e.clientX / window.innerWidth
		const mouseY = e.clientY / window.innerHeight

		serviceCards.forEach(card => {
			const speed = 0.5
			const x = (mouseX - 0.5) * speed * 20
			const y = (mouseY - 0.5) * speed * 20

			card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-10px)`
		})
	})

	// Сброс при уходе мыши
	window.addEventListener('mouseleave', () => {
		serviceCards.forEach(card => {
			card.style.transform =
				'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)'
		})
	})
}

// Анимация процесса работы
function initProcessAnimation() {
	const processSteps = document.querySelectorAll('.process-step')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						entry.target.style.opacity = '1'
						entry.target.style.transform = 'translateY(0)'
					}, index * 100)
				}
			})
		},
		{
			threshold: 0.1,
		},
	)

	processSteps.forEach(step => {
		step.style.opacity = '0'
		step.style.transform = 'translateY(20px)'
		step.style.transition = 'all 0.6s ease'
		observer.observe(step)
	})
}

// Функция для модального окна заказа
function initOrderButtons() {
	const orderButtons = document.querySelectorAll(
		'.category-footer .btn-outline',
	)

	// Если нет кнопок, выходим
	if (orderButtons.length === 0) return

	// Создаем модальное окно заказа если его нет
	if (!document.getElementById('orderModal')) {
		const orderModal = document.createElement('div')
		orderModal.className = 'modal'
		orderModal.id = 'orderModal'
		orderModal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">
                    <i class="fas fa-times"></i>
                </button>
                <h3 class="modal-title">Выбрать услугу</h3>
                <div class="order-form">
                    <div class="form-group">
                        <label for="order-service">Услуга</label>
                        <select id="order-service" name="service" required>
                            <option value="">Выберите услугу</option>
                            <option value="pc">Ремонт компьютеров</option>
                            <option value="laptop">Ремонт ноутбуков</option>
                            <option value="data">Восстановление данных</option>
                            <option value="virus">Удаление вирусов</option>
                            <option value="setup">Настройка ПО</option>
                            <option value="help">Компьютерная помощь</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="order-name">Ваше имя *</label>
                        <input type="text" id="order-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="order-phone">Телефон *</label>
                        <input type="tel" id="order-phone" name="phone" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-large order-submit">
                        Заказать услугу
                    </button>
                </div>
            </div>
        `

		document.body.appendChild(orderModal)
	}

	const orderModal = document.getElementById('orderModal')
	const successModal = document.getElementById('successModal')

	// Обработчики для кнопок "Заказать"
	orderButtons.forEach(button => {
		// Удаляем старые обработчики
		button.removeEventListener('click', handleOrderClick)

		// Добавляем новые
		button.addEventListener('click', handleOrderClick)
	})

	function handleOrderClick(e) {
		e.preventDefault()

		const serviceCard = this.closest('.service-category')
		let serviceType = ''

		// Определяем тип услуги по ID карточки
		if (serviceCard.id === 'pc') serviceType = 'pc'
		else if (serviceCard.id === 'laptop') serviceType = 'laptop'
		else if (serviceCard.id === 'data') serviceType = 'data'
		else if (serviceCard.id === 'virus') serviceType = 'virus'
		else if (serviceCard.id === 'setup') serviceType = 'setup'
		else if (serviceCard.id === 'help') serviceType = 'help'

		// Устанавливаем выбранную услугу в модальном окне
		const orderServiceSelect = document.getElementById('order-service')
		if (orderServiceSelect && serviceType) {
			orderServiceSelect.value = serviceType
		}

		// Показываем модальное окно
		orderModal.classList.add('active')
		document.body.style.overflow = 'hidden'
	}

	// Закрытие модального окна
	const closeModal = orderModal.querySelector('.close-modal')
	closeModal.addEventListener('click', () => {
		orderModal.classList.remove('active')
		document.body.style.overflow = 'auto'
	})

	// Закрытие при клике вне окна
	orderModal.addEventListener('click', e => {
		if (e.target === orderModal) {
			orderModal.classList.remove('active')
			document.body.style.overflow = 'auto'
		}
	})

	// Закрытие на Escape
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && orderModal.classList.contains('active')) {
			orderModal.classList.remove('active')
			document.body.style.overflow = 'auto'
		}
	})

	// Отправка формы заказа
	const orderSubmit = orderModal.querySelector('.order-submit')
	orderSubmit.addEventListener('click', function () {
		const orderServiceSelect = document.getElementById('order-service')
		const orderName = document.getElementById('order-name')
		const orderPhone = document.getElementById('order-phone')

		// Валидация
		if (!orderServiceSelect.value || !orderName.value || !orderPhone.value) {
			alert('Пожалуйста, заполните все обязательные поля')
			return
		}

		// Показываем сообщение об успехе
		orderModal.classList.remove('active')

		if (successModal) {
			setTimeout(() => {
				successModal.classList.add('active')
				document.body.style.overflow = 'hidden'
			}, 300)
		}

		// Сбрасываем форму
		orderName.value = ''
		orderPhone.value = ''
		orderServiceSelect.value = ''
	})
}

// Update copyright year
function updateCopyrightYear() {
	const yearElement = document.querySelector('.footer-bottom p')
	if (yearElement) {
		const currentYear = new Date().getFullYear()
		yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear)
	}
}
