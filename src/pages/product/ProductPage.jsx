import React from 'react'
import { countStore } from '../../store/configStore';
import { Space, Input, Button, message, Modal } from 'antd';

export const ProductPage = () => {

  const {count,category, increase, descrease,reset,update} = countStore();

  return (
    <div>
      <div>ProductPage</div>

      <h1>Count: {count}</h1>

    <br></br>
      <Space>
        <Button danger onClick={() => descrease()}>-</Button>
        <Button type='primary' onClick={() => increase()}>+</Button>
        <Button danger onClick={() => reset()}>Reset</Button>
        <Button danger onClick={() => update(888)}>Change to 888</Button>
      </Space>
    </div>
  )
}

export default ProductPage;
