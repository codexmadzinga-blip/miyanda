import React from 'react';

// 1. Loading Skeleton Component
export function ProductSkeletonGrid() {
  const skeletons = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {skeletons.map((n) => (
        <div key={n} className="border rounded-lg p-4 bg-white shadow-sm animate-pulse">
          <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. Empty Search State Component
export function EmptySearchState({ searchTerm, onReset }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-4xl mb-3">🔍</div>
      <h3 className="text-lg font-bold text-gray-800">No products found</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        We couldn't find anything matching "{searchTerm}". Try checking your spelling or clearing filters.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
        >
          Reset Search & Filters
        </button>
      )}
    </div>
  );
}