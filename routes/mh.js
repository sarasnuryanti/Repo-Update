/*
 * GET mahasiswa listing.
 */

var databaseUrl = "localhost/tugas";
var collections = ["mahasiswa"];
var db = require("mongojs").connect(databaseUrl, collections);

exports.list = function(req, res){

	// mencari dan menampilkan semua mahasiswa
	db.mahasiswa.find()
  	res.render('mhs', {listOfMhs: mahasiswa, title: 'Daftar Mahasiswa'});

};
