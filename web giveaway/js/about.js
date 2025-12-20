// js/about.js - JavaScript для страницы "О нас"

document.addEventListener('DOMContentLoaded', function () {
	// Инициализация анимаций
	initStatsAnimation()
	initTeamAnimations()
	initTimelineAnimations()
	initReviewAnimations()
	initScrollEffects()

	// Инициализация счетчика лет
	updateCompanyYears()
})

// Анимация статистики
function initStatsAnimation() {
	const statItems = document.querySelectorAll('.stat-item')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const statNumber = entry.target.querySelector('.stat-number')
					const count = parseInt(statNumber.getAttribute('data-count'))

					if (statNumber && !statNumber.classList.contains('animated')) {
						animateCounter(statNumber, count)
						statNumber.classList.add('animated')
					}

					entry.target.classList.add('animate')
				}
			})
		},
		{
			threshold: 0.5,
		},
	)

	statItems.forEach(item => observer.observe(item))
}

// Анимация счетчика
function animateCounter(element, target) {
	let current = 0
	const increment = target / 100
	const timer = setInterval(() => {
		current += increment
		if (current >= target) {
			current = target
			clearInterval(timer)
		}
		element.textContent = Math.round(current)
	}, 20)
}

// Анимация команды
function initTeamAnimations() {
	const teamMembers = document.querySelectorAll('.team-member')

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

	teamMembers.forEach((member, index) => {
		member.style.opacity = '0'
		member.style.transform = 'translateY(30px)'
		member.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		observer.observe(member)
	})
}

// Анимация таймлайна
function initTimelineAnimations() {
	const timelineItems = document.querySelectorAll('.timeline-item')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						entry.target.style.opacity = '1'
						entry.target.style.transform = 'translateX(0)'
					}, index * 200)
				}
			})
		},
		{
			threshold: 0.1,
		},
	)

	timelineItems.forEach((item, index) => {
		item.style.opacity = '0'
		if (index % 2 === 0) {
			item.style.transform = 'translateX(-50px)'
		} else {
			item.style.transform = 'translateX(50px)'
		}
		item.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		observer.observe(item)
	})
}

// Анимация отзывов
function initReviewAnimations() {
	const reviewCards = document.querySelectorAll('.review-card')

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

	reviewCards.forEach((card, index) => {
		card.style.opacity = '0'
		card.style.transform = 'translateY(30px)'
		card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		observer.observe(card)
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

// Обновление лет компании
function updateCompanyYears() {
	const foundedYear = 2010
	const currentYear = new Date().getFullYear()
	const yearsInBusiness = currentYear - foundedYear

	// Находим элементы, где нужно обновить годы
	document.querySelectorAll('.years-in-business').forEach(element => {
		element.textContent = yearsInBusiness
	})

	// Обновляем год в копирайте
	const yearElement = document.querySelector('.footer-bottom p')
	if (yearElement) {
		yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear)
	}
}

// Инициализация социальных ссылок команды
function initTeamSocialLinks() {
	document.querySelectorAll('.member-social a').forEach(link => {
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
	})
}

// Эффект параллакс для изображений
function initParallaxEffect() {
	const aboutImage = document.querySelector('.about-image img')
	if (aboutImage) {
		window.addEventListener('scroll', function () {
			const scrolled = window.pageYOffset
			const rate = scrolled * -0.5
			aboutImage.style.transform = `translate3d(0px, ${rate}px, 0px)`
		})
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

// Экспорт функций для глобального использования
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		initStatsAnimation,
		initTeamAnimations,
		initTimelineAnimations,
		initReviewAnimations,
		updateCompanyYears,
		initTeamSocialLinks,
		initParallaxEffect,
		initSmoothScroll,
	}
}
