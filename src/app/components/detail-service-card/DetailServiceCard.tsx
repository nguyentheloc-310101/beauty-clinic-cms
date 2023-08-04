import React from 'react';
interface DetailServiceCard {
  service_name: string;
  service_category: string;
  image: string;
  date: string;
}

const DetailServiceCard = (props: DetailServiceCard) => {
  const { service_name, service_category, image, date } = props;
  return (
    <div className="lg:w-[196px] lg:h-auto lg:flex flex-col">
      <div className="relative lg:h-[196px] lg:w-[196px]">
        <img
          src={image}
          className="w-full h-full object-cover"
          alt="service-img"
        />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default DetailServiceCard;
