var assert = require('assert');
var test = require('./test');

var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;

var it = function(title) {};
var summary = function() {};
var c = {};
function act() {}

var reporter = requireMock('./reporter');
reporter.summary = summary;


var it_module = requireMock('./it');
it_module.it = it;

(function() {

	console.log('when called with act path');


	var suite_title = 'suite_title';
	var act_path = 'act_path';
	var parentCount = 2;

	reporter.suite = mock();
	reporter.suite.expect(suite_title).return();

	var suite_name_builder = requireMock('./suite_name_builder');
	suite_name_builder.expect(act).return(suite_title);

	

	var load_act = requireMock('./load_act');
	load_act.expect(module, act_path, parentCount).return(act);

	var execute_act = requireMock('./execute_act');
	execute_act.expect(act, c).return();

	var when = require('../when');
	when.parentCount++;
	when.parentCount++;
	var returned = when(act_path, c);

	test('it should execute loaded act with given context', function() {
		assert(execute_act.verify());
	});

	test('it returns an object with "it" function', function() {
		assert(returned.it === it);
	});

	test('it reports suite title', function() {
		assert(reporter.suite.verify());
	});

	test('it should have summary property from reporter', function() {
		assert(when.summary === summary);
	});

})();
