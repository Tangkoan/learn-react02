មេរៀនធ្វើ UI + State

// ការប្រកាស state មានពីរវិធីដូចខាងក្រោម
    + វិធីទី១
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

// គេមិនប្រើខាងលើសរសេរច្រើនដងចឹងទេគេអាចជ្រើសរើសវិធីសាស្រ្ដខាងក្រោម
    + វិធីទី២
    const [state, setState] = useState({
        list:[],
        loading:false,
        total:0
    })




=> ខាងក្រោមជាឧទារហ៏កូដ ***************

import { Space, Input, Button } from 'antd';
import React, { useState } from 'react';
export const RolePage = () => {
    const [state, setState] = useState({
        // array object ឬ object នៅក្នុង array
        list: [
            {
                id: 1,
                name: "admin",
                group: "Admin"
            },
            {
                id: 2,
                name: "SEO",
                group: "Admin"
            },
            {
                id: 3,
                name: "Web Developer",
                group: "Admin"
            },
            {
                id: 4,
                name: "Mobile Developer",
                group: "Admin"
            },
            {
                id: 5,
                name: "UX/UI Designer",
                group: "Admin"
            },
            {
                id: 6,
                name: "Sale",
                group: "Admin"
            },
        ],
        loading: false,
        total: 100,
    });
  return (
    <div>
        <div className='main-page-header'>
            <Space>
            <div>Role , total<span  style={{color: 'red', fontWeight: 'bold'}}> {state.list.length}</span></div>
            <Input.Search allowClear placeholder='Search...' />
            </Space>
            <Button type='primary'>New</Button>
        </div>
        {/* Call state to show or get data */}
        {state.list.map((item, index)=> (
            <div key={index} style={{padding: 10, backgroundColor: "#EEEEEE", marginBottom: 5, marginTop: 10, borderRadius: 10,}}>
                <Space>
                    <div style={{width:40, height:40, borderRadius: 20, backgroundColor: 'gray'}}></div>
                    <div>
                        <div>{item.name}</div>
                        <div>{item.group}</div>
                    </div>
                </Space>
                <div style={{ textAlign: "right"}}>
                    <Space>
                        <Button type='primary'>Edit</Button>
                        <Button type='primary' danger>Delete</Button>
                    </Space>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RolePage;
