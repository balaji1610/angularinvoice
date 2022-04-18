/*Returns the sum of all products*/
function updateBalanceDue(currencyPicker) {
  let quantity = document.querySelector("#add").querySelectorAll(".quantity");
  let rate = document.querySelector("#add").querySelectorAll(".rate");
  let amount = document.querySelector("#add").querySelectorAll(".Amount");
  let curr = document.querySelectorAll(".curr");
  var sum = 0;
  for (let i = 0; i < quantity.length; i++) {
    sum += Number(quantity[i].value) * Number(rate[i].value);
    if (
      !isNaN(
        Number((Number(quantity[i].value) * Number(rate[i].value)).toFixed(2))
      )
    )
      amount[i].innerHTML =
        currencyPicker +
        " " +
        Number((Number(quantity[i].value) * Number(rate[i].value)).toFixed(2));
    curr[i].innerHTML = currencyPicker;
  }
  return sum;
}

/*Updates Balance Due and Total Amount*/
function updateDue(sum, currencyPicker) {
  let paid = Number(document.querySelector("#amountPaid").value);
  if (!isNaN(Number((sum - paid).toFixed(2))))
    document.querySelector("#balanceDue").innerHTML =
      currencyPicker + " " + Number((sum - paid).toFixed(2));
  if (!isNaN(Number(sum.toFixed(2))))
    document.querySelector("#totalAmount").innerHTML =
      currencyPicker + " " + Number(sum.toFixed(2));
}

/*Updates subtotal*/
function subtotal(sum) {
  if (!isNaN(Number(sum.toFixed(2)))) {
    let currencyPicker = document.querySelector("#currencyPicker").value;
    document.querySelector("#subtotalPrice").innerHTML =
      currencyPicker + " " + Number(sum.toFixed(2));
  }
}

/*Returns Discount*/
function getDiscount(sum) {
  return (Number(document.querySelector("#discountPercent").value) / 100) * sum;
}

/*Major function that updates the every balance*/
function updateAll() {
  var currencyPicker = document.querySelector("#currencyPicker").value;
  let sum = updateBalanceDue(currencyPicker);
  let discount = getDiscount(sum);
  let shipping = Number(document.querySelector("#shippingCharges").value);
  updateDue(
    sum -
      discount +
      shipping +
      (Number(document.querySelector("#taxPercent").value) / 100) *
        (sum - discount),
    currencyPicker
  );
  return sum;
}
