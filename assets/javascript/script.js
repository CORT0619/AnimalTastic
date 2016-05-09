var textVal;
	var newButton;
	var apiUrl;
	var apiPlus = "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
	//var apiPlus = "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

	$('#submit').on('click', function(){

		textVal =  $('#getAnimal').val().trim();

		console.log(textVal);


		if(textVal != ""){

			newButton = $("<button></button>").text(textVal).css({'margin': '5px 5px'});
			newButton.attr('data-search', textVal);
			$("#animalButtons").append(newButton);

			$('#getAnimal').val("");
			
		} 

	});

	$("#animalButtons").on('click', "button", function(){

		apiUrl = "http://api.giphy.com/v1/gifs/search?q=";
		apiUrl = apiUrl+ $(this).attr('data-search') + apiPlus;
		console.log(apiUrl);

		$('#animalPics').empty();

		$.ajax({
			url: apiUrl,
			method: 'GET'
		}).done(function(animal){
			console.log(animal);

			for(var i = 0; i < 10; i++){

				var newDiv = $('<div class="animalDiv">');
				var newPara = $('<p class="rating">').html("Rating: " + animal.data[i].rating);
				$(newDiv).append(newPara);

				var newImg = $('<img>').attr({'src': animal.data[i].images.downsized_still.url,
											  'data-pic': animal.data[i].images.downsized_still.url,
											  'data-gif': animal.data[i].url,
											  'data-status': 'pic',
											  'margin': '10px 10px'});
				$(newDiv).append(newImg);
				$('#animalPics').append(newDiv);
			}

		});

	});