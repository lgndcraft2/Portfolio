// Projects page specific functionality

// Projects data
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    longDescription:
      "This comprehensive e-commerce platform provides a complete online shopping experience with modern features and robust architecture. Built with scalability in mind, it handles everything from product catalog management to secure payment processing.",
    image: "public/modern-ecommerce-interface.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/raheem-akapo/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    features: ["User Authentication", "Payment Processing", "Admin Dashboard", "Product Management", "Order Tracking"],
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    longDescription:
      "A modern task management solution that enables teams to collaborate effectively with real-time updates, intuitive drag-and-drop interfaces, and comprehensive project tracking capabilities.",
    image: "public/task-management-dashboard.png",
    technologies: ["React", "Firebase", "Tailwind CSS", "Socket.io", "Redux"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/raheem-akapo/task-manager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    features: ["Real-time Collaboration", "Drag & Drop", "Team Management", "Progress Tracking", "Notifications"],
  },
  {
    id: 3,
    title: "Weather Analytics Dashboard",
    description:
      "A data visualization dashboard that displays weather patterns and analytics using real-time weather APIs and interactive charts.",
    longDescription:
      "An advanced weather analytics platform that transforms raw meteorological data into actionable insights through beautiful visualizations and comprehensive reporting tools.",
    image: "public/weather-analytics-dashboard-with-charts.jpg",
    technologies: ["Vue.js", "D3.js", "Express", "Weather API", "Chart.js"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/raheem-akapo/weather-dashboard",
    liveUrl: "https://weather-analytics.vercel.app",
    features: ["Real-time Data", "Interactive Charts", "Historical Analysis", "Location-based", "Export Reports"],
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description:
      "A secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
    longDescription:
      "A comprehensive mobile banking solution that prioritizes security and user experience, offering all essential banking features in an intuitive mobile interface.",
    image: "/mobile-banking-app.png",
    technologies: ["React Native", "Node.js", "PostgreSQL", "JWT", "Biometric Auth"],
    category: "mobile",
    featured: false,
    githubUrl: "https://github.com/raheem-akapo/mobile-banking",
    liveUrl: "https://banking-app-demo.vercel.app",
    features: ["Biometric Auth", "Transaction History", "Budget Tracking", "Bill Payments", "Account Management"],
  },
  {
    id: 5,
    title: "RESTful API Gateway",
    description:
      "A scalable API gateway built with microservices architecture, featuring rate limiting, authentication, and comprehensive logging.",
    longDescription:
      "A robust API gateway solution designed to handle high-traffic applications with advanced features like rate limiting, request routing, and comprehensive monitoring.",
    image: "/api-gateway-architecture-diagram.jpg",
    technologies: ["Node.js", "Express", "Redis", "Docker", "Nginx", "MongoDB"],
    category: "api",
    featured: false,
    githubUrl: "https://github.com/raheem-akapo/api-gateway",
    liveUrl: "https://api-gateway-docs.vercel.app",
    features: ["Rate Limiting", "Load Balancing", "Authentication", "Monitoring", "Documentation"],
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description:
      "A comprehensive social media management platform with analytics, scheduling, and multi-platform integration.",
    longDescription:
      "An all-in-one social media management solution that helps businesses and creators manage their online presence across multiple platforms with advanced analytics and automation.",
    image: "/social-media-dashboard.png",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    category: "web",
    featured: false,
    githubUrl: "https://github.com/raheem-akapo/social-dashboard",
    liveUrl: "https://social-dashboard-demo.vercel.app",
    features: ["Multi-platform", "Analytics", "Post Scheduling", "Team Collaboration", "Content Calendar"],
  },
]

// Projects page manager
class ProjectsPageManager {
  constructor() {
    this.projects = projectsData
    this.filteredProjects = [...this.projects]
    this.currentFilter = "all"
    this.searchTerm = ""
    this.init()
  }

  init() {
    this.renderProjects()
    this.setupFilters()
    this.setupSearch()
    this.setupAnimations()
  }

  renderProjects() {
    const grid = document.getElementById("projects-grid")
    if (!grid) return

    grid.innerHTML = ""

    this.filteredProjects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project, index)
      grid.appendChild(projectCard)
    })

    // Re-observe new elements for animations
    this.observeElements()
  }

  createProjectCard(project, index) {
    const card = document.createElement("div")
    card.className = "fade-in-on-scroll bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 group project-card"
    card.style.animationDelay = `${index * 0.1}s`
    card.dataset.category = project.category

    const featuredBadge = project.featured
      ? '<span class="absolute top-4 right-4 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>'
      : ""

    card.innerHTML = `
            <div class="relative mb-4 overflow-hidden rounded-lg">
                ${featuredBadge}
                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            <h3 class="text-xl font-semibold mb-3 text-light-text dark:text-dark-text">${project.title}</h3>

            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">${project.description}</p>

            <div class="flex flex-wrap gap-2 mb-4">
                ${project.technologies
                  .map(
                    (tech) =>
                      `<span class="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs rounded-full">${tech}</span>`,
                  )
                  .join("")}
            </div>

            <div class="flex gap-3 mb-4">
                <a
                    href="${project.githubUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 text-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                    GitHub
                </a>
                <a
                    href="${project.liveUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 text-center py-2 px-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors text-sm font-medium"
                >
                    Live Demo
                </a>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 class="text-sm font-medium text-light-text dark:text-dark-text mb-2">Key Features:</h4>
                <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    ${project.features
                      .slice(0, 3)
                      .map(
                        (feature) =>
                          `<li class="flex items-center">
                            <svg class="w-3 h-3 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            ${feature}
                        </li>`,
                      )
                      .join("")}
                </ul>
            </div>
        `

    return card
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn")

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active state
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")

        // Update filter
        this.currentFilter = button.dataset.filter
        this.applyFilters()
      })
    })
  }

  setupSearch() {
    const searchInput = document.getElementById("search-input")

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchTerm = e.target.value.toLowerCase()
        this.applyFilters()
      })
    }
  }

  applyFilters() {
    this.filteredProjects = this.projects.filter((project) => {
      const matchesFilter = this.currentFilter === "all" || project.category === this.currentFilter
      const matchesSearch =
        this.searchTerm === "" ||
        project.title.toLowerCase().includes(this.searchTerm) ||
        project.description.toLowerCase().includes(this.searchTerm) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(this.searchTerm))

      return matchesFilter && matchesSearch
    })

    this.renderProjects()
  }

  setupAnimations() {
    this.observeElements()
  }

  observeElements() {
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

    document.querySelectorAll(".fade-in-on-scroll:not(.visible)").forEach((el) => {
      observer.observe(el)
    })
  }
}

// Additional CSS for filter buttons
const additionalStyles = `
    .filter-btn {
        @apply px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium;
    }
    
    .filter-btn.active {
        @apply bg-accent-500 text-white border-accent-500 hover:bg-accent-600;
    }
    
    .project-card {
        @apply transition-all duration-300;
    }
    
    .project-card:hover {
        @apply transform -translate-y-1;
    }
`

// Add styles to head
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

// Initialize projects page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProjectsPageManager()
})
