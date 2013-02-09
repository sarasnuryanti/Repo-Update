var assert = require('assert');
var test = require('./test');
var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;
var reporter = requireMock('./reporter');
var load_act = requireMock('./load_act');

(function() {

	console.log('when execute with no base');

	var nextExecute = requireMock('./execute_act');
	var act = mock();
	var c = {};
	var c2 = {};
	act.expect(c).return();

	var sut = require('../execute_act');
	var returned = sut(act,c);


	test('it should execute act', function() {
		assert(act.verify());
	});

	test('it should return context', function() {
		assert.equal(returned,c);
	});

})();



(function() {

	console.log('when execute with path to base act');
	var base_act_execute = requireMock('./execute_act');
	var act = mock();

	var base_path = '../base';
	act.base = base_path;
	var c = {};
	var c2 = {};

	var base = function() {};
	base_act_execute.expect(base,c).return(c2);
	act.expect(c2).return();

	load_act.expect(act, base_path).return(base);

	var sut = require('../execute_act');
	var returned = sut(act,c);

	test('it should execute act', function() {
		assert(act.verify());
	});

	test('it should pass the context thru all the acts', function() {
		assert.equal(returned, c2);
	});

})();
