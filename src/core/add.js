import {error} from 'core/utils'
import compile from 'core/compile'

export default function add (module, ...dependencies) {
	if (!module || 'function' !== typeof module || !module.name)
		error('you must provide a module as a named function')

	if (compile.hasOwnProperty(module.name))
		error('%j module is already defined', module.name)

	compile[module.name] = Object.assign(module, {
		dependencies: (module.dependencies || dependencies).map(dependency => {
			if (!compile.hasOwnProperty(dependency))
				error('add %j dependency before requiring it in %j module', dependency, module.name)
			return dependency
		})
	})
}
