// Tests automatisés pour détecter les pièges du vibecoding
// Basé sur les retours d'expérience Reddit

class VibeCodingTests {
    constructor() {
        this.testResults = [];
        this.criticalIssues = [];
    }

    // Test principal - lance tous les tests
    async runAllTests() {
        console.log('🧪 Démarrage des tests anti-vibecoding...');
        
        const tests = [
            this.testSecurityVulnerabilities,
            this.testPerformanceIssues,
            this.testCodeQuality,
            this.testErrorHandling,
            this.testDataValidation,
            this.testAccessibility,
            this.testMobileResponsiveness
        ];

        for (const test of tests) {
            try {
                await test.call(this);
            } catch (error) {
                this.addResult('ERROR', `Test failed: ${test.name}`, error.message);
            }
        }

        this.generateReport();
        return this.testResults;
    }

    // Test 1: Vulnérabilités de sécurité
    testSecurityVulnerabilities() {
        console.log('🔒 Test des vulnérabilités de sécurité...');

        // Vérifier les headers de sécurité
        const metaTags = document.querySelectorAll('meta[http-equiv]');
        const securityHeaders = ['Content-Security-Policy', 'X-Content-Type-Options', 'X-Frame-Options'];
        
        securityHeaders.forEach(header => {
            const found = Array.from(metaTags).some(meta => 
                meta.getAttribute('http-equiv') === header
            );
            if (!found) {
                this.addResult('CRITICAL', 'Sécurité', `Header manquant: ${header}`);
            }
        });

        // Vérifier les inputs non protégés
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!input.hasAttribute('maxlength') && input.type !== 'hidden') {
                this.addResult('HIGH', 'Sécurité', `Input sans limite de longueur: ${input.id || input.name}`);
            }
            
            if (input.type === 'email' && !input.hasAttribute('pattern')) {
                this.addResult('MEDIUM', 'Sécurité', `Email sans validation pattern: ${input.id || input.name}`);
            }
        });

        // Vérifier les scripts inline
        const inlineScripts = document.querySelectorAll('script:not([src])');
        if (inlineScripts.length > 1) { // Permettre un script inline pour les tests
            this.addResult('HIGH', 'Sécurité', `${inlineScripts.length} scripts inline détectés`);
        }
    }

    // Test 2: Problèmes de performance
    testPerformanceIssues() {
        console.log('⚡ Test des performances...');

        // Vérifier les images sans lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading') && !img.classList.contains('lazy')) {
                this.addResult('MEDIUM', 'Performance', `Image sans lazy loading: ${img.src}`);
            }
        });

        // Vérifier les ressources externes
        const externalLinks = document.querySelectorAll('link[href^="http"], script[src^="http"]');
        if (externalLinks.length > 5) {
            this.addResult('MEDIUM', 'Performance', `${externalLinks.length} ressources externes`);
        }

        // Vérifier la taille du DOM
        const domSize = document.querySelectorAll('*').length;
        if (domSize > 1500) {
            this.addResult('HIGH', 'Performance', `DOM trop large: ${domSize} éléments`);
        }

        // Test de la mémoire JavaScript
        if ('memory' in performance) {
            const memory = performance.memory;
            const usedMB = memory.usedJSHeapSize / 1024 / 1024;
            if (usedMB > 30) {
                this.addResult('HIGH', 'Performance', `Utilisation mémoire élevée: ${usedMB.toFixed(1)}MB`);
            }
        }
    }

    // Test 3: Qualité du code
    testCodeQuality() {
        console.log('📝 Test de la qualité du code...');

        // Vérifier les console.log en production
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.textContent && script.textContent.includes('console.log')) {
                this.addResult('LOW', 'Qualité', 'console.log détecté dans le code');
            }
        });

        // Vérifier les IDs dupliqués
        const ids = [];
        const elementsWithId = document.querySelectorAll('[id]');
        elementsWithId.forEach(el => {
            if (ids.includes(el.id)) {
                this.addResult('HIGH', 'Qualité', `ID dupliqué: ${el.id}`);
            }
            ids.push(el.id);
        });

        // Vérifier les attributs alt manquants
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            this.addResult('MEDIUM', 'Accessibilité', `${imagesWithoutAlt.length} images sans attribut alt`);
        }
    }

    // Test 4: Gestion d'erreurs
    testErrorHandling() {
        console.log('🚨 Test de la gestion d\'erreurs...');

        // Simuler des erreurs courantes
        const testCases = [
            () => this.testFormValidation(),
            () => this.testNetworkErrors(),
            () => this.testInvalidInputs()
        ];

        testCases.forEach((testCase, index) => {
            try {
                testCase();
            } catch (error) {
                this.addResult('HIGH', 'Gestion d\'erreurs', `Test case ${index + 1} failed: ${error.message}`);
                console.error(`Error in test case ${index + 1}:`, error);
            }
        });
    }

    // Test de validation des formulaires
    testFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const requiredFields = form.querySelectorAll('[required]');
            if (requiredFields.length === 0) {
                this.addResult('MEDIUM', 'Validation', 'Formulaire sans champs requis');
            }

            // Vérifier les gestionnaires d'événements
            if (!form.onsubmit && !form.hasAttribute('data-validated')) {
                this.addResult('HIGH', 'Validation', 'Formulaire sans validation JavaScript');
            }
        });
    }

    // Test des erreurs réseau
    testNetworkErrors() {
        // Vérifier si fetch est wrappé pour la gestion d'erreurs
        if (window.fetch.toString().includes('catch')) {
            this.addResult('GOOD', 'Réseau', 'Gestion d\'erreurs fetch détectée');
        } else {
            this.addResult('HIGH', 'Réseau', 'Pas de gestion d\'erreurs pour fetch');
        }
    }

    // Test des inputs invalides
    testInvalidInputs() {
        const textInputs = document.querySelectorAll('input[type="text"], textarea');
        textInputs.forEach(input => {
            // Simuler une entrée malveillante
            const originalValue = input.value;
            input.value = '<script>alert("XSS")</script>';
            
            // Déclencher l'événement input
            input.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Vérifier si l'input a été nettoyé
            if (input.value.includes('<script>')) {
                this.addResult('CRITICAL', 'Sécurité', `XSS possible sur ${input.id || input.name}`);
            }
            
            // Restaurer la valeur originale
            input.value = originalValue;
        });
    }

    // Test 5: Validation des données
    testDataValidation() {
        console.log('✅ Test de validation des données...');

        // Vérifier les patterns de validation
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (!input.pattern && !input.hasAttribute('data-validate')) {
                this.addResult('MEDIUM', 'Validation', `Email sans pattern: ${input.id || input.name}`);
            }
        });

        // Vérifier les limites de caractères
        const textInputs = document.querySelectorAll('input[type="text"], textarea');
        textInputs.forEach(input => {
            if (!input.maxLength && !input.hasAttribute('maxlength')) {
                this.addResult('HIGH', 'Validation', `Input sans limite: ${input.id || input.name}`);
            }
        });
    }

    // Test 6: Accessibilité
    testAccessibility() {
        console.log('♿ Test d\'accessibilité...');

        // Vérifier les labels
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const hasLabel = document.querySelector(`label[for="${input.id}"]`) || 
                           input.closest('label') || 
                           input.hasAttribute('aria-label');
            
            if (!hasLabel && input.type !== 'hidden') {
                this.addResult('MEDIUM', 'Accessibilité', `Input sans label: ${input.id || input.name}`);
            }
        });

        // Vérifier les contrastes (basique)
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(button => {
            const style = getComputedStyle(button);
            if (style.backgroundColor === 'transparent' && style.color === 'inherit') {
                this.addResult('LOW', 'Accessibilité', 'Bouton sans style défini');
            }
        });
    }

    // Test 7: Responsive design
    testMobileResponsiveness() {
        console.log('📱 Test du responsive design...');

        // Vérifier la meta viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            this.addResult('HIGH', 'Mobile', 'Meta viewport manquant');
        }

        // Vérifier les media queries
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
        let hasMediaQueries = false;
        
        stylesheets.forEach(sheet => {
            if (sheet.textContent && sheet.textContent.includes('@media')) {
                hasMediaQueries = true;
            }
        });

        if (!hasMediaQueries) {
            this.addResult('MEDIUM', 'Mobile', 'Aucune media query détectée');
        }
    }

    // Ajouter un résultat de test
    addResult(severity, category, message) {
        const result = {
            severity,
            category,
            message,
            timestamp: new Date().toISOString()
        };

        this.testResults.push(result);

        if (severity === 'CRITICAL' || severity === 'HIGH') {
            this.criticalIssues.push(result);
        }

        // Log immédiat pour les problèmes critiques
        if (severity === 'CRITICAL') {
            console.error(`🚨 CRITIQUE [${category}]: ${message}`);
        } else if (severity === 'HIGH') {
            console.warn(`⚠️ ÉLEVÉ [${category}]: ${message}`);
        }
    }

    // Générer le rapport final
    generateReport() {
        const report = {
            totalTests: this.testResults.length,
            criticalIssues: this.criticalIssues.length,
            summary: this.getSummary(),
            recommendations: this.getRecommendations(),
            timestamp: new Date().toISOString()
        };

        console.log('📊 Rapport des tests anti-vibecoding:');
        console.log(`Total des problèmes détectés: ${report.totalTests}`);
        console.log(`Problèmes critiques: ${report.criticalIssues}`);
        
        if (report.criticalIssues > 0) {
            console.log('🚨 ATTENTION: Des problèmes critiques ont été détectés!');
            this.criticalIssues.forEach(issue => {
                console.log(`- ${issue.category}: ${issue.message}`);
            });
        }

        return report;
    }

    // Résumé par catégorie
    getSummary() {
        const summary = {};
        this.testResults.forEach(result => {
            if (!summary[result.category]) {
                summary[result.category] = { total: 0, critical: 0, high: 0, medium: 0, low: 0 };
            }
            summary[result.category].total++;
            summary[result.category][result.severity.toLowerCase()]++;
        });
        return summary;
    }

    // Recommandations basées sur les résultats
    getRecommendations() {
        const recommendations = [];
        
        if (this.criticalIssues.length > 0) {
            recommendations.push('🚨 Corriger immédiatement les problèmes critiques de sécurité');
        }
        
        const securityIssues = this.testResults.filter(r => r.category === 'Sécurité').length;
        if (securityIssues > 3) {
            recommendations.push('🔒 Revoir la stratégie de sécurité globale');
        }
        
        const performanceIssues = this.testResults.filter(r => r.category === 'Performance').length;
        if (performanceIssues > 2) {
            recommendations.push('⚡ Optimiser les performances de l\'application');
        }
        
        return recommendations;
    }
}

// Auto-exécution en développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const tester = new VibeCodingTests();
            window.vibeCodingTests = tester;
            tester.runAllTests();
        }, 2000); // Attendre que tout soit chargé
    });
}

// Export pour utilisation manuelle
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VibeCodingTests;
}