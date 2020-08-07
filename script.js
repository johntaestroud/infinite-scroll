const count = 10;
const apiKey = 'vPZYloj90qvv-1Pt-HcwiJRd900ManlYn97idQIPoUc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json(); // run through the json method and be returned as json
      console.log(data);
    } catch (error) {
        // Catch error
    }
}

// On load
getPhotos();