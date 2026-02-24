import React from 'react'

import {Button, Row} from 'antd';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';

export const ProductCard = ({name, description, price, discount, image, id, onAddToBage, wislist, onAddToWislist}) => {

    // state
    // function...

    // យើងមិនប្រកាស Function onAddToBage នៅក្នុងនេះក៏បានដោយសារយើងនឹងប្រកាសនៅ ProductCard.jsx រួចហៅមកប្រើ
    // const onAddToBage = () => {
    //     // post data to api( when have api )
    // }
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
            <Row justify={"space-between"}>
                <div style={{fontWeight: 'bold'}}>{name + ""}</div>
                {wislist? <AiFillHeart onClick={onAddToWislist} style={{color: 'red', fontSize: 24}}/> : <AiOutlineHeart onClick={onAddToWislist} style={{fontSize: 24}}/>}
            </Row>
            <div>{description}</div>
            <div style={{fontWeight: 'bold', color: 'blue'}}>
                {price}$ 
            </div>
            <div>{discount}%</div>
            <div>{price}$</div>
            <Row>
                <div style={{textAlign: 'left'}}>
                    <Button type='primary' onClick={onAddToBage}>Add to bage</Button>
                </div>

                <div style={{textAlign: 'right', marginLeft: 14,}}>
                    <Button style={{ backgroundColor: 'red', color: 'white'}} onClick={onAddToWislist}>Add to Wislist</Button>
                </div>
            </Row>

        </div>
    </div>
  )
}

export default ProductCard;
