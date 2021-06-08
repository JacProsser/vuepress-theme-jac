export default {
	methods: {
		setDarkTheme() {
			if (this.$root.$jac.darkTheme) {
				document.body.classList.add('jac-theme-dark')
				return localStorage.setItem('dark-theme', true)
			}

			document.body.classList.remove('jac-theme-dark')
			localStorage.setItem('dark-theme', false)
		},
		setIgnoreThemes() {
			this.setPageTheme()
			if (this.$root.$jac.ignoreThemes) return localStorage.setItem('ignore-themes', true)
			localStorage.removeItem('ignore-themes')
		},
		setPageTheme() {
			const { ignoreThemes, userTheme } = this.$root.$jac
			const { pageTheme } = this.$page.frontmatter
			const theme = ignoreThemes ? userTheme : pageTheme || userTheme

			this.setTheme({ colorTheme: theme })
		},
		setTheme({ colorTheme = 'default', persist = false }) {
			const { themes } = this.$site.themeConfig.jac
			const { classList } = document.body
			const themesClasses = themes.map(theme => `jac-theme-${theme}`)

			if (colorTheme !== 'default' && !themes.includes(colorTheme)) {
				const oldTheme = localStorage.getItem('color-theme')
				colorTheme = themes.includes(oldTheme) ? oldTheme : 'default'
			}

			if (persist) {
				this.$root.$jac.userTheme = colorTheme
				localStorage.setItem('color-theme', colorTheme)
			}

			this.$root.$jac.colorTheme = colorTheme
			if (colorTheme === 'default') return classList.remove(...themesClasses)
			classList.remove(...themesClasses.filter(themeClass => themeClass !== `jac-theme-${colorTheme}`))
			classList.add(`jac-theme-${colorTheme}`)
		},
	},
}
