import resolve from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'

const project = require( './package.json' )

export default {
	format: 'umd'
	, entry: project['jsnext:main']
	, dest: project.main
	, moduleName: project.name
	, moduleId: project.name
	//, banner: `#!/usr/bin/env node`
	, intro: `
/**
 * ${project.name} ${project.version} – ${project.description}
 * Made with ♫·♪ & -♥- by ${project.author}
 * Published under ${project.license} License
 */
`
	//, sourceMap: true
	, plugins: [ resolve({ paths: [ 'src' ] }), eslint(), buble() ]
}
