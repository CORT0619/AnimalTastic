var textVal;
var newButton;
var apiUrl;
//var apiPlus = "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
var status;

	var apiPlus = "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

	$('#submit').on('click', function(){

		textVal =  $('#getAnimal').val().trim();

		if(textVal != ""){

			newButton = $("<button></button>").text(textVal).css({'margin': '5px 5px'});
			newButton.attr('data-search', textVal);
			$("#animalButtons").append(newButton);

			$('#getAnimal').val("");
			
		}

		$('#animalButtons').addClass('addAnimalButtons');

	});

	$("#animalButtons").on('click', "button", function(){

		apiUrl = "http://api.giphy.com/v1/gifs/search?q=";
		apiUrl = apiUrl+ $(this).attr('data-search') + apiPlus;

		$('#animalPics').empty();

		$.ajax({
			url: apiUrl,
			method: 'GET'
		}).done(function(animal){

			$("#animalPics").addClass("addAnimalPics");

			for(var i = 0; i < 10; i++){

				var newDiv = $('<div class="animalDiv">');
				var newPara = $('<p class="rating">').html("Rating: " + animal.data[i].rating);
				$(newDiv).append(newPara);

				var newImg = $('<img>').attr({'src': animal.data[i].images.downsized_still.url,
											  'data-pic': animal.data[i].images.downsized_still.url,
											  'data-gif': animal.data[i].images.downsized.url,
											  'data-status': 'pic',
											  'margin': '10px 10px'});
				$(newDiv).append(newImg);
				$('#animalPics').append(newDiv);
			}

		});

	});

	$("#animalPics").on('click', ".animalDiv", function(e){

		status = $(e.target).attr('data-status');

		if(status == 'pic'){

			$(e.target).attr('src', $(e.target).attr('data-gif'));
			$(e.target).attr('data-status', 'gif');


		} else if(status == 'gif'){

			$(e.target).attr('src', $(e.target).attr('data-pic'));
			$(e.target).attr('data-status', 'pic');

		}

	});