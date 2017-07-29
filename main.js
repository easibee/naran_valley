$(document).ready(function() {
   function createMap (latitude, longitude, locationHeading) {
    
    var location = {lat: latitude, lng: longitude},
        locationString = "<h1>" + locationHeading + "</h1>";
    

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: location,
        // hides the +/- signs etc provided by google
        disableDefaultUI: true,
        // when scrolling down whith scroll wheel, the google map is disabled
        scrollwheel: false
    });
    
    var infoWindow = new google.maps.InfoWindow({
        content: locationString
    });
    
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    
   }
    
    //Total numberof images in carousel
    var numberOfImages = 10,
        // Width of browser where images visible on UI change
        browserWidthBreakPoint = 600,
        // number of images per page calculated depending on the size of browser
        numberOfImagesPerPage = 5,
        // Current number of images showing on UI
        currentNumberOfImagesPerPage,
        // Percentage width of image
        percentageWidthOfImage,
        // First image showing at start of carousel
        firstImageShowing = 1,
        // Checks if the browser width is desktop or mobile
        isDesktop,
        // Setting the carousel to move forward and backward automaticallys 
        automatingCarousel,
        // Direction the automatic carousel should be moving 
        automatedCarouselDirection,

        // Last image showing on carousel
        $carouselHolder = $("div.carouselHolder"),
        $carouselContainer = $("div.carouselContainer");
    
    //Moves images right or left depending on button clicked
    function slideImage(direction, buttonClicked) {

        if (!$(buttonClicked).hasClass("disabled")) {
            
            if (direction === "right") {
                // Only move carousel if the carousel has not reached the end
                if (firstImageShowing !== (numberOfImages - currentNumberOfImagesPerPage) + 1) {
                    
                    
                    // Calculates the percentage the image should be moved
                    $carouselHolder.animate({left: "-=" + percentageWidthOfImage + '%'}, 500);
                    firstImageShowing++;
                }
            } else {
                if (firstImageShowing !== 1) {
                    
                    $carouselHolder.animate({left: "+=" + percentageWidthOfImage + '%'}, 500);
                    firstImageShowing--;
                }
            }

            // Change carousel direction to reverse
            if (firstImageShowing >= (numberOfImages - currentNumberOfImagesPerPage) + 1) {
                automatedCarouselDirection = "left";
            // Change carousel direction to forwards
            } else if (firstImageShowing === 1) {
               automatedCarouselDirection = "right";
            }
        }
    }
    
        // Checks the width of the browser
    function recalibrateCarousel(isNotResize) {
        // View is set to desktop
        var isNowDesktop = $(window).width() > browserWidthBreakPoint ? true : false;
        
        if (isNowDesktop !== isDesktop) {
            isDesktop = isNowDesktop;
            recalculateCarouselDivs();
        }
    }
    
    function recalculateCarouselDivs() {
        
            // Calculate the size of the carouselHolder and each image
         var setWidthOfDivs = function () {
                // Set CSS width of carousel container with all the images
                $carouselHolder
                    .css({
                        width: ((numberOfImages / currentNumberOfImagesPerPage) * 100) + "%"
                    })

                    // Set CSS width carousel image divs
                    .children("div")
                        .css({
                            width: (100 / numberOfImages) + "%"
                    });
            },
            // Resets the first image in the carousel when window is resized
            resetCarouselPosition = function () {
                // if size of window is more than widthBreakPoint and maxImage
                if (isDesktop && firstImageShowing > (numberOfImages - currentNumberOfImagesPerPage) + 1) {
                    // Set first image showing to the total images - imagesPerPage. Use Math.max so that the highest value is always taken
                    firstImageShowing = Math.max((numberOfImages - currentNumberOfImagesPerPage) + 1, 1);
                }

                // Recalculate the width of the image div
                $carouselHolder.css({
                    left: -(percentageWidthOfImage * (firstImageShowing - 1)) + '%'
                });
            };
            
        // Calculates size of window and the images that should be displayed
        currentNumberOfImagesPerPage = $(window).width() > browserWidthBreakPoint ? numberOfImagesPerPage : 1;
        // Calculates the percentage widthof each individual image
        percentageWidthOfImage =  100 / currentNumberOfImagesPerPage;
        setWidthOfDivs();
        resetCarouselPosition();
              
    }

    recalibrateCarousel(true);

    // Enable total images are more than images viewable on page start autoforwarding
    if (numberOfImages > currentNumberOfImagesPerPage) {
        automatedCarouselDirection = "right";
        automatingCarousel =
        setInterval(function () {
            slideImage(automatedCarouselDirection);
        }, 5000);
    }
});
