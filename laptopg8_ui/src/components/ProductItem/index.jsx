import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./ProductItem.module.scss";

const cx = classNames.bind(styles);

function ProductItem({ props }) {
  const formatPrice = new Intl.NumberFormat("vi-VN").format(props.price);
  const navigate = useNavigate();
  return (
    <div
      className={cx("wrapper")}
      onClick={() => {
        navigate(`/product-detail/${props.id}`);
      }}
    >
      {props.amount <= 0 ? <div className={cx("modal")}>Hết hàng</div> : null}
      <div className={cx("img")}>
        <img src={props.avatar} alt={props.title} />
      </div>
      <div className={cx("info")}>
        <p>{props.title}</p>
        <p>{formatPrice}đ</p>
      </div>
    </div>
  );
}

export default ProductItem;
