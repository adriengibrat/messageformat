import resolve from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import { eslint } from 'rollup-plugin-eslint'

const project = require( './package.json' )

export default {
	
	input: project['jsnext:main']
	, output: {
		file: project.main
		, format: 'umd'
		, name: project.name
		, amd: {
			id: project.name
		}
		, intro: `/**
 * ${project.name} ${project.version} – ${project.description}
 * Made with ♫·♪ & -♥- by ${project.author}
 * Published under ${project.license} License
 */
		`
	}
	//, banner: `#!/usr/bin/env node`
	//, sourceMap: true
	, plugins: [ resolve({ paths: [ 'src' ] }), eslint(), buble() ]
}
