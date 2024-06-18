document.addEventListener("DOMContentLoaded", function () {
  var subscribedPlan = null; // Variable to store the subscribed plan

  function openPaymentPage(plan, button) {
      var pageURL;
      switch(plan) {
          case 'free':
              pageURL = "/user/free-plan";
              break;
          case 'standard':
              pageURL = "/auth/payment";
              break;
          case 'premium':
              pageURL = "/coaches";
              break;
          default:
              // Do something if plan is not recognized
              break;
      }
      window.open(pageURL, "_self");
      button.textContent = "View Your Plan";
      subscribedPlan = plan; // Update the subscribed plan variable
  }

  function checkPage() {
      if (subscribedPlan) {
          var currentPage = window.location.pathname;
          var targetPage;
          switch (subscribedPlan) {
              case 'free':
                  targetPage = "/user/free-plan";
                  break;
              case 'standard':
                  targetPage = "/auth/payment";
                  break;
              case 'premium':
                  targetPage = "/coaches";
                  break;
              default:
                  break;
          }
          if (currentPage.includes(targetPage)) {
              var buttonId = "subscribebtn" + subscribedPlan.charAt(1);
              var button = document.getElementById(buttonId);
              if (button) {
                  button.textContent = "View Your Plan";
              }
          }
      }
  }

  checkPage();

  function clickHandler() {
      var plan;
      if (this.id === "subscribebtn1") {
          plan = "free";
      } else if (this.id === "subscribebtn2") {
          plan = "standard";
      } else if (this.id === "subscribebtn3") {
          plan = "premium";
      }
      openPaymentPage(plan, this);
  }

  // Add click event listeners to the buttons
  document.getElementById("subscribebtn1").addEventListener("click", clickHandler);
  document.getElementById("subscribebtn2").addEventListener("click", clickHandler);
  document.getElementById("subscribebtn3").addEventListener("click", clickHandler);
});