import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.scss";

import "./style.scss"

const Categories = ({ categories, handleFilter }) => {


  return (
    <Swiper
      spaceBetween={-40}
      slidesPerView={2}
    >
      {Object.values(categories).map((category) =>
        <SwiperSlide key={category.id}>
          <li>
            <button className="category__btn" onClick={() => handleFilter(category.id)}>
              <img src={category.img} alt={category.name} className="category__img" />
              <div className="category__info">
                <h2 className="category__name">{category.name} — </h2>
                <span className="category__count">{category.product_count} Item</span>
              </div>
            </button>
          </li>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export {
  Categories
}