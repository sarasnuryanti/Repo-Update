(function avoid_caching() {
	delete require.cache[module.id];
})();

var _when = require('./when');
_when.parentCount++;

module.exports = {
	when: _when
};

