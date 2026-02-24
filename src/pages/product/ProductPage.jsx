import React from 'react';
import { productStore } from '../../store/productStore';

import {Row, Col, Button} from "antd";
import ProductCard from '../../components/product/ProductCard';



export const ProductPage = () => {

  const {list} = productStore();
  const objP = {
    name: "Mackbook 2022",
    descriptions: "8GB 256Gb 14-inch M1",
    price: 1600,
    discount: 10,
    image: null,
  }
  

  return (
    <div>
      <div>product</div>
      {/* <Row>
        {list?.map((item, index)=>(
          <Col key={index} xs={24} md={8} lg={6}>
            <div style={{backgroundColor: "#eee", padding: 10, margin: 5}}>
              <img src={item.image} style={{backgroundColor: "gray", width: "100%", height: 210, borderRadius: 15}}></img>
              <div style={{fontWeight: "bold"}}>{item.name}</div>
              <div>{item.des}</div>
              <div>{item.price}$</div>
              <Button type='primary'>Add To cart</Button>
            </div>
          </Col>
        ))}
      </Row> */}

      <Row>
        {list?.map((item, index)=>(
          <Col key={index} xs={24} md={8} lg={6}>
            <ProductCard
              // name={item.name}
              // description={item.des}
              // price={item.price}
              // image={item.image}
              {...item}
              description={item.des}

            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductPage;
