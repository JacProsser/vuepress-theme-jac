/* eslint-env node */
const path = require('path')

module.exports = {
	name: 'jac-theme-plugin',
	clientRootMixin: path.join(__dirname, 'lifecycle.js'),
}
