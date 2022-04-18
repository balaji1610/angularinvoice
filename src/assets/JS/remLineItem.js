/*Deletes line-item*/
function deleteLineItem(row) {
  document.querySelector("#add").removeChild(row);
  let sum = updateBalanceDue();
  let discount = getDiscount(sum);
  let shipping = Number(document.querySelector("#shippingCharges").value);
  updateDue(
    sum -
      discount +
      shipping +
      (Number(document.querySelector("#taxPercent").value) / 100) *
        (sum - discount)
  );
  subtotal(sum);
}
