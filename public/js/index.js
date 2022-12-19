var input = document.getElementById("excelinput");
input.addEventListener("change", function () {
  readXlsxFile(input.files[0]).then(function (rows) {
    console.log(rows);
  });
});
