import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);

  React.useEffect(() => {
    (async function getCategory() {
      const data = await fetch('./api/categories/index.get.json').then((res) =>
        res.json()
      );
      setCategoryData(data);
    })();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
