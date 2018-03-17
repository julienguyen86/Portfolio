$(document).ready(function() {

    //initial array of shows
    var showsList = ["Game of Thrones", "Friends", "The Blacklist", "Modern Family", "The Walking Dead"];


    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayInfo() {
        var show = $(this).attr("show-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific show button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //empty shows div so new selection appends to emtpy div 
            $("#shows").empty();

            var results = response.data;

            //For loop to grab the rating information and appropriate gif for button clicked into its own div to keep information together
            for (var i = 0; i < results.length; i++) {
                var showDiv = $("<div class='userShow col-md-4'>");

                // Storing the rating data
                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //make variables for still and animated 
                var showStill = results[i].images.fixed_height_still.url;
                var showAnimate = results[i].images.fixed_height.url;

                // the still image and the moving image links in data attributes
                var gifDiv = $("<img>").attr("src", showStill);

                gifDiv.addClass("showImages");
                gifDiv.attr("data-still", showStill);
                gifDiv.attr("data-animate", showAnimate);
                gifDiv.attr("data-state", "still")
                // append the image into the div
                showDiv.append(pRate);
                showDiv.append(gifDiv);

                $("#shows").append(showDiv);
            }

            //on click of gif still image, gif will play. When clicked again, gif will pause.
            $(".showImages").on("click", function() {
                var state = $(this).attr("data-state");
                var animate = $(this).attr("animate");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }


            });
        });

    }

    //create buttons out of array indexes
    function renderButtons() {

        //delete original array of buttons everytime renders so they do not keep repeating
        $("#showButtons").empty();

        //loop through array
        for (var i = 0; i < showsList.length; i++) {

            var showRender = $("<button>");

            //add class and attribute of name so display function 
            showRender.addClass("show");
            showRender.attr("show-name", showsList[i]);
            showRender.text(showsList[i]);
            $("#showButtons").append(showRender);
        }
    }

    //on click event to add an additional show button when submitted - push input to array.
    $("#addShow").on("click", function(event) {
        event.preventDefault();
        var show = $("#show-input").val().trim();

        //push input to original topics array and then rerun render of buttons to show newly added button.
        showsList.push(show);
        $("#show-input").val(" ");
        renderButtons();
    });


    //on click entire document to cover all elements named "show" and run display function
    $(document).on("click", ".show", displayInfo);

    //run function to display all buttons on startup
    renderButtons();

});