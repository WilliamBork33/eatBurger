//Make Sure We Wait to Attach our Handlers Until the DOM is Fully Loaded.
$(function() {
    $(".devour").on("click", function(event) {
        var id = $(this).data("id");
        var newBurger = $(this).data("newburger");
  
        var newBurgerState = {
            burger: newBurger
        };
  
        
      //Send the PUT Request.
      $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(function() {
                console.log("changed to", newBurger);
                //Reload the Page to Get the Updated List
                location.reload();
            }
        );
    });


    $(".create-form").on("submit", function(event) {
        //PreventDefault on a Submit Event.
        event.preventDefault();

        var newBurger = {
            name: $("#bu").val().trim(),
            devour: $("[name=devour]:checked").val().trim()
        };

        //Send the POST Request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
                console.log("created new burger");
                //Reload the Page to Get the Updated List
                location.reload();
            }
        );
    });


  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    //Send the DELETE Request.
    $.ajax("/api/burgers/" + id, {
        type: "DELETE"
    }).then(function() {
            console.log("deleted burger", id);
            //Reload the Page to Get the Updated List
            location.reload();
        }
    );
  });
});
