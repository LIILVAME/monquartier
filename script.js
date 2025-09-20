// MonQuartier - Script principal
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants
    initMobileNavigation();
    initRatingSystem();
    // initMap(); // Supprimé - sera chargé à la demande
    initFilters();
    initComments();
    initFormValidation();
    initSmoothScrolling();
    initStepNavigation(); // Navigation par étapes pour le formulaire lean
    initLazyMapLoading(); // Nouveau système de lazy loading
    initOnboardingModal(); // Modal d'accueil
});

// Navigation mobile
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animation du hamburger
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach((line, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                }
            });
        });
        
        // Fermer le menu lors du clic sur un lien
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            });
        });
    }
}

// Système de notation par étoiles
function initRatingSystem() {
    const ratingGroups = document.querySelectorAll('.rating-simple');
    
    ratingGroups.forEach(group => {
        const options = group.querySelectorAll('.rating-option');
        const inputs = group.querySelectorAll('input[type="radio"]');
        
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                inputs[index].checked = true;
                updateRatingDisplay(group, inputs[index].value);
            });
        });
    });
}

function updateRatingDisplay(group, rating) {
    // Mise à jour visuelle déjà gérée par CSS :has()
    const criterion = group.closest('.criterion');
    if (criterion) {
        criterion.setAttribute('data-rating', rating);
    }
}

// Carte interactive avec Leaflet
// Initialisation de la carte
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Coordonnées d'Abidjan
    const abidjanCoords = [5.3600, -4.0083];
    
    // Initialisation de la carte
    const map = L.map('map').setView(abidjanCoords, 11);
    
    // Ajout des tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Données des communes d'Abidjan avec leurs coordonnées approximatives
    const communes = [
        { name: 'Abobo', coords: [5.4167, -4.0167], rating: 3.2 },
        { name: 'Adjamé', coords: [5.3667, -4.0167], rating: 3.8 },
        { name: 'Attécoubé', coords: [5.3333, -4.0333], rating: 3.5 },
        { name: 'Cocody', coords: [5.3500, -3.9833], rating: 4.2 },
        { name: 'Koumassi', coords: [5.2833, -3.9500], rating: 3.6 },
        { name: 'Marcory', coords: [5.2833, -4.0000], rating: 3.9 },
        { name: 'Plateau', coords: [5.3167, -4.0000], rating: 4.0 },
        { name: 'Port-Bouët', coords: [5.2333, -3.9167], rating: 3.4 },
        { name: 'Treichville', coords: [5.2833, -4.0167], rating: 3.7 },
        { name: 'Yopougon', coords: [5.3333, -4.0833], rating: 3.3 }
    ];
    
    // Ajout des marqueurs pour chaque commune
    communes.forEach(commune => {
        const marker = L.marker(commune.coords).addTo(map);
        
        // Couleur du marqueur basée sur la note
        const color = getRatingColor(commune.rating);
        
        // Popup avec informations
        const popupContent = `
            <div style="text-align: center; padding: 10px;">
                <h4 style="margin: 0 0 8px 0; color: #1e293b;">${commune.name}</h4>
                <div style="color: #f59e0b; font-size: 18px; margin-bottom: 5px;">
                    ${'★'.repeat(Math.round(commune.rating))}${'☆'.repeat(5 - Math.round(commune.rating))}
                </div>
                <p style="margin: 0; color: #475569; font-size: 14px;">
                    Note moyenne: ${commune.rating}/5
                </p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });
    
    // Ajustement automatique de la vue pour inclure tous les marqueurs
    const group = new L.featureGroup(communes.map(c => L.marker(c.coords)));
    map.fitBounds(group.getBounds().pad(0.1));
}

function getRatingColor(rating) {
    if (rating >= 4) return '#10b981'; // Vert
    if (rating >= 3) return '#f59e0b'; // Orange
    return '#ef4444'; // Rouge
}

// Système de filtrage
function initFilters() {
    const communeFilter = document.getElementById('commune-filter');
    
    if (communeFilter) {
        communeFilter.addEventListener('change', function() {
            const selectedCommune = this.value;
            filterContent(selectedCommune);
        });
    }
}

function filterContent(commune) {
    // Ici, vous pouvez implémenter la logique de filtrage
    // Par exemple, filtrer les commentaires ou les évaluations
    console.log('Filtrage par commune:', commune);
    
    // Exemple de filtrage des commentaires
    const comments = document.querySelectorAll('.comment');
    comments.forEach(comment => {
        const commentLocation = comment.querySelector('.comment-location');
        if (commentLocation) {
            const location = commentLocation.textContent.toLowerCase();
            if (commune === '' || location.includes(commune.toLowerCase())) {
                comment.style.display = 'block';
            } else {
                comment.style.display = 'none';
            }
        }
    });
}

// Modal d'onboarding
function initOnboardingModal() {
    const modal = document.getElementById('onboardingModal');
    const slides = document.querySelectorAll('.modal-slide');
    const indicators = document.querySelectorAll('.indicator');
    const skipBtn = document.querySelector('.modal-btn-skip');
    const nextBtn = document.querySelector('.modal-btn-next');
    const startBtn = document.querySelector('.modal-btn-start');
    
    let currentSlide = 0;
    
    // Vérifier si l'utilisateur a déjà vu l'onboarding
    if (localStorage.getItem('onboarding-seen') === 'true') {
        modal.classList.add('hidden');
        return;
    }
    
    // Afficher le modal
    modal.classList.remove('hidden');
    showSlide(currentSlide);
    
    // Navigation des slides
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Gérer les boutons
        if (index === slides.length - 1) {
            nextBtn.style.display = 'none';
            startBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            startBtn.style.display = 'none';
        }
    }
    
    // Événements
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    function closeModal() {
        modal.classList.add('hidden');
        localStorage.setItem('onboarding-seen', 'true');
    }
    
    skipBtn.addEventListener('click', closeModal);
    startBtn.addEventListener('click', closeModal);
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Gestion des commentaires
function initComments() {
    const commentForm = document.getElementById('comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCommentSubmission(this);
        });
    }
}

function handleCommentSubmission(form) {
    const commentText = form.querySelector('#comment-text').value.trim();
    
    if (commentText.length < 10) {
        showNotification('Votre commentaire doit contenir au moins 10 caractères.', 'error');
        return;
    }
    
    // Simulation de l'envoi du commentaire
    showNotification('✅ Votre commentaire a été soumis et sera modéré avant publication. Merci !', 'success');
    
    // Réinitialisation du formulaire
    form.reset();
    
    // Optionnel: Ajouter le commentaire à la liste (après modération simulée)
    setTimeout(() => {
        addCommentToList(commentText);
    }, 2000);
}

function addCommentToList(text) {
    const commentsList = document.getElementById('comments-list');
    const newComment = document.createElement('article');
    newComment.className = 'comment';
    
    const now = new Date();
    const dateString = now.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    newComment.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">Utilisateur anonyme</span>
            <span class="comment-location">Nouveau</span>
            <time class="comment-date" datetime="${now.toISOString()}">${dateString}</time>
        </div>
        <p class="comment-text">${escapeHtml(text)}</p>
    `;
    
    commentsList.insertBefore(newComment, commentsList.firstChild);
    
    // Animation d'apparition
    newComment.style.opacity = '0';
    newComment.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        newComment.style.transition = 'all 0.5s ease';
        newComment.style.opacity = '1';
        newComment.style.transform = 'translateY(0)';
    }, 100);
}

// Validation des formulaires
function initFormValidation() {
    const evaluationForm = document.getElementById('evaluation-form');
    
    if (evaluationForm) {
        evaluationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEvaluationSubmission(this);
        });
    }
}

function handleEvaluationSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validation des données
    if (!data.commune || !data.quartier) {
        showNotification('Veuillez sélectionner votre commune et votre quartier', 'error');
        return;
    }
    
    // Vérification qu'au moins une note a été donnée
    const hasRating = ['securite', 'proprete', 'transport'].some(criterion => data[criterion]);
    if (!hasRating) {
        showNotification('Veuillez donner au moins une note', 'error');
        return;
    }
    
    // Simulation d'envoi des données
    showNotification('Envoi en cours...', 'info');
    
    // Simulation d'un délai d'envoi
    setTimeout(() => {
        // Ici, vous ajouteriez l'appel à votre API
        console.log('Données à envoyer:', data);
        
        // Redirection vers la page de remerciement
        window.location.href = 'merci.html';
        
    }, 1500);
}

function resetAllRatings() {
    const ratingGroups = document.querySelectorAll('.rating-simple');
    ratingGroups.forEach(group => {
        const inputs = group.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.checked = false;
        });
        const criterion = group.closest('.criterion');
        if (criterion) {
            criterion.removeAttribute('data-rating');
        }
    });
}

// Défilement fluide
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        max-width: 400px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Couleurs selon le type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#2563eb'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique après 5 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Permettre la fermeture au clic
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Utilitaire pour échapper le HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showNotification('Une erreur inattendue s\'est produite.', 'error');
});

// Optimisation des performances - Lazy loading amélioré pour la carte
let mapInitialized = false;

function initLazyMapLoading() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Utiliser Intersection Observer pour une meilleure performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !mapInitialized) {
                console.log('🗺️ Chargement de la carte Leaflet...');
                showNotification('🗺️ Chargement de la carte interactive...', 'info');
                initMap();
                mapInitialized = true;
                observer.disconnect(); // Arrêter l'observation une fois chargé
            }
        });
    }, {
        rootMargin: '50px' // Charger 50px avant que l'élément soit visible
    });

    observer.observe(mapContainer);

    // Fallback : charger au clic sur la section carte
    const mapSection = mapContainer.closest('section');
    if (mapSection) {
        mapSection.addEventListener('click', () => {
            if (!mapInitialized) {
                console.log('🗺️ Chargement de la carte au clic...');
                showNotification('🗺️ Chargement de la carte interactive...', 'info');
                initMap();
                mapInitialized = true;
                observer.disconnect();
            }
        }, { once: true });
    }
}

// Navigation par étapes du formulaire
function initStepNavigation() {
    const form = document.getElementById('evaluation-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = form.querySelectorAll('.btn-next');
    const prevButtons = form.querySelectorAll('.btn-prev');
    
    let currentStep = 1;
    const totalSteps = steps.length;

    // Navigation vers l'étape suivante
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateCurrentStep(currentStep)) {
                if (currentStep < totalSteps) {
                    goToStep(currentStep + 1);
                }
            }
        });
    });

    // Navigation vers l'étape précédente
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    });

    // Navigation clavier pour les étapes
    form.addEventListener('keydown', (e) => {
        // Entrée pour passer à l'étape suivante
        if (e.key === 'Enter' && !e.target.matches('textarea, button')) {
            e.preventDefault();
            if (validateCurrentStep(currentStep) && currentStep < totalSteps) {
                goToStep(currentStep + 1);
            }
        }
        
        // Ctrl/Cmd + flèche droite pour étape suivante
        if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
            e.preventDefault();
            if (validateCurrentStep(currentStep) && currentStep < totalSteps) {
                goToStep(currentStep + 1);
            }
        }
        
        // Ctrl/Cmd + flèche gauche pour étape précédente
        if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        }
    });

    function goToStep(stepNumber) {
        // Masquer toutes les étapes
        steps.forEach(step => step.classList.remove('active'));
        progressSteps.forEach(step => {
            step.classList.remove('active');
            step.classList.remove('completed');
        });

        // Afficher l'étape courante
        const currentStepElement = form.querySelector(`[data-step="${stepNumber}"]`);
        const currentProgressStep = document.querySelector(`.progress-step[data-step="${stepNumber}"]`);
        
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        if (currentProgressStep) {
            currentProgressStep.classList.add('active');
        }

        // Marquer les étapes précédentes comme complétées
        for (let i = 1; i < stepNumber; i++) {
            const prevProgressStep = document.querySelector(`.progress-step[data-step="${i}"]`);
            if (prevProgressStep) {
                prevProgressStep.classList.add('completed');
            }
        }

        currentStep = stepNumber;
    }

    function validateCurrentStep(step) {
        const currentStepElement = form.querySelector(`[data-step="${step}"].active`);
        if (!currentStepElement) return false;

        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (field.type === 'radio') {
                const radioGroup = currentStepElement.querySelectorAll(`[name="${field.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                    showValidationError(field, 'Veuillez faire une sélection');
                }
            } else if (!field.value.trim()) {
                isValid = false;
                showValidationError(field, 'Ce champ est requis');
            }
        });

        return isValid;
    }

    function showValidationError(field, message) {
        // Supprimer les anciens messages d'erreur
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Ajouter le nouveau message d'erreur
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--spacing-xs)';
        errorElement.style.display = 'block';
        
        field.parentNode.appendChild(errorElement);

        // Supprimer le message après 3 secondes
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        }, 3000);
    }
}