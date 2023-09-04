import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../../store/categories/category.selector";
import ProductCard from "../../product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  //Since categoriesMap gets its data only after it is fetched from firestore(in category context)
  // If your code is relying on async input then you should only render data if actual data is present
  // So we need to build a safeguard
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products && //safeguard
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
