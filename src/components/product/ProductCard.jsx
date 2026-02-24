import React from 'react'

import {Button} from 'antd';


export const ProductCard = ({name, description, price, discount, image}) => {
    // state
    // function...
  return (
    <div style={{width: '100%'}}>
        <div style={{
            padding: 10,
            backgroundColor: "#FFF",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: 10,
            margin: 5,
        }}>

            <img src={image} alt="" style={{width: "100%", height: 200, borderRadius: 10}} />
            <div style={{fontWeight: 'bold'}}>{name + ""}</div>
            <div>{description}</div>
            <div style={{fontWeight: 'bold', color: 'blue'}}>
                {price}$ 
            </div>
            <div>{discount}%</div>
            <div>{price}$</div>
            <div style={{textAlign: 'right'}}>
                <Button type='primary'>Add to bage</Button>
            </div>

        </div>
    </div>
  )
}

export default ProductCard;
