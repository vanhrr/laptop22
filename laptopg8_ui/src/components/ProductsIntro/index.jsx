import classNames from "classnames/bind";

import styles from "./ProductsIntro.module.scss";
import ProductItem from "../ProductItem";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getall } from "~/ultils/services/productService";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

const cx = classNames.bind(styles);

function ProductsIntro({ title, id }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getall("", "", id, "");
      if (response.status === "success") {
        setProducts(response.data.slice(0, 3));
      } else {
        setProducts([]);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>{title}</h2>
      <div className={cx("list")}>
        {products.map((item) => {
          if (item.status === 1) {
            return <ProductItem key={v4()} props={item} />;
          }
          return null;
        })}
      </div>
      <div className={cx("more")}>
        <Button
          outline
          large
          to={`/products/${id}`}
          rightIcon={<FontAwesomeIcon icon={faAngleRight} />}
        >
          Xem tất cả {title}
        </Button>
      </div>
    </div>
  );
}

export default ProductsIntro;
