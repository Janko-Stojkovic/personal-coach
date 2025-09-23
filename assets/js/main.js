const navbar = document.getElementById('navbar');
const backToTop = document.getElementById("backToTop");

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // kada skroluješ više od 50px
        navbar.classList.add('fixed-top', 'navbar-scroll');
    } else {
        navbar.classList.remove('fixed-top', 'navbar-scroll');
    }

    if (window.scrollY > 150) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");
  const speed = 100; // veća vrednost = sporije

  const startCounting = (entry) => {
    if (entry.isIntersecting) {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";
        
        const updateCount = () => {
          const count = +counter.innerText.replace(/\D/g, ""); // čisti ne-brojne znakove
          const increment = Math.ceil(target / speed);

          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target + suffix;
          }
        };
        updateCount();
      });
      observer.disconnect();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(startCounting);
  }, { threshold: 0.5 });

  observer.observe(document.querySelector("#statistics-section"));
});



  



$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
        margin:20,
        nav:false,
        dots:true,
        autoplay:true,
        autoplayTimeout:4000,
        responsive:{
            0:{ items:1 },
            768:{ items:2 },
            992:{ items:3 }
        }
    });
});