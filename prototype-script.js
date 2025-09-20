// PROTOTYPE SCRIPT - MonQuartier Amélioré

// Variables globales
let currentStep = 1;
let formData = {};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializePrototype();
});

function initializePrototype() {
    // Animation d'entrée pour les éléments
    animateOnScroll();
    
    // Gestion des boutons de notation
    initializeRatingButtons();
    
    // Validation en temps réel
    initializeFormValidation();
}

// NAVIGATION PRINCIPALE
function startEvaluation() {
    // Animation de transition
    const heroSection = document.querySelector('.hero-prototype');
    const formSection = document.querySelector('.form-prototype');
    
    heroSection.style.transform = 'translateY(-100%)';
    heroSection.style.transition = 'transform 0.6s ease-in-out';
    
    setTimeout(() => {
        heroSection.style.display = 'none';
        formSection.style.display = 'block';
        formSection.style.opacity = '0';
        formSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            formSection.style.transition = 'all 0.6s ease-out';
            formSection.style.opacity = '1';
            formSection.style.transform = 'translateY(0)';
        }, 50);
    }, 300);
}

function showAvis() {
    // Scroll fluide vers la section avis
    const avisSection = document.querySelector('.avis-prototype');
    avisSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Animation des cartes d'avis
    setTimeout(() => {
        const avisCards = document.querySelectorAll('.avis-card');
        avisCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 150);
        });
    }, 500);
}

function goToHome() {
    // Retour à la section hero (accueil)
    const heroSection = document.querySelector('.hero-prototype');
    const formSection = document.querySelector('.form-prototype');
    
    // Animation de transition
    formSection.style.transform = 'translateY(100%)';
    formSection.style.transition = 'transform 0.6s ease-in-out';
    
    setTimeout(() => {
        formSection.style.display = 'none';
        heroSection.style.display = 'block';
        heroSection.style.transform = 'translateY(0)';
        heroSection.style.transition = 'transform 0.6s ease-in-out';
        
        // Reset du formulaire
        currentStep = 1;
        formData = {};
        updateProgressBar();
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
}

function goToAvisSection() {
    // Fermer le modal
    closeModal();
    
    // Attendre que le modal se ferme puis naviguer
    setTimeout(() => {
        // Retourner à l'accueil d'abord
        const heroSection = document.querySelector('.hero-prototype');
        const formSection = document.querySelector('.form-prototype');
        
        formSection.style.display = 'none';
        heroSection.style.display = 'block';
        heroSection.style.transform = 'translateY(0)';
        
        // Reset du formulaire
        currentStep = 1;
        formData = {};
        updateProgressBar();
        
        // Puis scroll vers la section avis
        setTimeout(() => {
            const avisSection = document.querySelector('.avis-prototype');
            avisSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
        }, 500);
    }, 300);
}

// GESTION DES ÉTAPES DU FORMULAIRE
function nextStep() {
    // Validation de l'étape actuelle
    if (!validateCurrentStep()) {
        return;
    }
    
    // Sauvegarde des données
    saveStepData();
    
    // Animation de transition
    const currentStepEl = document.getElementById(`step-${currentStep}`);
    const nextStepEl = document.getElementById(`step-${currentStep + 1}`);
    
    // Animation de sortie
    currentStepEl.style.transform = 'translateX(-100%)';
    currentStepEl.style.opacity = '0';
    currentStepEl.style.transition = 'all 0.4s ease-in-out';
    
    setTimeout(() => {
        currentStepEl.style.display = 'none';
        nextStepEl.style.display = 'block';
        nextStepEl.style.transform = 'translateX(100%)';
        nextStepEl.style.opacity = '0';
        
        setTimeout(() => {
            nextStepEl.style.transition = 'all 0.4s ease-out';
            nextStepEl.style.transform = 'translateX(0)';
            nextStepEl.style.opacity = '1';
        }, 50);
    }, 200);
    
    // Mise à jour de la barre de progression
    currentStep++;
    updateProgressBar();
    
    // Animation de confetti pour la dernière étape
    if (currentStep === 2) {
        setTimeout(() => {
            createConfetti();
        }, 400);
    }
}

function prevStep() {
    if (currentStep <= 1) return;
    
    const currentStepEl = document.getElementById(`step-${currentStep}`);
    const prevStepEl = document.getElementById(`step-${currentStep - 1}`);
    
    // Animation de retour
    currentStepEl.style.transform = 'translateX(100%)';
    currentStepEl.style.opacity = '0';
    currentStepEl.style.transition = 'all 0.4s ease-in-out';
    
    setTimeout(() => {
        currentStepEl.style.display = 'none';
        prevStepEl.style.display = 'block';
        prevStepEl.style.transform = 'translateX(-100%)';
        prevStepEl.style.opacity = '0';
        
        setTimeout(() => {
            prevStepEl.style.transition = 'all 0.4s ease-out';
            prevStepEl.style.transform = 'translateX(0)';
            prevStepEl.style.opacity = '1';
        }, 50);
    }, 200);
    
    currentStep--;
    updateProgressBar();
}

function updateProgressBar() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
            // Animation du numéro
            const stepNumber = step.querySelector('.step-number');
            stepNumber.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stepNumber.style.transform = 'scale(1)';
            }, 200);
        } else {
            step.classList.remove('active');
        }
    });
}

// SYSTÈME DE NOTATION AMÉLIORÉ
function initializeRatingButtons() {
    const ratingButtons = document.querySelectorAll('.rating-btn');
    
    ratingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ratingItem = this.closest('.rating-item');
            const buttons = ratingItem.querySelectorAll('.rating-btn');
            
            // Retirer la sélection précédente
            buttons.forEach(btn => btn.classList.remove('selected'));
            
            // Ajouter la nouvelle sélection
            this.classList.add('selected');
            
            // Animation de feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 150);
            
            // Vibration tactile (si supportée)
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            // Sauvegarde de la note
            const criterion = ratingItem.querySelector('label').textContent;
            const value = this.dataset.value;
            formData[criterion] = value;
            
            // Vérification si toutes les notes sont données
            checkAllRatingsComplete();
        });
        
        // Effet hover amélioré
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

function checkAllRatingsComplete() {
    const ratingItems = document.querySelectorAll('.rating-item');
    const selectedRatings = document.querySelectorAll('.rating-btn.selected');
    
    if (selectedRatings.length === ratingItems.length) {
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.style.background = 'linear-gradient(45deg, #48bb78, #38a169)';
        submitBtn.innerHTML = `
            <span>Publier mon avis</span>
            <span class="btn-icon">✨</span>
        `;
        
        // Animation de pulsation
        submitBtn.style.animation = 'pulse 2s infinite';
    }
}

// VALIDATION DU FORMULAIRE
function validateCurrentStep() {
    if (currentStep === 1) {
        const commune = document.getElementById('commune').value;
        if (!commune) {
            showValidationError('Veuillez sélectionner votre commune');
            return false;
        }
    }
    return true;
}

function saveStepData() {
    if (currentStep === 1) {
        formData.commune = document.getElementById('commune').value;
        formData.quartier = document.getElementById('quartier').value;
    }
}

function initializeFormValidation() {
    const commune = document.getElementById('commune');
    const quartier = document.getElementById('quartier');
    
    // Validation en temps réel
    commune.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#48bb78';
            hideValidationError();
        }
    });
    
    // Auto-complétion pour le quartier
    quartier.addEventListener('input', function() {
        // Simulation d'auto-complétion
        if (this.value.length > 2) {
            showAutoComplete(this.value);
        }
    });
}

function showValidationError(message) {
    // Retirer l'erreur précédente
    hideValidationError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.innerHTML = `
        <span class="error-icon">⚠️</span>
        <span class="error-message">${message}</span>
    `;
    errorDiv.style.cssText = `
        background: #fed7d7;
        color: #c53030;
        padding: 12px 16px;
        border-radius: 8px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: shake 0.5s ease-in-out;
    `;
    
    const stepContent = document.querySelector(`#step-${currentStep} .step-content`);
    stepContent.appendChild(errorDiv);
    
    // Animation de secousse
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

function hideValidationError() {
    const errorDiv = document.querySelector('.validation-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// SOUMISSION DU FORMULAIRE
function submitForm() {
    // Vérification finale
    const selectedRatings = document.querySelectorAll('.rating-btn.selected');
    if (selectedRatings.length < 3) {
        showValidationError('Veuillez évaluer tous les critères');
        return;
    }
    
    // Animation de chargement
    const submitBtn = document.querySelector('.btn-submit');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
        <div class="loading-spinner"></div>
        <span>Publication en cours...</span>
    `;
    submitBtn.disabled = true;
    
    // Ajout du CSS pour le spinner
    if (!document.querySelector('#spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.textContent = `
            .loading-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Simulation d'envoi
    setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        showConfirmationModal();
    }, 2000);
}

// MODAL DE CONFIRMATION
function showConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.style.display = 'flex';
    
    // Animation d'entrée
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease-out';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 50);
    
    // Confetti
    setTimeout(() => {
        createConfetti();
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('confirmation-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        // Retour à la section avis
        showAvis();
    }, 300);
}

// EFFETS VISUELS
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                z-index: 10000;
                border-radius: 50%;
                pointer-events: none;
                animation: confettiFall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
    
    // CSS pour l'animation de confetti
    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    });
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.avis-card, .stat-item');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// AUTO-COMPLÉTION SIMULÉE
function showAutoComplete(value) {
    const suggestions = [
        'Belleville', 'Montmartre', 'Le Marais', 'Saint-Germain',
        'Croix-Rousse', 'Presqu\'île', 'Vieux Lyon',
        'Vieux Port', 'Canebière', 'Notre-Dame du Mont'
    ];
    
    const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
    );
    
    if (filtered.length > 0) {
        // Simulation d'affichage des suggestions
        console.log('Suggestions:', filtered);
    }
}

// GESTION DES ERREURS
window.addEventListener('error', function(e) {
    console.error('Erreur prototype:', e.error);
});

// ANALYTICS SIMULÉES
function trackEvent(action, category = 'prototype') {
    console.log(`📊 Event tracked: ${category} - ${action}`);
}

// Tracking des interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-primary')) {
        trackEvent('cta_primary_click');
    }
    if (e.target.classList.contains('rating-btn')) {
        trackEvent('rating_click');
    }
});