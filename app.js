$(document).ready(function() {

    var autos = [
        "toyota", "mercedesbenz", "porsche", "mitsubishi", "ferrari", "lamborghini",
        "volvo", "audi", "nissan", "hyundai", "BMW",

    ];

    // generate buttons func
    function populateButtons(userArray, userClass, displayArea) {
        $(displayArea).empty();

        for (var i = 0; i < userArray.length; i++) {
            var a = $("<button>");
            a.addClass(userClass);
            a.attr("data-type", userArray[i]);
            a.text(userArray[i]);
            $(displayArea).append(a);
        }

    }

    $(document).on("click", ".car-button", function() {
        $("#cars").empty();
        $(".car-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=wPsCcGIkNaCm9H16wslhqXV4csv4qzsO&limit=5";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var carDiv = $("<div class=\"car-item\">");

                    var rating = results[i].rating;

                    var titleX = results[i].title;

                    var p = $("<p>").text("Rating: " + rating);

                    var q = $("<p>").text("Title: " + titleX);

                    var animated = results[i].images.fixed_height.url;
                    var static = results[i].images.fixed_height_still.url;

                    var carImage = $("<img>");
                    carImage.attr("src", static);
                    carImage.attr("data-still", static);
                    carImage.attr("data-animate", animated);
                    carImage.attr("data-state", "still");
                    carImage.addClass("car-image");

                    carDiv.append(p);
                    //carDiv.append("<br>");
                    carDiv.append(q);
                    carDiv.append(carImage);

                    $("#cars").append(carDiv);
                }
            });
    });

    $(document).on("click", ".car-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-car").on("click", function(event) {
        event.preventDefault();
        var newAuto = $("input").eq(0).val();

        if (newAuto.length > 1) {
            autos.push(newAuto);
        }

        populateButtons(autos, "car-button", "#car-buttons");

    });

    /*

     $("#remove-car").on("click", function(event) {
        event.preventDefault();
                
            autos.pop();
        

        populateButtons(autos, "car-button", "#car-buttons");

    });

    */

    populateButtons(autos, "car-button", "#car-buttons");

});