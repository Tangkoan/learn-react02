import React from 'react';
import { productStore } from '../../store/productStore';

import {Row, Col, Button} from "antd";
import ProductCard from '../../components/product/ProductCard';



export const ProductPage = () => {

  const {list, hanleWislist} = productStore();
  const objP = {
    name: "Mackbook 2022",
    descriptions: "8GB 256Gb 14-inch M1",
    price: 1600,
    discount: 10,
    image: null,
  }

  const onAddToBage = (item) =>{
    console.log(item)
  }

  const onAddToWislist = (item) => {
    hanleWislist(item);
  }
  

  return (
    <div>
      <div>product</div>
      

      <Row>
        {list?.map((item, index)=>(
          <Col key={index} xs={24} md={8} lg={6}>
            <ProductCard
              {...item}
              description={item.des}
              onAddToBage={()=> onAddToBage(item)}
              onAddToWislist={()=> onAddToWislist(item)}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductPage;
