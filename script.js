// Initialize Interactive Portfolio Logic
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Custom Premium Lagging Cursor Glow
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    let mouseX = 0, mouseY = 0; // Current mouse coords
    let outlineX = 0, outlineY = 0; // Lagging outline coords
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instantly move the dot pointer
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    // Animate lagging outline (linear interpolation for cinematic smoothness)
    const animateCursor = () => {
        // Outline lag speed (higher value = less lag, lower value = more smooth drift)
        const lerpFactor = 0.15; 
        
        outlineX += (mouseX - outlineX) * lerpFactor;
        outlineY += (mouseY - outlineY) * lerpFactor;
        
        if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Trigger cursor scaling on interactive items hover
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .terminal-tab, [data-tilt]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });


    /* ==========================================================================
       2. Dynamic Spotlight Coordinate Tracker
       ========================================================================== */
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse relative X inside card
            const y = e.clientY - rect.top;  // Mouse relative Y inside card
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    /* ==========================================================================
       3. Interactive 3D Card Tilt Engine
       ========================================================================== */
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust divisor to increase/decrease degrees of rotation
            const rotateX = (y - centerY) / 16;
            const rotateY = (centerX - x) / 16;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            // Smoothly reset back to parallel flat position
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
        
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });


    /* ==========================================================================
       4. Floating Pill Navigation Active States & Mobile Dock
       ========================================================================== */
    const navLinks = document.querySelectorAll('.glass-nav ul li a');
    const sections = document.querySelectorAll('section');
    const scrollBar = document.getElementById('scroll-bar');
    
    // Mobile navigation bar toggle handler
    const mobileToggle = document.getElementById('mobile-toggle');
    const navBar = document.querySelector('.glass-nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navBar.classList.toggle('active');
        });
    }

    // Highlighting navigation and fill scrollbar based on viewport scroll height
    window.addEventListener('scroll', () => {
        // Calculate scrollbar fill percentage
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) {
            scrollBar.style.width = `${scrolled}%`;
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Highlight when scrolled at least 150px into section bounding offset
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth navigation jumps
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Close mobile menu if active
            if (navBar) navBar.classList.remove('active');
            
            const targetID = this.getAttribute('href');
            const targetSection = document.querySelector(targetID);
            
            if (targetSection) {
                // Smooth scroll to element, accounting for floating menu padding
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ==========================================================================
       5. Interactive Profile Terminal Parser Shell
       ========================================================================== */
    const terminalTabs = document.querySelectorAll('.terminal-tab');
    const terminalPanes = document.querySelectorAll('.terminal-content .terminal-pane');
    const terminalTextInput = document.getElementById('terminal-text-input');
    const terminalContent = document.querySelector('.terminal-content');
    
    // Tab switching listener
    terminalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const paneName = tab.getAttribute('data-pane');
            
            terminalTabs.forEach(t => t.classList.remove('active'));
            terminalPanes.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const targetPane = document.getElementById(`pane-${paneName}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            // Simulated scrolling update to look like command print out
            terminalContent.scrollTop = 0;
        });
    });

    // Custom Interactive Shell execution logic
    if (terminalTextInput) {
        // Simple helper to append outputs to terminal pane
        const appendToTerminal = (command, responseHtml) => {
            // Find current active pane inside terminal container
            const activePane = document.querySelector('.terminal-pane.active');
            if (activePane) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'terminal-line';
                lineDiv.innerHTML = `
                    <span class="terminal-prefix">visitor@guest:~$</span>
                    <span class="terminal-command">${command}</span>
                    <div class="terminal-output">${responseHtml}</div>
                `;
                // Add the output directly above input-line
                const inputLine = document.querySelector('.terminal-input-line');
                activePane.insertBefore(lineDiv, inputLine);
                
                // Keep scrolled to bottom
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }
        };

        terminalTextInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputVal = terminalTextInput.value.trim().toLowerCase();
                terminalTextInput.value = ''; // empty input field

                if (!inputVal) return;

                let response = '';

                switch (inputVal) {
                    case 'help':
                        response = `
                            Available commands:<br>
                            - <strong>bio</strong> : Prints bio and background profile information.<br>
                            - <strong>stack</strong> : Prints complete programming technologies setup.<br>
                            - <strong>goals</strong> : Prints professional objectives lists.<br>
                            - <strong>contact</strong> : Reveals official mailing address details.<br>
                            - <strong>social</strong> : Displays instant GitHub and LinkedIn coordinates.<br>
                            - <strong>clear</strong> : Wipes out visitor inputs in this view.
                        `;
                        break;
                    case 'bio':
                        response = 'Mahesh Saha is a passionate software developer building full-stack web applications and data-driven solutions using HTML5, CSS3, JavaScript, Python, Flask, and Pandas, with an active focus on Machine Learning.';
                        break;
                    case 'stack':
                        response = 'Core Stack: HTML5, CSS3, JavaScript (ES6+), Python, Flask, and Pandas. Actively learning Scikit-Learn for Machine Learning.';
                        break;
                    case 'goals':
                        response = 'Objectives: Build full-stack Flask applications, process large datasets using Pandas, and master Machine Learning modeling to implement smart prediction features.';
                        break;
                    case 'contact':
                        response = 'Mailing coordinates: <strong>maheshsaha2007@gmail.com</strong>. Base location: Jaipur, Rajasthan, India.';
                        break;
                    case 'social':
                        response = `
                            GitHub: <a href="https://github.com/Maheshsaha2007" target="_blank" style="color: var(--primary-color);">github.com/Maheshsaha2007</a><br>
                            LinkedIn: <a href="https://www.linkedin.com/in/mahesh-saha-a8438a377" target="_blank" style="color: var(--primary-color);">linkedin.com/in/mahesh-saha-a8438a377</a>
                        `;
                        break;
                    case 'clear':
                        // Locate and clear user outputs inside current pane
                        const userLines = document.querySelectorAll('.terminal-pane.active .terminal-line');
                        userLines.forEach((line, index) => {
                            // Leave only the original index 0 system script
                            if (index > 0) line.remove();
                        });
                        return;
                    default:
                        response = `shell: command not found: <strong>${inputVal}</strong>. Type <strong>help</strong> to review available parameters.`;
                }

                appendToTerminal(inputVal, response);
            }
        });
    }


    /* ==========================================================================
       6. Intersection Observer Skill SVG Dashboard Animation
       ========================================================================== */
    const progressCircles = document.querySelectorAll('.circle-progress');
    
    const animateSkillProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = parseInt(circle.getAttribute('data-target'), 10);
                
                // SVG Circle Circumference calculated by 2 * Math.PI * radius (54) = 339.29
                const circumference = 339.29;
                const offset = circumference - (circumference * percent / 100);
                
                // Animate SVG stroke offset
                circle.style.strokeDashoffset = offset;
                
                // Stop observing once animated
                observer.unobserve(circle);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkillProgress, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // animate slightly before view boundary
    });

    progressCircles.forEach(circle => {
        skillObserver.observe(circle);
    });


    /* ==========================================================================
       7. Interactive Contact Forms & Confirm Overlays
       ========================================================================== */
    const formInputs = document.querySelectorAll('.input-group input, .input-group textarea');
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Float label animation hooks
    formInputs.forEach(input => {
        // Set state on load if values exist (browser autofills)
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        }

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });

        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });
    });

    // Form Submission Overlays trigger
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // halt redirect
            
            // Clean up inputs visual placeholders
            formInputs.forEach(input => {
                input.value = '';
                input.parentElement.classList.remove('filled', 'focused');
            });
            
            // Show custom success modal
            if (successModal) {
                successModal.classList.add('active');
            }
        });
    }

    // Hide Modal handlers
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
        
        // Hide on backdrop overlay clicks
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }


    /* ==========================================================================
       8. Scroll Reveal Animations (Clean micro-transitions)
       ========================================================================== */
    const revealTargets = document.querySelectorAll('section, .glass, .spotlight-card, .skill-card, .project-card');

    const checkReveal = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(checkReveal, {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach(target => {
        target.classList.add('reveal-item'); // attach transition defaults in css
        revealObserver.observe(target);
    });

});
