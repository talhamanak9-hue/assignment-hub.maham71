// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// ===== FADE IN ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== PAST WORK FILTER =====
const workTabs = document.querySelectorAll('.work-tab');
const workCards = document.querySelectorAll('.work-card');

workTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        workTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        
        workCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== FORM SUBMISSION =====
document.getElementById('quoteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your quote request has been submitted. We will contact you shortly via WhatsApp or Email.');
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== PAYMENT LOGO FALLBACK =====
document.querySelectorAll('.payment-logo img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = this.nextElementSibling;
        if (fallback && fallback.classList.contains('payment-fallback')) {
            fallback.style.display = 'flex';
        }
    });
});

// ===== PAYMENT MODAL FUNCTIONS =====
const paymentData = {
    esaypaisa: {
        title: 'Esaypaisa',
        iconClass: 'esaypaisa',
        iconHtml: '<i class="fas fa-mobile-alt"></i>',
        desc: 'Send payment to this Esaypaisa account',
        numbers: [
            { label: 'Account Number', value: '0307-6928197' }
        ]
    },
    jazzcash: {
        title: 'JazzCash',
        iconClass: 'jazzcash',
        iconHtml: '<i class="fas fa-mobile-alt"></i>',
        desc: 'Send payment to this JazzCash account',
        numbers: [
            { label: 'Account Number', value: '0306-1996734' }
        ]
    },
    bank: {
        title: 'Bank Transfer',
        iconClass: 'bank',
        iconHtml: '<i class="fas fa-university"></i>',
        desc: 'Use these details for bank transfer',
        numbers: [
            { label: 'Account Number', value: '1445558151009267' },
            { label: 'IBAN', value: 'PK27MUCB1445558151009267' }
        ]
    }
};

let currentCopyValues = [];

function openPaymentModal(type) {
    const modal = document.getElementById('paymentModal');
    const data = paymentData[type];
    
    if (!data) return;
    
    // Set modal content
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    
    // Set icon
    const iconEl = document.getElementById('modalIcon');
    iconEl.className = 'modal-icon ' + data.iconClass;
    iconEl.innerHTML = data.iconHtml;
    
    // Build number boxes
    const numbersContainer = document.getElementById('modalNumbers');
    numbersContainer.innerHTML = '';
    currentCopyValues = [];
    
    data.numbers.forEach((num) => {
        const box = document.createElement('div');
        box.className = 'modal-number-box';
        box.innerHTML = `
            <div class="modal-number">${num.value}</div>
            <div class="modal-number-label">${num.label}</div>
        `;
        numbersContainer.appendChild(box);
        currentCopyValues.push(num.value);
    });
    
    // Reset copy button
    const copyBtn = document.getElementById('modalCopyBtn');
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy All';
    copyBtn.classList.remove('copied');
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function copyModalNumber() {
    if (currentCopyValues.length === 0) return;
    
    const textToCopy = currentCopyValues.join('\n');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.getElementById('modalCopyBtn');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy All';
            btn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        const btn = document.getElementById('modalCopyBtn');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy All';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Close modal on overlay click
document.getElementById('paymentModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePaymentModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePaymentModal();
    }
});