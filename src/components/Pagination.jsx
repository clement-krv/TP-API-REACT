import React, { useState } from "react";

// Composant pour afficher les informations de pagination
export const PaginationInfo = ({ currentPage, totalPages, itemsPerPage, totalItems }) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-center items-center text-sm text-gray-600 mb-4">
      Affichage de <span className="font-medium">{startItem}</span> à <span className="font-medium">{endItem}</span> sur <span className="font-medium">{totalItems}</span> résultats
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Fonction pour générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5; // Nombre maximum de pages visibles
    
    if (totalPages <= maxVisible) {
      // Si le nombre total de pages est petit, on les affiche toutes
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Logique pour afficher les pages avec ellipses
      const halfVisible = Math.floor(maxVisible / 2);
      
      if (currentPage <= halfVisible + 1) {
        // Début : 1, 2, 3, 4, 5, ..., totalPages
        for (let i = 1; i <= maxVisible; i++) {
          pageNumbers.push(i);
        }
        if (maxVisible < totalPages - 1) {
          pageNumbers.push('ellipsis');
        }
        if (maxVisible < totalPages) {
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - halfVisible) {
        // Fin : 1, ..., n-4, n-3, n-2, n-1, n
        pageNumbers.push(1);
        if (totalPages - maxVisible > 1) {
          pageNumbers.push('ellipsis');
        }
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          if (i > 1) pageNumbers.push(i);
        }
      } else {
        // Milieu : 1, ..., current-1, current, current+1, ..., totalPages
        pageNumbers.push(1);
        if (currentPage > 3) {
          pageNumbers.push('ellipsis');
        }
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
          pageNumbers.push(i);
        }
        if (currentPage < totalPages - 2) {
          pageNumbers.push('ellipsis');
        }
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1 my-8">
      {/* Bouton Première page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        title="Première page"
      >
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 9H17a1 1 0 110 2h-5.586l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h.01a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        Premier
      </button>

      {/* Bouton Précédent */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        title="Page précédente"
      >
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Précédent
      </button>

      {/* Numéros de page */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm font-medium text-gray-500"
            >
              ...
            </span>
          );
        }

        const isActive = pageNumber === currentPage;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-2 text-sm font-medium border transition-colors duration-200 ${
              isActive
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Bouton Suivant */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        title="Page suivante"
      >
        Suivant
        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Bouton Dernière page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        title="Dernière page"
      >
        Dernier
        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 11H3a1 1 0 110-2h5.586L4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M17 10a1 1 0 01-1 1h-.01a1 1 0 110-2H16a1 1 0 011 1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;