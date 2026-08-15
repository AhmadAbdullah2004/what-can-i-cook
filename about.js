const aboutImages = [
    "img/Cookingimg1.jpg",
    "img/Cookingimg2.jpg",
    "img/Cookingimg3.jpg",
    "img/Cookingimg4.jpg"
];

let aboutImageIndex = 0;

const aboutSliderImage =
    document.querySelector("#about-slider-image");


setInterval(() => {

    aboutSliderImage.classList.add("fade-out");


    setTimeout(() => {

        aboutImageIndex++;

        if (aboutImageIndex >= aboutImages.length) {
            aboutImageIndex = 0;
        }

        aboutSliderImage.src = aboutImages[aboutImageIndex];

        aboutSliderImage.classList.remove("fade-out");

    }, 500);

}, 3000);