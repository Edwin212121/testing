// Projects JavaScript file - handles loading and displaying project data

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

// Load projects from JSON file
async function loadProjects() {
    const loader = document.getElementById('projects-loader');
    const projectContainer = document.getElementById('project-container');
    
    // Show loader
    if (loader) loader.style.display = 'flex';
    
    // Don't hide the container initially - just clear its contents
    if (projectContainer) projectContainer.innerHTML = '';
    
    try {
        // Try multiple possible paths to the JSON file
        let response = null;
        const possiblePaths = ['../data/projects.json', '/data/projects.json', 'data/projects.json'];
        
        for (const path of possiblePaths) {
            try {
                response = await fetch(path);
                if (response.ok) break;
            } catch (e) {
                console.log(`Failed to fetch from ${path}`);
            }
        }
        
        // If all fetch attempts failed
        if (!response || !response.ok) {
            throw new Error(`Failed to load project data from any path`);
        }
        
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects data:', error);
        // Use fallback data if fetch fails
        console.log('Using fallback project data instead');
        displayProjects(fallbackProjectsData);
    } finally {
        // Hide loader regardless of success or failure
        if (loader) loader.style.display = 'none';
    }
}

// Display projects in the DOM
function displayProjects(projects) {
    const projectContainer = document.getElementById('project-container');
    
    if (!projectContainer) {
        console.error('Project container not found!');
        return;
    }
    
    // Clear any existing content
    projectContainer.innerHTML = '';
    
    // Always ensure the container is visible
    projectContainer.style.display = 'grid';
    
    // Add each project
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectContainer.appendChild(projectCard);
    });
    
    // Add different classes without the reveal effect that's causing issues
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Use simpler fade-in animation instead of reveal classes
        card.classList.add('animate-fade-in');
        card.style.animationDelay = `${index * 100}ms`;
    });
}

// Create HTML for a single project card
function createProjectCard(project, index) {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-card';
    projectElement.setAttribute('data-project-id', project.id);
    
    // Calculate animation delay based on index
    const delay = (index % 3) * 100;
    projectElement.style.animationDelay = `${delay}ms`;
    
    // Create HTML content
    projectElement.innerHTML = `
        <div class="project-img">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn" target="_blank" rel="noopener">View Live</a>` : ''}
                ${project.codeUrl ? `<a href="${project.codeUrl}" class="btn" target="_blank" rel="noopener">View Code</a>` : ''}
            </div>
        </div>
    `;
    
    // Add click event to show project details
    projectElement.addEventListener('click', () => {
        showProjectDetails(project);
    });
    
    return projectElement;
}

// Show detailed project view
function showProjectDetails(project) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content animate-fade-in">
            <span class="close-modal">&times;</span>
            <h2>${project.title}</h2>
            <div class="project-gallery">
                ${project.gallery ? 
                    project.gallery.map(img => `<img src="${img}" alt="Project screenshot">`).join('') :
                    `<img src="${project.image}" alt="${project.title}">`
                }
            </div>
            <div class="project-details">
                <p>${project.longDescription || project.description}</p>
                <h3>Features:</h3>
                <ul>
                    ${project.features ? 
                        project.features.map(feature => `<li>${feature}</li>`).join('') :
                        '<li>No features listed</li>'
                    }
                </ul>
                <h3>Technologies Used:</h3>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn" target="_blank" rel="noopener">View Live</a>` : ''}
                    ${project.codeUrl ? `<a href="${project.codeUrl}" class="btn" target="_blank" rel="noopener">View Code</a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    // Add modal open class for animation
    setTimeout(() => {
        modal.classList.add('open');
    }, 10);
    
    // Close modal when clicking the close button or outside the modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('open');
        // Re-enable scrolling and remove modal after animation
        setTimeout(() => {
            document.body.style.overflow = '';
            document.body.removeChild(modal);
        }, 300);
    }
}

// Fallback project data in case JSON file can't be loaded
const fallbackProjectsData = [
    {
        id: 1,
        title: "E-commerce Website",
        description: "A fully responsive e-commerce platform with shopping cart and payment integration.",
        image: "https://via.placeholder.com/600x400?text=E-commerce+Project",
        technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
        liveUrl: "#",
        codeUrl: "#",
        features: ["User authentication", "Product search", "Shopping cart", "Payment processing"]
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A productivity application to manage tasks, deadlines and team collaboration.",
        image: "https://via.placeholder.com/600x400?text=Task+Management+App",
        technologies: ["React.js", "Redux", "Firebase", "Material UI"],
        liveUrl: "#",
        codeUrl: "#",
        features: ["Task creation", "Due dates", "Team assignments", "Progress tracking"]
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "Real-time weather application with forecast data and location services.",
        image: "https://via.placeholder.com/600x400?text=Weather+Dashboard",
        technologies: ["JavaScript", "API Integration", "CSS Grid", "Responsive Design"],
        liveUrl: "#",
        codeUrl: "#",
        features: ["Current weather", "5-day forecast", "Location search", "Weather maps"]
    },
    {
        id: 4,
        title: "Social Media Platform",
        description: "A social networking application with profiles, posts, and real-time chat.",
        image: "https://via.placeholder.com/600x400?text=Social+Media+App",
        technologies: ["Vue.js", "Node.js", "Socket.io", "MongoDB"],
        liveUrl: "#",
        codeUrl: "#",
        features: ["User profiles", "Post creation", "Real-time messaging", "Friend requests"]
    }
];