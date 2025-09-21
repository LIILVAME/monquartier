// MonQuartier - Système de Monitoring de Sécurité
// Basé sur les recommandations Reddit pour éviter les pièges du vibecoding

class SecurityMonitor {
    constructor() {
        this.violations = [];
        this.rateLimits = new Map();
        this.suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+=/i,
            /eval\(/i,
            /document\.write/i,
            /innerHTML\s*=/i
        ];
        this.init();
    }

    init() {
        this.setupCSPViolationReporting();
        this.setupInputMonitoring();
        this.setupPerformanceMonitoring();
        this.setupErrorTracking();
        console.log('🛡️ Système de sécurité MonQuartier activé');
    }

    // Surveillance des violations CSP
    setupCSPViolationReporting() {
        document.addEventListener('securitypolicyviolation', (e) => {
            this.logViolation('CSP_VIOLATION', {
                directive: e.violatedDirective,
                blockedURI: e.blockedURI,
                lineNumber: e.lineNumber,
                sourceFile: e.sourceFile
            });
        });
    }

    // Surveillance des inputs utilisateur
    setupInputMonitoring() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea, select')) {
                this.validateInput(e.target);
            }
        });

        document.addEventListener('paste', (e) => {
            setTimeout(() => this.validateInput(e.target), 0);
        });
    }

    // Validation en temps réel des inputs
    validateInput(element) {
        const value = element.value;
        const elementType = element.type || element.tagName.toLowerCase();

        // Détection de patterns suspects
        for (const pattern of this.suspiciousPatterns) {
            if (pattern.test(value)) {
                this.logViolation('SUSPICIOUS_INPUT', {
                    element: element.id || element.name,
                    pattern: pattern.source,
                    value: value.substring(0, 100) // Limiter pour la sécurité
                });
                
                // Nettoyer automatiquement
                element.value = value.replace(pattern, '');
                this.showSecurityWarning('Contenu suspect détecté et supprimé');
                break;
            }
        }

        // Vérification de la longueur
        const maxLengths = {
            'text': 100,
            'textarea': 1000,
            'email': 254
        };

        const maxLength = maxLengths[elementType] || 100;
        if (value.length > maxLength) {
            element.value = value.substring(0, maxLength);
            this.showSecurityWarning(`Texte tronqué à ${maxLength} caractères`);
        }
    }

    // Rate limiting
    checkRateLimit(action, limit = 5, window = 60000) {
        const now = Date.now();
        const key = `${action}_${Math.floor(now / window)}`;
        
        const current = this.rateLimits.get(key) || 0;
        if (current >= limit) {
            this.logViolation('RATE_LIMIT_EXCEEDED', { action, limit, window });
            return false;
        }
        
        this.rateLimits.set(key, current + 1);
        return true;
    }

    // Monitoring des performances
    setupPerformanceMonitoring() {
        // Surveillance de la mémoire
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                    this.logViolation('HIGH_MEMORY_USAGE', {
                        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
                        total: Math.round(memory.totalJSHeapSize / 1024 / 1024)
                    });
                }
            }, 30000);
        }

        // Surveillance des requêtes lentes
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const start = performance.now();
            try {
                const response = await originalFetch(...args);
                const duration = performance.now() - start;
                
                if (duration > 5000) { // 5 secondes
                    this.logViolation('SLOW_REQUEST', {
                        url: args[0],
                        duration: Math.round(duration)
                    });
                }
                
                return response;
            } catch (error) {
                this.logViolation('FETCH_ERROR', {
                    url: args[0],
                    error: error.message
                });
                throw error;
            }
        };
    }

    // Tracking des erreurs JavaScript
    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.logViolation('JS_ERROR', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error?.stack?.substring(0, 500)
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.logViolation('UNHANDLED_PROMISE', {
                reason: e.reason?.toString?.()?.substring(0, 200)
            });
        });
    }

    // Logging des violations
    logViolation(type, details) {
        const violation = {
            type,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent.substring(0, 100),
            url: window.location.href
        };

        this.violations.push(violation);
        
        // Garder seulement les 100 dernières violations
        if (this.violations.length > 100) {
            this.violations.shift();
        }

        // Log en développement uniquement
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.warn('🚨 Violation de sécurité:', violation);
        }

        // En production, envoyer à un service de monitoring
        // this.sendToMonitoringService(violation);
    }

    // Affichage des avertissements de sécurité
    showSecurityWarning(message) {
        // Utiliser le système de notification existant si disponible
        if (typeof showNotification === 'function') {
            showNotification(`🛡️ ${message}`, 'warning');
        } else {
            console.warn('🛡️', message);
        }
    }

    // Rapport de sécurité
    getSecurityReport() {
        const report = {
            totalViolations: this.violations.length,
            violationsByType: {},
            recentViolations: this.violations.slice(-10),
            timestamp: new Date().toISOString()
        };

        // Compter par type
        this.violations.forEach(v => {
            report.violationsByType[v.type] = (report.violationsByType[v.type] || 0) + 1;
        });

        return report;
    }

    // Nettoyage périodique
    cleanup() {
        // Nettoyer les anciens rate limits
        const now = Date.now();
        for (const [key, value] of this.rateLimits.entries()) {
            const timestamp = parseInt(key.split('_').pop());
            if (now - timestamp > 300000) { // 5 minutes
                this.rateLimits.delete(key);
            }
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    window.securityMonitor = new SecurityMonitor();
    
    // Nettoyage périodique
    setInterval(() => {
        window.securityMonitor.cleanup();
    }, 300000); // 5 minutes
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityMonitor;
}