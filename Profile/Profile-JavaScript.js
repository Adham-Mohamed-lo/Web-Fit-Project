document.addEventListener("DOMContentLoaded", function () {
   
    fetchUserData();
  });
  
  function fetchUserData() {
   
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      Adress: "New York, USA",
      Gender: "Male",
      Age: "19",
      Subscribtion_Status: "freee"
    };
  
   
    document.getElementById('name').innerText = userData.name;
    document.getElementById('email').innerText = "E-mail: "+userData.email;
    document.getElementById('Adress').innerText ="Adress: "+ userData.Adress;
    document.getElementById('Gender').innerText ="Gender: "+ userData.Gender;
    document.getElementById('Age').innerText ="Age: "+ userData.Age;
    document.getElementById('Subscribtion_Status').innerText ="Subscribtion Status: "+ userData.Subscribtion_Status;
  }
  