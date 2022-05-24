
// init Masonry


let index = 0;
const totalWorkItems = $(".work-item").length;

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

        index = $(this).parent(".work-item").index() - 1;
        $(".lightbox").addClass("open");
        lightboxSlideShow();
    })
    $(".lightbox .prev").click(function () {
        if (index == 0) {
            index = totalWorkItems - 1;
        } else {
            index--;
        }
        lightboxSlideShow();
    })
    $(".lightbox .next").click(function () {
        if (index == totalWorkItems - 1) {
            index = 0
        } else {
            index++;
        }
        lightboxSlideShow();
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

function lightboxSlideShow() {
    const imgSrc = $(".work-item").eq(index).find("img").attr("data-large");
    const category = $(".work-item").eq(index).find("h4").html();
    $(".lightbox-img").attr("src", imgSrc);
    $(".lightbox-category").html(category);
    $(".lightbox-counter").html((index + 1) + "/" + totalWorkItems);
    console.log(index);


}