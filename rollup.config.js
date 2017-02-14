import resolve from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'

export default {
	format: 'cjs'
	, entry: process.env.npm_package_jsnext_main
	, dest: process.env.npm_package_main
	, moduleName: process.env.npm_package_name
	, moduleId: process.env.npm_package_name
	, intro: `
/**
 * ${process.env.npm_package_name} ${process.env.npm_package_version} – ${process.env.npm_package_description}
 * Made with ♫·♪ & -♥- by ${process.env.npm_package_author_name} <${process.env.npm_package_author_email}>
 * Published under ${process.env.npm_package_license} License
 */
`
	, plugins: [ resolve({ paths: ['src'] }), eslint(), buble() ]
}
