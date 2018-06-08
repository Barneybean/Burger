$(function(){
    // $.ajax("/", {
    //     type: "get"
    // }).then(function(data) {
    //     console.log(data);
    // }) 
    //***** */
    // get function is not needed because handlebars will display all obj from render(index, obj) in controller
    //******* */

    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        // console.log("haha")
        var ramenName = $("#Ra").val().trim();
        // this is how to call form with
        var status = $("[name=made]:checked").val().trim();

        $.ajax("/api/ramens", {
            type: "post",
            data: //has to be data
            {
                ramen: ramenName,
                made: status
            }
        }).then(function(result) {
            console.log("new order submitted");
            location.reload();
        });
    });
    //move orders into different area
    $(".change-made").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var newMade = $(this).data("newmade");
        console.log(this);
        var newMadeStatus = {
            made: newMade
        };

        $.ajax("/api/ramens/" + id, {
            type: "put",
            data: newMadeStatus
        }).then(
            function(result) {
                console.log("changed made to " + newMade);
                location.reload();
            }
        );
    });

    //delete
    $(".delete-ramen").on("click", function(event) {
        var id = $(this).data("id");
    
        // Send the DELETE request.
        $.ajax("/api/ramens/" + id, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted order ", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });

});