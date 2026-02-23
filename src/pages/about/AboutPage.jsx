import React from 'react';
import { productStore } from '../../store/productStore';

import {Row, Col, Button} from "antd";

export const AboutPage = () => {

  const {list} = productStore();
  

  return (
    <div>
      <div>About Page</div>
      <Row>
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
      </Row>
    </div>
  )
}

export default AboutPage;
