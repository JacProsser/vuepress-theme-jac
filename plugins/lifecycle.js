import themeHandler from '../mixins/themeHandler.js'

export default {
	mixins: [themeHandler],
	created() {
		const {
			colorThemes = ['mint', 'red', 'purple'],
			defaultColorTheme = 'default',
			defaultDarkTheme = false,
			disableDarkTheme = false,
			disableThemeIgnore = false,
			extraOptions = {},
			labels = {},
			logo,
		} = this.$site.themeConfig.jac || {}

		const themes = colorThemes || ['mint', 'red', 'purple']
		const hasThemes = Array.isArray(themes) && themes.length > 0

		this.$site.themeConfig.jac = {
			defaultColorTheme,
			defaultDarkTheme,
			disableDarkTheme,
			disableThemeIgnore,
			extraOptions,
			hasThemes,
			labels: {
				darkTheme: labels.darkTheme || 'Dark theme',
				ignoreThemes: labels.ignoreThemes || 'Ignore other themes',
			},
			logo,
			themes,
		}

		this.$root.$jac = {
			colorTheme: 'default',
			darkTheme: false,
			ignoreThemes: false,
			userTheme: undefined,
		}
	},
	beforeMount() {
		const { colorTheme, darkTheme } = this.$root.$jac
		const { jac: jacConfig } = this.$site.themeConfig
		const userConfig = {
			colorTheme,
			darkTheme,
			ignoreThemes: jacConfig.disableThemeIgnore ? false : localStorage.getItem('ignore-themes') === 'true',
			userTheme: localStorage.getItem('color-theme'),
		}

		if (jacConfig.disableDarkTheme !== true) {
			if (jacConfig.defaultDarkTheme === true && !localStorage.getItem('dark-theme')) {
				localStorage.setItem('dark-theme', true)
			}

			userConfig.darkTheme = localStorage.getItem('dark-theme') === 'true'
		}

		if (jacConfig.defaultColorTheme !== 'default' && !userConfig.userTheme) {
			userConfig.userTheme = jacConfig.defaultColorTheme
			localStorage.setItem('color-theme', jacConfig.defaultColorTheme)
		}

		if (userConfig.userTheme) userConfig.colorTheme = userConfig.userTheme

		this.$root.$jac = userConfig

		if (this.$root.$jac.darkTheme) this.setDarkTheme()
		this.setPageTheme()
	},
}
