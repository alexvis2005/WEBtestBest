class ThemeSwitcher {
	constructor() {
		this.desktopThemeSwitcher = document.getElementById('themeSwitcher')
		this.mobileThemeSwitcher = document.getElementById('mobileThemeSwitcher')
		this.themeToggles = document.querySelectorAll('.theme-switcher-toggle')
		this.themeButtons = document.querySelectorAll('.theme-btn')
		this.body = document.body
		this.themes = ['light', 'default', 'dark-blue', 'new-year']
		this.currentTheme = localStorage.getItem('theme') || 'default'
		this.init()
	}

	fixColorConflicts(themeName) {
		// Добавить небольшую задержку для применения стилей темы
		setTimeout(() => {
			const advantages = document.querySelector('.advantages')
			const advantagesWave = advantages?.querySelector('path')

			if (advantages && advantagesWave) {
				switch (themeName) {
					case 'light-theme':
						advantages.style.backgroundColor = '#e9ecef'
						advantagesWave.style.fill = '#ffffff'
						break
					case 'default-theme':
						advantages.style.backgroundColor = '#343a40'
						advantagesWave.style.fill = '#1a1a2e'
						break
					case 'new-year-theme':
						advantages.style.backgroundColor = '#15242b'
						advantagesWave.style.fill = '#1a2d34'
						break
				}
			}

			// Обновить hero-wave для темной темы
			if (themeName === 'default-theme') {
				const heroWave = document.querySelector('.hero-wave path')
				if (heroWave) {
					heroWave.style.fill = '#2d2d44'
				}
			}

			// Обновить cta-wave для новогодней темы
			if (themeName === 'new-year-theme') {
				const ctaWave = document.querySelector('.cta-wave path')
				if (ctaWave) {
					ctaWave.style.fill = '#0d1b1f'
				}
			}
		}, 100)
	}

	init() {
		// Устанавливаем текущую тему
		this.setTheme(this.currentTheme)

		// Устанавливаем активную кнопку
		this.updateActiveButton(this.currentTheme)

		// Вешаем обработчики на кнопки
		this.themeButtons.forEach(btn => {
			btn.addEventListener('click', () => this.switchTheme(btn.dataset.theme))
		})

		// Вешаем обработчики на toggle
		this.themeToggles.forEach(toggle => {
			toggle.addEventListener('click', e => {
				e.stopPropagation()
				const switcher = toggle.closest('.theme-switcher')
				switcher?.classList.toggle('expanded')
				this.updateToggleIcon(toggle)
			})
		})

		// Закрытие переключателя при клике вне его
		document.addEventListener('click', e => {
			if (!e.target.closest('.theme-switcher')) {
				this.closeAllSwitchers()
			}
		})

		// Инициализируем украшения если нужно
		this.initDecorations()
	}

	switchTheme(themeName) {
		// Удаляем все темы
		this.themes.forEach(theme => {
			this.body.classList.remove(`${theme}-theme`)
		})

		// Устанавливаем новую тему
		this.setTheme(themeName)

		this.setTheme(themeName)
		this.fixColorConflicts(`${themeName}-theme`)

		// Обновляем активную кнопку
		this.updateActiveButton(themeName)

		// Сохраняем в localStorage
		localStorage.setItem('theme', themeName)

		// Закрываем все переключатели
		this.closeAllSwitchers()

		// Обновляем украшения
		this.updateDecorations(themeName)
	}

	setTheme(themeName) {
		this.body.classList.add(`${themeName}-theme`)
		this.currentTheme = themeName
	}

	updateActiveButton(themeName) {
		this.themeButtons.forEach(btn => {
			btn.classList.remove('active')
			if (btn.dataset.theme === themeName) {
				btn.classList.add('active')
			}
		})
	}

	updateToggleIcon(toggle) {
		const icon = toggle.querySelector('i')
		if (icon) {
			const switcher = toggle.closest('.theme-switcher')
			icon.className = switcher.classList.contains('expanded')
				? 'fas fa-times'
				: 'fas fa-palette'
		}
	}

	closeAllSwitchers() {
		document.querySelectorAll('.theme-switcher.expanded').forEach(switcher => {
			switcher.classList.remove('expanded')
			const toggle = switcher.querySelector('.theme-switcher-toggle')
			if (toggle) {
				this.updateToggleIcon(toggle)
			}
		})
	}

	initDecorations() {
		if (this.currentTheme === 'new-year') {
			this.initChristmasDecorations()
		}
	}

	updateDecorations(themeName) {
		// Удаляем все украшения
		this.removeAllDecorations()

		// Добавляем украшения для новой темы
		switch (themeName) {
			case 'new-year':
				this.initChristmasDecorations()
				break
		}
	}

	removeAllDecorations() {
		this.removeChristmasDecorations()
	}

	initChristmasDecorations() {
		// Создаем снежинки
		this.createSnowflakes()

		// Создаем гирлянду
		this.createGarland()

		// Добавляем новогодние украшения
		this.addChristmasDecorations()
	}

	createSnowflakes() {
		if (document.querySelector('.snowflakes')) return

		const snowflakesContainer = document.createElement('div')
		snowflakesContainer.className = 'snowflakes'

		const snowflakeCount = 50

		for (let i = 0; i < snowflakeCount; i++) {
			const snowflake = document.createElement('div')
			const size = Math.random() * 12 + 3

			snowflake.className = 'snowflake'
			if (size < 6) snowflake.classList.add('small')
			else if (size < 9) snowflake.classList.add('medium')
			else snowflake.classList.add('large')

			snowflake.style.width = `${size}px`
			snowflake.style.height = `${size}px`
			snowflake.style.left = `${Math.random() * 100}vw`
			snowflake.style.animationDelay = `${Math.random() * 20}s`
			snowflake.style.animationDuration = `${Math.random() * 10 + 10}s`
			snowflake.style.opacity = Math.random() * 0.7 + 0.3

			snowflakesContainer.appendChild(snowflake)
		}

		document.body.appendChild(snowflakesContainer)
		this.snowflakesContainer = snowflakesContainer
	}

	createGarland() {
		if (document.querySelector('.garland')) return

		const garland = document.createElement('div')
		garland.className = 'garland'

		const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff']
		const lightCount = 20

		for (let i = 0; i < lightCount; i++) {
			const light = document.createElement('div')
			light.className = 'garland-light'

			light.style.left = `${(i / lightCount) * 100}%`
			light.style.top = `${Math.random() * 40}px`
			light.style.backgroundColor =
				colors[Math.floor(Math.random() * colors.length)]
			light.style.animationDelay = `${Math.random() * 2}s`

			garland.appendChild(light)
		}

		document.body.appendChild(garland)
		this.garland = garland
	}

	addChristmasDecorations() {
		// Добавляем новогодние украшения к логотипу
		const logo = document.querySelector('.logo')
		if (logo && !logo.querySelector('.christmas-decoration')) {
			const decoration = document.createElement('div')
			decoration.className = 'christmas-decoration'
			decoration.innerHTML = '🎄'
			decoration.style.position = 'absolute'
			decoration.style.top = '-10px'
			decoration.style.right = '-15px'
			decoration.style.fontSize = '1.2rem'

			logo.style.position = 'relative'
			logo.appendChild(decoration)
			this.christmasDecoration = decoration
		}

		// Добавляем снежинки к заголовкам
		const titles = document.querySelectorAll('.section-title, .hero-title')
		titles.forEach(title => {
			if (!title.querySelector('.snowflake-icon')) {
				const snowflake = document.createElement('span')
				snowflake.className = 'snowflake-icon'
				snowflake.innerHTML = '❄️'
				snowflake.style.marginLeft = '10px'
				snowflake.style.animation = 'spin 3s linear infinite'

				title.appendChild(snowflake)

				// Добавляем стиль для анимации
				if (!document.querySelector('#snowflake-style')) {
					const style = document.createElement('style')
					style.id = 'snowflake-style'
					style.textContent = `
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `
					document.head.appendChild(style)
				}
			}
		})
	}

	removeChristmasDecorations() {
		// Удаляем снежинки
		if (this.snowflakesContainer) {
			this.snowflakesContainer.remove()
			this.snowflakesContainer = null
		}

		// Удаляем гирлянду
		if (this.garland) {
			this.garland.remove()
			this.garland = null
		}

		// Удаляем украшения с логотипа
		if (this.christmasDecoration) {
			this.christmasDecoration.remove()
			this.christmasDecoration = null
		}

		// Удаляем снежинки с заголовков
		document.querySelectorAll('.snowflake-icon').forEach(el => el.remove())
	}
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
	window.themeSwitcher = new ThemeSwitcher()
})

// Добавить эту функцию после смены темы
function fixThemeIssues() {
	const bodyClass = document.body.className

	// Для всех тем - исправить advantages
	const advantages = document.querySelector('.advantages')
	const advantagesWave = document.querySelector('.advantages-wave path')

	// if (advantages && advantagesWave) {
	// 	switch (bodyClass) {
	// 		case 'light-theme':
	// 			advantages.style.backgroundColor = '#e9ecef'
	// 			advantagesWave.style.fill = '#ffffff'
	// 			break
	// 		case 'default-theme':
	// 			advantages.style.backgroundColor = '#343a40'
	// 			advantagesWave.style.fill = '#1a1a2e'
	// 			break
	// 		case 'new-year-theme':
	// 			advantages.style.backgroundColor = '#15242b'
	// 			advantagesWave.style.fill = '#1a2d34'
	// 			break
	// 	}
	// }

	// Для страницы услуг
	// if (document.querySelector('.services-main')) {
	// 	const faqSection = document.querySelector('.faq-section')
	// 	const faqWave = document.querySelector('.faq-wave path')

	// 	if (faqSection && faqWave) {
	// 		switch (bodyClass) {
	// 			case 'light-theme':
	// 				faqSection.style.backgroundColor = '#e9ecef'
	// 				faqWave.style.fill = '#ffffff'
	// 				break
	// 			case 'default-theme':
	// 				faqSection.style.backgroundColor = '#343a40'
	// 				faqWave.style.fill = '#1a1a2e'
	// 				break
	// 			case 'new-year-theme':
	// 				faqSection.style.backgroundColor = '#15242b'
	// 				faqWave.style.fill = '#1a2d34'
	// 				break
	// 		}
	// 	}
	// }
}

// Вызывать после смены темы
document.addEventListener('DOMContentLoaded', fixThemeIssues)
