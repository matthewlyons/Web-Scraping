const osmosis = require("osmosis");
const XLSX = require("xlsx");

let savedData = [];
const url = "https://www.fandango.com/moviescomingsoon";
osmosis
  .get(url)
  .find(".movie-list .visual-item")
  .set({
    Title: ".visual-title",
    Date: ".visual-sub-title"
  })
  .data(function(data) {
    console.log(data);
    savedData.push(data);
    console.log(savedData.length);
  })
  .done(function() {
    var movies = XLSX.utils.json_to_sheet(savedData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, movies, "movies");
    XLSX.writeFile(wb, __dirname + "/Movies.xlsx");
  });
