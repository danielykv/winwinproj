

let flag = 0;
let darkflag = 0;
let textflag = 0;

  $("#accessMenu").hide();


  $("#darkBtn").click(function () {
    if (darkflag === 0) {
      $(".logoutBtn").removeClass("btn-outline-dark");

      $("#navbarCollapse").addClass("darkMode");
      $(".navbar").addClass("darkMode");
      $(".nav-item").addClass("whitetext");
    
      $("h1").addClass("whitetext"); 
      $("body").addClass("darkMode");
      $(".container-xxl").removeClass("bg-custom-class");
      $(".footer").removeClass("bg-white");
      $(".logoutBtn").addClass("btn-outline-light");

      darkflag = 1;
    } else {
      $(".container-xxl").addClass("bg-custom-class");
      $("#navbarCollapse").removeClass("darkMode");
      $(".navbar").removeClass("darkMode");
      $(".nav-item").removeClass("whitetext");
      $("h1").removeClass("whitetext");
      $("body").removeClass("darkMode");
      $(".logoutBtn").addClass("btn-outline-dark");



      darkflag = 0;
    }
  });

  $("#largeFont").click(function () {
    if (textflag === 0) {
        $("p").addClass("largeFont");

        $("h1").addClass("largerH");
      // $("body").addClass("mediumFont");
        $(".navG").addClass("mediumFont");
        textflag = 1;




        
      
    } else {
        $("p").removeClass("largeFont");
        $("h1").removeClass("largerH");
        $("body").removeClass("largeFont");
        $(".navG").removeClass("mediumFont");


        textflag = 0;
    }
  });

  $("#acessability").click(function () {
    if (flag === 0) {
      $("#acessability").addClass("widthAccess");
      
      flag = 1;
    } else {
      $("#acessability").removeClass("widthAccess");
      flag = 0;
    }

    $("#accessMenu").toggle("drop");
    return false;
  });

