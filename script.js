const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// setting to page to false when it loads
let ready = false;
let imagesLoaded = 0
//keep track of total 
let totalImages = 0;
let photosArray = [];
//let initialLoad = true

let count = 5;
const apiKey = 'vPZYloj90qvv-1Pt-HcwiJRd900ManlYn97idQIPoUc';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    //initialLoad = false;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
  
}

// Helper Function to Set Attribute on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  //reset the value of imagesLoaded after time we launch displayPhotos
  imagesLoaded = 0;
  totalImages = photosArray.length;
  
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    // setting href with link
    // item.setAttribute('href', photo.links.html);
    // opening window in a new tab
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // create <img> for photo
    const img = document.createElement('img');
    // The src is going to load the image so we start there
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded)
    // Put <img> inside <a> then put both inside imageContainer 
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      // run through the json method and be returned as json
      photosArray = await response.json(); 
      displayPhotos();

    } catch (error) {
        // Catch error
    }
}

// Load more photos when scrolling
window.addEventListener('scroll', () => {
  // browser window's total height + distance from the top of page user has scrolled >= height of everything in the body, including what is not within view - load more when scrolled to 1000px less (trigger event before bottom is reached)
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();