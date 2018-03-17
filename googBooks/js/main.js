//HTML goo
//Search bar --> Input tag[type=text]
//Submit buttion --> Button tag to run search 
//Title -->h1 that says "Search Books"
//See it -> div to show all of our results 

//JS
//function findsbooks

//-use an api to get the infor from the google books api
//-display info we get info div

//Create function that runs when button is clicked
function bookLook() {
	//attach js to HTML elements
	var results = document.getElementById("results")
	//get value from input tag 
	var userSearch = document.getElementById("userSearch").value;
	$.ajax({
		url:"https://www.googleapis.com/books/v1/volumes?q="+userSearch,
		type:"GET",
		dataType:"JSON",
		success:function(dataThatWeGotBack){
			//empties out results div on sucess
			results.innerHTML = "";
			//console.log(dataThatWeGotBack)
			console.log(dataThatWeGotBack)
			var items = dataThatWeGotBack.items
			console.log(items)
			//use a for loop to get all of the book titles in the results box
			for(var i = 0; i < items.length; i++){
				//target the array to get the title of each book 
				console.log(items[i].volumeInfo.title)
				results.innerHTML += "<h4 class='red'>" +items[i].volumeInfo.title + "</h4>"
									 +"<img src='" + items[i].volumeInfo.imageLinks.thumbnail + "'>"
									 +"<h5>" + items[i].volumeInfo.publishedDate + "</h5>"

			}
		}
})
}

document.getElementById("runSearch").addEventListener("click", bookLook);