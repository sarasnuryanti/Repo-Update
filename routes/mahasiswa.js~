/*
 * GET mahasiswa listing.
 */

var databaseUrl = "localhost/tugas";
var collections = ["mahasiswa"];
var db = require("mongojs").connect(databaseUrl, collections);

exports.list = function(req, res){

	// mencari dan menampilkan semua mahasiswa
	db.mahasiswa.find(function(err, mahasiswa) {
  	res.render('mahasiswaa', {listOfMahasiswaa: mahasiswa, title: 'Daftar Mahasiswa'});
	});

};
