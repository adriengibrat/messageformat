import resolve from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'

export default {
	format: 'iife'
	, entry: process.env.npm_package_bin_main
	, dest: process.env.npm_package_bin_currencies
	, moduleName: process.env.npm_package_name
	, moduleId: process.env.npm_package_name
	, banner: `#!/usr/bin/env node

/**
 * ${process.env.npm_package_name} ${process.env.npm_package_version} – ${process.env.npm_package_description}
 * Made with ♫·♪ & -♥- by ${process.env.npm_package_author_name} <${process.env.npm_package_author_email}>
 * Published under ${process.env.npm_package_license} License
 */
`
	, plugins: [ resolve({ paths: ['src'] }), eslint(), buble() ]
}
