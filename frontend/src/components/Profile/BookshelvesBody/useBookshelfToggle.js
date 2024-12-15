import { useState } from 'react'

const useBookshelfToggle = () => {
  const [isGridView, setIsGridView] = useState(true);

  const showGridBookshelves = () => {
    setIsGridView(true);
  };

  const showListBookshelves = () => {
      setIsGridView(false);
  };

  return { isGridView, showGridBookshelves, showListBookshelves };
}

export default useBookshelfToggle;

