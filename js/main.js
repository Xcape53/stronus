/**
 *	Isti - Digital Agency HTML Template
 *	Author: CodeeFly
 *	Author URL: http://themeforest.net/user/codeefly
 *	Copyright © by codeefly. All Rights Reserved.
 **/

(function ($) {
  "use strict";
  console.clear();

  let device_width = window.innerWidth;
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false;

  var isti = {
    /* Init */
    init() {
      isti.imgToSvg(),
        isti.slider(),
        isti.customMouse(),
        isti.lenisScrollAnimation(),
        isti.stickyNavbar(),
        isti.counter(),
        isti.textAnimation(),
        isti.venobox(),
        isti.mobile_menu_icon(),
        isti.parallax(),
        isti.menu2(),
        isti.progressbar();
    },
    imgToSvg() {
      document.querySelectorAll("img.svg").forEach((el) => {
        const imgID = el.getAttribute("id");
        const imgClass = el.getAttribute("class");
        const imgURL = el.getAttribute("src");
        fetch(imgURL)
          .then((data) => data.text())
          .then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/html");
            let svg = xmlDoc.querySelector("svg");
            if (typeof imgID !== "undefined") {
              svg.setAttribute("id", imgID);
            }

            if (typeof imgClass !== "undefined") {
              svg.setAttribute("class", imgClass + " replaced-svg");
            }

            svg.removeAttribute("xmlns:a");
            if (el.parentNode) {
              el.parentNode.replaceChild(svg, el);
            }
          });
      });
    },
    progressbar() {
      var progressbar = $(".tf__team_skills_bar_single .barfiller");

      $(window).on("scroll", function () {
        let scroll = $(window).scrollTop();

        $(".tf__team_skills_bar_single .barfiller").each(function () {
          let value = $(this).children(".fill").attr("data-percentage");
          if (progressbar.length > 0) {
            let oTop = $(this).offset().top - window.innerHeight;
            $(this).children(".tipWrap").children(".tip").html(`${value}%`);
            if (scroll > oTop) {
              $(this).addClass("progressbar-active");
              $(this).children(".fill").css("width", `${value}%`);
              $(this)
                .children(".tipWrap")
                .children(".tip")
                .css("left", `${value}%`);
            } else {
              $(this).removeClass("progressbar-active");
              $(this).children(".fill").css("width", `${0}%`);
              $(this)
                .children(".tipWrap")
                .children(".tip")
                .css("left", `${0}%`);
            }
          }
        });
      });
    },

    slider() {
      // Portfolio
      $(".portfolio_slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="fa-regular fa-chevron-right nextArrow"></i>',
        prevArrow: '<i class="fa-regular fa-chevron-left prevArrow"></i>',

        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              arrows: false,
            },
          },
        ],
      });
      $(".portfolio_2_slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="fa-regular fa-chevron-right nextArrow"></i>',
        prevArrow: '<i class="fa-regular fa-chevron-left prevArrow"></i>',
      });

      // Testimonial Slider
      $(".testimonial_slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="fa-regular fa-chevron-right nextArrow"></i>',
        prevArrow: '<i class="fa-regular fa-chevron-left prevArrow"></i>',

        responsive: [
          {
            breakpoint: 992,
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
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
      });
      $(".testimonial_slider_2").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 992,
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
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
      });
    },
    customMouse() {
      var mouse = { x: 0, y: 0 }; // Cursor position
      var pos = { x: 0, y: 0 }; // Cursor position
      var ratio = 0.15; // delay follow cursor
      var active = false;
      var ball = $("#ball");

      /** default */
      const defaultValue = {
        duration: 0.3,
        opacity: 0.5,
        width: "30px",
        height: "30px",
        backgroundColor: "transparent",
        border: "2px solid #555",
      };
      const hoverBall = {
        duration: 0.3,
        css: {
          borderWidth: 0,
          opacity: "1!important",
          width: "100px!important",
          height: "100px!important",
          backgroundColor: "#c7d300",
        },
      };
      gsap.set(ball, {
        // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
      });
      document.addEventListener("mousemove", mouseMove);
      function mouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      gsap.ticker.add(updatePosition);
      function updatePosition() {
        if (!active) {
          pos.x += (mouse.x - pos.x) * ratio;
          pos.y += (mouse.y - pos.y) * ratio;

          gsap.set(ball, { x: pos.x, y: pos.y });
        }
      }
      // link
      $("a,.c-pointer,button,.progress,.slick-arrow")
        .on("mouseenter", function () {
          gsap.to(ball, {
            duration: 0.3,
            borderWidth: 0,
            opacity: 0.5,
            backgroundColor: "#CCC",
            width: "80px",
            height: "80px",
          });
        })
        .on("mouseleave", function () {
          gsap.to(ball, defaultValue);
        });

      // Data cursor
      if ($("[data-cursor]")) {
        $("[data-cursor]").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append('<div class="ball-view"></div>');
              $(".ball-view").append($(this).attr("data-cursor"));
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-view").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
      // Slider
      if ($(".slick-list")) {
        $(".slick-list").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-drag"><i class="fa-light fa-chevron-left"></i><i class="fa-light fa-chevron-right"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-drag").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }

      // Slider
      if ($(".cursor-arrow")) {
        $(".cursor-arrow").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-arrow"><i class="fx-icon-long-next-arrow"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-arrow").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }

      if ($(".image-view")) {
        $(".image-view").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append('<div class="ball-image-view"></div>');
              $(".ball-image-view").append($(this).attr("data-img-cursor"));
              gsap.to(ball, {
                duration: 0.3,
                css: {
                  borderWidth: 0,
                  opacity: "1!important",
                  width: "250px!important",
                  height: "250px!important",
                  borderRadius: "50%",
                },
              });
            })
            .on("mouseleave", function () {
              ball.find(".ball-image-view").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }

      // Gallery
      if ($(".gallery")) {
        $(".gallery").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-gallery"><i class="fa-sharp fa-solid fa-eye"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-gallery").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
    },
    lenisScrollAnimation() {
      const lenis = new Lenis();
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      document.querySelectorAll('a[href^="#"]').forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const id = el.getAttribute("href")?.slice(1);
          if (!id) return;
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    },
    stickyNavbar() {
      if (document.querySelector(".tf__main_menu")) {
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
          var currentScrollpos = window.pageYOffset;

          if (prevScrollpos > currentScrollpos) {
            document.querySelector(".tf__main_menu").style.top = "0";
          } else {
            document.querySelector(".tf__main_menu").style.top = "-100px";
          }

          prevScrollpos = currentScrollpos;
        };
      }
      if ($(".tf__main_menu").offset() != undefined) {
        var navoff = $(".tf__main_menu").offset().top;
        $(window).scroll(function () {
          var scrolling = $(this).scrollTop();

          if (scrolling > 100) {
            $(".tf__main_menu").addClass("menu_fix");
          } else {
            $(".tf__main_menu").removeClass("menu_fix");
          }
        });
      }
    },
    counter() {
      $(".counter").countUp();
    },
    preloader() {
      const svg = document.getElementById("svg");
      const tl = gsap.timeline();
      const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

      tl.to(".preloader-text", {
        delay: 0.5,
        y: -100,
        opacity: 0,
        onComplete: function () {
          setTimeout(() => {
            if (document.querySelector(".main_menu")) {
              document.querySelector(".main_menu").style.top = "0";
            }
            var hasAnim = $(".banner_title");
            hasAnim.each(function () {
              var $this = $(this);
              var splitType = "lines, chars";
              var splitto = new SplitText($this, {
                type: splitType,
                linesClass: "anim_line",
                charsClass: "anim_char",
                wordsClass: "anim_word",
              });
              var lines = $this.find(".anim_line"),
                words = $this.find(".anim_word"),
                chars = $this.find(".anim_char");
              gsap.fromTo(
                chars,
                { y: "100%" },
                {
                  y: "0%",
                  duration: 0.8,
                  stagger: 0.01,
                  ease: "power2.out",
                }
              );
            });

            isti.scrollAnimation();
            isti.scrollTextAnimation();
          }, 230);
        },
      });
      tl.to(svg, {
        duration: 0.1,
        // attr: { d: curve },
        ease: "power2.easeIn",
      }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
      });
      tl.to(".preloader", {
        y: -1500,
      });
      tl.to(".preloader", {
        zIndex: -1,
        display: "none",
      });
    },
    createScrollTrigger(triggerElement, timeline) {
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        onEnter: () => timeline.play(),
      });
    },
    scrollAnimation() {
      const animations = document.querySelectorAll("[data-animation]");
      animations.forEach((animation) => {
        let direction = "fade-bottom",
          duration = 1.5,
          offset = 50,
          delay = 0,
          scroll = 1,
          stagger = 0.2,
          ease = "power2.out";
        // Set attribute
        if (animation.getAttribute("data-offset")) {
          offset = animation.getAttribute("data-offset");
        }
        if (animation.getAttribute("data-duration")) {
          duration = animation.getAttribute("data-duration");
        }
        if (animation.getAttribute("data-animation")) {
          direction = animation.getAttribute("data-animation");
        }
        if (animation.getAttribute("data-delay")) {
          delay = animation.getAttribute("data-delay");
        }
        if (animation.getAttribute("data-ease")) {
          ease = animation.getAttribute("data-ease");
        }
        if (animation.getAttribute("data-scroll")) {
          scroll = animation.getAttribute("data-scroll");
        }
        if (animation.getAttribute("data-stagger")) {
          stagger = animation.getAttribute("data-stagger");
        }
        // Animation
        if (scroll == 1) {
          if (direction == "fade-top") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              y: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-left") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              x: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-bottom") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              y: offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              x: offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (direction == "img-blur") {
            let img = animation.getElementsByTagName("img")[0];
            let tl = gsap.timeline({ paused: true });
            tl.from(img, {
              scale: "1.3",
              filter: "blur(5px)",
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
        } else {
          if (direction == "img-blur") {
            let img = animation.getElementsByTagName("img")[0];
            gsap.from(img, {
              scale: "1.3",
              filter: "blur(5px)",
              duration: 1,
            });
          }
          if (direction == "fade-top") {
            gsap.from(animation, {
              y: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-left") {
            gsap.from(animation, {
              x: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-bottom") {
            gsap.from(animation, {
              y: offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-right") {
            gsap.from(animation, {
              x: offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-in") {
            gsap.from(animation, {
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
        }
      });
    },
    scrollTextAnimation() {
      let typeSplit = new SplitType("[data-text-animation]", {
        types: "lines,words, chars",
        className: "line",
      });
      // Link timelines to scroll position

      const text_animations = document.querySelectorAll(
        "[data-text-animation]"
      );

      text_animations.forEach((animation) => {
        let type = "slide-up",
          duration = 0.75,
          offset = 80,
          stagger = 0.6,
          delay = 0,
          scroll = 1,
          split = "line",
          ease = "power2.out";
        // Set attribute
        if (animation.getAttribute("data-stagger")) {
          stagger = animation.getAttribute("data-stagger");
        }
        if (animation.getAttribute("data-duration")) {
          duration = animation.getAttribute("data-duration");
        }
        if (animation.getAttribute("data-text-animation")) {
          type = animation.getAttribute("data-text-animation");
        }
        if (animation.getAttribute("data-delay")) {
          delay = animation.getAttribute("data-delay");
        }
        if (animation.getAttribute("data-ease")) {
          ease = animation.getAttribute("data-ease");
        }
        if (animation.getAttribute("data-scroll")) {
          scroll = animation.getAttribute("data-scroll");
        }
        if (animation.getAttribute("data-offset")) {
          offset = animation.getAttribute("data-offset");
        }
        if (animation.getAttribute("data-split")) {
          split = animation.getAttribute("data-split");
        }
        if (scroll == 1) {
          if (type == "slide-up") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: offset,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (type == "slide-down") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: -offset,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (type == "rotate-in") {
            let tl = gsap.timeline({ paused: true });
            tl.set(animation.querySelectorAll(`.${split}`), {
              transformPerspective: 400,
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
              rotationX: -offset,
              duration,
              delay,
              ease,
              force3D: true,
              opacity: 0,
              transformOrigin: "top center -50",
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (type == "slide-from-left") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              xPercent: -offset,
              duration,
              opacity: 0,
              ease,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (type == "slide-from-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              xPercent: offset,
              duration,
              opacity: 0,
              ease,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (type == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (type == "fade-in-random") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger, from: "random" },
            });
            isti.createScrollTrigger(animation, tl);
          }
          if (type == "scrub") {
            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: animation,
                start: "top 90%",
                end: "top center",
                scrub: true,
              },
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0.2,
              duration,
              ease,
              stagger: { amount: stagger },
            });
          }

          // Avoid flash of unstyled content
          gsap.set("[data-text-animation]", { opacity: 1 });
        } else {
          if (type == "slide-up") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: offset,
              duration,
              ease,
              opacity: 0,
            });
          }
          if (type == "slide-down") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: -offset,
              duration,
              ease,
              opacity: 0,
            });
          }
          if (type == "rotate-in") {
            let tl = gsap.timeline({ paused: true });
            tl.set(animation.querySelectorAll(`.${split}`), {
              transformPerspective: 400,
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
              rotationX: -offset,
              duration,
              ease,
              force3D: true,
              opacity: 0,
              transformOrigin: "top center -50",
            });
          }
          if (type == "slide-from-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              xPercent: offset,
              duration,
              opacity: 0,
              ease,
            });
          }
          if (type == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
            });
          }
          if (type == "fade-in-random") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger, from: "random" },
            });
          }
          if (type == "scrub") {
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0.2,
              duration,
              ease,
            });
          }

          // Avoid flash of unstyled content
          // gsap.set("[data-text-animation]", { opacity: 0 });
        }
      });
    },
    textAnimation() {
      var hasAnim = $(".text_hover_animaiton");
      if (hasAnim.length !== 0) {
        hasAnim.each(function () {
          var $this = $(this);
          var splitType = "words,chars";
          new SplitText($this, {
            type: splitType,
            wordsClass: "menu-text",
          });
        });
      }
    },
    venobox() {
      $(".venobox").venobox();
    },
    mobile_menu_icon() {
      $(".mobile_menu_icon").on("click", function () {
        $(".tf__main_2").toggleClass("show");
      });
    },
    parallax() {
      var image = document.querySelectorAll(".parallax-image");
      new simpleParallax(image, {
        delay: 0.6,
        transition: "cubic-bezier(0,0,0,1)",
      });
    },
    menu2() {
      if ($(".tf__main_2").offset() != undefined) {
        var navoff = $(".tf__main_2").offset().top;
        $(window).scroll(function () {
          var scrolling = $(this).scrollTop();

          if (scrolling > navoff) {
            $(".tf__main_2").addClass("menu_fix_2");
          } else {
            $(".tf__main_2").removeClass("menu_fix_2");
          }
        });
      }
    },
  };
  $(document).ready(function () {
    isti.preloader();
    isti.init();
  });
})(jQuery);
