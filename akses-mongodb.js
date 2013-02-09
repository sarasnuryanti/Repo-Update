var databaseUrl = "localhost/tugas";
var collections = ["mahasiswa"];
var db = require("mongojs").connect(databaseUrl, collections);

// mencari mahasiswa yang memiliki nim 105410328
db.mahasiswa.find({nim: "105410328"}, function(err, mahasiswa) {
  if( err || !mahasiswa) console.log("Tidak ada mahasiswa yang memiliki nim 105410328");
  else mahasiswa.forEach( function(maha) {
    console.log(maha);
  });
});

// menyimpan data nim baru: 105410334
db.mahasiswa.save({nim : "105410334", nama : "Sinta", jurusan: "Teknik Industri", umur: "21"}, function(err, saved) {
  if( err || !saved ) console.log("Mahasiswa '105410334' gagal disimpan");
  else console.log("Data mahasiswa '105410334' tersimpan");
});


