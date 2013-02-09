var path = require('path');
var reporter = require('./reporter');

function load(calling_module, act_path, parent_count) {
	var resolved_path;
	if(typeof act_path === 'function') {
		reporter.warn('specify path to act instead of requiring it');
		resolved_path = act_path._name;
	}
	else {
		for (var i = 0; i < parent_count; i++) {
			calling_module = calling_module.parent;			
		}
		var calling_module_dirname = path.dirname(calling_module.filename);
		resolved_path = path.resolve(calling_module_dirname, act_path);
	}

	var act = require(resolved_path);
	act.filename= resolved_path;
	return act;

	function getAncestorModule() {

	}
}

module.exports = load;

