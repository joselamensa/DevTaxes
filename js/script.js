document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const nav = document.querySelector(".nav")
    const authButtons = document.querySelector(".auth-buttons")
  
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", function () {
        this.classList.toggle("active")
  
        // Create mobile menu if it doesn't exist
        if (!document.querySelector(".mobile-menu")) {
          const mobileMenu = document.createElement("div")
          mobileMenu.className = "mobile-menu"
  
          // Clone navigation
          const navClone = nav.cloneNode(true)
  
          // Clone auth buttons
          const authClone = authButtons.cloneNode(true)
  
          mobileMenu.appendChild(navClone)
          mobileMenu.appendChild(authClone)
  
          // Add to header
          document.querySelector(".header").appendChild(mobileMenu)
  
          // Add styles for mobile menu
          const style = document.createElement("style")
          style.textContent = `
                      .mobile-menu {
                          position: absolute;
                          top: 70px;
                          left: 0;
                          width: 100%;
                          background-color: white;
                          padding: 20px;
                          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                          display: none;
                      }
                      
                      .mobile-menu.active {
                          display: block;
                      }
                      
                      .mobile-menu .nav-list {
                          flex-direction: column;
                          gap: 15px;
                      }
                      
                      .mobile-menu .auth-buttons {
                          flex-direction: column;
                          gap: 15px;
                          margin-top: 20px;
                      }
                      
                      .mobile-menu-toggle.active .bar:nth-child(1) {
                          transform: rotate(-45deg) translate(-5px, 6px);
                      }
                      
                      .mobile-menu-toggle.active .bar:nth-child(2) {
                          opacity: 0;
                      }
                      
                      .mobile-menu-toggle.active .bar:nth-child(3) {
                          transform: rotate(45deg) translate(-5px, -6px);
                      }
                  `
          document.head.appendChild(style)
        }
  
        // Toggle mobile menu
        const mobileMenu = document.querySelector(".mobile-menu")
        mobileMenu.classList.toggle("active")
      })
    }
  
    // Testimonial Slider
    const dots = document.querySelectorAll(".dot")
    const testimonials = document.querySelector(".testimonials-slider")
  
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          // Remove active class from all dots
          dots.forEach((d) => d.classList.remove("active"))
  
          // Add active class to current dot
          dot.classList.add("active")
  
          // Calculate the translation for the testimonials slider
          const translateValue = -index * 100 + "%"
  
          // Apply the translation
          testimonials.style.transform = `translateX(${translateValue})`
          testimonials.style.transition = "transform 0.5s ease"
        })
      })
    }
  
    // Automatic testimonial slider
    let currentSlide = 0
    const totalSlides = dots.length
  
    function autoSlide() {
      currentSlide = (currentSlide + 1) % totalSlides
  
      // Remove active class from all dots
      dots.forEach((d) => d.classList.remove("active"))
  
      // Add active class to current dot
      dots[currentSlide].classList.add("active")
  
      // Calculate the translation for the testimonials slider
      const translateValue = -currentSlide * 100 + "%"
  
      // Apply the translation
      testimonials.style.transform = `translateX(${translateValue})`
      testimonials.style.transition = "transform 0.5s ease"
    }
  
    // Set interval for automatic slider (every 5 seconds)
    const slideInterval = setInterval(autoSlide, 5000)
  
    // Pause automatic slider when user interacts with dots
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval)
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          })
        }
      })
    })
  
    // Header scroll effect
    const header = document.querySelector(".header")
    let lastScrollTop = 0
  
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
      if (scrollTop > 100) {
        header.style.padding = "10px 0"
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
      } else {
        header.style.padding = "15px 0"
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
      }
  
      lastScrollTop = scrollTop
    })
  })
  
  