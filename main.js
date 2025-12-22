document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // Fake load time

    // 2. Typing Effect in Hero
    const roleElement = document.querySelector('.hero-content .role');
    const roleText = "Full Stack Web Developer";
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < roleText.length) {
            roleElement.innerHTML = roleText.substring(0, typeIndex + 1) + '<span class="cursor">|</span>';
            typeIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing
            roleElement.innerHTML = roleText;
        }
    }
    // Start typing after loader
    setTimeout(typeWriter, 2000);


    // 3. Render Projects
    const projectsContainer = document.getElementById('projects-container');
    PROJECTS.forEach(project => {
        const techStackHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
        const projectHTML = `
            <div class="project-card fade-in">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tech">${techStackHTML}</div>
                <a href="${project.link}" target="_blank" class="project-link">
                    View Project <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
            </div>
        `;
        projectsContainer.innerHTML += projectHTML;
    });

    // 4. Render Experience & Education
    // 4. Render Experience
    const experienceContainer = document.getElementById('experience-container');
    const experienceData = EXPERIENCE.filter(item => item.typ.toLowerCase() === 'experience');

    if (experienceData.length === 0) {
        // Optional: Hide section or show message if no experience
        // experienceContainer.innerHTML = '<p class="text-center">No experience added yet.</p>';
    } else {
        experienceData.forEach((item, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const html = `
                <div class="timeline-item ${side} fade-in">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="timeline-date">${item.date}</span>
                        <h3 class="timeline-title">${item.title}</h3>
                        <h4 class="timeline-subtitle">${item.place}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
            experienceContainer.innerHTML += html;
        });
    }

    // 4.5. Render Education
    const educationContainer = document.getElementById('education-container');
    const educationData = EXPERIENCE.filter(item => item.typ.toLowerCase() === 'education');

    educationData.forEach((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const html = `
            <div class="timeline-item ${side} fade-in">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h3 class="timeline-title">${item.title}</h3>
                    <h4 class="timeline-subtitle">${item.place}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        educationContainer.innerHTML += html;
    });

    // 5. Render Skills
    const skillsContainer = document.getElementById('skills-container');
    SKILLS.forEach(skill => {
        const html = `
            <div class="skill-card fade-in">
                <ion-icon name="${skill.icon}" class="skill-icon"></ion-icon>
                <div class="skill-name">${skill.name}</div>
            </div>
        `;
        skillsContainer.innerHTML += html;
    });

    // 6. Render Contact Info
    const contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = `
        <div class="contact-item">
            <div class="contact-icon"><ion-icon name="mail-outline"></ion-icon></div>
            <div class="contact-text">
                <h4>Email</h4>
                <p>${CONTACT.email}</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon"><ion-icon name="call-outline"></ion-icon></div>
            <div class="contact-text">
                <h4>Phone</h4>
                <p>${CONTACT.phone}</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon"><ion-icon name="logo-linkedin"></ion-icon></div>
            <div class="contact-text">
                <h4>LinkedIn</h4>
                <p><a href="${CONTACT.linkedin}" target="_blank">View Profile</a></p>
            </div>
        </div>
         <div class="contact-item">
            <div class="contact-icon"><ion-icon name="logo-github"></ion-icon></div>
            <div class="contact-text">
                <h4>GitHub</h4>
                <p><a href="${CONTACT.github}" target="_blank">View Profile</a></p>
            </div>
        </div>
    `;

    // 7. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // CSS class handling for visibility (dynamic style injection or class toggle)
    // We'll add a global style for .visible in JS or CSS, but cleaner to just set styles directly in observer
    // BUT, let's use a class approach for cleaner code.
    // Let's inject a style block for .visible to make sure it works if not in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .cursor {
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Navbar Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
        // Add mobile style programmatically if not in CSS
        if (navUl.classList.contains('active')) {
            navUl.style.display = 'flex';
            navUl.style.flexDirection = 'column';
            navUl.style.position = 'absolute';
            navUl.style.top = '70px';
            navUl.style.right = '0';
            navUl.style.width = '100%';
            navUl.style.background = 'rgba(26, 15, 63, 0.95)';
            navUl.style.padding = '20px';
            navUl.style.alignItems = 'center';
        } else {
            navUl.style.display = ''; // Reset to css default
        }
    });

    // Smooth Scrolling for anchor links (CSS does this mostly, but good for cross-browser)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                navUl.style.display = '';
            }
        });
    });
});
