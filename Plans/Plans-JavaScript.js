document.addEventListener("DOMContentLoaded", function () {
  function openpayment() {
    window.open("free-plan.html", "_self");
  }

  document.getElementById("subscribebtn").addEventListener("click", openpayment);

  function openpayment2() {
    window.open("Payment-Indexfree.html", "_self");
  }

  document.getElementById("subscribebtn2").addEventListener("click", openpayment2);

  function opencoaches() {
    window.open("../Services/coaches-page.html", "_self");
  }

  document.getElementById("subscribebtn3").addEventListener("click", opencoaches);
});
