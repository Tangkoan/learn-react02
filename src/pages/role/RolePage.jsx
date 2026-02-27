import { Space, Input, Button, message, Modal, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoCloudOfflineOutline } from "react-icons/io5";

import { request } from "../../util/request";
import dayjs from 'dayjs';
import { dateClient } from '../../util/helper';


export const RolePage = () => {

    const [state, setState] = useState({
        list: [],
        total: 0,
    });

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        const res = await request("role", "get")
        // console.log(res)
        if(res) {
            setState((pre)=>({
                ...pre,
                list:res.data,  // res.data ព្រោះ api មិនមែនបស់ជា [] ទេគឺបស់ជា {data:[{}]} មកពីវាបស់ជា obj ដែលទិន្នន័យស្ថិតក្នុង data ទើប res ត្រូវសរសេរជា res.data
            }));
        }
    };

    

  return (
    <div>
        <div className='main-page-header'>
            <Space>
            <div>Role <span  style={{color: 'red', fontWeight: 'bold'}}> {state.list.length}</span></div>
            <Input.Search allowClear placeholder='Search...'/>
            </Space>
            <Button type='primary' >New</Button>
        </div>

        <Table 
            dataSource={state.list}
            columns={[
                {
                    key: "name",
                    title: "Name",
                    dataIndex: "name",
                },

                {
                    key: "description",
                    title: "Description",
                    dataIndex: "description",
                },

                {
                    key: "status",
                    title: "Status",
                    dataIndex: "status",
                    // render: (value) => (value ? "Active" : "Disble")
                    render: (value) => (value ? <Tag color="green">Active</Tag> : <Tag color='red'>Disble</Tag>)
                },

                {
                    key: "careated_at",
                    title: "Create At",
                    dataIndex: "created_at",
                    render: (value) => dayjs(value).format("DD-MM/YYYY h:m a")
                },

                {
                    key: "updated_at",
                    title: "Update At",
                    dataIndex: "updated_at",
                    render: (value) => dateClient(value),
                },

                {
                    key: "action",
                    title: "Action",
                    render: () => (
                        <Space>
                            <Button type='primary'>Edit</Button>
                            <Button danger type='primary'>Delete</Button>
                        </Space>
                    )
                },

                
            ]}
        />

        {/* {state.list?.map((item, index) => (
            <div key={index}>
                <div>{item.name}</div>
            </div>
        ))} */}

        
    </div>
  )
}

export default RolePage;
