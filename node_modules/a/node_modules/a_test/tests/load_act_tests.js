var assert = require('assert');
var test = require('./test');

var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var path = requireMock('path');
var reporter = requireMock('./reporter');

var load_act = require('../load_act');


(function() {
	console.log('when loaded');

	var act_path = 'act_path';
	var parent_count = 2;
	var resolved_act_path = 'resolved_act_path';
	var act = requireMock('resolved_act_path');

	var ancestor_module_filename = 'filename';
	var ancestor_module_dirname = 'dirname';

	var ancestor_module = {
		filename: ancestor_module_filename
	};

	var calling_module = {};
	var parent = {};
	calling_module.parent = parent;
	parent.parent = ancestor_module;

	path.dirname = mock();
	path.resolve = mock();

	path.dirname.expect(ancestor_module_filename).return(ancestor_module_dirname);
	path.resolve.expect(ancestor_module_dirname, act_path).return(resolved_act_path);


	var returned = load_act(calling_module, act_path, parent_count);

	test('it should load act module using given path relative to ancestor module', function() {
		assert.strictEqual(returned, act);
	});

	test('it should set filename property to resolved path', function() {
		assert(returned.filename === resolved_act_path);
	});
})();


(function() {
	console.log('when loaded using act function');

	var act_func = function() {};
	var act_func_name = 'name';
	act_func._name = act_func_name;

	var act = requireMock(act_func_name);

	reporter.warn = mock();
	reporter.warn.expect('specify path to act instead of requiring it').return();

	var calling_module = mock();

	var returned = load_act(calling_module, act_func);

	test('it should load act module using _name property of act function', function() {
		assert.strictEqual(returned, act);
	});

	test('it should set filename property to _name property of the func', function() {
		assert(returned.filename === act_func_name);
	});


	test('it should show deprecation message', function() {
		assert(reporter.warn.verify());
	});
})();
