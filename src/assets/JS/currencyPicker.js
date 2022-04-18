var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    var currencyPicker = document.querySelector("#currencyPicker");
    for (let option of data) {
      let opt = document.createElement("option");

      opt.innerHTML = `${option.name}&emsp;${option.cc}`;

      opt.value = option.symbol;
      if (option.symbol == "US$") {
        opt.value = "$";
        opt.selected = true;
        currencyPicker.classList.add("US$");
      }
      currencyPicker.appendChild(opt);
    }
    nextProcess();
  }
};
xhr.open("GET", "currency.json", true);
xhr.send();

/*Listens for currency changes*/
function nextProcess() {
  var currencyPicker = document.querySelector("#currencyPicker");
  currencyPicker.addEventListener("change", function () {
    subtotal(updateAll());
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        for (let option of data) {
          if (option.symbol == currencyPicker.value) {
            currencyPicker.classList.add(option.cc);
            currencyPicker.classList.remove("US$");
          }
        }
      }
    };
    xhr.open("GET", "currency.json", true);
    xhr.send();
  });
}
