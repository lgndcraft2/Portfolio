// Projects page specific functionality

// Projects data
const projectsData = [
  {
    id: 1,
    title: "E-Restaurant Platform",
    description:
      "A website created for the simplification of taking orders from customers.",
    longDescription:
      "",
    image: "images/novel horizon.png",
    technologies: ["HTML5", "CSS3", "Javascript"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/raheem-akapo/novel-horizon",
    liveUrl: "https://novel-horizon.vercel.app",
    features: [],
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A full-featured task management application designed to enhance productivity and discipline.",
    longDescription:
      "A modern task management solution that enables teams to collaborate effectively with real-time updates, intuitive drag-and-drop interfaces, and comprehensive project tracking capabilities.",
    image: "images/tasks flow.png",
    technologies: ["HTML5", "CSS3", "JavaScript", "Python", "Flask"],
    category: "web",
    featured: false,
    githubUrl: "https://github.com/raheem-akapo/task-manager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    features: ["Real-time Collaboration", "Drag & Drop", "Team Management", "Progress Tracking", "Notifications"],
  },
  {
    id: 3,
    title: "Rant With Rose",
    description:
      "An AI-powered therapist chatbot that provides emotional support and mental health resources through natural language processing and empathetic conversations.",
    longDescription:
      "An AI-powered therapist chatbot that provides emotional support and mental health resources through natural language processing and empathetic conversations.",
    image: "images/rose home.png",
    technologies: ["HTML5", "CSS3", "Python", "Flask", "Gemini API", "JavaScript", "Langchain"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/raheem-akapo/rant-with-rose",
    liveUrl: "https://rant-with-rose.vercel.app",
    features: ["AI Chatbot", "Emotional Support", "Mental Health Resources", "Natural Language Processing", "User-friendly Interface"],
  },
  {
    id: 4,
    title: "Bridge",
    description:
      "A transcription and translation app that uses AI to provide accurate and context-aware translations in multiple Nigerian languages.",
    longDescription:
      "A mobile application that leverages AI to offer seamless speech-to-text transcription and context-aware translations across multiple languages, enhancing communication for users worldwide.",
    image: "images/bridge.png",
    technologies: ["React", "TailwindCSS", "flask", "Spitch API"],
    category: "api",
    featured: true,
    githubUrl: "https://github.com/emafido-emmanuel/bridge",
    liveUrl: "https://bridge-connect-ecru.vercel.app",
    features: ["Speech-to-Text", "Multi-language Support", "Context-aware Translations", "User-friendly Interface"],
  },
  {
    id: 5,
    title: "Tech Community E-Registration Platform",
    description:
      "A website created for the registration of participants for a Hackathon",
    longDescription:
      "A website created for the registration of participants for a Hackathon",
    image: "images/techstars.png",
    technologies: ["HTML5", "CSS3", "Google Forms"],
    category: "web",
    featured: false,
    githubUrl: "https://github.com/raheem-akapo/techstars-hackathon",
    liveUrl: "https://techstars-hackathon.vercel.app",
    features: ["Ease of Registration", "I dunno", "Figure it out"],
  },
  // {
  //   id: 6,
  //   title: "Social Media Dashboard",
  //   description:
  //     "A comprehensive social media management platform with analytics, scheduling, and multi-platform integration.",
  //   longDescription:
  //     "An all-in-one social media management solution that helps businesses and creators manage their online presence across multiple platforms with advanced analytics and automation.",
  //   image: "/social-media-dashboard.png",
  //   technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
  //   category: "web",
  //   featured: false,
  //   githubUrl: "https://github.com/raheem-akapo/social-dashboard",
  //   liveUrl: "https://social-dashboard-demo.vercel.app",
  //   features: ["Multi-platform", "Analytics", "Post Scheduling", "Team Collaboration", "Content Calendar"],
  // },
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
