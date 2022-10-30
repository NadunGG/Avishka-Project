// * Number of Photos in each collection in chronological order
const works = {
  1: 5, // ? Shanu Pradeep & Sandya Kumari Keshayur Salon Promoting Shoot
  2: 7, // ? Jinuli Onaya Birthday
  3: 6, // ? Dilini Bridal Frock
  4: 8, // ? Dilini  Bridal Saree
  5: 11, // ? Chandi & Mahesh Engagement
  6: 15, // ? Dilini Fashion Frock
  7: 14, // ? Dilini Fashion Saree
};

const services = {
  1: 3, // ? Wedding Photography
  2: 2, // ? Wedding Preshoot
};

let index = 0;
let totalItems = 0;
let isService = true;
let position = 0;

$(window).on('load', function () {
  $('.preloader').addClass('loaded');
});

// init Masonry
var $grid = $('.work-row').masonry({
  itemSelector: '.work-item',
  percentPosition: true,
  columnWidth: '.work-sizer',
});

// layout Masonry after each image loads
$grid.imagesLoaded().progress(function () {
  $grid.masonry();
});

// $(window).resize(function () {
//     var $container = $('#gallery');
//     initialize Masonry after all images have loaded
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
  $('.nav-toggle').click(function () {
    $('.header .nav').slideToggle();
  });
  $('.header .nav a').click(function () {
    if ($(window).width() < 768) {
      $('.header .nav').slideToggle();
    }
  });

  //fixed header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.header').addClass('fixed');
    } else {
      $('.header').removeClass('fixed');
    }
  });

  // Add smooth scrolling to all links
  $('a').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  // $('#gallery').masonry({
  //     // set itemSelector so .grid-sizer is not used in layout
  //     itemSelector: '.work-item',
  //     columnWidth: '.work-item',
  // })

  // set lightbox img max height
  const wHeight = $(window).height();
  $('.lightbox-img').css('max-height', wHeight + 'px');
  // lightbox
  $('.work-item-inner').click(function () {
    isService = false;
    selectSection('work', this);
  });
  $('.service-item-inner').click(function () {
    isService = true;
    selectSection('service', this);
  });

  function getTotalItems(section, position) {
    if (section == 'work') {
      return works[position.toString()];
    } else if (section == 'service') {
      return services[(position + 1).toString()];
    }
  }

  function selectSection(section, place) {
    position = $(place).parent(`.${section}-item`).index();
    $('.lightbox').addClass('open');
    index = 1;
    totalItems = getTotalItems(section, position);
    lightboxSlideShow(section);
  }
  $('.lightbox .prev').click(function () {
    if (index == 1) {
      index = totalItems;
    } else {
      index--;
    }
    isService ? lightboxSlideShow('service') : lightboxSlideShow('work');
  });

  $('.lightbox .next').click(function () {
    if (index == totalItems) {
      index = 1;
    } else {
      index++;
    }
    isService ? lightboxSlideShow('service') : lightboxSlideShow('work');
  });

  // close lightbox
  $('.lightbox-close').click(function () {
    $('.lightbox').removeClass('open');
  });
  // close lightbox when clicked outside of img-box
  $('.lightbox').click(function (event) {
    if ($(event.target).hasClass('lightbox')) {
      $(this).removeClass('open');
    }
  });
});

function lightboxSlideShow(section) {
  let category = '';
  const imgSrc = getDir(section) + `${index}.jpg`;
  if (section == 'work') {
    category = $(`.${section}-item`)
      .eq(position - 1)
      .find('h4')
      .html();
  } else if (section == 'service') {
    category = $(`.${section}-item`).eq(position).find('h4').html();
  }
  $('.lightbox-counter').html(index + '/' + totalItems);
  $('.lightbox-img').attr('src', imgSrc);
  $('.lightbox-category').html(category);
}

function getDir(section) {
  if (section == 'work') {
    return $(`.${section}-item`)
      .eq(position - 1)
      .find('img')
      .attr('data-large');
  } else if (section == 'service') {
    return $(`.${section}-item`).eq(position).find('img').attr('data-large');
  }
}
