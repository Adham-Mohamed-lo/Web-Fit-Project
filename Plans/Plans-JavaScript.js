document.addEventListener("DOMContentLoaded", function () {
  function openpayment() {
    window.open("Free Plan/Free-Plan-Index.html", "_self");
  }

  document.getElementById("subscribebtn").addEventListener("click", openpayment);

  function openpayment2() {
    window.open("../Services/Payment/Payment-Index.html", "_self");
  }

  document.getElementById("subscribebtn2").addEventListener("click", openpayment2);

  function opencoaches() {
    window.open("../Services/Coaches Page/Coaches-Page-Index.html", "_self");
  }

  document.getElementById("subscribebtn3").addEventListener("click", opencoaches);
});
