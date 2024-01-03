"use strict";

var isMobile = false;

// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

$(function () {
  // Init empty gallery array
  var container = [];
  // Loop over gallery items and push it to the array
  $('[data-toggle="photoswipe"]').each(function () {
    var $link = $(this),
      item = {
        src: $link.attr("href"),
        w: $link.data("width"),
        h: $link.data("height"),
        title: $link.data("caption"),
      };
    container.push(item);
  });
  // Define click event on gallery item
  $('[data-toggle="photoswipe"]').click(function (event) {
    // Prevent location change
    event.preventDefault();

    var photoswipeItem = $(this);

    // Define object and gallery options
    var $pswp = $(".pswp")[0];
    var options = {
      bgOpacity: 0.85,
      showHideOpacity: true,
    };
    // If the PhotoSwipeItem is in the slider, we don't count the
    // duplicate slides
    if (photoswipeItem.parents(".swiper-slide").length > 0) {
      options.index =
        photoswipeItem
          .parent(".swiper-slide:not(.swiper-slide-duplicate)")
          .index() - 1;
    }
    // normal content
    else {
      options.index = photoswipeItem.index();
    }
    // Initialize PhotoSwipe
    var gallery = new PhotoSwipe(
      $pswp,
      PhotoSwipeUI_Default,
      container,
      options
    );
    gallery.init();
  });

  AOS.init({
    disable: detectIE(), // dont' run in IEs as it's really slow
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    offset: 50, // offset (in px) from the original trigger point
    delay: 150, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
  });

  // ------------------------------------------------------- //
  //   Image zoom
  // ------------------------------------------------------ //

  if (!isMobile) {
    $('[data-toggle="zoom"]').each(function () {
      $(this).zoom({
        url: $(this).attr("data-image"),
        duration: 0,
      });
    });
  }

  // ------------------------------------------------------- //
  //   Smooth Scroll
  // ------------------------------------------------------- //

  var smoothScroll = new SmoothScroll("a[data-smooth-scroll]");

  // ------------------------------------------------------- //
  //   Object Fit Images
  // ------------------------------------------------------- //

  objectFitImages();

  // ------------------------------------------------------- //
  // Clickable dropdown to control every dropdown menu toggle
  // ------------------------------------------------------ //
  $(document).ready(function () {
    $(".has-dropdown.on-hover").hover(
      function (e) {
        $(".has-dropdown.on-hover").each(function () {
          $(this)
            .children(".dropdown-menu")
            .removeClass("dropdown-menu--visible");
        });

        clearTimeout($(this).data("hoverTimeout"));
        $(this).children(".dropdown-menu").addClass("dropdown-menu--visible");

        return false;
      },
      function () {
        var $this = $(this);

        var hoverTimeout = setTimeout(function () {
          $this
            .children(".dropdown-menu")
            .removeClass("dropdown-menu--visible");
        }, 350);

        $(this).data("hoverTimeout", hoverTimeout);

        return false;
      }
    );

    $(".dropdown-menu .dropdown-btn").on("click", function (e) {
      var toggleClass = "dropdown-list__item--expanded";

      $(this)
        .parent()
        .parent()
        .siblings(".dropdown-list__item")
        .each(function () {
          $(this).removeClass(toggleClass);
        });

      $(this).parent().parent().toggleClass(toggleClass);

      return false;
    });

    // Handle hover on submenu items
    $(".dropdown-submenu.on-hover").hover(function() {
      var toggleClass = "dropdown-list__item--expanded";

      $(this)
        .siblings(".dropdown-list__item")
        .each(function () {
          $(this).removeClass(toggleClass);
        });

      clearTimeout($(this).data("hoverTimeout"));
      $(this).addClass(toggleClass);

      return false;
    }, function() {
      var toggleClass = "dropdown-list__item--expanded";
      var subMenu = $(this);

      var hoverTimeout = setTimeout(function() {
        subMenu.removeClass(toggleClass);
      }, 350);

      subMenu.data("hoverTimeout", hoverTimeout);

    });

  });

  // ------------------------------------------------------- //
  // Adding fade+animation effect to dropdowns in navbar
  // and topbar
  // ------------------------------------------------------ //
  /*
  /*
  $.fn.adjustNavbarDropdowns = function () {
    $(".top-bar .dropdown-menu").each(function () {
      var translateY = "translateY(30px)",
        translateX = "",
        dropdownMenu = $(this),
        windowOuterWidth = $(window).outerWidth();

      if (
        dropdownMenu.attr("data-translate-x") &&
        windowOuterWidth >= options.navbarExpandPx
      ) {
        translateX =
          "translateX(" + dropdownMenu.attr("data-translate-x") + ")";
      }
      if (dropdownMenu.hasClass("show")) {
        translateY = "translateY(0)";
      }

      dropdownMenu.css("transform", translateX + " " + translateY);

      if (
        dropdownMenu.attr("data-min-width") &&
        windowOuterWidth > options.navbarExpandPx
      ) {
        dropdownMenu.css("min-width", dropdownMenu.attr("data-min-width"));
      } else if (
        dropdownMenu.attr("data-min-width") &&
        windowOuterWidth <= options.navbarExpandPx
      ) {
        dropdownMenu.css("min-width", "auto");
      }
    });
  };

  $.fn.adjustNavbarDropdowns();

  $.fn.slideDropdownUp = function () {
    var translateY = "translateY(0)",
      translateX = "",
      dropdownMenu = $(this),
      windowOuterWidth = $(window).outerWidth();

    if (
      dropdownMenu.attr("data-translate-x") &&
      windowOuterWidth > options.navbarExpandPx
    ) {
      translateX = "translateX(" + dropdownMenu.attr("data-translate-x") + ")";
    }
    dropdownMenu.fadeIn().css("transform", translateX + " " + translateY);

    return this;
  };
  $.fn.slideDropdownDown = function (movementAnimation) {
    var translateY = "translateY(30px)",
      translateX = "",
      dropdownMenu = $(this),
      windowOuterWidth = $(window).outerWidth();

    if (
      dropdownMenu.attr("data-translate-x") &&
      windowOuterWidth > options.navbarExpandPx
    ) {
      translateX = "translateX(" + dropdownMenu.attr("data-translate-x") + ")";
    }
    if (movementAnimation) {
      if (windowOuterWidth > options.navbarExpandPx) {
        dropdownMenu.fadeOut().css("transform", translateX + " " + translateY);
      } else {
        dropdownMenu
          .fadeOut(150)
          .css("transform", translateX + " " + translateY);
      }
    } else {
      dropdownMenu.hide().css("transform", translate);
    }
    return this;
  };

  $(".top-bar .dropdown").on("show.bs.dropdown", function (e) {
    $(this).find(".dropdown-menu").first().slideDropdownUp();
  });

  $(".top-bar .dropdown").on("hide.bs.dropdown", function (e) {
    var movementAnimation = true;

    // if navigation to another page
    if (e.clickEvent && e.clickEvent.target.tagName.toLowerCase() === "a") {
      movementAnimation = false;
    }

    $(this).find(".dropdown-menu").first().slideDropdownDown(movementAnimation);
  });
  */

  // ------------------------------------------------------- //
  //   Slider
  // ------------------------------------------------------- //
  var homeSlider = new Swiper(".home-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    speed: 1500,
    parallax: true,
    autoplay: {
      delay: 5000,
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".homeNext",
      prevEl: ".homePrev",
    },
  });

  var detailSliderOptions = {};

  if ($(".detail-slider .swiper-slide").length > 1) {
    detailSliderOptions = {
      mode: "horizontal",
      autoHeight: false,
      loop: true,
      spaceBetween: 20,
      on: {
        slideChangeTransitionStart: highlightThumb,
        slideChange: checkSelectVariant
      },
    };
  } else {
    detailSliderOptions = {
      loop: false,
      autoplay: false,
      simulateTouch: false,
    };
  }

  var productHasOptions = typeof qs_options !== "undefined";
  function checkSelectVariant() {
    if (!productHasOptions) return;
  
    var active = detailSlider.slides[detailSlider.activeIndex];
    var classes = Array.from(active.classList);
    var imageClassName = classes.find(function (_class) {
      return _class.startsWith("qs-product-image");
    });
  
    if (!imageClassName) return;
  
    var imageId = imageClassName.substring("qs-product-image".length);
    var selectFields = document.querySelectorAll(".qs-cart-option");
  
    // Get the current selections
    var currentSelections = [];
    for (var i = 0; i < selectFields.length; i++) {
      var selectElement = selectFields[i];
      currentSelections.push(selectElement.value);
    }
  
    // Find the best match based on the other selected variants
    var bestMatch = null;
    var bestMatchCount = 0;
    var firstBestMatch = null;
  
    Object.values(qs_options).forEach(function (option) {
      if (option.image_id == imageId) {
        if (!firstBestMatch) {
          firstBestMatch = option;
        }
  
        var matchCount = 0;
  
        for (var i = 0; i < option.values_id.length; i++) {
          if (currentSelections.includes(option.values_id[i])) {
            matchCount++;
          }
        }
  
        if (matchCount > bestMatchCount) {
          bestMatch = option;
          bestMatchCount = matchCount;
        }
      }
    });
  
    if (!bestMatch) {
      bestMatch = firstBestMatch;
    }
  
    if (!bestMatch) return;
  
    // Update the select fields with the best match
    for (var i = 0; i < bestMatch.options.length; i++) {
      var selectElement = selectFields[i];
      var optionElement = selectElement.querySelector("[data-name='" + bestMatch.options[i] + "']");
  
      if (!optionElement) continue;
  
      optionElement.selected = true;
      selectElement.value = optionElement.value;
      selectElement.dispatchEvent(new Event('change'));
      $(selectElement).trigger('change');
    }
  }
  

  var detailSlider = new Swiper(".detail-slider", detailSliderOptions);

  // =====================================================
  //      Items sliders
  // =====================================================

  $(".startpage-product-slider").each(function () {
    var similiarNext = $(this).siblings(".swiper-nav").children(".similarNext");
    var similiarPrev = $(this).siblings(".swiper-nav").children(".similarPrev");

    var startpageProductSlider = new Swiper(this, {
      slidesPerView: 2,
      spaceBetween: 15,
      loop: false,
      loopedSlides: 50,
      roundLengths: true,
      slidesPerGroup: 1,
      breakpoints: {
        1200: {
          slidesPerView: 4,
        },
        991: {
          slidesPerView: 3,
        },
      },
      navigation: {
        nextEl: similiarNext,
        prevEl: similiarPrev,
      },
    });
  });

  var similarSlider = new Swiper(".similar-slider", {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: false,
    loopedSlides: 10,
    roundLengths: true,
    slidesPerGroup: 1,
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: ".similarNext",
      prevEl: ".similarPrev",
    },
  });

  $("#quickView").on("shown.bs.modal", function (e) {
    quickViewSlider = new Swiper("#quickViewSlider", {
      mode: "horizontal",
      loop: true,
      on: {
        slideChangeTransitionStart: highlightThumb,
      },
    });
  });

  $("#quickView").on("hidden.bs.modal", function (e) {
    quickViewSlider.destroy();
  });

  function highlightThumb() {
    var sliderId = this.$el.attr("id");
    var thumbs = $('.swiper-thumbs[data-swiper="#' + sliderId + '"]');
    // if thumbs for this slider exist
    if (thumbs.length > 0) {
      thumbs.find(".swiper-thumb-item.active").removeClass("active");
      thumbs.find(".swiper-thumb-item").eq(this.realIndex).addClass("active");
    }
  }

  $(".swiper-thumb-item").on("click", function (e) {
    e.preventDefault();
    var swiperId = $(this).parents(".swiper-thumbs").data("swiper");
    $(swiperId)[0].swiper.slideToLoop($(this).index());
  });

  // SVG Sprites
  function injectSvgSprite(path) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", path, true);
    ajax.send();
    ajax.onload = function (e) {
      var div = document.createElement("div");
      div.className = "d-none";
      div.innerHTML = ajax.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    };
  }

  injectSvgSprite(
    "https://storage.quickbutik.com/templates/nova/assets/base-icons-theme.svg"
  );

  mobileFixedHeader();

  if ($("#product").length > 0) {
    if ($(".swiper-thumb-item").length > 7) {
      $(".swiper-thumbs").css({ display: "block" });
    }
  }
});

var options = {
  navbarExpandPx: 992,
};

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var version = false;

  if (msie > 0) {
    // IE 10 or older => return version number
    version = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    version = parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    version = parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  if (version !== false && version <= 11) {
    return true;
  } else {
    return false;
  }
}

// ------------------------------------------------------- //
//   Increase/Decrease product amount
// ------------------------------------------------------ //

$(document).on("click", ".btn-items-decrease", function () {
  var input = $(this).siblings(".input-items");
  if (parseInt(input.val(), 10) >= 1) {
    input.val(parseInt(input.val(), 10) - 1).trigger("change");
  }
});

$(document).on("click", ".btn-items-increase", function () {
  var input = $(this).siblings(".input-items");
  input.val(parseInt(input.val(), 10) + 1).trigger("change");
});

// ------------------------------------------------------- //
//   Mobile height on home sliders
// ------------------------------------------------------ //
$(".home-slider").each(function () {
  var newHeight = $(this).attr("data-home-slider-mobile-height");

  if (window.matchMedia("(max-width: 769px)").matches) {
    $(this).height(newHeight);
  }
});

// ------------------------------------------------------- //
//   Vh for sidebars on mobiles
// ------------------------------------------------------ //

function setVhVar() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh + "px");
}

setVhVar();

// We listen to the resize event
window.addEventListener("resize", setVhVar);

// ------------------------------------------------------- //
//   Header variation 2 - Search icon open
// ------------------------------------------------------ //
$("#headertwo_searchicon").on("click", function () {
  $("#headertwo_searchinput").slideToggle("fast", function () {
    console.log("animated");
  });
  // $('#header_searchinput').toggleClass('d-block');
  $("#headertwo_searchinput input").focus();
});

// ------------------------------------------------------- //
//   Fixed header after scroll
// ------------------------------------------------------ //
var navbar = $(".fixed-mobile");
var navbarPosition = $(".navbar-position").offset().top;
var navbarVisible = false;
function mobileFixedHeader() {
  $(window).bind("scroll", function () {
    if ($(window).scrollTop() > navbarPosition && $(window).width() < 992) {
      $(navbar).addClass("fixed-top shadow");
      if (!navbarVisible) {
        $(navbar).before("<div class='navbar-placeholder'></div>");
        $(".navbar-placeholder").css("height", $(navbar).height());
        navbarVisible = true;
      }
    } else {
      $(navbar).removeClass("fixed-top shadow");
      $(".navbar-placeholder").remove();
      navbarVisible = false;
    }
  });
}

$(window).resize(function () {
  mobileFixedHeader();
});

// Fix for parallax on DOM change/resize
const resizeObserver = new ResizeObserver(entries => 
  jQuery(window).trigger('resize').trigger('scroll')
); 
resizeObserver.observe(document.body)