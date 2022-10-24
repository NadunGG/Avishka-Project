
// init Masonry


let index = 0;
const totalWorkItems = $(".work-item").length;
let totalServiceItems = 0;
let isService = true
let serveIndex = 0;
let position = 0
const services = {
    weddingphoto: 3,
    preshoot: 2
}

$(window).on("load", function () {
    $(".preloader").addClass("loaded");
})

// init Masonry
var $grid = $('.work-row').masonry({
    itemSelector: '.work-item',
    percentPosition: true,
    columnWidth: '.work-sizer'
});

// layout Masonry after each image loads
$grid.imagesLoaded().progress(function () {
    $grid.masonry();
});




// $(window).resize(function () {
//     var $container = $('#gallery');
//     // initialize Masonry after all images have loaded  
//     $container.imagesLoaded(function () {
//         $container.masonry({
//             columnWidth: ".work-item",
//             itemSelector: ".work-item",
//             percentPosition: true
//         });
//     });
// });

$(document).ready(function () {
    // var $container = $('#gallery');
    // // initialize Masonry after all images have loaded  
    // $container.imagesLoaded(function () {
    //     $container.masonry({
    //         columnWidth: ".work-item",
    //         itemSelector: ".work-item",
    //         percentPosition: true
    //     });
    // });


    // // Refresh Orientation
    // $(window).on('orientationchange', function (e) {
    //     $.mobile.changePage(window.location.href, {
    //         allowSamePageTransition: true,
    //         transition: 'none',
    //         reloadPage: true
    //     });
    // });

    // nav toggle
    $(".nav-toggle").click(function () {
        $(".header .nav").slideToggle();
    })
    $(".header .nav a").click(function () {
        if ($(window).width() < 768) {
            $(".header .nav").slideToggle();
        }
    })

    //fixed header
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".header").addClass("fixed");
        }
        else {
            $(".header").removeClass("fixed");
        }
    })

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    // $('#gallery').masonry({
    //     // set itemSelector so .grid-sizer is not used in layout
    //     itemSelector: '.work-item',
    //     columnWidth: '.work-item',
    // })

    // set lightbox img max height
    const wHeight = $(window).height();
    $(".lightbox-img").css("max-height", wHeight + "px");

    // lightbox
    $(".work-item-inner").click(function () {
        console.log(this);
        index = $(this).parent(".work-item").index() - 1;
        console.log(index);
        $(".lightbox").addClass("open");
        isService = false
        lightboxSlideShow("work");
    })
    $(".service-item-inner").click(function () {
        position = $(this).parent(".service-item").index();
        console.log(position);
        $(".lightbox").addClass("open");
        isService = true
        serveIndex = 0;
        switch (position) {
            case 0:
                totalServiceItems = services.weddingphoto;
                break;
            case 1:
                totalServiceItems = services.preshoot;
                break;
        }
        lightboxSlideShow("service");

    })
    $(".lightbox .prev").click(function () {
        if (isService) {
            switch (position) {
                case 0:
                    totalServiceItems = services.weddingphoto;
                    break;
                case 1:
                    totalServiceItems = services.preshoot;
                    break;
            }
            if (serveIndex == 0) {
                serveIndex = totalServiceItems - 1;
            } else {
                serveIndex--;
            }
            lightboxSlideShow("service");

        }
        if (!isService) {
            if (index == 0) {
                index = totalWorkItems - 1;
            } else {
                index--;
            }
            lightboxSlideShow("work");
        }

    })
    $(".lightbox .next").click(function () {
        if (isService) {
            switch (position) {
                case 0:
                    totalServiceItems = services.weddingphoto;
                    break;
                case 1:
                    totalServiceItems = services.preshoot;
                    break;
            }
            if (serveIndex == totalServiceItems - 1) {
                serveIndex = 0;
            } else {
                serveIndex++;
            }
            lightboxSlideShow("service");

        }
        if (!isService) {
            if (index == totalWorkItems - 1) {
                index = 0
            } else {
                index++;
            }
            lightboxSlideShow("work");
        }
    })

    // close lightbox
    $(".lightbox-close").click(function () {
        $(".lightbox").removeClass("open");
    })
    // close lightbox when clicked outside of img-box
    $(".lightbox").click(function (event) {
        if ($(event.target).hasClass("lightbox")) {
            $(this).removeClass("open");
        }
    })
})

function lightboxSlideShow(section) {

    let imgSrc = ""
    let category = ""
    if (section == "work") {
        imgSrc = $(".work-item").eq(index).find("img").attr("data-large");
        category = $(".work-item").eq(index).find("h4").html();
        $(".lightbox-counter").html((index + 1) + "/" + totalWorkItems);
    }
    else if (section == "service") {
        const serviceDir = "./img/Services Section/large"
        switch (position) {
            case 0:
                imgSrc = serviceDir + `/wedding-photo/${serveIndex}.jpg`
                break;
            case 1:
                imgSrc = serviceDir + `/pre-shoot/${serveIndex}.jpg`
                break;
        }
        category = $(".service-item").eq(position).find("h4").html();
        $(".lightbox-counter").html((serveIndex + 1) + "/" + totalServiceItems);
    }


    $(".lightbox-img").attr("src", imgSrc);
    $(".lightbox-category").html(category);




}