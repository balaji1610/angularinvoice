window.addEventListener("load", init);

function init() {
  document.querySelector("#logo").addEventListener("change", function () {
    var file = document.querySelector("#logo").files[0];

    var reader = new FileReader();

    reader.onloadend = function () {
      var preview = document.createElement("img");
      preview.setAttribute("height", "130px");
      preview.setAttribute("width", "150px");
      document.querySelector("#log").appendChild(preview);
      preview.src = reader.result;
      // document.querySelector('#hide').style.display='none';
      document.querySelector("#hide").style.display = "none";
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  });

  addRow();

  document.querySelector("#balanceDue").innerHTML = "$ 0";
  document.querySelector("#balanceDue").style.fontWeight = "bold";
  document.querySelector("#balanceShow").style.fontWeight = "bold";
  document.querySelector("#subtotalPrice").innerHTML = "$ 0";
  document.querySelector("#taxPercent").innerHTML = "0";
  document.querySelector("#totalAmount").innerHTML = "$ 0";
}
