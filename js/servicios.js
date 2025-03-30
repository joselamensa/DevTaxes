document.addEventListener("DOMContentLoaded", () => {
    // Tab functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        // Show corresponding tab pane
        const country = button.getAttribute("data-country")
        document.getElementById(country).classList.add("active")
      })
    })
  
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
  
    // Tax calculator functionality
    const calculateBtn = document.getElementById("calculate-btn")
    const refundAmount = document.getElementById("refund-amount")
  
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        const country = document.getElementById("country").value
        const income = Number.parseFloat(document.getElementById("income").value) || 0
        const taxPaid = Number.parseFloat(document.getElementById("tax-paid").value) || 0
        const workPeriod = Number.parseFloat(document.getElementById("work-period").value) || 0
  
        if (!country || income === 0 || taxPaid === 0 || workPeriod === 0) {
          alert("Por favor, completa todos los campos correctamente.")
          return
        }
  
        // Simple calculation logic (this would be more complex in a real application)
        let estimatedRefund = 0
        let currencySymbol = "$"
  
        switch (country) {
          case "usa":
            // Example calculation for USA
            estimatedRefund = taxPaid * 0.7
            currencySymbol = "$"
            break
          case "canada":
            // Example calculation for Canada
            estimatedRefund = taxPaid * 0.65
            currencySymbol = "C$"
            break
          case "uk":
            // Example calculation for UK
            estimatedRefund = taxPaid * 0.6
            currencySymbol = "£"
            break
          case "australia":
            // Example calculation for Australia
            estimatedRefund = taxPaid * 0.75
            currencySymbol = "A$"
            break
          default:
            estimatedRefund = 0
        }
  
        // Adjust based on work period (shorter periods might have higher refund rates)
        if (workPeriod <= 3) {
          estimatedRefund *= 1.2 // 20% bonus for short-term workers
        }
  
        // Format and display the result
        refundAmount.textContent = `${currencySymbol}${Math.round(estimatedRefund).toLocaleString()}`
  
        // Animate the result for better UX
        refundAmount.classList.add("highlight")
        setTimeout(() => {
          refundAmount.classList.remove("highlight")
        }, 1500)
      })
    }
  
    // Mobile Menu Toggle (same as in index.html)
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
                      
                      .highlight {
                          animation: pulse 1.5s;
                      }
                      
                      @keyframes pulse {
                          0% { transform: scale(1); }
                          50% { transform: scale(1.1); }
                          100% { transform: scale(1); }
                      }
                  `
          document.head.appendChild(style)
        }
  
        // Toggle mobile menu
        const mobileMenu = document.querySelector(".mobile-menu")
        mobileMenu.classList.toggle("active")
      })
    }
  })
  
  