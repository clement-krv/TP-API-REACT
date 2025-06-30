# 📝 Blog React - Projet Pédagogique

Un projet d'apprentissage React utilisant l'API JSONPlaceholder pour afficher des articles de blog avec leurs commentaires.

## 🎯 Objectif Pédagogique

Ce projet a été développé dans un cadre d'apprentissage pour maîtriser les concepts fondamentaux de React :
- Gestion d'état avec `useState`
- Effets de bord avec `useEffect`
- Appels API et gestion des données asynchrones
- Composants réutilisables
- Pagination et filtrage
- Modales et interactions utilisateur
- Optimisation des performances (debounce, useMemo)

## ✨ Fonctionnalités

### 📄 Articles
- **Affichage** : Liste paginée des articles récupérés depuis l'API
- **Recherche** : Barre de recherche avec debounce (300ms) pour filtrer par titre
- **Pagination** : Navigation par pages avec 10 articles par page

### 💬 Commentaires
- **Bouton commentaire** : Icône avec nombre de commentaires sur chaque article
- **Modal interactive** : Affichage élégant de l'article complet + commentaires
- **Design moderne** : Header sticky, animations fluides, avatars colorés
- **UX optimisée** : Fermeture au clic extérieur, indicateur de chargement

### 🎨 Interface
- **Design responsive** : Interface adaptée à tous les écrans
- **Tailwind CSS** : Styling moderne et cohérent
- **Animations** : Transitions fluides et micro-interactions
- **Accessibilité** : Labels ARIA et navigation au clavier

## 🛠️ Technologies Utilisées

- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
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
git clone https://github.com/clement-krv/TP-API-REACT
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
├── App.jsx              # Composant principal
├── main.jsx            # Point d'entrée React
├── components/
│   ├── PostList.jsx    # Liste des articles
│   ├── SearchBar.jsx   # Barre de recherche
│   ├── Pagination.jsx  # Navigation par pages
│   └── CommentModal.jsx # Modal des commentaires
└── assets/             # Ressources statiques
```

## 🎓 Concepts React Abordés

### Hooks Utilisés
- **useState** : Gestion d'état local (articles, recherche, pagination, modal)
- **useEffect** : Appels API, effets de bord, nettoyage d'événements
- **useMemo** : Optimisation du filtrage des articles
- **useRef** : Référence DOM pour la modal

### Patterns Implémentés
- **Custom Hook** : `useDebounce` pour optimiser la recherche
- **Composants contrôlés** : Input de recherche avec valeur et onChange
- **Props drilling** : Passage de données entre composants
- **Conditional rendering** : Affichage conditionnel selon l'état

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
✅ **Performance** : Optimisations, re-renders  
✅ **UX/UI** : Interactions, animations, responsive  
✅ **Code Quality** : Structure, lisibilité, réutilisabilité  


---

> 💡 **Note** : Ce projet est réalisé dans un contexte pédagogique pour l'apprentissage de React et des bonnes pratiques de développement frontend moderne.
