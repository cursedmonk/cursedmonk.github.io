// Flickr configurations
// Obfuscated API key var for demo
var _0x6e6e = ["\x65\x66\x63\x38\x33\x64\x63\x63\x64\x37\x63\x31\x64\x30\x61\x65\x39\x33\x66\x34\x61\x61\x37\x61\x66\x62\x39\x37\x31\x66\x63\x65"];var apiKey = _0x6e6e[0];
// To personalize app, replace with your own API key
// const apiKey = '';
var album = '72157688964206172',
    albumOwner = '154845055@N05',
    flickrUrl = 'https://api.flickr.com/services/rest/',
    method = '?method=flickr.photosets.getPhotos&api_key=',
    perPage = '100',
    formatCallback = '&format=json&nojsoncallback=1',
    contentContainer = document.getElementById('carouselContent'),
    oReq = new XMLHttpRequest();
// Handle a response from the Flickr API
function reqListener() {
	var flickrPhotos = JSON.parse(this.responseText);
	console.log(flickrPhotos.photoset);
	// Parse response for album and owner information
	var ownerName = flickrPhotos.photoset.ownername,
	    albumTitle = flickrPhotos.photoset.title,
	    albumUrl = 'https://www.flickr.com/photos/' + albumOwner + '/albums/' + album,
	    albumOwnerUrl = 'https://www.flickr.com/photos/' + albumOwner;
	// append response data to HTML DOM elements
	albumInfo.innerHTML = albumTitle;
	owner.innerHTML = ownerName;
	albumLink.href = albumUrl;
	albumOwnerLink.href = albumOwnerUrl;
	// Iterate through flickrPhotos in the response
	flickrPhotos.photoset.photo.forEach(function (foto) {
		// Generate the URL for individual photo based on template
		var url = 'https://farm' + foto.farm + '.staticflickr.com/' + foto.server + '/' + foto.id + '_' + foto.secret + '.jpg';
		var photoTitle = foto.title;
		// Generate the necessary slide markup
		//   <span data-function="slide">
		//       <p>title</p>
		//       <img src="" />
		//   </span>
		var span = document.createElement('span'),
		    img = document.createElement('img'),
		    title = document.createElement('p');
		// append response data to generated HTML DOM elements
		img.src = url;
		img.alt = photoTitle;
		title.innerHTML = photoTitle;
		span.dataset.function = 'slide';
		span.appendChild(title);
		span.appendChild(img);
		// Now append the new slide to the slide container
		contentContainer.appendChild(span);
	});
	// Remote API request has been made and processed, initialize the carousel.
	flickrCarousel();
}
// API call to Flickr
oReq.addEventListener("load", reqListener);
oReq.open("GET", flickrUrl + method + apiKey + '&photoset_id=' + album + '&user_id=' + albumOwner + '&per_page=' + perPage + formatCallback);
oReq.send();
// Carousel function
function flickrCarousel() {
	// set scoped variables
	var carouselBox = document.getElementById('carouselBox'),
	    prev = carouselBox.querySelector('.prev'),
	    next = carouselBox.querySelector('.next'),
	    slides = carouselBox.querySelectorAll('[data-function=slide]'),
	    deck = slides.length;
	var slide = 0,
	    currentSlide = slides[0];
	// Find current slide of array and add selector
	currentSlide.classList.add('current-slide');
	// slider function
	function pushSlide(flip) {
		// Use value of array to find node and remove selector
		currentSlide.classList.remove('current-slide');
		// Using value of current slide, add flip value to determine next slide value
		slide = slide + flip;
		// allows for full rotation of carousel; if 0 set value to -1 of array length
		if (flip === -1 && slide < 0) {
			slide = deck - 1;
		}
		// allows for full rotation of carousel; if max length of array, set to 0
		if (flip === 1 && !slides[slide]) {
			slide = 0;
		}
		// determine active slide and add selector
		currentSlide = slides[slide];
		currentSlide.classList.add('current-slide');
	}

	// Bind click events to toggle buttons and pass in slide flip value
	next.addEventListener('click', function () {
		pushSlide(1);
	});

	prev.addEventListener('click', function () {
		pushSlide(-1);
	});
	// Bind keyboard events to slide triggers
	document.addEventListener('keydown', function (event) {
		if (event.keyCode == 39) {
			pushSlide(1);
		}
		if (event.keyCode == 37) {
			pushSlide(-1);
		}
	});
};