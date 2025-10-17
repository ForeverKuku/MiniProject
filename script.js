// Initialize EmailJS with your public key
emailjs.init("yXUIeTKV-oMEVP14u");

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Portfolio Navigation
const portfolioNavBtns = document.querySelectorAll('.portfolio-nav-btn');
const portfolioSections = document.querySelectorAll('.portfolio-section');

portfolioNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        portfolioNavBtns.forEach(b => b.classList.remove('active'));
        portfolioSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding section
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission with EmailJS
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const formLoading = document.getElementById('form-loading');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

// Enhanced form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    const errors = [];

    // Clear previous error styles
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.style.borderColor = '';
    });

    // Name validation
    if (!name) {
        document.getElementById('name').style.borderColor = '#FF6B6B';
        errors.push('Name is required');
        isValid = false;
    }

    // Email validation
    if (!email) {
        document.getElementById('email').style.borderColor = '#FF6B6B';
        errors.push('Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById('email').style.borderColor = '#FF6B6B';
        errors.push('Please enter a valid email address');
        isValid = false;
    }

    // Message validation
    if (!message) {
        document.getElementById('message').style.borderColor = '#FF6B6B';
        errors.push('Message is required');
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('message').style.borderColor = '#FF6B6B';
        errors.push('Message should be at least 10 characters long');
        isValid = false;
    }

    return { isValid, errors };
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    const { isValid, errors } = validateForm();
    
    if (!isValid) {
        showError(errors.join('<br>'));
        return;
    }

    // Show loading state
    showLoading();
    
    try {
        // Prepare template parameters
        const templateParams = {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim() || 'Portfolio Inquiry',
            message: document.getElementById('message').value.trim(),
            to_email: 'swenfaithm@gmail.com',
            reply_to: document.getElementById('email').value.trim(),
            date: new Date().toLocaleString()
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            'service_c3bznl9', 
            'template_r4oxfw4', 
            templateParams
        );

        console.log('EmailJS Response:', response);
        
        if (response.status === 200) {
            showSuccess();
            contactForm.reset();
        } else {
            throw new Error(`EmailJS returned status: ${response.status}`);
        }
    } catch (error) {
        console.error('Email sending failed:', error);
        
        // More specific error messages
        let errorMessage = 'Failed to send message. ';
        
        if (error.text) {
            // EmailJS specific error
            errorMessage += 'Service error: ' + error.text;
        } else if (error.message) {
            // General error
            errorMessage += error.message;
        } else {
            errorMessage += 'Please try again or contact me directly at swenfaithm@gmail.com';
        }
        
        showError(errorMessage);
    } finally {
        hideLoading();
    }
});

function showLoading() {
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    formLoading.style.display = 'block';
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    
    // Add loading class for styling
    submitBtn.classList.add('loading');
}

function hideLoading() {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    formLoading.style.display = 'none';
    submitBtn.classList.remove('loading');
}

function showSuccess() {
    formSuccess.style.display = 'block';
    formError.style.display = 'none';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
    }, 5000);
}

function showError(message) {
    formError.style.display = 'block';
    formSuccess.style.display = 'none';
    formError.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <h4>Oops! Something went wrong.</h4>
        <p>${message}</p>
    `;
    formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Real-time validation
document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '';
        }
    });
    
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#FF6B6B';
        } else {
            this.style.borderColor = '';
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        
        if (input.value.trim()) {
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.disabled = true;
            input.value = 'Thank you for subscribing!';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                input.value = '';
            }, 3000);
        }
    });
}

// Add subtle animations to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .about-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    .btn.loading {
        background: var(--secondary-gradient) !important;
        cursor: not-allowed;
    }
    
    .form-group input:invalid, 
    .form-group textarea:invalid {
        border-color: #FF6B6B !important;
    }
    
    .form-group input:valid, 
    .form-group textarea:valid {
        border-color: #4CAF50 !important;
    }
`;
document.head.appendChild(style);

// AI Secretary Functionality
const aiToggle = document.querySelector('.ai-toggle');
const aiChat = document.querySelector('.ai-chat');
const aiInput = document.querySelector('.ai-input input');
const aiSendBtn = document.querySelector('.ai-input button');
const aiMessages = document.querySelector('.ai-messages');
const aiSuggestions = document.querySelectorAll('.ai-suggestion');

// AI Responses
const aiResponses = {
    "hello": "Hello! I'm your AI design assistant. How can I help you today?",
    "hi": "Hi there! I'm here to help you learn more about Faith's work and design process.",
    "hey": "Hey! I'm your AI assistant. What would you like to know about Faith's work?",
    "design process": "Faith follows a comprehensive 6-step design process: 1) Discovery & Research, 2) Strategy & Planning, 3) Wireframing & Prototyping, 4) UI Design & Branding, 5) Testing & Iteration, 6) Development & Implementation. You can view more details in the Design Process section.",
    "process": "Faith's design process includes: Discovery & Research, Strategy & Planning, Wireframing & Prototyping, UI Design & Branding, Testing & Iteration, and Development & Implementation.",
    "services": "Faith offers UI/UX Design, Mobile Development, Frontend Development, and Brand Identity services. Check out the Services section for more details.",
    "service": "Faith specializes in UI/UX Design, Mobile Development (React Native & Flutter), Frontend Development, and Brand Identity design.",
    "portfolio": "Faith has an impressive portfolio across UI/UX Design, Mobile Development, and Visual Design. Browse the Portfolio section to see her work.",
    "work": "You can view Faith's work in the Portfolio section. She has projects in UI/UX Design, Mobile Development, and Visual Design.",
    "contact": "You can contact Faith via email at swenfaithm@gmail.com or phone at +250 785603898. The Contact section has a form you can fill out.",
    "email": "Faith's email is swenfaithm@gmail.com. You can also use the contact form on this website.",
    "phone": "Faith's phone number is +250 785603898. She's based in Kigali, Rwanda.",
    "experience": "Faith is an award-winning UI/UX Designer and Mobile Developer with expertise in creating digital experiences that blend aesthetics with functionality.",
    "skills": "Faith's skills include UI/UX Design, Mobile Development (React Native, Flutter), Frontend Development, Brand Identity, and Product Strategy.",
    "about": "Faith Makulah Swen is an award-winning UI/UX Designer and Mobile Developer who transforms visions into extraordinary digital experiences through innovative design and cutting-edge development.",
    "hire": "If you'd like to hire Faith for your project, you can contact her via email at swenfaithm@gmail.com or use the contact form on this website.",
    "collaborate": "Faith is available for select projects that challenge conventions. You can reach out to discuss collaboration opportunities.",
    "thank": "You're welcome! Is there anything else I can help you with?",
    "thanks": "You're welcome! Feel free to ask if you have any other questions.",
    "default": "I'm not sure I understand. You can ask me about Faith's design process, services, portfolio, or how to contact her. Try using one of the suggestion buttons above!"
};

// Toggle AI Chat
aiToggle.addEventListener('click', () => {
    aiChat.classList.toggle('active');
    aiToggle.classList.remove('pulse');
});

// Send Message Function
function sendMessage() {
    const message = aiInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    aiInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate AI response after a short delay
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
        hideTypingIndicator();
        
        // Add suggestions for follow-up questions
        if (message.toLowerCase().includes('design') || message.toLowerCase().includes('process')) {
            addSuggestions(['services', 'portfolio', 'contact']);
        } else if (message.toLowerCase().includes('service')) {
            addSuggestions(['design process', 'portfolio', 'hire']);
        } else if (message.toLowerCase().includes('portfolio') || message.toLowerCase().includes('work')) {
            addSuggestions(['design process', 'services', 'contact']);
        } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('email') || message.toLowerCase().includes('phone')) {
            addSuggestions(['design process', 'services', 'portfolio']);
        } else {
            addSuggestions(['design process', 'services', 'portfolio', 'contact']);
        }
    }, 1000 + Math.random() * 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('ai-message', sender);
    messageEl.textContent = text;
    aiMessages.appendChild(messageEl);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.classList.add('ai-typing');
    typingEl.innerHTML = `
        <span>Design Assistant is typing</span>
        <div class="ai-typing-dots">
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
        </div>
    `;
    aiMessages.appendChild(typingEl);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingEl = document.querySelector('.ai-typing');
    if (typingEl) {
        typingEl.remove();
    }
}

// Add suggestion buttons
function addSuggestions(suggestionTypes) {
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.ai-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    const suggestionsEl = document.createElement('div');
    suggestionsEl.classList.add('ai-suggestions');
    
    suggestionTypes.forEach(type => {
        const suggestion = document.createElement('div');
        suggestion.classList.add('ai-suggestion');
        suggestion.setAttribute('data-question', type);
        
        // Set appropriate text for each suggestion type
        switch(type) {
            case 'design process':
                suggestion.textContent = 'Design Process';
                break;
            case 'services':
                suggestion.textContent = 'Services';
                break;
            case 'portfolio':
                suggestion.textContent = 'Portfolio';
                break;
            case 'contact':
                suggestion.textContent = 'Contact Info';
                break;
            case 'hire':
                suggestion.textContent = 'Hire Faith';
                break;
            default:
                suggestion.textContent = type;
        }
        
        suggestion.addEventListener('click', () => {
            addMessage(suggestion.textContent, 'user');
            showTypingIndicator();
            
            setTimeout(() => {
                const response = generateResponse(type);
                addMessage(response, 'bot');
                hideTypingIndicator();
                
                // Add new suggestions based on the response
                if (type === 'design process') {
                    addSuggestions(['services', 'portfolio', 'contact']);
                } else if (type === 'services') {
                    addSuggestions(['design process', 'portfolio', 'hire']);
                } else if (type === 'portfolio') {
                    addSuggestions(['design process', 'services', 'contact']);
                } else if (type === 'contact' || type === 'hire') {
                    addSuggestions(['design process', 'services', 'portfolio']);
                }
            }, 1000 + Math.random() * 1000);
        });
        
        suggestionsEl.appendChild(suggestion);
    });
    
    aiMessages.appendChild(suggestionsEl);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Generate AI response
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact matches first
    for (const [key, value] of Object.entries(aiResponses)) {
        if (lowerMessage === key) {
            return value;
        }
    }
    
    // Check for partial matches
    for (const [key, value] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }
    
    return aiResponses.default;
}

// Send message on button click
aiSendBtn.addEventListener('click', sendMessage);

// Send message on Enter key
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Suggestion button clicks
aiSuggestions.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
        const question = suggestion.getAttribute('data-question');
        addMessage(suggestion.textContent, 'user');
        showTypingIndicator();
        
        setTimeout(() => {
            const response = generateResponse(question);
            addMessage(response, 'bot');
            hideTypingIndicator();
            
            // Add new suggestions based on the response
            if (question === 'design process') {
                addSuggestions(['services', 'portfolio', 'contact']);
            } else if (question === 'services') {
                addSuggestions(['design process', 'portfolio', 'hire']);
            } else if (question === 'portfolio') {
                addSuggestions(['design process', 'services', 'contact']);
            } else if (question === 'contact') {
                addSuggestions(['design process', 'services', 'portfolio']);
            }
        }, 1000 + Math.random() * 1000);
    });
});

// Close chat when clicking outside (on mobile)
document.addEventListener('click', (e) => {
    if (!aiChat.contains(e.target) && !aiToggle.contains(e.target) && aiChat.classList.contains('active')) {
        aiChat.classList.remove('active');
    }
});

// Process data for each project
const processData = {
    "coffee-shop": {
        title: "Brew & Sip Coffee Shop Experience",
        description: "A comprehensive e-commerce website for a specialty coffee shop, designed to showcase their products and create an immersive brand experience for coffee enthusiasts. The project focused on creating a warm, inviting digital space that reflects the coffee shop's atmosphere while ensuring seamless online ordering functionality.",
        image: "./img/Coffeeshop.png",
        tools: "Figma, Adobe Illustrator, Photoshop, Principle",
        timeline: "5 weeks",
        category: "UI/UX Design, E-commerce",
        client: "Brew & Sip Coffee Roasters",
        stages: [
            {
                title: "Problem Statement & Definition",
                icon: "fas fa-question-circle",
                description: "The client needed an e-commerce platform that could effectively showcase their specialty coffee products while providing an engaging user experience that reflects their brand's artisanal values. The main challenge was creating a digital experience that captures the warmth and personal touch of their physical coffee shop while enabling seamless online purchasing.",
                deliverables: ["Problem Statement Document", "Project Goals", "Success Metrics"]
            },
            {
                title: "Research & Analysis",
                icon: "fas fa-search",
                description: "I conducted comprehensive market research to understand the specialty coffee e-commerce landscape, analyzing competitors and identifying industry best practices. This included studying user behavior patterns in online food and beverage purchasing, examining conversion optimization techniques, and researching how to effectively communicate product quality and brand story digitally.",
                deliverables: ["Competitive Analysis", "Market Research Report", "User Behavior Analysis"]
            },
            {
                title: "Stakeholder Interviews",
                icon: "fas fa-comments",
                description: "I conducted in-depth interviews with the coffee shop owners, baristas, and management team to understand their business goals, brand values, and operational requirements. These conversations helped identify key features needed, such as subscription management, gift options, and educational content about coffee origins and brewing methods.",
                deliverables: ["Stakeholder Interview Notes", "Business Requirements Document", "Feature Prioritization Matrix"]
            },
            {
                title: "User Personas Development",
                icon: "fas fa-user-friends",
                description: "Based on research findings, I created three primary user personas: The Coffee Connoisseur (expert looking for rare beans), The Daily Drinker (seeking convenience and subscription), and The Gift Buyer (purchasing for others). Each persona included detailed demographics, goals, pain points, and behavioral patterns to guide design decisions.",
                deliverables: ["User Personas", "Empathy Maps", "Scenario Development"]
            },
            {
                title: "User Flow Mapping",
                icon: "fas fa-project-diagram",
                description: "I mapped comprehensive user flows for key journeys including product discovery, subscription management, gift purchasing, and educational content consumption. Special attention was paid to creating multiple entry points to products and ensuring the checkout process was as frictionless as possible while maintaining security and trust.",
                deliverables: ["User Flow Diagrams", "Task Analysis", "Journey Mapping"]
            },
            {
                title: "Wireframing & Information Architecture",
                icon: "fas fa-pencil-alt",
                description: "I created low to mid-fidelity wireframes to establish the layout, content structure, and navigation patterns. The information architecture was designed to make product discovery intuitive while highlighting the brand's story and educational content. Wireframes were tested with users to validate navigation and content hierarchy before visual design.",
                deliverables: ["Low-Fidelity Wireframes", "Mid-Fidelity Prototypes", "Information Architecture Map"]
            },
            {
                title: "High-Fidelity Design",
                icon: "fas fa-palette",
                description: "I developed a complete visual design system with a warm, inviting color palette inspired by coffee tones, carefully selected typography that balances readability with personality, and custom iconography. High-fidelity mockups were created for all key screens with special attention to product presentation, imagery usage, and creating visual hierarchy that guides users through the experience.",
                deliverables: ["High-Fidelity Mockups", "Design System", "Interactive Prototype", "Style Guide"]
            },
            {
                title: "Responsiveness & Device Testing",
                icon: "fas fa-mobile-alt",
                description: "I designed and tested the experience across multiple device sizes and platforms, ensuring consistent usability and visual appeal from desktop to mobile. Special consideration was given to touch interactions on mobile devices, image optimization for different screen sizes, and maintaining readability and functionality across all breakpoints.",
                deliverables: ["Responsive Design Specifications", "Device Testing Report", "Cross-Browser Compatibility Check"]
            }
        ]
    },
    "finance-app": {
        title: "MyTrove Finance App",
        description: "A mobile banking application designed to simplify personal finance management with intuitive budgeting tools and secure transaction features. The app focuses on making complex financial data accessible and actionable for users of all financial literacy levels.",
        image: "./img/MyTrove Finance Mockup.png",
        tools: "Figma, React Native, Firebase, Adobe XD",
        timeline: "8 weeks",
        category: "Mobile UI/UX, Fintech",
        client: "MyTrove Financial Solutions",
        stages: [
            {
                title: "Problem Statement & Definition",
                icon: "fas fa-question-circle",
                description: "Users struggled with understanding their financial health and making informed decisions due to complex interfaces in existing finance apps. The challenge was to create an intuitive platform that simplifies financial management while maintaining security and trustworthiness for sensitive financial data.",
                deliverables: ["Problem Statement", "User Pain Points Analysis", "Project Objectives"]
            },
            {
                title: "Research & Analysis",
                icon: "fas fa-search",
                description: "I conducted extensive research into personal finance management behaviors, security concerns in fintech applications, and analyzed competitor apps to identify gaps in the market. This included studying how different demographics interact with financial data and what level of complexity is appropriate for various user segments.",
                deliverables: ["Market Research", "Competitive Analysis", "User Behavior Patterns"]
            },
            {
                title: "Stakeholder Interviews",
                icon: "fas fa-comments",
                description: "I interviewed financial advisors, banking professionals, and compliance experts to understand regulatory requirements and industry standards. These discussions helped shape the feature set and ensure the app would meet both user needs and industry compliance standards.",
                deliverables: ["Stakeholder Requirements", "Compliance Checklist", "Feature Specifications"]
            },
            {
                title: "User Personas Development",
                icon: "fas fa-user-friends",
                description: "I developed four distinct user personas: The Budget-Conscious Student, The Young Professional, The Family Planner, and The Retirement Saver. Each persona included specific financial goals, technical proficiency levels, and concerns about financial security and privacy.",
                deliverables: ["Detailed User Personas", "Scenario Development", "User Goal Mapping"]
            },
            {
                title: "User Flow Mapping",
                icon: "fas fa-project-diagram",
                description: "I created detailed user flows for critical financial tasks including account setup, transaction categorization, budget creation, bill payment, and financial goal tracking. Special attention was paid to security flows like two-factor authentication and transaction verification.",
                deliverables: ["Comprehensive User Flows", "Task Analysis", "Security Flow Diagrams"]
            },
            {
                title: "Wireframing & Information Architecture",
                icon: "fas fa-pencil-alt",
                description: "I designed wireframes that focused on clear information hierarchy for financial data, intuitive navigation between different financial features, and establishing trust through clear security indicators. The architecture was tested to ensure users could easily find and understand their financial information.",
                deliverables: ["Wireframe Set", "Navigation Structure", "Content Hierarchy"]
            },
            {
                title: "High-Fidelity Design",
                icon: "fas fa-palette",
                description: "I created a clean, trustworthy visual design with a color scheme that communicates financial stability while using accent colors to highlight important financial insights. The design system included custom data visualization components for financial charts and established clear typographic hierarchy for different types of financial information.",
                deliverables: ["High-Fidelity Designs", "Design System", "Data Visualization Components"]
            },
            {
                title: "Responsiveness & Device Testing",
                icon: "fas fa-mobile-alt",
                description: "The app was designed primarily for mobile with careful consideration of touch targets, gesture interactions, and readability on smaller screens. I conducted extensive testing across various device sizes and operating systems to ensure consistent performance and usability.",
                deliverables: ["Mobile-First Design Specifications", "Touch Interaction Guidelines", "Cross-Platform Testing Report"]
            }
        ]
    }
};

// Modal functionality
const processModal = document.querySelector('.process-modal');
const closeModal = document.querySelector('.close-modal');
const viewProcessBtns = document.querySelectorAll('.view-process');

// Open process modal
viewProcessBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        const projectData = processData[projectId];
        
        if (projectData) {
            document.getElementById('modal-title').textContent = "Design Process: " + projectData.title;
            document.getElementById('modal-project-title').textContent = projectData.title;
            document.getElementById('modal-project-description').textContent = projectData.description;
            document.getElementById('modal-image').src = projectData.image;
            document.getElementById('modal-tools').textContent = projectData.tools;
            document.getElementById('modal-timeline').textContent = projectData.timeline;
            document.getElementById('modal-category').textContent = projectData.category;
            document.getElementById('modal-client').textContent = projectData.client;
            
            // Clear existing stages
            const stagesContainer = document.getElementById('modal-process-stages');
            stagesContainer.innerHTML = '';
            
            // Add new stages
            projectData.stages.forEach(stage => {
                const stageEl = document.createElement('div');
                stageEl.classList.add('process-stage');
                
                // Create deliverables list HTML
                let deliverablesHTML = '';
                if (stage.deliverables && stage.deliverables.length > 0) {
                    deliverablesHTML = `
                        <div class="stage-deliverables">
                            <h5>Key Deliverables:</h5>
                            <div class="deliverables-list">
                                ${stage.deliverables.map(deliverable => 
                                    `<span class="deliverable-tag">${deliverable}</span>`
                                ).join('')}
                            </div>
                        </div>
                    `;
                }
                
                stageEl.innerHTML = `
                    <div class="stage-header">
                        <div class="stage-icon">
                            <i class="${stage.icon}"></i>
                        </div>
                        <h4>${stage.title}</h4>
                    </div>
                    <p>${stage.description}</p>
                    ${deliverablesHTML}
                `;
                stagesContainer.appendChild(stageEl);
            });
            
            processModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close process modal
closeModal.addEventListener('click', () => {
    processModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
processModal.addEventListener('click', (e) => {
    if (e.target === processModal) {
        processModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && processModal.classList.contains('active')) {
        processModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});