/* ==========================================
   Temio Landing Page - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    mobileMenuClose?.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Demo tabs
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${targetTab}-panel`).classList.add('active');
            
            // Re-render chart when company tab is shown
            if (targetTab === 'company') {
                renderChart();
            }
        });
    });

    // Ideas data
    const ideasData = [
        {
            id: 1,
            title: 'Implementar viernes de home office',
            description: 'Permitir trabajo remoto los viernes para mejorar el balance vida-trabajo',
            category: 'bienestar',
            votes: 47,
            comments: 12,
            author: 'Anónimo'
        },
        {
            id: 2,
            title: 'Crear programa de mentorías',
            description: 'Emparejar empleados senior con juniors para transferencia de conocimiento',
            category: 'procesos',
            votes: 38,
            comments: 8,
            author: 'María G.'
        },
        {
            id: 3,
            title: 'Hackathon trimestral',
            description: 'Organizar eventos de innovación cada 3 meses con premios',
            category: 'innovacion',
            votes: 35,
            comments: 15,
            author: 'Carlos R.'
        },
        {
            id: 4,
            title: 'Mejorar cafetería',
            description: 'Añadir opciones vegetarianas y veganas al menú diario',
            category: 'bienestar',
            votes: 29,
            comments: 6,
            author: 'Anónimo'
        },
        {
            id: 5,
            title: 'Team building outdoor',
            description: 'Actividad al aire libre para fortalecer relaciones entre equipos',
            category: 'eventos',
            votes: 52,
            comments: 21,
            author: 'Laura M.'
        }
    ];

    // Render ideas
    const ideasList = document.getElementById('ideasList');
    let votedIdeas = new Set();

    function renderIdeas(filter = 'all') {
        const filteredIdeas = filter === 'all' 
            ? ideasData 
            : ideasData.filter(idea => idea.category === filter);
        
        ideasList.innerHTML = filteredIdeas.map(idea => `
            <div class="idea-card" data-category="${idea.category}">
                <div class="idea-votes">
                    <button class="vote-btn ${votedIdeas.has(idea.id) ? 'voted' : ''}" data-id="${idea.id}">
                        <i data-lucide="chevron-up"></i>
                    </button>
                    <span class="vote-count">${idea.votes}</span>
                </div>
                <div class="idea-content">
                    <h4>${idea.title}</h4>
                    <p>${idea.description}</p>
                    <div class="idea-meta">
                        <span class="idea-tag">${idea.category}</span>
                        <span><i data-lucide="message-circle"></i> ${idea.comments}</span>
                        <span><i data-lucide="user"></i> ${idea.author}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        lucide.createIcons();
        
        // Add vote handlers
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const idea = ideasData.find(i => i.id === id);
                const countEl = btn.nextElementSibling;
                
                if (votedIdeas.has(id)) {
                    votedIdeas.delete(id);
                    idea.votes--;
                    btn.classList.remove('voted');
                } else {
                    votedIdeas.add(id);
                    idea.votes++;
                    btn.classList.add('voted');
                }
                
                countEl.textContent = idea.votes;
            });
        });
    }

    renderIdeas();

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderIdeas(btn.dataset.filter);
        });
    });

    // Company ideas list
    const companyIdeasList = document.getElementById('companyIdeasList');
    
    function renderCompanyIdeas() {
        const pendingIdeas = ideasData.slice(0, 4);
        companyIdeasList.innerHTML = pendingIdeas.map(idea => `
            <div class="company-idea-item">
                <div class="company-idea-info">
                    <h5>${idea.title}</h5>
                    <span>
                        <span class="vote-badge"><i data-lucide="thumbs-up"></i> ${idea.votes}</span>
                        ${idea.category}
                    </span>
                </div>
                <div class="company-idea-actions">
                    <button class="action-btn approve" title="Aprobar">
                        <i data-lucide="check"></i>
                    </button>
                    <button class="action-btn reject" title="Rechazar">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        lucide.createIcons();
        
        // Add action handlers
        document.querySelectorAll('.action-btn.approve').forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.company-idea-item');
                item.style.background = '#dcfce7';
                item.style.borderLeft = '4px solid #166534';
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                    setTimeout(() => item.remove(), 300);
                }, 500);
            });
        });
        
        document.querySelectorAll('.action-btn.reject').forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.company-idea-item');
                item.style.background = '#fee2e2';
                item.style.borderLeft = '4px solid #991b1b';
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => item.remove(), 300);
                }, 500);
            });
        });
    }

    renderCompanyIdeas();

    // Chart
    function renderChart() {
        const ctx = document.getElementById('participationChart');
        if (!ctx) return;
        
        // Get the wrapper dimensions
        const wrapper = ctx.closest('.chart-wrapper');
        if (!wrapper) return;
        
        // Destroy existing chart if any
        if (window.participationChartInstance) {
            window.participationChartInstance.destroy();
            window.participationChartInstance = null;
        }
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            window.participationChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Participación %',
                        data: [45, 52, 58, 61, 65, 68],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: '#6366f1',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#1f2937',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            padding: 12,
                            cornerRadius: 8,
                            displayColors: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: value => value + '%',
                                color: '#6b7280'
                            },
                            grid: {
                                color: '#e5e7eb'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#6b7280'
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }, 100);
    }

    // Pricing toggle
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    const priceValues = document.querySelectorAll('.price-value[data-monthly]');

    pricingToggle?.addEventListener('click', () => {
        pricingToggle.classList.toggle('active');
        const isAnnual = pricingToggle.classList.contains('active');
        
        monthlyLabel.classList.toggle('active', !isAnnual);
        annualLabel.classList.toggle('active', isAnnual);
        
        priceValues.forEach(el => {
            const price = isAnnual ? el.dataset.annual : el.dataset.monthly;
            el.textContent = '€' + price;
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Modal
    const ideaModal = document.getElementById('ideaModal');
    const newIdeaBtn = document.getElementById('newIdeaBtn');
    const closeModal = document.getElementById('closeModal');
    const ideaForm = document.getElementById('ideaForm');

    newIdeaBtn?.addEventListener('click', () => {
        ideaModal.classList.add('active');
    });

    closeModal?.addEventListener('click', () => {
        ideaModal.classList.remove('active');
    });

    ideaModal?.addEventListener('click', (e) => {
        if (e.target === ideaModal) {
            ideaModal.classList.remove('active');
        }
    });

    ideaForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate adding idea
        alert('¡Idea enviada con éxito! En una implementación real, se guardaría en la base de datos.');
        ideaModal.classList.remove('active');
        ideaForm.reset();
    });

    // CTA Form
    const ctaForm = document.getElementById('ctaForm');
    ctaForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu interés! Te contactaremos pronto para agendar tu demo.');
        ctaForm.reset();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
