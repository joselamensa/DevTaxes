document.addEventListener("DOMContentLoaded", () => {
    // Form validation
    const contactForm = document.getElementById("contact-form")
    const callbackForm = document.getElementById("callback-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic validation
        let isValid = true
        const name = document.getElementById("name")
        const email = document.getElementById("email")
        const subject = document.getElementById("subject")
        const message = document.getElementById("message")
        const privacy = document.getElementById("privacy")
  
        // Reset previous error states
        removeErrorStates()
  
        // Validate name
        if (name.value.trim() === "") {
          showError(name, "Por favor, ingresa tu nombre")
          isValid = false
        }
  
        // Validate email
        if (email.value.trim() === "") {
          showError(email, "Por favor, ingresa tu correo electrónico")
          isValid = false
        } else if (!isValidEmail(email.value)) {
          showError(email, "Por favor, ingresa un correo electrónico válido")
          isValid = false
        }
  
        // Validate subject
        if (subject.value.trim() === "") {
          showError(subject, "Por favor, ingresa el asunto")
          isValid = false
        }
  
        // Validate message
        if (message.value.trim() === "") {
          showError(message, "Por favor, ingresa tu mensaje")
          isValid = false
        }
  
        // Validate privacy checkbox
        if (!privacy.checked) {
          showError(privacy, "Debes aceptar la política de privacidad")
          isValid = false
        }
  
        // If form is valid, submit it
        if (isValid) {
          // Here you would normally send the form data to a server
          // For demo purposes, we'll just show a success message
          showSuccessMessage(contactForm, "¡Gracias por tu mensaje! Te responderemos lo antes posible.")
          contactForm.reset()
        }
      })
    }
  
    if (callbackForm) {
      callbackForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic validation
        let isValid = true
        const phone = document.getElementById("phone")
  
        // Reset previous error states
        removeErrorStates()
  
        // Validate phone
        if (phone.value.trim() === "") {
          showError(phone, "Por favor, ingresa tu número de teléfono")
          isValid = false
        }
  
        // If form is valid, submit it
        if (isValid) {
          // Here you would normally send the form data to a server
          // For demo purposes, we'll just show a success message
          showSuccessMessage(callbackForm, "¡Gracias! Te llamaremos pronto.")
          callbackForm.reset()
        }
      })
    }
  
    // Helper functions
    function showError(input, message) {
      input.classList.add("error")
  
      const errorElement = document.createElement("div")
      errorElement.className = "error-message"
      errorElement.innerText = message
  
      const parent = input.parentElement
      parent.appendChild(errorElement)
    }
  
    function removeErrorStates() {
      // Remove all error classes
      const errorInputs = document.querySelectorAll(".error")
      errorInputs.forEach((input) => {
        input.classList.remove("error")
      })
  
      // Remove all error messages
      const errorMessages = document.querySelectorAll(".error-message")
      errorMessages.forEach((message) => {
        message.remove()
      })
    }
  
    function isValidEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  
    function showSuccessMessage(form, message) {
      // Remove any existing success message
      const existingSuccess = form.querySelector(".success-message")
      if (existingSuccess) {
        existingSuccess.remove()
      }
  
      // Create and add success message
      const successElement = document.createElement("div")
      successElement.className = "success-message"
      successElement.innerText = message
  
      form.prepend(successElement)
      successElement.style.display = "block"
  
      // Hide success message after 5 seconds
      setTimeout(() => {
        successElement.style.display = "none"
      }, 5000)
    }
  
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })
  
        // Toggle current item
        item.classList.toggle("active")
      })
    })
  
    // Mobile Menu Toggle (same as in other pages)
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
                          z-index: 1000;
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
  
    // Chat button functionality (demo)
    const chatButton = document.querySelector(".support-btn")
    if (chatButton && chatButton.textContent.includes("Iniciar Chat")) {
      chatButton.addEventListener("click", (e) => {
        e.preventDefault()
        alert("El servicio de chat estará disponible próximamente. Por favor, utiliza otro método de contacto.")
      })
    }
  })
  
  