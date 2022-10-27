var tableNumber = null;

AFRAME.registerComponent("markerhandler", {
  init: async function() {

    if (tableNumber === null) {
      this.askTableNumber();
    }

    var dishes = await this.getDishes();

    this.el.addEventListener("markerFound", () => {
      if(tableNumber!==null){

      var markerId = this.el.id;
      this.handleMarkerFound(dishes, markerId);
      }
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },

  askTableNumber: function() {
    var iconUrl = "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png";
    
    swal({
      title:"welscome to hunger",
      icon:iconUrl,
      content:{
        element:"input",
        attributes:{
          placeholder:"type you table number",
          type:"number",
          min:1
        }

      },
        closeOnClickOutside:false,

    }).then(inputvalue=>{
       tableNumber=inputvalue

    })
    
  },

  handleMarkerFound: function(dishes, markerId) {
    // Getting today's day
    var todaysDate = new Date();
    var todaysDay = todaysDate.getDay();
    
    // Sunday - Saturday : 0 - 6
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    var dish = dishes.filter(dish => dish.id === markerId)[0];

    if (dish.unavailabledays.includes(days[todaysDay])) {
      swal({
        icon: "warning",
        title: dish.dishname.toUpperCase(),
        text: "This dish is not available today!!!",
        timer: 2500,
        buttons: false
      });
    } else {
       // Changing Model scale to initial scale
      var model = document.querySelector(`#model-${dish.id}`);
      model.setAttribute("position", dish.modelgeometry.position);
      model.setAttribute("rotation", dish.modelgeometry.rotation);
      model.setAttribute("scale", dish.modelgeometry.scale);

      //Update UI conent VISIBILITY of AR scene(MODEL , INGREDIENTS & PRICE)
      model.setAttribute("visible",true)
      var ingridientsContainer=document.querySelector(`#main-plane-${dish.id}`)
      ingridientsContainer.setAttribute("visible",true)
      var pricePlane=document.querySelector(`#price-plane-${dish.id}`)
      pricePlane.setAttribute("visible",true)
      /* REPLACE COMMENTS TO ADD CODE HERE
    
    
      
      
      */

      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      var ratingButton = document.getElementById("rating-button");
      var orderButtton = document.getElementById("order-button");

      // Handling Click Events
      ratingButton.addEventListener("click", function() {
        swal({
          icon: "warning",
          title: "Rate Dish",
          text: "Work In Progress"
        });
      });

      orderButtton.addEventListener("click", () => {
        /*REPLACE COMMENTS TO ADD CODE HERE TO CALL handleOrder()
        
        
        
        */

        swal({
          icon: "https://i.imgur.com/4NZ6uLY.jpg",
          title: "Thanks For Order !",
          text: "Your order will serve soon on your table!",
          timer: 2000,
          buttons: false
        });
      });
    }
  },
  handleOrder: function(tNumber, dish) {
    /* REPLACE COMMENTS TO ADD CODE HERE
    
    
      
      
      */
  },

  getDishes: async function() {
    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },
  handleMarkerLost: function() {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
