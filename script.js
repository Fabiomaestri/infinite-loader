const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArrays = [];


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'lUBVCtxq6-yaBlZFMpksWXJ8cHjGxfo7poDCC82XEkw'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoader(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}


// create elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // run function for each object in photoArray
    photosArray.forEach((photo) =>{

        // create <a> to link do unsplash
        const item = document.createElement('a');
        // setAttributes(item, {
        //     href: photo.links.html,
        //     target: '_blank',
        // });
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // create <img> for photo
        const img = document.createElement('img');
        // setAttributes(img, {
        //     src: photo.urls.regular,
        //     alt: photo.alt_description,
        //     title: photo.alt_description,
        // });
        
        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoader);
        
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.allt_description);
        img.setAttribute('title', photo.alt_description);
        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        // catch error here
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready  = false;
        getPhotos();
    }
})
























// on load
getPhotos();