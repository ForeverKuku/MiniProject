// Current year for footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Show/hide portfolio items based on filter
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

prevButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

nextButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Video introduction
const video = document.getElementById('intro-video');
const videoOverlay = document.getElementById('video-overlay');

if (videoOverlay) {
    videoOverlay.addEventListener('click', () => {
        videoOverlay.classList.add('hidden');
        if (video) video.play();
    });
}

// AI Chat Assistant
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

// Predefined responses for the AI assistant
const aiResponses = {
    'hello': 'Hello! How can I help you learn more about Faith\'s work?',
    'hi': 'Hi there! What would you like to know about Faith\'s design process?',
    'design process': 'Faith follows a user-centered design process that includes research, ideation, prototyping, and testing. She focuses on understanding user needs before creating solutions.',
    'ui/ux': 'Faith specializes in creating intuitive user interfaces and experiences that are both beautiful and functional. She uses tools like Figma and Adobe XD for her design work.',
    'experience': 'Faith has experience in both mobile development and UI/UX design, allowing her to bridge the gap between design and implementation.',
    'tools': 'Faith uses Figma for UI design, React Native and Flutter for mobile development, and various other tools for prototyping and collaboration.',
    'portfolio': 'You can view Faith\'s portfolio projects in the portfolio section above. She has worked on various projects including healthcare apps, transportation solutions, and more.',
    'contact': 'You can contact Faith through the contact form on this website or via email at swenfaithm@gmail.com.'
};

function addChatMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function processUserInput() {
    const input = userInput.value.toLowerCase().trim();
    if (input === '') return;
    
    addChatMessage(input, true);
    userInput.value = '';
    
    // Simple AI response logic
    let response = "I'm not sure how to answer that. Try asking about Faith's design process, UI/UX expertise, or experience.";
    
    for (const [key, value] of Object.entries(aiResponses)) {
        if (input.includes(key)) {
            response = value;
            break;
        }
    }
    
    // Simulate typing delay
    setTimeout(() => {
        addChatMessage(response);
    }, 500);
}

if (sendButton && userInput) {
    sendButton.addEventListener('click', processUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processUserInput();
        }
    });
}

// Journal form submission
const journalForm = document.getElementById('journal-form');
if (journalForm) {
    journalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Journal entry saved! (This is a demo - entries would be saved to a database in a real application)');
        journalForm.reset();
    });
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! (This is a demo - messages would be sent to a server in a real application)');
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
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
            
            // Close mobile menu if open
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        }
    });
});