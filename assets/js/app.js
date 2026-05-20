// =================== ****************** ================== //
// Template Name: Tentazione Alfajores
// Description: Tentazione Alfajores ecommerce boutique
// Version: 1.0.0

// =================== ****************** ================== //

var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  // ==========================================================
  // Detect mobile device and add class "is-mobile" to </body>
  // ==========================================================

  // Detect mobile device (Do not remove!!!)
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false;
  var Scrollbar = window.Scrollbar;
  // Add class "is-mobile" to </body>

  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.backToTop();
      Init.dropdown();
      Init.wow();
      Init.header();
      Init.countdownInit(".countdown", "2027/11/01");
      Init.slick();
      Init.filterToggle();
      Init.checkBoxes();
      Init.priceRangeSlider();
      Init.quantityHandle();
      Init.cartSidebar();
      Init.formValidation();
      Init.contactForm();
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },


    backToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300"
        );
      });
    },

    // Header
    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      // check if anything else ofther than the dropdown is clicked
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },

    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          mobile: !0,
          live: !0,
          offset: -280,
        });
        wow.init();
      }
    },

    // Header
      header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".sticky-header__content");
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
      $(window).on("scroll", function () {
        if ($("header").length) {
          var headerScrollPos = 130;
          var stricky = $("header");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("bg-black");
          } else {
            stricky.removeClass("bg-black");
          }
        }
      });

    },

    // Slick Slider
    slick: function () {

      if ($(".product-card-slider").length) {
        $(".product-card-slider").each(function (index) {
          var $slider = $(this);
          var $navSlider = $(".product-card-slider-nav").eq(index);
          $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: $navSlider,
            swipe: false,
            draggable: true,
          });
          $navSlider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            focusOnSelect: true,
            asNavFor: $slider,
            dots: false,
            arrows: false,
            centerMode: false,
            vertical: true,
            verticalSwiping: true,
            autoplay: false,
            draggable: false,
            infinite: true,
          });
        });
      }

      if ($(".product-flavor-slider").length) {
        $(".product-flavor-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 3000,
          dots: false,
          arrows: false,
          fade: true,
          centerPadding: "0",
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".testimonail-slider").length) {
        $(".testimonail-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          arrows: false,
          centerPadding: "0",
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".brand-slider").length) {
        $(".brand-slider").slick({
          autoplay: true,
          autoplaySpeed: 0,
          speed: 10000,
          arrows: false,
          swipe: true,
          slidesToShow: 6,
          cssEase: "linear",
          pauseOnFocus: false,
          pauseOnHover: false,

          responsive: [
            {
              breakpoint: 1699,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 1299,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
      }
      if ($(".product-detail-slider").length) {
        $(".product-detail-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: !1,
          fade: !0,
          asNavFor: ".product-slider-asnav",
        });
      }
      if ($(".product-slider-asnav").length) {
        $(".product-slider-asnav").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: ".product-detail-slider",
          dots: !1,
          arrows: !1,
          centerMode: !1,
          variableWidth: !0,
          focusOnSelect: !0,
        });
      }

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });

      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },

        // Countdown Timer
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<li><h2>%D</h2><p>Days</p></li>\
              <li><h2>%H</h2><p>Hrs</p></li>\
              <li><h2>%M</h2><p>Mins</p></li>\
              <li><h2>%S</h2><p>Secs</p></li>"
            )
          );
        });
      }
    },

    // Filter Toggle Button
    filterToggle: function () {
      if ($(".category-block").length) {
        $(".category-block .title").on("click", function (e) {
          var count = $(this).data("count");
          if (
            $(".category-block.box-" + count + " .content-block").is(":visible")
          ) {
            $(".category-block.box-" + count + " span i").removeClass(
              "fa-chevron-up"
            );
            $(".category-block.box-" + count + " span i").addClass(
              "fa-chevron-down"
            );
            $(".category-block.box-" + count + " .content-block").hide("slow");
          } else {
            $(".category-block.box-" + count + " span i").removeClass(
              "fa-chevron-down"
            );
            $(".category-block.box-" + count + " span i").addClass(
              "fa-chevron-up"
            );
            $(".category-block.box-" + count + " .content-block").show("slow");
          }
        });
      }

      if ($(".toggle-sidebar").length) {
        $(".filter-btn").on("click", function () {
          $(".toggle-sidebar").animate({ left: "0" }, 300);
          $(".sidebar-overlay").fadeIn(300);
          $("body").addClass("no-scroll"); // Disable scroll
        }); 

        $(".sidebar-overlay").on("click", function () {
          $(".toggle-sidebar").animate({ left: "-800px" }, 300);
          $(this).fadeOut(300);
          $("body").removeClass("no-scroll"); // Enable scroll
        });
      }

      if ($(".feature-products").length) {
        $(".tab-link").click(function () {
          var tabID = $(this).attr("data-tab");

          $(this).addClass("active").siblings().removeClass("active");
          $("#tab-" + tabID)
            .addClass("active")
            .siblings()
            .removeClass("active");

          var currentSlider = $("#tab-" + tabID).find(".product-slider");

          if (currentSlider.hasClass("slick-initialized")) {
            currentSlider.slick("setPosition");
          } else {
            currentSlider.slick();
          }
        });
      }
    },

    // Toggle CheckBoxes
    checkBoxes: function () {
      $(".sub-checkboxes").hide();
      $(".arrow-block").click(function () {
        var subCheckboxes = $(this).next(".sub-checkboxes");
        var chevronIcon = $(this).find("i");
        subCheckboxes.slideToggle("fast");
        chevronIcon.toggleClass("fa-chevron-down fa-chevron-up");
      });
      $(".check-block, .sub-check-box").click(function (event) {
        event.stopPropagation();
      });

      if ($(".customer-container").length) {
        $(".signin-button").click(function () {
          $(".sign-form").slideToggle();
        });
      }
    },

    // Form Validation
    priceRangeSlider: function () {
      const priceGap = 1000;

      $(".price-input input").on("input", function () {
        let minPrice = parseInt($(".price-input .input-min").val()),
          maxPrice = parseInt($(".price-input .input-max").val());

        if (
          maxPrice - minPrice >= priceGap &&
          maxPrice <= $(".range-input .range-max").attr("max")
        ) {
          if ($(this).hasClass("input-min")) {
            $(".range-input .range-min").val(minPrice);
            $(".slider .progress").css(
              "left",
              (minPrice / $(".range-input .range-min").attr("max")) * 100 + "%"
            );
          } else {
            $(".range-input .range-max").val(maxPrice);
            $(".slider .progress").css(
              "right",
              100 -
                (maxPrice / $(".range-input .range-max").attr("max")) * 100 +
                "%"
            );
          }
        }
      });

      $(".range-input input").on("input", function () {
        let minVal = parseInt($(".range-input .range-min").val()),
          maxVal = parseInt($(".range-input .range-max").val());

        if (maxVal - minVal < priceGap) {
          if ($(this).hasClass("range-min")) {
            $(".range-input .range-min").val(maxVal - priceGap);
          } else {
            $(".range-input .range-max").val(minVal + priceGap);
          }
        } else {
          $(".price-input .input-min").val(minVal);
          $(".price-input .input-max").val(maxVal);
          $(".slider .progress").css(
            "left",
            (minVal / $(".range-input .range-min").attr("max")) * 100 + "%"
          );
          $(".slider .progress").css(
            "right",
            100 -
              (maxVal / $(".range-input .range-max").attr("max")) * 100 +
              "%"
          );
        }
      });
    },

    // Quantity Controller
    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 1) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },

    // Cart Sidebar
    cartSidebar: function () {
      $(".cart-button").on("click", function () {
        $("#sidebar-cart").css("right", "0");
        $("#sidebar-cart-curtain")
          .fadeIn(0)
          .css("display", "block")
          .animate({ opacity: 1 }, 200); // Smooth fade in the curtain
      });

      $(".close-popup").on("click", function () {
        $("#sidebar-cart").css("right", "-101%");
        $("#sidebar-cart-curtain").animate({ opacity: 0 }, 200, function () {
          $(this).css("display", "none");
        });
      });
    },

    // Form Validation
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".product-form").length) {
        $(".product-form").validate();
      }
      if ($(".blog-form").length) {
        $(".blog-form").validate();
      }
    },

    // Contact Form
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-3'>Mensaje enviado correctamente</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-3'>Hubo un error al enviar el mensaje</h5>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return false;
        }
      });
    },
  };

  Init.i();
})(window, document, jQuery);

(function () {
  "use strict";

  var products = [
    {
      slug: "clasico-negro",
      name: "Alfajor Cl\u00e1sico Negro",
      category: "alfajores",
      price: 2500,
      promo: true,
      image: "assets/media/products/fotos-grid/alfajor-negro.jpeg",
      gallery: [
        "assets/media/products/fotos-grid/alfajor-negro.jpeg",
        "assets/media/products/fotos-grid/alfajor-negro-alt.jpeg",
        "imagenes-comprimidas/alfanegro.jpg"
      ],
      description: "Chocolate intenso, masa artesanal y dulce de leche generoso para una experiencia bien Tentazione."
    },
    {
      slug: "clasico-blanco",
      name: "Alfajor Cl\u00e1sico Blanco",
      category: "alfajores",
      price: 2500,
      promo: false,
      image: "assets/media/products/fotos-grid/alfajor-blanco.jpeg",
      gallery: [
        "assets/media/products/fotos-grid/alfajor-blanco.jpeg",
        "imagenes-comprimidas/ALFaBLANCO.jpg"
      ],
      description: "Ba\u00f1o blanco suave, relleno cremoso y terminaci\u00f3n artesanal."
    },
    {
      slug: "bon-o-bon",
      name: "Alfajor Bon o Bon",
      category: "alfajores",
      price: 2700,
      promo: true,
      image: "assets/media/products/fotos-grid/bon-o-bon.jpeg",
      gallery: [
        "assets/media/products/fotos-grid/bon-o-bon.jpeg",
        "imagenes-comprimidas/bon o bon usar este.jpg",
        "imagenes-comprimidas/BON O BON REZISED.jpg"
      ],
      description: "Relleno inspirado en crema de man\u00ed, chocolate y textura premium."
    },
    {
      slug: "patagonico",
      name: "Alfajor Patag\u00f3nico",
      category: "alfajores",
      price: 2800,
      promo: false,
      image: "imagenes-comprimidas/alfajor patagonico.jpg",
      gallery: [
        "imagenes-comprimidas/alfajor patagonico.jpg",
        "imagenes-comprimidas/patagonico.jpg"
      ],
      description: "Perfil frutal y chocolatoso, pensado para quienes buscan un sabor m\u00e1s intenso."
    },
    {
      slug: "chocomousse",
      name: "Alfajor Chocomousse",
      category: "alfajores",
      price: 2800,
      promo: false,
      image: "imagenes-comprimidas/chocomousse.jpg",
      gallery: [
        "imagenes-comprimidas/chocomousse.jpg",
        "imagenes-comprimidas/CHOCOMOUSSEIA.png"
      ],
      description: "Relleno aireado de chocolate y cobertura delicada."
    },
    {
      slug: "nuez",
      name: "Alfajor de Nuez",
      category: "alfajores",
      price: 2900,
      promo: false,
      image: "imagenes-comprimidas/alfajor nuez.jpg",
      gallery: [
        "imagenes-comprimidas/alfajor nuez.jpg",
        "imagenes-comprimidas/nuez_resized.jpg"
      ],
      description: "Nuez, dulce de leche y chocolate en una receta artesanal de sabor profundo."
    },
    {
      slug: "membrillo",
      name: "Alfajor de Membrillo",
      category: "alfajores",
      price: 2600,
      promo: true,
      image: "imagenes-comprimidas/edicion membrillo.jpg",
      gallery: [
        "imagenes-comprimidas/edicion membrillo.jpg",
        "imagenes-comprimidas/frutos rojos.jpg"
      ],
      description: "Edici\u00f3n frutal con membrillo y cobertura equilibrada."
    },
    {
      slug: "lemon-pie",
      name: "Lemon Pie",
      category: "dulces",
      price: 2800,
      promo: false,
      image: "assets/media/products/fotos-grid/lemon-pie.jpeg",
      gallery: [
        "assets/media/products/fotos-grid/lemon-pie.jpeg"
      ],
      description: "Dulce artesanal con perfil c\u00edtrico, cremoso y fresco."
    },
    {
      slug: "alfa-cookies",
      name: "Alfa Cookies",
      category: "dulces",
      price: 3000,
      promo: false,
      image: "assets/media/products/fotos-grid/alfa-cookies.jpeg",
      gallery: [
        "assets/media/products/fotos-grid/alfa-cookies.jpeg"
      ],
      description: "Cookie artesanal con identidad alfajorera y textura suave."
    },
    {
      slug: "media-docena-premium",
      name: "Media Docena Premium",
      category: "cajas",
      price: 13500,
      promo: true,
      image: "assets/media/products/fotos-grid/pila-alfajores.jpeg",
      gallery: [
        "assets/media/products/fotos-grid/pila-alfajores.jpeg",
        "imagenes-comprimidas/surtidos.png"
      ],
      description: "Selecci\u00f3n gourmet para regalar o disfrutar distintas variedades Tentazione."
    },
    {
      slug: "frutos-rojos",
      name: "Alfajor Frutos Rojos",
      category: "alfajores",
      price: 2850,
      promo: true,
      image: "imagenes-comprimidas/frutos rojos.jpg",
      gallery: ["imagenes-comprimidas/frutos rojos.jpg", "imagenes-comprimidas/frutos rojos2.jpg"],
      description: "Relleno frutal intenso con frutos rojos y cobertura de chocolate."
    },
    {
      slug: "dulce-de-leche",
      name: "Alfajor Dulce de Leche",
      category: "alfajores",
      price: 2550,
      promo: false,
      image: "imagenes-comprimidas/dulce de leche.jpg",
      gallery: ["imagenes-comprimidas/dulce de leche.jpg", "assets/media/products/fotos-grid/alfajor-negro-alt.jpeg"],
      description: "Dulce de leche seleccionado, masa suave y terminaci\u00f3n artesanal."
    },
    {
      slug: "mani",
      name: "Alfajor de Man\u00ed",
      category: "alfajores",
      price: 2700,
      promo: false,
      image: "imagenes-comprimidas/mani.jpg",
      gallery: ["imagenes-comprimidas/mani.jpg", "imagenes-comprimidas/bon o bon usar este.jpg"],
      description: "Man\u00ed tostado, chocolate y relleno cremoso de perfil intenso."
    },
    {
      slug: "blanco-negro",
      name: "Alfajor Blanco y Negro",
      category: "alfajores",
      price: 2750,
      promo: true,
      image: "imagenes-comprimidas/alfa blanconegro.png",
      gallery: ["imagenes-comprimidas/alfa blanconegro.png", "imagenes-comprimidas/BLANCONEGROSTOCK.png"],
      description: "Doble identidad de chocolate blanco y negro en una pieza gourmet."
    },
    {
      slug: "surtidos",
      name: "Caja Surtida Tentazione",
      category: "cajas",
      price: 24500,
      promo: true,
      image: "imagenes-comprimidas/surtidos.png",
      gallery: ["imagenes-comprimidas/surtidos.png", "assets/media/products/fotos-grid/pila-alfajores.jpeg"],
      description: "Caja variada con sabores seleccionados para regalos y pedidos especiales."
    },
    {
      slug: "budin-chocolate",
      name: "Bud\u00edn de Chocolate",
      category: "budines",
      price: 6200,
      promo: false,
      image: "imagenes-comprimidas/FONDO CHOCOLATE.jpg",
      gallery: ["imagenes-comprimidas/FONDO CHOCOLATE.jpg", "imagenes-comprimidas/chocomousse.jpg"],
      description: "Bud\u00edn artesanal de chocolate, h\u00famedo y pensado para compartir."
    },
    {
      slug: "budin-nuez",
      name: "Bud\u00edn de Nuez",
      category: "budines",
      price: 6800,
      promo: false,
      image: "imagenes-comprimidas/edicioo nuez.jpg",
      gallery: ["imagenes-comprimidas/edicioo nuez.jpg", "imagenes-comprimidas/nuez_resized.jpg"],
      description: "Bud\u00edn artesanal con nuez y miga tierna."
    },
    {
      slug: "donas-chocolate",
      name: "Donas de Chocolate",
      category: "dulces",
      price: 4200,
      promo: true,
      image: "assets/media/products/donut-image.png",
      gallery: ["assets/media/products/donut-image.png", "assets/media/products/fotos-grid/alfa-cookies.jpeg"],
      description: "Donas dulces con cobertura de chocolate para pedidos especiales."
    },
    {
      slug: "pack-gourmet",
      name: "Pack Gourmet",
      category: "cajas",
      price: 32000,
      promo: false,
      image: "imagenes-comprimidas/stock.jpg",
      gallery: ["imagenes-comprimidas/stock.jpg", "imagenes-comprimidas/STOK.jpg"],
      description: "Selecci\u00f3n premium para eventos, regalos corporativos y revendedores."
    },
    {
      slug: "edicion-blanco-negro",
      name: "Edici\u00f3n Blanco Negro",
      category: "alfajores",
      price: 2950,
      promo: false,
      image: "imagenes-comprimidas/edicion blanco negro.jpg.jpg",
      gallery: ["imagenes-comprimidas/edicion blanco negro.jpg.jpg", "imagenes-comprimidas/ALFABLANK FOTO MAS DE LEJOS.jpg"],
      description: "Edici\u00f3n especial con contraste de chocolates y relleno generoso."
    }
  ];

  var whatsappNumber = "5493834640224";
  var cartKey = "tentazione-cart";
  var wishlistKey = "tentazione-wishlist";

  function money(value) {
    return "$" + Number(value || 0).toLocaleString("es-AR");
  }

  function productBySlug(slug) {
    return products.find(function (product) {
      return product.slug === slug;
    }) || products[0];
  }

  function readStore(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch (error) {
      return [];
    }
  }

  function writeStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function openCartSidebar() {
    var sidebar = document.getElementById("sidebar-cart");
    var curtain = document.getElementById("sidebar-cart-curtain");
    if (sidebar) sidebar.style.right = "0";
    if (curtain) {
      curtain.style.display = "block";
      curtain.style.opacity = "1";
    }
  }

  function flashAction(element, text) {
    if (!element || !text || !element.textContent.trim()) return;
    var original = element.getAttribute("data-original-label") || element.textContent;
    element.setAttribute("data-original-label", original);
    element.textContent = text;
    window.setTimeout(function () {
      element.textContent = original;
    }, 950);
  }

  function cartItems() {
    return readStore(cartKey).map(function (item) {
      var product = productBySlug(item.slug);
      return Object.assign({}, product, { quantity: item.quantity || 1 });
    });
  }

  function cartTotal(items) {
    return items.reduce(function (sum, item) {
      return sum + item.price * item.quantity;
    }, 0);
  }

  function whatsappUrl(items) {
    var lines = (items && items.length ? items : [products[0]]).map(function (item) {
      return "- " + item.name + " x" + (item.quantity || 1);
    });
    return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent("Hola Tentazione, quiero hacer este pedido:\n" + lines.join("\n"));
  }

  function addToCart(slug) {
    var items = readStore(cartKey);
    var found = items.find(function (item) {
      return item.slug === slug;
    });
    if (found) {
      found.quantity += 1;
    } else {
      items.push({ slug: slug, quantity: 1 });
    }
    writeStore(cartKey, items);
    renderCartSurfaces();
    updateCartCount();
  }

  function setCartQuantity(slug, quantity) {
    var nextQuantity = Math.max(1, Number(quantity) || 1);
    var items = readStore(cartKey).map(function (item) {
      if (item.slug === slug) return { slug: item.slug, quantity: nextQuantity };
      return item;
    });
    writeStore(cartKey, items);
    renderCartSurfaces();
    updateCartCount();
  }

  function removeFromCart(slug) {
    writeStore(cartKey, readStore(cartKey).filter(function (item) {
      return item.slug !== slug;
    }));
    renderCartSurfaces();
    updateCartCount();
  }

  function toggleWishlist(slug) {
    var items = readStore(wishlistKey);
    if (items.indexOf(slug) >= 0) {
      items = items.filter(function (item) { return item !== slug; });
    } else {
      items.push(slug);
    }
    writeStore(wishlistKey, items);
    renderWishlistPage();
    renderWishlistState();
    updateWishlistCount();
  }

  function cardMarkup(product, delay) {
    return [
      '<div class="col tentazione-product-col" data-wow-delay="' + delay + 'ms">',
      '<div class="product-block tentazione-product-card" data-price="' + product.price + '" data-category="' + product.category + '" data-promo="' + product.promo + '">',
      '<div class="detail-img mb-16">',
      '<a class="detail-img-block" href="product-detail.html?product=' + product.slug + '">',
      '<img src="' + product.image + '" alt="' + product.name + '">',
      '</a>',
      product.promo ? '<span class="sale-label subtitle fw-500">Promo</span>' : '',
      '<ul class="side-icons list-unstyled">',
      '<li><a href="#" class="js-wishlist" data-product="' + product.slug + '" aria-label="Agregar a wishlist"><i class="fa-light fa-heart"></i></a></li>',
      '<li><a href="#" class="btn js-quick-view" data-product="' + product.slug + '" data-bs-toggle="modal" data-bs-target="#productQuickView" aria-label="Vista rapida"><i class="fa-regular fa-eye"></i></a></li>',
      '<li><a href="#" class="cart-button js-add-cart" data-product="' + product.slug + '" aria-label="Agregar al carrito"><i class="fa-light fa-cart-shopping"></i></a></li>',
      '</ul>',
      '</div>',
      '<a href="product-detail.html?product=' + product.slug + '" class="h6 fw-600 mb-8 d-block">' + product.name + '</a>',
      '<p class="subtitle dark-gray mb-12">' + product.description + '</p>',
      '<div class="d-flex align-items-center justify-content-between gap-12">',
      '<p class="h6 color-primary fw-600">' + money(product.price) + '</p>',
      '<a href="#" class="cus-btn small-btn js-add-cart" data-product="' + product.slug + '">Agregar</a>',
      '</div>',
      '</div>',
      '</div>'
    ].join("");
  }

  function setupSortDropdown() {
    var dropdown = document.getElementById("dropdown8");
    if (!dropdown) return;
    var selected = dropdown.querySelector(".selected-display");
    var list = dropdown.querySelector(".topbar-dropdown");
    if (selected) selected.textContent = "Menor precio";
    if (list) {
      list.innerHTML = [
        '<li class="item dark-black" data-sort="price-asc">Menor precio</li>',
        '<li class="item dark-black" data-sort="price-desc">Mayor precio</li>',
        '<li class="item dark-black" data-sort="promo">Promociones</li>'
      ].join("");
    }
  }

  function categoryMarkup() {
    return [
      '<label class="tentazione-filter-chip"><input type="checkbox" data-category="alfajores" checked> Alfajores</label>',
      '<label class="tentazione-filter-chip"><input type="checkbox" data-category="dulces" checked> Dulces artesanales</label>',
      '<label class="tentazione-filter-chip"><input type="checkbox" data-category="budines" checked> Budines</label>',
      '<label class="tentazione-filter-chip"><input type="checkbox" data-category="cajas" checked> Cajas premium</label>'
    ].join("");
  }

  function tagMarkup() {
    return ["Alfajores", "Chocolate", "Frutos rojos", "Dulce de leche", "Blanco", "Gourmet", "Promociones", "Budines"].map(function (tag) {
      return '<button type="button" class="tag tentazione-tag-filter" data-tag="' + tag.toLowerCase() + '"><p>' + tag + '</p></button>';
    }).join("");
  }

  function cleanupShopSidebars() {
    document.querySelectorAll(".shop-section .sidebar, .toggle-sidebar").forEach(function (sidebar) {
      sidebar.querySelectorAll(".search-bar-container").forEach(function (form) {
        form.remove();
      });
      sidebar.querySelectorAll(".box-1").forEach(function (block) {
        var separator = block.previousElementSibling;
        if (separator && separator.classList.contains("hr-line")) separator.remove();
        block.remove();
      });
      var availabilityTitle = sidebar.querySelector(".box-2 h6");
      if (availabilityTitle) availabilityTitle.textContent = "Disponibilidad";
      var priceTitle = sidebar.querySelector(".box-5 h6");
      if (priceTitle) priceTitle.textContent = "Filtrar por precio";
      sidebar.querySelectorAll("label").forEach(function (label) {
        var text = label.textContent.trim();
        if (text === "In Stock") label.textContent = "Disponible";
        if (text === "Out Stock") label.textContent = "Agotado";
      });
      sidebar.querySelectorAll(".field .medium-black").forEach(function (label) {
        var text = label.textContent.trim();
        if (text === "From") label.textContent = "Desde";
        if (text === "To") label.textContent = "Hasta";
      });
      var tagsBlock = sidebar.querySelector(".box-4");
      if (tagsBlock) {
        var tagsTitle = tagsBlock.querySelector("h6");
        var tagsWrapper = tagsBlock.querySelector(".tags-wrapper");
        if (tagsTitle) tagsTitle.textContent = "Etiquetas";
        if (tagsWrapper) tagsWrapper.innerHTML = tagMarkup();
      }
      if (!sidebar.querySelector(".tentazione-promo-filter")) {
        var priceBlock = sidebar.querySelector(".box-5");
        if (priceBlock) {
          priceBlock.insertAdjacentHTML("afterend", '<div class="hr-line mb-24"></div><div class="category-block tentazione-promo-filter mb-32"><div class="title"><h6 class="fw-600 font-primary medium-black">Promociones</h6></div><div class="content-block mt-16"><label class="tentazione-filter-chip"><input type="checkbox" data-promo-only> Ver solo promociones</label></div></div>');
        }
      }
    });
  }

  function renderShop() {
    var page = window.location.pathname.split("/").pop();
    if (page !== "shop-grid.html" && page !== "shop-grid-sidebar.html") return;

    document.querySelectorAll(".shop-section .search-bar-container").forEach(function (form) {
      form.classList.add("tentazione-search-disabled");
    });

    cleanupShopSidebars();
    setupSortDropdown();
    document.querySelectorAll(".input-max, .range-max").forEach(function (input) {
      input.max = "15000";
      if (Number(input.value) < 15000) input.value = "15000";
    });
    document.querySelectorAll(".range-min").forEach(function (input) {
      input.max = "15000";
    });

    var grid = document.querySelector(".shop-section .row-cols-xl-5, .shop-section .row-cols-xl-3");
    if (!grid) return;

    var sort = "price-asc";
    var currentPage = 1;
    var enabledCategories = ["alfajores", "dulces", "budines", "cajas"];
    var activeTag = "";
    var promoOnly = false;
    var categoryHost = document.querySelector(".shop-section .sidebar .box-1 .content-block, .shop-sidebar .filter-list, .shop-sidebar .category-list");
    if (categoryHost) {
      categoryHost.innerHTML = categoryMarkup();
      categoryHost.classList.add("tentazione-filter-list");
    }

    function priceBounds() {
      var numbers = Array.from(document.querySelectorAll(".price-input input, input.input-min, input.input-max"))
        .map(function (input) { return Number(input.value); })
        .filter(Boolean);
      if (numbers.length >= 2) return { min: Math.min.apply(Math, numbers), max: Math.max.apply(Math, numbers) };
      return { min: 0, max: 999999 };
    }

    function perPage() {
      if (window.innerWidth <= 575) return 4;
      if (window.innerWidth <= 991) return 6;
      return 8;
    }

    function matchesTag(product) {
      if (!activeTag) return true;
      var haystack = [product.name, product.category, product.description, product.promo ? "promociones" : ""].join(" ").toLowerCase();
      return haystack.indexOf(activeTag) >= 0;
    }

    function renderPagination(totalPages) {
      var host = document.getElementById("border-pagination");
      if (!host) return;
      if (totalPages <= 1) {
        host.innerHTML = "";
        return;
      }
      var html = "";
      if (currentPage > 1) {
        html += '<li><a href="#" data-page-action="prev" aria-label="Pagina anterior">&lt;</a></li>';
      }
      for (var pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
        html += '<li><a href="#" data-page="' + pageNumber + '" class="' + (pageNumber === currentPage ? "active" : "") + '">' + String(pageNumber).padStart(2, "0") + '</a></li>';
      }
      html += '<li><a href="#" data-page-action="next" class="' + (currentPage === totalPages ? "is-disabled" : "") + '" aria-label="Pagina siguiente"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M0.813117 0.266265C0.458148 0.621235 0.458087 1.19687 0.813178 1.5519L9.26124 9.99978L0.813117 18.4481C0.458148 18.8031 0.458087 19.3787 0.813178 19.7337C1.16821 20.0888 1.74378 20.0888 2.09881 19.7337L11.1897 10.6426C11.3602 10.4721 11.456 10.2409 11.456 9.99978C11.456 9.75869 11.3601 9.52742 11.1897 9.35699L2.09875 0.266326C1.74378 -0.088765 1.16815 -0.0887653 0.813117 0.266265Z" fill="white"></path></svg></a></li>';
      host.innerHTML = html;
    }

    function draw() {
      var bounds = priceBounds();
      var list = products.filter(function (product) {
        return enabledCategories.indexOf(product.category) >= 0 && product.price >= bounds.min && product.price <= bounds.max && (!promoOnly || product.promo) && matchesTag(product);
      });
      if (sort === "price-desc") {
        list.sort(function (a, b) { return b.price - a.price; });
      } else if (sort === "promo") {
        list.sort(function (a, b) { return Number(b.promo) - Number(a.promo) || a.price - b.price; });
      } else {
        list.sort(function (a, b) { return a.price - b.price; });
      }
      var totalPages = Math.max(1, Math.ceil(list.length / perPage()));
      if (currentPage > totalPages) currentPage = 1;
      var visible = list.slice((currentPage - 1) * perPage(), currentPage * perPage());
      grid.innerHTML = visible.map(function (product, index) {
        return cardMarkup(product, 120 + index * 40);
      }).join("") || '<div class="col-12"><p class="dark-gray">No hay productos para los filtros seleccionados.</p></div>';
      renderPagination(totalPages);
      renderWishlistState();
    }

    document.addEventListener("click", function (event) {
      var sortItem = event.target.closest("#dropdown8 .item[data-sort]");
      if (!sortItem) return;
      sort = sortItem.getAttribute("data-sort");
      currentPage = 1;
      var selected = document.querySelector("#dropdown8 .selected-display");
      if (selected) selected.textContent = sortItem.textContent;
      draw();
    });

    document.addEventListener("click", function (event) {
      var pageLink = event.target.closest("#border-pagination a[data-page], #border-pagination a[data-page-action]");
      if (!pageLink) return;
      event.preventDefault();
      var total = document.querySelectorAll("#border-pagination a[data-page]").length || 1;
      if (pageLink.dataset.page) {
        currentPage = Number(pageLink.dataset.page);
      } else if (pageLink.dataset.pageAction === "next" && currentPage < total) {
        currentPage += 1;
      } else if (pageLink.dataset.pageAction === "prev" && currentPage > 1) {
        currentPage -= 1;
      }
      draw();
    });

    document.addEventListener("click", function (event) {
      var tag = event.target.closest(".tentazione-tag-filter[data-tag]");
      if (!tag) return;
      event.preventDefault();
      activeTag = activeTag === tag.dataset.tag ? "" : tag.dataset.tag;
      document.querySelectorAll(".tentazione-tag-filter").forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.tag === activeTag);
      });
      currentPage = 1;
      draw();
    });

    document.addEventListener("change", function (event) {
      var input = event.target.closest(".tentazione-filter-chip input");
      if (!input) return;
      enabledCategories = Array.from(document.querySelectorAll(".tentazione-filter-chip input:checked")).map(function (checked) {
        return checked.getAttribute("data-category");
      }).filter(Boolean);
      promoOnly = !!document.querySelector("[data-promo-only]:checked");
      currentPage = 1;
      draw();
    });

    document.querySelectorAll(".price-input input, input.input-min, input.input-max, .range-input input").forEach(function (input) {
      input.addEventListener("input", draw);
      input.addEventListener("change", function () {
        currentPage = 1;
        draw();
      });
    });

    window.addEventListener("resize", function () {
      currentPage = 1;
      draw();
    });

    draw();
  }

  function renderProductDetail() {
    if (window.location.pathname.split("/").pop() !== "product-detail.html") return;
    var slug = new URLSearchParams(window.location.search).get("product") || "clasico-negro";
    var product = productBySlug(slug);
    document.title = product.name + " | Tentazione Alfajores";

    var title = document.querySelector(".product-text-container h3, .product-text-container h4");
    var price = document.querySelector(".product-text-container .h5, .product-text-container h5, .product-text-container h6");
    var desc = document.querySelector(".product-text-container p.dark-gray, .product-text-container .desc, .product-text-container p");
    if (title) title.textContent = product.name;
    if (price) price.textContent = money(product.price);
    if (desc) desc.textContent = product.description;

    document.querySelectorAll(".product-detail-slider img, .product-slider-asnav img").forEach(function (img, index) {
      img.src = product.gallery[index % product.gallery.length];
      img.alt = product.name;
    });

    document.querySelectorAll(".product-text-container .cart-button, .product-text-container .cus-btn").forEach(function (button) {
      button.setAttribute("data-product", product.slug);
      button.classList.add("js-add-cart");
    });

    var wishlist = document.querySelector(".product-text-container .fa-heart");
    if (wishlist && wishlist.closest("a")) {
      wishlist.closest("a").setAttribute("data-product", product.slug);
      wishlist.closest("a").classList.add("js-wishlist");
    }
  }

  function renderQuickView(slug) {
    var product = productBySlug(slug);
    var modal = document.getElementById("productQuickView");
    if (!modal) return;
    var imageBox = modal.querySelector(".quick-image-box");
    var textBox = modal.querySelector(".product-text-container");
    if (imageBox) {
      imageBox.innerHTML = '<img src="' + product.image + '" alt="' + product.name + '">';
    }
    if (textBox) {
      textBox.innerHTML = [
        '<div class="close-content text-end"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div>',
        '<h4 class="medium-black mb-16">' + product.name + '</h4>',
        '<div class="d-flex align-items-center flex-wrap gap-8 mb-16"><h6 class="color-star">★★★★★</h6><p class="dark-gray subtitle">(Reseñas de clientes)</p></div>',
        '<div class="d-flex align-items-center justify-content-between mb-24"><h5 class="fw-600 color-primary">' + money(product.price) + '</h5></div>',
        '<p class="mb-24">' + product.description + '</p>',
        '<p class="subtitle color-primary mb-24">Disponible para pedidos</p>',
        '<div class="d-flex align-items-center gap-12 mb-24"><p class="fw-600 medium-black">Subtotal:</p><p>' + money(product.price) + '</p></div>',
        '<div class="row mb-24 row-gap-2"><div class="col-md-6"><a href="#" class="cus-btn w-100 text-center js-add-cart" data-product="' + product.slug + '">Agregar al carrito</a></div><div class="col-md-6"><a href="' + whatsappUrl([Object.assign({}, product, { quantity: 1 })]) + '" class="cus-btn w-100 text-center btn-sec">Pedir por WhatsApp</a></div></div>',
        '<div class="d-sm-flex d-none align-items-center gap-12 mb-16"><p class="fw-600 medium-black">SKU:</p><p>' + product.slug.toUpperCase() + '</p></div>',
        '<div class="d-sm-flex d-none align-items-center gap-12 mb-16"><p class="fw-600 medium-black">Categoría:</p><p>' + (product.category === "cajas" ? "Cajas premium" : product.category.charAt(0).toUpperCase() + product.category.slice(1)) + '</p></div>',
        '<div class="d-sm-flex d-none align-items-center gap-12 mb-16"><p class="fw-600 medium-black">Envíos:</p><p>Coordinamos entrega y pedidos por WhatsApp.</p></div>'
      ].join("");
    }
  }

  function renderSidebarCart() {
    var sidebar = document.getElementById("sidebar-cart");
    if (!sidebar) return;
    var items = cartItems();
    var list = sidebar.querySelector(".product-list");
    var title = sidebar.querySelector(".title-cart-block h6");
    var totalRow = sidebar.querySelector(".price-total");
    if (title) title.textContent = "Carrito (" + items.length + ")";
    if (list) {
      list.innerHTML = items.length ? items.map(function (item) {
        return '<li class="product-item mb-24"><div class="d-flex align-items-center gap-12"><div class="item-image"><img src="' + item.image + '" alt="' + item.name + '"></div><div class="prod-title"><a href="product-detail.html?product=' + item.slug + '" class="medium-black fw-600 mb-8">' + item.name + '</a><p class="subtitle mb-4p">' + money(item.price) + ' c/u</p><p class="subtitle">' + money(item.price * item.quantity) + '</p></div></div><div class="text-end"><a href="#" class="cancel mb-12 js-remove-cart" data-product="' + item.slug + '"><img src="assets/media/icons/cancel.png" alt=""></a><div class="quantity quantity-wrap tentazione-qty-control"><button class="decrement js-cart-decrease" type="button" data-product="' + item.slug + '">-</button><input type="text" value="' + item.quantity + '" class="number js-cart-qty" data-product="' + item.slug + '" inputmode="numeric"><button class="increment js-cart-increase" type="button" data-product="' + item.slug + '">+</button></div></div></li><li class="hr-line mb-24"></li>';
      }).join("") : '<li class="subtitle dark-gray">Tu carrito est\u00e1 listo para sumar Tentazione.</li>';
    }
    if (totalRow) {
      totalRow.innerHTML = '<span class="h6 medium-black">SUBTOTAL</span><span class="h6 medium-black">' + money(cartTotal(items)) + '</span>';
    }
    sidebar.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
      link.href = whatsappUrl(items);
    });
  }

  function renderCartPage() {
    if (window.location.pathname.split("/").pop() !== "cart.html") return;
    var host = document.querySelector(".cart-section .container-fluid, section.cart .container-fluid, main .container-fluid");
    if (!host) return;
    var items = cartItems();
    if (!items.length) {
      host.innerHTML = '<div class="tentazione-ecommerce-panel"><h4 class="mb-16">Carrito Tentazione</h4><p class="dark-gray mb-24">Tu carrito est\u00e1 vac\u00edo.</p><a class="cus-btn" href="shop-grid.html">Ver productos</a></div>';
      return;
    }
    host.innerHTML = '<div class="tentazione-ecommerce-panel"><h4 class="mb-24">Carrito Tentazione</h4><div class="tentazione-cart-table">' + items.map(function (item) {
      return '<div class="tentazione-cart-row"><img src="' + item.image + '" alt="' + item.name + '"><div><a class="h6 fw-600" href="product-detail.html?product=' + item.slug + '">' + item.name + '</a><p class="subtitle dark-gray mb-0">' + item.description + '</p></div><div class="quantity quantity-wrap tentazione-qty-control"><button class="decrement js-cart-decrease" type="button" data-product="' + item.slug + '">-</button><input type="text" value="' + item.quantity + '" class="number js-cart-qty" data-product="' + item.slug + '" inputmode="numeric"><button class="increment js-cart-increase" type="button" data-product="' + item.slug + '">+</button></div><strong>' + money(item.price * item.quantity) + '</strong><button class="tentazione-remove-btn js-remove-cart" type="button" data-product="' + item.slug + '">Eliminar</button></div>';
    }).join("") + '</div><div class="tentazione-cart-total"><span>Subtotal</span><strong>' + money(cartTotal(items)) + '</strong></div><div class="d-flex flex-wrap gap-12 justify-content-end"><a class="cus-btn btn-sec" href="shop-grid.html">Seguir comprando</a><a class="cus-btn" href="' + whatsappUrl(items) + '">Pedir por WhatsApp</a></div></div>';
  }

  function renderWishlistPage() {
    if (window.location.pathname.split("/").pop() !== "wishlist.html") return;
    var host = document.querySelector(".wishlist-section .container-fluid, section.cart .container-fluid, main .container-fluid");
    if (!host) return;
    var slugs = readStore(wishlistKey);
    if (!slugs.length) {
      host.innerHTML = '<div class="tentazione-ecommerce-panel"><h4 class="mb-16">Wishlist Tentazione</h4><p class="dark-gray mb-24">Todav\u00eda no guardaste productos.</p><a class="cus-btn" href="shop-grid.html">Ver productos</a></div>';
      return;
    }
    var items = slugs.map(productBySlug);
    host.innerHTML = '<div class="tentazione-ecommerce-panel"><h4 class="mb-24">Wishlist Tentazione</h4><div class="row row-gap-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">' + items.map(function (product, index) {
      return cardMarkup(product, 120 + index * 40);
    }).join("") + '</div></div>';
  }

  function renderCheckoutPage() {
    if (window.location.pathname.split("/").pop() !== "checkout.html") return;
    var items = cartItems();
    var summary = document.querySelector(".summary-container");
    if (summary) {
      if (!items.length) {
        summary.innerHTML = '<p class="light-gray mb-16">No hay productos en el carrito.</p><a href="shop-grid.html" class="cus-btn active-btn">Ver productos</a>';
        return;
      }
      summary.innerHTML = [
        items.map(function (item) {
          return '<div class="item-container mb-16"><div class="left-box d-flex align-items-center gap-16"><div class="icon-box"><img src="' + item.image + '" alt="' + item.name + '"></div><a href="product-detail.html?product=' + item.slug + '" class="h6 medium-black">' + item.name + ' x ' + item.quantity + '</a></div><div class="right-box"><p class="light-gray">' + money(item.price * item.quantity) + '</p></div></div><div class="hr-line mb-16"></div>';
        }).join(""),
        '<div class="input-block mb-32"><input type="text" name="cp-Code" class="form-control" id="codeCp" placeholder="Codigo de promo"><button type="button" class="cus-btn">Aplicar</button></div>',
        '<div class="d-flex align-items-center justify-content-between mb-16"><h6 class="medium-black font-primary">Subtotal</h6><h6 class="font-primary light-gray">' + money(cartTotal(items)) + '</h6></div>',
        '<div class="hr-line mb-16"></div><div class="d-flex align-items-center justify-content-between mb-16"><h6 class="medium-black font-primary">Envio</h6><h6 class="font-primary light-gray">A coordinar</h6></div>',
        '<div class="hr-line mb-16"></div><div class="d-flex align-items-center justify-content-between mb-16"><h5 class="color-primary">TOTAL</h5><h5 class="color-primary">' + money(cartTotal(items)) + '</h5></div>',
        '<div class="hr-line mb-16"></div><p class="light-gray mb-16">La compra se confirma por WhatsApp con atencion personalizada, disponibilidad real y datos de envio.</p>',
        '<a href="' + whatsappUrl(items) + '" class="cus-btn active-btn">Pedir por WhatsApp</a>'
      ].join("");
    }
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
      link.href = whatsappUrl(items);
    });
    document.querySelectorAll(".checkout .product, .checkout .order-product").forEach(function (node) {
      node.remove();
    });
  }

  function renderWishlistState() {
    var slugs = readStore(wishlistKey);
    document.querySelectorAll(".js-wishlist[data-product]").forEach(function (button) {
      button.classList.toggle("is-active", slugs.indexOf(button.getAttribute("data-product")) >= 0);
      button.setAttribute("aria-pressed", slugs.indexOf(button.getAttribute("data-product")) >= 0 ? "true" : "false");
    });
  }

  function updateCartCount() {
    var count = readStore(cartKey).reduce(function (sum, item) {
      return sum + (item.quantity || 1);
    }, 0);
    document.querySelectorAll("header .cart-button").forEach(function (button) {
      var badge = button.querySelector(".tentazione-count-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "tentazione-count-badge";
        button.appendChild(badge);
      }
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  function updateWishlistCount() {
    var count = readStore(wishlistKey).length;
    document.querySelectorAll('header a[href*="wishlist"]').forEach(function (button) {
      var badge = button.querySelector(".tentazione-count-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "tentazione-count-badge";
        button.appendChild(badge);
      }
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  function renderCartSurfaces() {
    renderSidebarCart();
    renderCartPage();
    renderCheckoutPage();
  }

  function renderFooterLogo() {
    document.querySelectorAll("footer .tentazione-header-logo").forEach(function (logo) {
      logo.classList.add("tentazione-footer-logo");
      logo.innerHTML = '<img src="assets/media/favicon.png" alt="Tentazione Alfajores" loading="lazy">';
    });
  }

  function setupInteractions() {
    document.addEventListener("click", function (event) {
      var add = event.target.closest(".js-add-cart[data-product]");
      if (add) {
        event.preventDefault();
        addToCart(add.getAttribute("data-product"));
        openCartSidebar();
        flashAction(add, "Agregado");
      }

      var wish = event.target.closest(".js-wishlist[data-product]");
      if (wish) {
        event.preventDefault();
        toggleWishlist(wish.getAttribute("data-product"));
        flashAction(wish, "Guardado");
      }

      var quick = event.target.closest(".js-quick-view[data-product]");
      if (quick) {
        renderQuickView(quick.getAttribute("data-product"));
      }

      var remove = event.target.closest(".js-remove-cart[data-product]");
      if (remove) {
        event.preventDefault();
        removeFromCart(remove.getAttribute("data-product"));
      }

      var increase = event.target.closest(".js-cart-increase[data-product]");
      if (increase) {
        event.preventDefault();
        var increaseSlug = increase.getAttribute("data-product");
        var increaseItem = readStore(cartKey).find(function (item) { return item.slug === increaseSlug; });
        setCartQuantity(increaseSlug, (increaseItem ? increaseItem.quantity : 1) + 1);
      }

      var decrease = event.target.closest(".js-cart-decrease[data-product]");
      if (decrease) {
        event.preventDefault();
        var decreaseSlug = decrease.getAttribute("data-product");
        var decreaseItem = readStore(cartKey).find(function (item) { return item.slug === decreaseSlug; });
        if (decreaseItem && decreaseItem.quantity > 1) {
          setCartQuantity(decreaseSlug, decreaseItem.quantity - 1);
        } else {
          removeFromCart(decreaseSlug);
        }
      }
    });

    document.addEventListener("change", function (event) {
      var input = event.target.closest(".js-cart-qty[data-product]");
      if (!input) return;
      setCartQuantity(input.getAttribute("data-product"), input.value);
    });
  }

  function initMarquee() {
    document.querySelectorAll(".tentazione-offer-marquee__track").forEach(function (track) {
      var segments = track.querySelectorAll(".tentazione-offer-marquee__segment");
      if (segments.length === 1) {
        var clone = segments[0].cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      }
      while (track.querySelectorAll(".tentazione-offer-marquee__segment").length < 4) {
        var next = track.querySelector(".tentazione-offer-marquee__segment").cloneNode(true);
        next.setAttribute("aria-hidden", "true");
        track.appendChild(next);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMarquee();
    setupInteractions();
    renderFooterLogo();
    renderShop();
    renderProductDetail();
    renderQuickView("clasico-negro");
    renderCartSurfaces();
    renderWishlistPage();
    renderWishlistState();
    updateCartCount();
    updateWishlistCount();
  });
})();
