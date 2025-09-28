// Portfolio JavaScript functionality

// Theme management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.applyTheme()
    this.setupEventListeners()
  }

  applyTheme() {
    if (this.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", this.theme)
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light"
    this.applyTheme()
  }

  setupEventListeners() {
    const themeToggle = document.getElementById("theme-toggle")
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle")

    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }

    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener("click", () => this.toggleTheme())
    }
  }
}

// Navigation management
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn")
    this.mobileMenu = document.getElementById("mobile-menu")
    this.menuIcon = document.getElementById("menu-icon")
    this.closeIcon = document.getElementById("close-icon")
    this.isMobileMenuOpen = false
    this.init()
  }

  init() {
    // this.setupScrollEffect()
    this.setupMobileMenu()
    this.setupSmoothScrolling()
  }

  // setupScrollEffect() {
  //   window.addEventListener("scroll", () => {
  //     const isScrolled = window.scrollY > 50

  //     if (isScrolled) {
  //       this.navbar.classList.add("bg-white/90", "dark:bg-gray-900/90", "backdrop-blur-md", "shadow-lg")
  //     } else {
  //       this.navbar.classList.remove("bg-white/90", "dark:bg-gray-900/90", "backdrop-blur-md", "shadow-lg")
  //     }
  //   })
  // }

  setupMobileMenu() {
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () => {
        this.toggleMobileMenu()
      })
    }

    // Close mobile menu when clicking on links
    const mobileLinks = this.mobileMenu?.querySelectorAll("a")
    mobileLinks?.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu()
      })
    })
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen

    if (this.isMobileMenuOpen) {
      this.mobileMenu?.classList.remove("hidden")
      this.menuIcon?.classList.add("hidden")
      this.closeIcon?.classList.remove("hidden")
    } else {
      this.mobileMenu?.classList.add("hidden")
      this.menuIcon?.classList.remove("hidden")
      this.closeIcon?.classList.add("hidden")
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false
    this.mobileMenu?.classList.add("hidden")
    this.menuIcon?.classList.remove("hidden")
    this.closeIcon?.classList.add("hidden")
  }

  setupSmoothScrolling() {
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Scroll animations
class ScrollAnimationManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupIntersectionObserver()
    this.setupScrollToTop()
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all elements with fade-in-on-scroll class
    document.querySelectorAll(".fade-in-on-scroll").forEach((el) => {
      observer.observe(el)
    })
  }

  setupScrollToTop() {
    const scrollToTopBtn = document.getElementById("scroll-to-top")

    if (scrollToTopBtn) {
      // Show/hide scroll to top button
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.remove("opacity-0", "invisible")
          scrollToTopBtn.classList.add("opacity-100", "visible")
        } else {
          scrollToTopBtn.classList.add("opacity-0", "invisible")
          scrollToTopBtn.classList.remove("opacity-100", "visible")
        }
      })

      // Scroll to top functionality
      scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  }
}

// Contact form management
class ContactFormManager {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.submitBtn = document.getElementById("submit-btn")
    this.submitText = document.getElementById("submit-text")
    this.submitLoading = document.getElementById("submit-loading")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData)

    // Show loading state
    this.setLoadingState(true)

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form submitted:", data)
      alert("Thank you for your message! I'll get back to you soon.")

      // Reset form
      this.form.reset()
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Sorry, there was an error sending your message. Please try again.")
    } finally {
      this.setLoadingState(false)
    }
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn?.setAttribute("disabled", "true")
      this.submitText?.classList.add("hidden")
      this.submitLoading?.classList.remove("hidden")
    } else {
      this.submitBtn?.removeAttribute("disabled")
      this.submitText?.classList.remove("hidden")
      this.submitLoading?.classList.add("hidden")
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  new NavigationManager()
  new ScrollAnimationManager()
  new ContactFormManager()
})

// Handle page visibility for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = "paused"
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = "running"
  }
})
