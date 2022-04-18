document.querySelector("#download").addEventListener("click", function () {
  var doc = new jsPDF();

  var currency = document.querySelector("#currencyPicker").classList[1];
  var currencyPicker = document.querySelector("#currencyPicker").value;
  if (currency.search("US") != -1) currency = currencyPicker;
  doc.setFontSize(25);
  doc.setFontType("bold");
  doc.text($("#invoice").text(), 100, 10, "center"); //invoice heading

  doc.setFontSize(15);
  doc.text($("#from").val(), 10, 80); //invoice from
  doc.setFontType("normal");
  doc.text($("#toShow").val(), 10, 90);
  doc.setFontType("bold");
  doc.text($("#to").val(), 10, 100); //invoice to

  doc.setFontType("normal");
  doc.text($("#dateShow").val() + ":", 150, 50, "right");
  doc.text($("#date").val(), 160, 50); //date of invoice
  doc.text($("#dueShow").val() + ":", 150, 60, "right");
  doc.text($("#due").val(), 160, 60); //due-date
  doc.text($("#toShow2").val(), 150, 70); // Payment terms
  doc.text($("#to2").val(), 160, 70); // Payment terms

  doc.setFontType("bold");
  doc.setFillColor(192, 192, 192);
  doc.rect(110, 63, 85, 10, "F");
  doc.text($("#balanceShow").val() + ":", 150, 70, "right");
  doc.text(
    currency +
      " " +
      $("#balanceDue")
        .text()
        .replace(/[^0-9\.]/g, ""),
    160,
    70
  ); //balance due

  doc.setFillColor(24, 24, 24);
  doc.rect(5, 107, 190, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.text($("#i").text(), 10, 115);
  doc.text($("#q").text(), 90, 115);
  doc.text($("#r").text(), 123, 115);
  doc.text($("#a").text(), 160, 115);

  doc.setFontType("normal");
  doc.setTextColor(0, 0, 0);
  let description = $("#add .description");
  let quantity = $("#add .quantity");
  let rate = $("#add .rate");
  let amount = $("#add .Amount");
  var nextY = 130;
  for (let i = 0; i < quantity.length; i++) {
    doc.text(description.eq(i).val(), 10, nextY); //description
    doc.text(quantity.eq(i).val(), 100, nextY, "center"); //quantity
    doc.text(
      currency +
        rate
          .eq(i)
          .val()
          .replace(/[^0-9\.]/g, ""),
      130,
      nextY,
      "center"
    ); //rate
    doc.text(
      currency +
        " " +
        amount
          .eq(i)
          .text()
          .replace(/[^0-9\.]/g, ""),
      170,
      nextY,
      "center"
    ); //amount
    nextY += 10;
  }

  nextY += 10;
  doc.text($("#subtotal").val() + ":", 160, nextY, "right");
  doc.text(
    currency +
      " " +
      $("#subtotalPrice")
        .text()
        .replace(/[^0-9\.]/g, ""),
    170,
    nextY
  ); //subtotal price
  var discount = getDiscount(
    Number(
      $("#subtotalPrice")
        .text()
        .replace(/[^0-9\.]+/g, "")
    )
  ).toFixed(2);
  if (discount && discount != 0) {
    nextY += 10;
    doc.text(
      $("#discount").val() + "(" + $("#discountPercent").val() + "%):",
      160,
      nextY,
      "right"
    );
    doc.text(currency + " " + discount, 170, nextY); //discount
  }

  var price = $("#subtotalPrice")
    .text()
    .replace(/[^0-9\.]/g, "");
  var tax = (
    (Number($("#taxPercent").val()) / 100) *
    (Number(price) - Number(discount))
  ).toFixed(2);
  if (tax && tax != 0) {
    nextY += 10;
    doc.text(
      $("#tax").val() + "(" + $("#taxPercent").val() + "%):",
      160,
      nextY,
      "right"
    );
    doc.text(currency + " " + tax, 170, nextY); //tax
  }

  var shipping = $("#shippingCharges").val();
  if (shipping && shipping != 0) {
    nextY += 10;
    doc.text($("#shipping").val() + ":", 160, nextY, "right");
    doc.text(currency + " " + $("#shippingCharges").val(), 170, nextY); //shipping
  }
  nextY += 10;

  doc.text($("#total").val() + ":", 160, nextY, "right");
  doc.text(
    currency +
      " " +
      $("#totalAmount")
        .text()
        .replace(/[^0-9\.]/g, ""),
    170,
    nextY
  ); //total amount

  var amt = $("#amountPaid").val();
  if (amt && amt != 0) {
    nextY += 10;
    doc.text($("#amountp").val() + ":", 160, nextY, "right");
    doc.text(currency + " " + amt, 170, nextY); //amount paid
  }

  if ($("#someNotes").val()) {
    nextY += 20;
    doc.text($("#notes").val() + ":", 10, nextY);
    nextY += 10;
    doc.text($("#someNotes").val(), 10, nextY); //notes
  }

  if ($("#someTerms").val()) {
    nextY += 10;
    doc.text($("#terms").val() + ":", 10, nextY);
    nextY += 10;
    doc.text($("#someTerms").val(), 10, nextY); //terms
  }

  /*Adds Logo to the PDF*/
  function convertImage() {
    var imgData = document.querySelector("img");
    if (!imgData) return;
    doc.addImage(imgData.src, "JPEG", 20, 20, 60, 50);
  }
  convertImage();
  doc.save(document.querySelector("#fileName").value + ".pdf");
});
