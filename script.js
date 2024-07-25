setTimeout(() => {
  document.getElementById("loadingImg").style.display = "none";
  document.getElementById("loadingImg").style.zIndex = "-10";
}, 1500);

setTimeout(() => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("loading").style.zIndex = "-10";
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const donut_container = document.querySelector(".donut-container");
  const images = document.querySelectorAll(".image");
  const donut_floating = document.querySelector(".donut-floating-text");
  let isContainerHovered = false;
  let hasScrolledOnce = false;
  let touchStartY = 0;

  const getExpandMarginTopValue = () => {
    if (window.innerWidth <= 480) {
      return "30px";
    } else if (window.innerWidth <= 768) {
      return "45px";
    } else {
      return "60px";
    }
  };

  const getShrinkMarginTopValue = (index) => {
    if (window.innerWidth <= 480) {
      if (index > 1) {
        return "-80px";
      } else if (index > 0) {
        return "-72px";
      }
    } else if (window.innerWidth <= 600) {
      if (index > 1) {
        return "-80px";
      } else if (index > 0) {
        return "-72px";
      }
    } else if (window.innerWidth <= 800) {
      if (index > 1) {
        return "-95px";
      } else if (index > 0) {
        return "-80px";
      }
    } else if (window.innerWidth <= 998) {
      if (index > 1) {
        return "-110px";
      } else if (index > 0) {
        return "-100px";
      }
    } else {
      if (index > 1) {
        return "-125px";
      } else if (index > 0) {
        return "-115px";
      }
    }
    return "";
  };

  const getInitialMarginTopValues = (index) => {
    if (window.innerWidth <= 480) {
      return index > 1
        ? { from: "75px", to: "-80px" }
        : { from: "75px", to: "-72px" };
    } else if (window.innerWidth <= 600) {
      return index > 1
        ? { from: "75px", to: "-80px" }
        : { from: "75px", to: "-72px" };
    } else if (window.innerWidth <= 800) {
      return index > 1
        ? { from: "75px", to: "-95px" }
        : { from: "75px", to: "-80px" };
    } else if (window.innerWidth <= 998) {
      return index > 1
        ? { from: "75px", to: "-110px" }
        : { from: "75px", to: "-100px" };
    } else {
      return index > 1
        ? { from: "100px", to: "-125px" }
        : { from: "100px", to: "-115px" };
    }
  };

  const expandImages = () => {
    const marginTopValue = getExpandMarginTopValue();
    images.forEach((image, index) => {
      if (index > 0) {
        gsap.to(image, { marginTop: marginTopValue });

        donut_floating.style.display = "block";
        setTimeout(() => {
          donut_floating.classList.add("show");
        }, 500);
      }
    });
  };

  const shrinkImages = () => {
    images.forEach((image, index) => {
      const marginTopValue = getShrinkMarginTopValue(index);

      if (marginTopValue) {
        gsap.to(image, { marginTop: marginTopValue });
      } else {
        donut_floating.style.display = "none";
        setTimeout(() => {
          donut_floating.classList.remove("show");
        }, 500);
      }
    });
  };

  const initialAnimation = () => {
    images.forEach((image, index) => {
      const { from, to } = getInitialMarginTopValues(index);
      if (index > 1) {
        gsap.fromTo(
          image,
          { marginTop: from },
          { marginTop: to, duration: 2, ease: "power2.out" }
        );
      } else if (index > 0) {
        gsap.fromTo(
          image,
          { marginTop: from },
          { marginTop: to, duration: 2, ease: "power2.out" }
        );
      }
    });
  };

  const handleScroll = (e) => {
    if (isContainerHovered) {
      e.preventDefault();

      if (!hasScrolledOnce) {
        if (
          e.deltaY > 0 ||
          (e.changedTouches && e.changedTouches[0].clientY < touchStartY)
        ) {
          expandImages();
        } else {
          shrinkImages();
        }
        hasScrolledOnce = true;
      } else {
        window.scrollBy(
          0,
          e.deltaY || touchStartY - e.changedTouches[0].clientY
        );
        hasScrolledOnce = false;
      }
    }
  };
  const handleTouchStart = (e) => {
    touchStartY = e.changedTouches[0].clientY;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initialAnimation();
          donut_container.addEventListener("wheel", handleScroll);
          donut_container.addEventListener("touchmove", handleScroll);
          donut_container.addEventListener("touchstart", handleTouchStart);
        } else {
          donut_container.removeEventListener("wheel", handleScroll);
          donut_container.removeEventListener("touchmove", handleScroll);
          donut_container.removeEventListener("touchstart", handleTouchStart);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(donut_container);

  donut_container.addEventListener("mouseenter", () => {
    isContainerHovered = true;
  });

  donut_container.addEventListener("mouseleave", () => {
    isContainerHovered = false;
    hasScrolledOnce = false;
    shrinkImages();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const fullscreenMenu = document.getElementById("fullscreenMenu");

  menu.addEventListener("click", function () {
    fullscreenMenu.style.display = "block";
  });

  fullscreenMenu.addEventListener("click", function () {
    fullscreenMenu.style.display = "none";
  });
});

function toggleDetails(sectionId) {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    if (section.classList.contains(sectionId)) {
      section.classList.toggle("active");
    } else {
      section.classList.remove("active");
    }
  });
}

const video = document.getElementById("myVideo");
const playPauseButton = document.getElementById("playPauseButton");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

playPauseButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    video.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sliderLines = document.querySelectorAll(".slider-line");
  const dupimage = document.querySelector(".dup-image-container");

  sliderLines.forEach((line) => {
    const texts = line.querySelectorAll(".slider-text");
    const textWidth = texts[0].offsetWidth;
    const containerWidth = line.offsetWidth;
    const animationDuration = (textWidth + containerWidth) / 100;

    texts.forEach((text) => {
      if (
        line.classList.contains("slider-line-2") ||
        line.classList.contains("slider-line-4")
      ) {
        text.style.animation = `slide-left-right ${animationDuration}s linear infinite`;
      } else {
        text.style.animation = `slide-right-left ${animationDuration}s linear infinite`;
      }
    });

    line.addEventListener("mouseover", () => {
      texts.forEach((text) => {
        text.style.animationPlayState = "paused";
      });
    });

    line.addEventListener("mouseout", () => {
      texts.forEach((text) => {
        text.style.animationPlayState = "running";
      });
    });

    const spans = line.querySelectorAll("span");
    spans.forEach((span) => {
      span.addEventListener("mouseover", (e) => {
        const imgSrc = span.getAttribute("data-img");
        const rect = span.getBoundingClientRect();
        const parentRect = line.getBoundingClientRect();

        dupimage.style.backgroundImage = `url(${imgSrc})`;
        dupimage.style.left = `${
          rect.left + rect.width / 2 - parentRect.left
        }px`;
        dupimage.style.display = "block";

        if (line.classList.contains("slider-line-1")) {
          dupimage.style.top = "-10rem";
        } else if (line.classList.contains("slider-line-2")) {
          dupimage.style.top = "-3.4rem";
        } else if (line.classList.contains("slider-line-3")) {
          dupimage.style.top = "3.2rem";
        } else if (line.classList.contains("slider-line-4")) {
          dupimage.style.top = "9.8rem";
        } else {
          dupimage.style.display = "none";
        }
      });

      span.addEventListener("mouseout", () => {
        dupimage.style.display = "none";
      });
    });
  });
});

const slideRightLeft = `
  @keyframes slide-right-left {
      0% {
          transform: translateX(0%);
      }
      100% {
          transform: translateX(-100%);
      }
  }
`;

const slideLeftRight = `
  @keyframes slide-left-right {
      0% {
          transform: translateX(-100%);
      }
      100% {
          transform: translateX(0%);
      }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = slideRightLeft + slideLeftRight;
document.head.appendChild(styleSheet);

gsap.from(".loader img", {
  opacity: 0,
  scale: 0,
  delay: 1.5,
  duration: 1.5,
});

gsap.from(".logo", {
  y: 250,
  opacity: 0,
  delay: 3,
  duration: 2,
});

gsap.from(".socials, .menu", {
  opacity: 0,
  scale: 0,
  delay: 4,
});

gsap.from(".top h1", {
  x: -100,
  delay: 5,
  opacity: 0,
});

gsap.from(".donut1, .donut2", {
  delay: 5.5,
  scale: 0,
  opacity: 0,
});

gsap.from(".mini", {
  delay: 6,
  y: 10,
  opacity: 0,
});

gsap.from(".heroText", {
  delay: 6,
  y: -10,
  opacity: 0,
});

gsap.from(".top button", {
  x: -100,
  delay: 6.5,
  opacity: 0,
});

gsap.from(".bottom p", {
  delay: 7,
  y: -10,
  opacity: 0,
});

gsap.from(".bottom div", {
  delay: 7,
  x: -100,
  opacity: 0,
  stagger: 0.5,
});

gsap.from(".more", {
  delay: 9.5,
  x: -200,
});

gsap.from(".model img", {
  delay: 6.7,
  scale: 0,
  opacity: 0,
});

gsap.to(".layer1", {
  x: -1100,
  duration: 2,
  scrollTrigger: {
    trigger: ".layer1",
    start: "top 50%",
    end: "bottom",
    scrub: 1,
  },
});

gsap.to(".layer2", {
  x: 1100,
  duration: 2,
  scrollTrigger: {
    trigger: ".layer2",
    start: "top 70%",
    end: "bottom",
    scrub: 1,
  },
});

gsap.to(".layer1 span img, .layer2 span img", {
  rotate: 360,
  scrollTrigger: {
    trigger: ".layer2",
    start: "top 70%",
    end: "bottom",
    scrub: 1,
  },
});

gsap.from("#anim1, #anim2", {
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: "#anim1",
  },
});

gsap.from(".donut-big-text", {
  delay: 0,
  x: 300,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".donut-big-text",
  },
});

gsap.from("#anim3, #anim4", {
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: "#anim3",
  },
});

gsap.from(".divAnim1", {
  x: 1000,
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".divAnim1",
  },
});
gsap.from(".divAnim2", {
  x: -1000,
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".divAnim2",
  },
});
gsap.from(".divAnim3", {
  x: 1000,
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".divAnim3",
  },
});
gsap.from(".divAnim4", {
  x: -1000,
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".divAnim4",
  },
});

gsap.from(".slider", {
  delay: 0.5,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".slider",
  },
});

gsap.from(".vi-c-text1, .vi-c-text2", {
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".vi-c-text1",
  },
});

gsap.from(".video-container video", {
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".video-container video",
  },
});

gsap.from("#playPauseButton", {
  delay: 0.3,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: "#playPauseButton",
  },
});

gsap.from(".text-video", {
  x: -1000,
  delay: 0.3,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: "#playPauseButton",
  },
});

gsap.from(".anim5, .anim6", {
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".anim5",
  },
});

gsap.from(".review img", {
  delay: 1,
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".review img",
  },
  stagger: 0.2,
});

gsap.from(".Footer", {
  y: 1000,
  duration: 2,
  opacity: 0,
  scrollTrigger: {
    trigger: ".Footer",
  },
});

function showTestimonial(testimonialId) {
  // Hide all testimonials
  var testimonials = document.querySelectorAll(".testimonial");
  testimonials.forEach(function (testimonial) {
    testimonial.style.display = "none";
  });

  // Show the clicked testimonial
  var testimonialToShow = document.querySelector("." + testimonialId);
  if (testimonialToShow) {
    testimonialToShow.style.display = "block";
  }
}

gsap.from(".testi1", {
  opacity: 0,
  scale: 0,
  delay: 3.5,
  scrollTrigger: {
    trigger: ".testi1",
  },
});
