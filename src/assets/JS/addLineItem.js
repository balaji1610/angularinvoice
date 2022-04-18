document.querySelector(".lineItem").addEventListener("click", addRow);

/*Adds Line-Item*/
function addRow() {
  //Creates a new row
  let row = document.createElement("div");
  row.classList.add("row");
  document.querySelector("#add").appendChild(row);

  let col5 = document.createElement("div");
  col5.classList.add("col-sm-5");
  row.appendChild(col5);

  let col21 = document.createElement("div");
  col21.classList.add("col-sm-2");
  row.appendChild(col21);

  let col22 = document.createElement("div");
  col22.classList.add("col-sm-2");
  row.appendChild(col22);

  let col23 = document.createElement("div");
  col23.classList.add("col-sm-2");
  col23.classList.add("text-center");
  row.appendChild(col23);

  let col1 = document.createElement("div");
  col1.classList.add("col-sm-1");
  let button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-light");
  button.setAttribute("data-row", "deleteAfter");
  button.addEventListener("click", function () {
    deleteLineItem(row);
  });
  button.innerHTML = "&times";
  col1.appendChild(button);
  row.appendChild(col1);

  //Creates description field
  let desc = document.createElement("input");
  desc.type = "text";
  desc.placeholder = "Description of service or product";
  desc.classList.add("form-control");
  desc.classList.add("description");
  col5.appendChild(desc);

  //Creates quantity field
  let quantity = document.createElement("input");
  quantity.type = "text";
  quantity.value = 1;
  quantity.classList.add("form-control");
  quantity.classList.add("quantity");
  col21.appendChild(quantity);
  quantity.addEventListener("keyup", () => subtotal(updateAll()));

  //Creates rate field
  let inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");
  col22.appendChild(inputGroup);
  let inputGroupPrepend = document.createElement("div");
  inputGroupPrepend.classList.add("input-group-prepend");
  inputGroup.appendChild(inputGroupPrepend);
  let span = document.createElement("span");
  span.classList.add("input-group-text");
  inputGroupPrepend.appendChild(span);
  span.classList.add("curr");
  if (!document.querySelector("#currencyPicker").value) span.innerHTML = "$";
  else span.innerHTML = document.querySelector("#currencyPicker").value;
  let rate = document.createElement("input");
  rate.type = "text";
  rate.classList.add("form-control");
  rate.classList.add("rate");
  rate.value = 0;
  inputGroup.appendChild(rate);
  rate.addEventListener("keyup", () => subtotal(updateAll()));

  //Creates amount paragraph
  let amount = document.createElement("p");
  if (!document.querySelector("#currencyPicker").value)
    amount.innerHTML = "$ 0";
  else
    amount.innerHTML = document.querySelector("#currencyPicker").value + " 0";
  amount.classList.add("Amount");
  col23.appendChild(amount);
}

/*Event Listeners for updating Balance*/
document
  .querySelector("#taxPercent")
  .addEventListener("keyup", () => updateAll());
document
  .querySelector("#discountPercent")
  .addEventListener("keyup", () => updateAll());
document
  .querySelector("#shippingCharges")
  .addEventListener("keyup", () => updateAll());
document
  .querySelector("#amountPaid")
  .addEventListener("keyup", () => updateAll());
