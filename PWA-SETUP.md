# Anagkazo Mondial - PWA Setup

## Fichiers PWA ajoutés

### 1. **manifest.json** - Configuration PWA
- Nom de l'application: "Anagkazo Mondial"
- Icônes: 192x192px et 512x512px
- Thème: Couleur orange (#e85d04)
- Mode d'affichage: Standalone
- Raccourcis: Nouveau participant et Dashboard

### 2. **sw.js** - Service Worker
- Cache des pages statiques
- Mode hors ligne
- Stratégie de cache: Cache First
- Mise à jour automatique du cache

### 3. **browserconfig.xml** - Configuration Windows
- Icône pour les tuiles Windows
- Couleur de tuile personnalisée

### 4. **hooks/use-pwa.ts** - Hook PWA personnalisé
- Détection d'installation
- Gestion du mode hors ligne
- Invitation d'installation

### 5. **components/pwa-install-prompt.tsx** - Composant d'installation
- Bouton d'installation flottant
- Indicateur de connexion
- Interface utilisateur PWA

## Fonctionnalités PWA

### ✅ **Installable**
- Bouton d'installation automatique
- Compatible Android, iOS, Desktop
- Icône personnalisée

### ✅ **Mode hors ligne**
- Cache des pages statiques
- Indicateur de connexion
- Fallback page d'accueil

### ✅ **App-like Experience**
- Plein écran
- Pas de barre d'adresse
- Navigation native

### ✅ **Performance**
- Service Worker
- Cache stratégique
- Chargement rapide

## Installation

1. **Déployer l'application**
2. **Visiter le site** sur un navigateur compatible
3. **Cliquer sur "Installer l'app"** 
4. **L'application s'installe** sur l'appareil

## Icônes requises

Placez ces fichiers dans `/public/`:
- `icon-192x192.png` - Icône PWA standard
- `icon-512x512.png` - Icône haute résolution  
- `apple-icon.png` - Icône iOS (180x180px)
- `icon-150x150.png` - Icône Windows
- `icon.svg` - Icône SVG fallback

## Test PWA

1. **Ouvrir les DevTools** (F12)
2. **Aller dans Application** → **Manifest**
3. **Vérifier "Add to home screen"**
4. **Tester le Service Worker** dans l'onglet Service Workers

## Audit Lighthouse

L'application devrait obtenir:
- ✅ Installable
- ✅ PWA optimisé
- ✅ Performances
- ✅ Accessibilité
