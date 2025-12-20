// js/mobile-menu.js - Универсальное мобильное меню (исправленный)

class MobileMenu {
	constructor() {
		this.hamburger = document.querySelector('.hamburger')
		this.navMenu = document.querySelector('.nav-menu')
		this.navLinks = document.querySelectorAll('.nav-link')
		this.menuOverlay = document.createElement('div')
		this.init()
	}

	init() {
		// Создаем оверлей для меню
		this.createOverlay()

		// Вешаем обработчики событий
		this.addEventListeners()

		// Инициализируем анимацию элементов меню
		this.initMenuAnimation()
	}

	createOverlay() {
		this.menuOverlay.className = 'menu-overlay'
		document.body.appendChild(this.menuOverlay)
	}

	addEventListeners() {
		// Клик по гамбургеру
		this.hamburger?.addEventListener('click', () => this.toggleMenu())

		// Клик по оверлею
		this.menuOverlay.addEventListener('click', () => this.closeMenu())

		// Клик по ссылкам в меню
		this.navLinks.forEach(link => {
			link.addEventListener('click', () => this.closeMenu())
		})

		// Закрытие меню при ресайзе окна
		window.addEventListener('resize', () => {
			if (window.innerWidth > 768) {
				this.closeMenu()
			}
		})

		// Закрытие меню при нажатии ESC
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				this.closeMenu()
			}
		})
	}

	initMenuAnimation() {
		// Добавляем анимацию для элементов меню
		this.navLinks.forEach(link => {
			link.style.transition = 'all 0.3s ease'
		})
	}

	toggleMenu() {
		this.hamburger.classList.toggle('active')
		this.navMenu.classList.toggle('active')
		this.menuOverlay.classList.toggle('active')
		document.body.style.overflow = this.navMenu.classList.contains('active')
			? 'hidden'
			: ''
	}

	closeMenu() {
		this.hamburger?.classList.remove('active')
		this.navMenu?.classList.remove('active')
		this.menuOverlay.classList.remove('active')
		document.body.style.overflow = ''
	}

	// Метод для добавления новых ссылок в меню
	addMenuItem(text, href) {
		const li = document.createElement('li')
		li.className = 'nav-item'

		const a = document.createElement('a')
		a.className = 'nav-link'
		a.href = href
		a.textContent = text

		li.appendChild(a)
		this.navMenu?.appendChild(li)

		// Обновляем обработчики событий
		a.addEventListener('click', () => this.closeMenu())
		this.navLinks = document.querySelectorAll('.nav-link')
	}
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
	window.mobileMenu = new MobileMenu()
})
