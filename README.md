# 📝 Blog React - Projet Pédagogique

Un projet d'apprentissage React utilisant l'API JSONPlaceholder pour afficher des articles de blog avec leurs commentaires.

## 🎯 Objectif Pédagogique

Ce projet a été développé dans un cadre d'apprentissage pour maîtriser les concepts fondamentaux de React :
- Gestion d'état avec `useState`
- Effets de bord avec `useEffect`
- Appels API et gestion des données asynchrones
- Composants réutilisables
- Pagination et filtrage
- Modales et interactions utilisateur (remplacées par navigation)
- Optimisation des performances (debounce, useMemo)
- Navigation SPA avec React Router

## ✨ Fonctionnalités

### � Navigation (React Router v7)
- **Route principale** : `/` - Liste des articles avec pagination et recherche
- **Route détail** : `/post/:id` - Page dédiée pour chaque article avec commentaires
- **Navigation fluide** : Boutons "En savoir plus" et "Retour aux articles"

### �📄 Articles
- **Affichage** : Liste paginée des articles récupérés depuis l'API
- **Recherche** : Barre de recherche avec debounce (300ms) pour filtrer par titre
- **Pagination** : Navigation par pages avec 10 articles par page
- **Détail** : Page dédiée pour chaque article avec contenu complet

### 💬 Commentaires
- **Affichage intégré** : Commentaires affichés directement sous l'article sur sa page dédiée
- **Design moderne** : Avatars colorés, numérotation, layout responsive
- **Chargement optimisé** : États de chargement séparés pour article et commentaires
- **UX améliorée** : Plus de modal, navigation claire entre pages

### 🎨 Interface
- **Design responsive** : Interface adaptée à tous les écrans
- **Tailwind CSS** : Styling moderne et cohérent
- **Animations** : Transitions fluides et micro-interactions
- **Accessibilité** : Labels ARIA et navigation au clavier

## 🛠️ Technologies Utilisées

- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **React Router v7** - Navigation et routing côté client (SPA)
- **Vite** - Outil de build rapide et serveur de développement
- **Tailwind CSS** - Framework CSS utility-first
- **JSONPlaceholder** - API REST fictive pour les données de test

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone https://github.com/clement-krv/TP-API-REACT.git
cd TP-API

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le projet sera accessible sur `http://localhost:5173`

### Scripts disponibles
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Aperçu du build de production
npm run lint     # Vérification ESLint
```

## 📁 Structure du Projet

```
src/
├── App.jsx              # Composant principal avec routes
├── main.jsx            # Point d'entrée React
├── Posts.jsx           # Page d'accueil - Liste des articles
├── PostDetail.jsx      # Page détail d'un article + commentaires
├── SearchBar.jsx       # Barre de recherche
├── Pagination.jsx      # Navigation par pages
└── assets/             # Ressources statiques
```

## 🎓 Concepts React Abordés

### Hooks Utilisés
- **useState** : Gestion d'état local (articles, recherche, pagination, chargement)
- **useEffect** : Appels API, effets de bord, synchronisation avec l'ID de l'article
- **useMemo** : Optimisation du filtrage des articles
- **useParams** : Récupération des paramètres d'URL (ID de l'article)

### Patterns Implémentés
- **Custom Hook** : `useDebounce` pour optimiser la recherche
- **Composants contrôlés** : Input de recherche avec valeur et onChange
- **Routing SPA** : Navigation sans rechargement de page
- **Conditional rendering** : Affichage conditionnel selon l'état
- **Code splitting** : Séparation des composants par responsabilité

### Bonnes Pratiques
- **Séparation des responsabilités** : Un composant = une responsabilité
- **Gestion d'erreurs** : Try/catch et états d'erreur
- **Loading states** : Indicateurs de chargement
- **Performance** : Debounce et mémorisation
- **Accessibilité** : Labels ARIA et navigation

## 🌐 API Utilisée

[JSONPlaceholder](https://jsonplaceholder.typicode.com/) - API REST fictive
- `GET /posts` - Liste des articles
- `GET /posts/{id}/comments` - Commentaires d'un article

## 📚 Objectifs d'Apprentissage Atteints

✅ **Bases React** : Composants, JSX, props, state  
✅ **Lifecycle** : useEffect, montage/démontage  
✅ **API Calls** : fetch, gestion async/await  
✅ **State Management** : États multiples, synchronisation  
✅ **Routing** : React Router v7, navigation SPA  
✅ **Performance** : Optimisations, re-renders  
✅ **UX/UI** : Interactions, animations, responsive  
✅ **Code Quality** : Structure, lisibilité, réutilisabilité  

## 🔄 Améliorations Possibles

- [ ] Context API pour la gestion d'état globale
- [ ] React Query pour la mise en cache des données
- [ ] Tests unitaires avec Jest/React Testing Library
- [ ] Breadcrumb navigation pour améliorer l'UX
- [ ] Formulaire d'ajout de commentaires
- [ ] Mode sombre/clair
- [ ] PWA (Progressive Web App)
- [ ] Lazy loading des composants

---

> 💡 **Note** : Ce projet est réalisé dans un contexte pédagogique pour l'apprentissage de React et des bonnes pratiques de développement frontend moderne.
