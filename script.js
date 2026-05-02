// Chakra Encyclopedia JavaScript

// Tailwind Configuration
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Dark theme colors
                'dark-bg': '#1a1a2e',
                'dark-card': '#16213e',
                'dark-text': '#e0e0e0',
                'dark-border': '#2a2a2a',
                
                // Chakra colors
                'root': '#FF0000',
                'sacral': '#FF8C00',
                'solar': '#FFD700',
                'heart': '#00FF00',
                'throat': '#0000FF',
                'third-eye': '#4B0082',
                'crown': '#8B00FF',
                
                // Sanskrit font sizes
                'sanskrit-xs': ['1.125rem', { lineHeight: '1.75' }],
                'sanskrit-sm': ['1.25rem', { lineHeight: '1.75' }],
                'sanskrit-base': ['1.5rem', { lineHeight: '1.75' }],
                'sanskrit-lg': ['2.25rem', { lineHeight: '1.75' }],
                'sanskrit-xl': ['3rem', { lineHeight: '1.75' }],
                'sanskrit-2xl': ['3.75rem', { lineHeight: '1.75' }],
                'sanskrit-3xl': ['4.5rem', { lineHeight: '1.75' }],
                'sanskrit-4xl': ['6rem', { lineHeight: '1.75' }]
            }
        }
    }
};

// Language switcher functionality
function setLanguage(lang) {
    localStorage.setItem('chakra-lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Update nav toggle button text
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'en' ? 'Español' : 'English';
    }
}

// Auto-detect on load
const savedLang = localStorage.getItem('chakra-lang');
const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
const urlParams = new URLSearchParams(window.location.search);
const urlLang = urlParams.get('lang');

// Priority: URL param > saved language > browser language
const initialLang = urlLang || savedLang || browserLang;
setLanguage(initialLang);

// Language detection and redirect
(function() {
    // Only redirect if coming from the root or no language preference is set
    if (!window.location.pathname.includes('index-es.html')) {
        var userLang = navigator.language || navigator.userLanguage;
        var hasVisited = localStorage.getItem('chakra-lang-visited');
        
        // If first visit and user prefers Spanish, redirect to Spanish
        if (!hasVisited && userLang.startsWith('es')) {
            localStorage.setItem('chakra-lang-visited', 'true');
            window.location.href = 'index-es.html';
            return;
        }
        
        // Mark as visited
        localStorage.setItem('chakra-lang-visited', 'true');
    }
})();

// Dark mode functionality
function toggleDarkMode() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        if (mobileThemeIcon) mobileThemeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (mobileThemeIcon) mobileThemeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Initialize dark mode based on system preference or saved preference
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeIcon = document.getElementById('themeIcon');
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (mobileThemeIcon) mobileThemeIcon.classList.replace('fa-moon', 'fa-sun');
    }
})();

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chakra Test functionality
const chakraTestQuestions = [
    {
        question: "How often do you feel anxious or worried about your basic needs (money, home, safety)?",
        chakra: "root",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        question: "How would you rate your creative expression and enjoyment of life's pleasures?",
        chakra: "sacral",
        options: ["Very Low", "Low", "Moderate", "High", "Very High"]
    },
    {
        question: "How confident do you feel in making decisions and asserting yourself?",
        chakra: "solar",
        options: ["Not confident", "Slightly confident", "Moderately confident", "Confident", "Very confident"]
    },
    {
        question: "How easily do you give and receive love and compassion?",
        chakra: "heart",
        options: ["Very difficult", "Difficult", "Moderate", "Easy", "Very easy"]
    },
    {
        question: "How well do you express your thoughts and feelings to others?",
        chakra: "throat",
        options: ["Poorly", "Below average", "Average", "Well", "Very well"]
    },
    {
        question: "How often do you trust your intuition and inner guidance?",
        chakra: "third-eye",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        question: "How connected do you feel to something greater than yourself?",
        chakra: "crown",
        options: ["Not connected", "Slightly connected", "Moderately connected", "Connected", "Deeply connected"]
    }
];

let currentQuestionIndex = 0;
let testAnswers = {};

function startChakraTest() {
    currentQuestionIndex = 0;
    testAnswers = {};
    
    // Try to find English test elements first
    const testStart = document.getElementById('testStart');
    const testQuestions = document.getElementById('testQuestions');
    
    if (testStart && testQuestions) {
        // English version structure
        testStart.classList.add('hidden');
        testQuestions.classList.remove('hidden');
        showTestQuestion();
    } else {
        // Try Spanish version structure
        const chakraTestModal = document.getElementById('chakraTestModal');
        if (chakraTestModal) {
            chakraTestModal.classList.remove('hidden');
            showTestQuestion();
        }
    }
}

function closeChakraTest() {
    // Try to find English test elements first
    const testStart = document.getElementById('testStart');
    const testQuestions = document.getElementById('testQuestions');
    const testResults = document.getElementById('testResults');
    
    if (testStart && testQuestions) {
        // English version structure
        testQuestions.classList.add('hidden');
        testResults.classList.add('hidden');
        testStart.classList.remove('hidden');
    } else {
        // Try Spanish version structure
        const chakraTestModal = document.getElementById('chakraTestModal');
        if (chakraTestModal) {
            chakraTestModal.classList.add('hidden');
        }
    }
}

function showTestQuestion() {
    // Try to find English test elements first
    const currentQuestionEl = document.getElementById('currentQuestion');
    const progressPercentEl = document.getElementById('progressPercent');
    const progressBarEl = document.getElementById('progressBar');
    const questionTextEl = document.getElementById('questionText');
    const answerOptionsEl = document.getElementById('answerOptions');
    
    if (currentQuestionEl && questionTextEl && answerOptionsEl) {
        // English version structure
        if (currentQuestionIndex < chakraTestQuestions.length) {
            const question = chakraTestQuestions[currentQuestionIndex];
            
            // Update progress
            currentQuestionEl.textContent = currentQuestionIndex + 1;
            const progressPercent = Math.round((currentQuestionIndex + 1) / chakraTestQuestions.length * 100);
            progressPercentEl.textContent = progressPercent + '%';
            progressBarEl.style.width = progressPercent + '%';
            
            // Update question
            questionTextEl.textContent = question.question;
            
            // Update options
            answerOptionsEl.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'w-full text-left p-4 rounded-lg border-2 border-gray-200 dark:border-dark-border hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition text-gray-700 dark:text-dark-text';
                button.innerHTML = `
                    <div class="flex items-center">
                        <span class="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-dark-border mr-4 flex items-center justify-center">
                            <span class="text-sm">${String.fromCharCode(65 + index)}</span>
                        </span>
                        <span>${option}</span>
                    </div>
                `;
                button.onclick = () => selectAnswer(index);
                answerOptionsEl.appendChild(button);
            });
        }
    } else {
        // Try Spanish version structure
        const testContent = document.getElementById('testContent');
        if (testContent && currentQuestionIndex < chakraTestQuestions.length) {
            const question = chakraTestQuestions[currentQuestionIndex];
            testContent.innerHTML = `
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm text-gray-500">Question ${currentQuestionIndex + 1} of ${chakraTestQuestions.length}</span>
                        <div class="w-32 bg-gray-200 rounded-full h-2">
                            <div class="bg-purple-600 h-2 rounded-full" style="width: ${((currentQuestionIndex + 1) / chakraTestQuestions.length) * 100}%"></div>
                        </div>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">${question.question}</h4>
                    <div class="space-y-3">
                        ${question.options.map((option, index) => `
                            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-purple-50 transition">
                                <input type="radio" name="answer" value="${index}" class="mr-3 text-purple-600">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="flex justify-end">
                    <button onclick="nextTestQuestion()" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                        ${currentQuestionIndex === chakraTestQuestions.length - 1 ? 'Get Results' : 'Next'}
                    </button>
                </div>
            `;
        }
    }
}

function scrollToChakraCard(chakraKey) {
    const targetCard = document.getElementById('chakra-card-' + chakraKey);
    if (targetCard) {
        // Smooth scroll to the chakra card
        targetCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Add a temporary highlight effect
        targetCard.style.transform = 'scale(1.02)';
        targetCard.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        targetCard.style.transition = 'all 0.3s ease';
        
        // Remove the highlight effect after 2 seconds
        setTimeout(() => {
            targetCard.style.transform = '';
            targetCard.style.boxShadow = '';
        }, 2000);
    }
}

function selectAnswer(answerIndex) {
    testAnswers[currentQuestionIndex] = answerIndex;
    
    // Highlight selected answer
    const buttons = document.querySelectorAll('#answerOptions button');
    buttons.forEach((button, index) => {
        if (index === answerIndex) {
            button.classList.add('border-purple-600', 'bg-purple-50', 'dark:bg-purple-900/20');
        } else {
            button.classList.remove('border-purple-600', 'bg-purple-50', 'dark:bg-purple-900/20');
        }
    });
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
        if (currentQuestionIndex < chakraTestQuestions.length - 1) {
            currentQuestionIndex++;
            showTestQuestion();
        } else {
            showTestResults();
        }
    }, 300);
}

function nextTestQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer to continue.');
        return;
    }
    
    const question = chakraTestQuestions[currentQuestionIndex];
    testAnswers[question.chakra] = parseInt(selectedOption.value);
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < chakraTestQuestions.length) {
        showTestQuestion();
    } else {
        showTestResults();
    }
}

function showTestResults() {
    const testContent = document.getElementById('testContent');
    
    // Calculate results
    const results = Object.keys(testAnswers).map(chakra => {
        const score = testAnswers[chakra];
        let status, recommendation;
        
        if (score <= 1) {
            status = "Needs Attention";
            recommendation = "This chakra may be blocked or underactive. Focus on healing practices for this energy center.";
        } else if (score <= 3) {
            status = "Moderately Balanced";
            recommendation = "This chakra is functioning reasonably well but could benefit from regular balancing practices.";
        } else {
            status = "Well Balanced";
            recommendation = "This chakra is functioning well. Continue maintaining balance through regular practices.";
        }
        
        return { chakra, score, status, recommendation };
    });
    
    testContent.innerHTML = `
        <div class="mb-6">
            <h4 class="text-xl font-semibold text-gray-800 mb-4">Your Chakra Assessment Results</h4>
            <div class="space-y-4">
                ${results.map(result => `
                    <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <h5 class="font-semibold capitalize">${result.chakra} Chakra</h5>
                            <span class="px-3 py-1 rounded-full text-sm ${
                                result.status === "Needs Attention" ? "bg-red-100 text-red-700" :
                                result.status === "Moderately Balanced" ? "bg-yellow-100 text-yellow-700" :
                                "bg-green-100 text-green-700"
                            }">${result.status}</span>
                        </div>
                        <p class="text-gray-600 text-sm">${result.recommendation}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="border-t pt-4">
            <h5 class="font-semibold mb-3">Recommended Practices:</h5>
            <div class="grid md:grid-cols-2 gap-3">
                ${results.filter(r => r.score <= 2).map(result => `
                    <div class="bg-purple-50 p-3 rounded-lg">
                        <span class="font-medium capitalize">${result.chakra} Chakra:</span>
                        <p class="text-sm text-gray-600">Try ${result.chakra} meditation and related healing practices.</p>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="flex justify-end mt-6 space-x-3">
            <button onclick="startChakraTest()" class="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition">
                Retake Test
            </button>
            <button onclick="closeChakraTest()" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                Close
            </button>
        </div>
    `;
}

// Intersection Observer for scroll animations
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

// Observe all chakra cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const chakraCards = document.querySelectorAll('.chakra-card');
    chakraCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('bg-white', 'shadow-md');
        nav.classList.remove('bg-white/90');
    } else {
        nav.classList.add('bg-white/90');
        nav.classList.remove('bg-white', 'shadow-md');
    }
});

// Meditation player functionality
const meditationAudio = {
    root: new Audio('audio/root-meditation.mp3'),
    sacral: new Audio('audio/sacral-meditation.mp3'),
    solar: new Audio('audio/solar-meditation.mp3'),
    heart: new Audio('audio/heart-meditation.mp3'),
    throat: new Audio('audio/throat-meditation.mp3'),
    thirdEye: new Audio('audio/third-eye-meditation.mp3'),
    crown: new Audio('audio/crown-meditation.mp3'),
    full: new Audio('audio/full-chakra-meditation.mp3')
};

let currentMeditation = null;
let isPlaying = false;

function playMeditation(chakra) {
    // Stop current meditation if playing
    if (currentMeditation && isPlaying) {
        currentMeditation.pause();
        currentMeditation.currentTime = 0;
    }
    
    currentMeditation = meditationAudio[chakra];
    if (currentMeditation) {
        currentMeditation.play();
        isPlaying = true;
        
        // Update UI to show playing state
        updateMeditationUI(chakra, true);
        
        // Handle when audio ends
        currentMeditation.onended = () => {
            isPlaying = false;
            updateMeditationUI(chakra, false);
        };
    }
}

function updateMeditationUI(chakra, playing) {
    // Update button states and icons
    const buttons = document.querySelectorAll('.meditation-btn');
    buttons.forEach(btn => {
        if (btn.dataset.chakra === chakra) {
            if (playing) {
                btn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause';
                btn.classList.add('bg-red-600', 'hover:bg-red-700');
                btn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
            } else {
                btn.innerHTML = '<i class="fas fa-play mr-2"></i> Play';
                btn.classList.remove('bg-red-600', 'hover:bg-red-700');
                btn.classList.add('bg-purple-600', 'hover:bg-purple-700');
            }
        } else {
            btn.innerHTML = '<i class="fas fa-play mr-2"></i> Play';
            btn.classList.remove('bg-red-600', 'hover:bg-red-700');
            btn.classList.add('bg-purple-600', 'hover:bg-purple-700');
        }
    });
}

// Chakra color breathing animation
function startColorBreathing(chakraElement, color) {
    const colors = {
        root: ['#FF0000', '#FF6B6B'],
        sacral: ['#FF8C00', '#FFA500'],
        solar: ['#FFD700', '#FFED4E'],
        heart: ['#00FF00', '#90EE90'],
        throat: ['#0000FF', '#4169E1'],
        thirdEye: ['#4B0082', '#8A2BE2'],
        crown: ['#8B00FF', '#DA70D6']
    };
    
    const chakraColors = colors[chakraElement] || colors.root;
    let colorIndex = 0;
    
    setInterval(() => {
        chakraElement.style.background = `linear-gradient(135deg, ${chakraColors[colorIndex]}, ${chakraColors[(colorIndex + 1) % 2]})`;
        colorIndex = (colorIndex + 1) % 2;
    }, 3000);
}

// Email newsletter subscription
function subscribeNewsletter(email) {
    // This would typically connect to a backend service
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing! Check your email for confirmation.');
}

// Social sharing functionality
function shareOnSocial(platform, url, title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Initialize AdSense (placeholder function)
function initializeAdSense() {
    // This would be replaced with actual AdSense implementation
    (adsbygoogle = window.adsbygoogle || []).push({});
}

// Analytics tracking (placeholder)
function trackEvent(action, category, label) {
    // This would connect to Google Analytics or similar
    console.log('Event tracked:', { action, category, label });
}

// Search functionality for chakras
function searchChakras(query) {
    const chakraElements = document.querySelectorAll('.chakra-card');
    const lowerQuery = query.toLowerCase();
    
    chakraElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Print functionality for chakra information
function printChakraInfo(chakra) {
    const element = document.querySelector(`[data-chakra="${chakra}"]`);
    if (element) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${chakra} Chakra Information</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #333; }
                        h2 { color: #666; }
                        p { line-height: 1.6; }
                    </style>
                </head>
                <body>
                    ${element.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any components that need setup
    console.log('Chakra Encyclopedia loaded successfully');
    
    // Track page view
    trackEvent('page_view', 'engagement', 'home_page');
});

// Export functions for external use if needed
window.ChakraEncyclopedia = {
    startChakraTest,
    closeChakraTest,
    showChakraInfo,
    openMeditationModal,
    closeMeditationModal,
    playChakraFrequency,
    stopChakraFrequency,
    updateFrequencyVisualizer,
    togglePrintMode
};

// Show Chakra Info function for interactive body map
function showChakraInfo(chakra) {
    const chakraInfo = document.getElementById('chakraInfo');
    const chakraName = document.getElementById('chakraName');
    const chakraDescription = document.getElementById('chakraDescription');
    const chakraSymbol = document.getElementById('chakraSymbol');
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    const chakraInfoData = {
        crown: {
            name: 'Crown Chakra (Sahasrara)',
            description: 'Spiritual connection, enlightenment, and cosmic consciousness. Located at the top of the head.',
            symbol: '✦',
            color: '#8B00FF'
        },
        'third-eye': {
            name: 'Third Eye Chakra (Ajna)',
            description: 'Intuition, insight, and psychic abilities. Located between the eyebrows.',
            symbol: 'ॐ',
            color: '#4B0082'
        },
        throat: {
            name: 'Throat Chakra (Vishuddha)',
            description: 'Communication, expression, and truth. Located at the throat.',
            symbol: 'हं',
            color: '#0000FF'
        },
        heart: {
            name: 'Heart Chakra (Anahata)',
            description: 'Love, compassion, and emotional balance. Located at the center of the chest.',
            symbol: 'यं',
            color: '#00FF00'
        },
        solar: {
            name: 'Solar Plexus (Manipura)',
            description: 'Personal power, confidence, and transformation. Located in the upper abdomen.',
            symbol: 'रं',
            color: '#FFD700'
        },
        sacral: {
            name: 'Sacral Chakra (Svadhisthana)',
            description: 'Creativity, sexuality, and emotional well-being. Located below the navel.',
            symbol: 'वं',
            color: '#FF8C00'
        },
        root: {
            name: 'Root Chakra (Muladhara)',
            description: 'Grounding, stability, and survival instincts. Located at the base of the spine.',
            symbol: 'लं',
            color: '#FF0000'
        }
    };

    const data = chakraInfoData[chakra];
    if (data) {
        // Show info
        chakraInfo.classList.remove('hidden');
        chakraName.textContent = data.name;
        chakraDescription.textContent = data.description;
        chakraSymbol.textContent = data.symbol;
        chakraSymbol.style.color = data.color;
        learnMoreBtn.setAttribute('data-chakra', chakra);
        learnMoreBtn.style.backgroundColor = data.color;
    }
}

// Meditation modal functions
function openMeditationModal(chakra) {
    const modal = document.getElementById('meditationModal');
    const content = document.getElementById('meditationContent');
    
    const meditationData = {
        root: {
            title: 'Root Chakra Meditation',
            mantra: 'लं (LAM)',
            visualization: 'Red sphere at base of spine, roots extending into earth',
            breathwork: '4-4-4 breathing (inhale 4, hold 4, exhale 4)'
        },
        sacral: {
            title: 'Sacral Chakra Meditation',
            mantra: 'वं (VAM)',
            visualization: 'Orange water flowing through pelvis',
            breathwork: '4-7-8 breathing (inhale 4, hold 7, exhale 8)'
        },
        solar: {
            title: 'Solar Plexus Meditation',
            mantra: 'रं (RAM)',
            visualization: 'Golden sun in upper abdomen',
            breathwork: 'Rapid exhales with breath of fire'
        },
        heart: {
            title: 'Heart Chakra Meditation',
            mantra: 'यं (YAM)',
            visualization: 'Green light expanding from chest',
            breathwork: '4-7-8 breathing (inhale 4, hold 7, exhale 8)'
        },
        throat: {
            title: 'Throat Chakra Meditation',
            mantra: 'हं (HAM)',
            visualization: 'Blue light flowing from throat',
            breathwork: 'Alternate nostril breathing'
        },
        'third-eye': {
            title: 'Third Eye Meditation',
            mantra: 'ॐ (OM)',
            visualization: 'Indigo flame between eyebrows',
            breathwork: '2:1 ratio breathing (exhale twice as long as inhale)'
        },
        crown: {
            title: 'Crown Chakra Meditation',
            mantra: '✦ (Silence)',
            visualization: 'Violet light streaming upward from crown',
            breathwork: 'Natural breathing with focus on crown'
        }
    };

    const data = meditationData[chakra];
    if (data) {
        content.innerHTML = `
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-4">${data.title}</h3>
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold">Mantra:</h4>
                        <p class="text-lg">${data.mantra}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold">Visualization:</h4>
                        <p>${data.visualization}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold">Breathwork:</h4>
                        <p>${data.breathwork}</p>
                    </div>
                </div>
                <button onclick="closeMeditationModal()" class="mt-6 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
                    Close
                </button>
            </div>
        `;
        modal.classList.remove('hidden');
    }
}

function closeMeditationModal() {
    const modal = document.getElementById('meditationModal');
    modal.classList.add('hidden');
}

// Web Audio API frequency functions
let audioContext = null;
let currentOscillator = null;
let currentGainNode = null;

function playChakraFrequency(frequency, chakra) {
    // Stop any currently playing frequency
    stopChakraFrequency();
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Create oscillator and gain nodes
    currentOscillator = audioContext.createOscillator();
    currentGainNode = audioContext.createGain();
    
    // Configure oscillator
    currentOscillator.type = 'sine';
    currentOscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Configure gain (volume) with fade in/out
    currentGainNode.gain.setValueAtTime(0, audioContext.currentTime);
    currentGainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    currentGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);
    
    // Connect nodes
    currentOscillator.connect(currentGainNode);
    currentGainNode.connect(audioContext.destination);
    
    // Start and schedule stop
    currentOscillator.start(audioContext.currentTime);
    currentOscillator.stop(audioContext.currentTime + 3);
    
    // Update visualizer
    updateFrequencyVisualizer(frequency, chakra);
    
    // Auto-stop cleanup
    setTimeout(() => {
        stopChakraFrequency();
    }, 3000);
}

function stopChakraFrequency() {
    if (currentOscillator) {
        try {
            currentOscillator.stop();
        } catch (e) {
            // Oscillator already stopped
        }
        currentOscillator = null;
    }
    if (currentGainNode) {
        currentGainNode = null;
    }
}

function updateFrequencyVisualizer(frequency, chakra) {
    const visualizer = document.getElementById('frequency-visualizer');
    if (!visualizer) return;
    
    const colors = {
        root: '#ef4444',
        sacral: '#f97316',
        solar: '#eab308',
        heart: '#22c55e',
        throat: '#3b82f6',
        'third-eye': '#6366f1',
        crown: '#a855f7'
    };
    
    const color = colors[chakra] || '#8b5cf6';
    
    // Create visual representation of the frequency
    visualizer.innerHTML = `
        <div class="w-full h-full flex items-center justify-center relative">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-2 h-2 rounded-full animate-pulse" style="background-color: ${color}"></div>
            </div>
            <div class="text-center">
                <div class="text-lg font-bold" style="color: ${color}">${chakra.charAt(0).toUpperCase() + chakra.slice(1).replace('-', ' ')}</div>
                <div class="text-sm font-mono" style="color: ${color}">${frequency} Hz</div>
                <div class="text-xs text-gray-500 mt-1">Playing...</div>
            </div>
        </div>
    `;
    
    // Clear visualizer after sound stops
    setTimeout(() => {
        if (visualizer.innerHTML.includes('Playing...')) {
            visualizer.innerHTML = '<span class="text-sm text-gray-500 dark:text-gray-400">Click a chakra to visualize its frequency</span>';
        }
    }, 3000);
}

// Print functionality
function togglePrintMode() {
    const body = document.body;
    const journalSection = document.getElementById('journaling');
    
    if (body.classList.contains('print-mode')) {
        body.classList.remove('print-mode');
        // Restore original styles
        document.querySelectorAll('.print-mode .bg-white').forEach(el => {
            el.classList.remove('bg-white', 'dark:bg-dark-card');
            el.classList.add('bg-white');
        });
    } else {
        body.classList.add('print-mode');
        // Apply print-friendly styles
        const style = document.createElement('style');
        style.textContent = `
            .print-mode { background: white !important; color: black !important; }
            .print-mode .bg-white, .print-mode .dark\\:bg-dark-card { 
                background: white !important; 
                color: black !important;
                border: 1px solid #ccc !important;
                margin: 20px auto !important;
                padding: 20px !important;
                max-width: 800px !important;
            }
            .print-mode .text-gray-600, .print-mode .text-gray-300,
            .print-mode .text-purple-600, .print-mode .text-purple-400,
            .print-mode .text-red-600, .print-mode .text-red-400,
            .print-mode .text-orange-600, .print-mode .text-orange-400,
            .print-mode .text-yellow-600, .print-mode .text-yellow-400,
            .print-mode .text-green-600, .print-mode .text-green-400,
            .print-mode .text-blue-600, .print-mode .text-blue-400,
            .print-mode .text-indigo-600, .print-mode .text-indigo-400,
            .print-mode .text-purple-600, .print-mode .text-purple-400 {
                color: black !important;
            }
            .print-mode .text-gray-800, .print-mode .text-dark-text {
                color: black !important;
            }
            .print-mode .shadow-md, .print-mode .hover\\:shadow-lg {
                box-shadow: none !important;
            }
            .print-mode .glass {
                background: white !important;
                backdrop-filter: none !important;
            }
            @media print {
                .print-mode button { display: none !important; }
                .print-mode .grid { display: block !important; }
                .print-mode .grid > div { margin-bottom: 30px !important; }
            }
        `;
        document.head.appendChild(style);
        
        // Scroll to journaling section
        if (journalSection) {
            journalSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Show print dialog after a short delay
        setTimeout(() => {
            window.print();
        }, 1000);
    }
}
    playMeditation,
    shareOnSocial,
    searchChakras,
    printChakraInfo
};
