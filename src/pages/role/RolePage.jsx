import { Space, Input, Button, message, Modal, Table, Tag, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoCloudOfflineOutline } from "react-icons/io5";

import { request } from "../../util/request";
import dayjs from 'dayjs';
import { dateClient } from '../../util/helper';


export const RolePage = () => {

    // សម្រាប់អោយ Function Clear ក្នុង Input ករណីគេ Cancel Modal Form Add
    const [formRef] = Form.useForm();

    const [state, setState] = useState({
        list: [],
        total: 0,
        loading: false,
        open: false,

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

    const handleOpenModal = () => {
        setState((pre)=>({
                ...pre,
                open: true,
        }));
    }

    const handleCloseModal = () => {
        setState((pre)=> ({
            ...pre,
            open:false
        }));
        formRef.resetFields();
    }

    const onFinish = async (item) => {
        // console.log(item)
        let data = {
            name: item.name,
            description: item.description,
            code: item.code,
            status: item.status,
        }
                                // url,   methdo , param
        const res = await request("role", "post", data);
        // console.log(res)
        // if(res && !res.error){
        //     message.success(res.message);
        //     handleCloseModal();
        //     getList();
        // }else if (res && res.error){
        //     message.error(res.message);
            
        // }
        if (res) {
            if (res.status === "success") {
                message.success(res.message);
                handleCloseModal();
                getList();
            } else if (res.status === "error") {
                // ត្រង់នេះវានឹងបង្ហាញ "សូមបញ្ចូលឈ្មោះ Role!" ពី API
                message.error(res.message); 
            }
        } else {
            message.error("Something went wrong!");
        }
    }

    const handleDelete = async (data) => {
        //  alret នេះគឺចង់មើលថាមួយ Obj មានអីខ្លះ
        // alert(JSON.stringify(data))
        // data.id
        

        Modal.confirm({
            title: "Delete",
            content: "Are you sure delete this data?",
            onOk: async() =>{
                const res = await request("role/"+data.id, "delete");
                if (res) {
                    if (res.status === "success") {
                        message.success(res.message);
                        getList();
                    } else if (res.status === "error") {
                        // ត្រង់នេះវានឹងបង្ហាញ "សូមបញ្ចូលឈ្មោះ Role!" ពី API
                        message.error(res.message); 
                    }
                } else {
                    message.error("Something went wrong!");
                }
            }
        })
    }

    

  return (
    <div>
        <div className='main-page-header'>
            <Space>
            <div>Role <span  style={{color: 'red', fontWeight: 'bold'}}> {state.list.length}</span></div>
            <Input.Search allowClear placeholder='Search...'/>
            </Space>
            <Button type='primary' onClick={handleOpenModal}>New</Button>
        </div>

        <Table 
            rowKey="id"
            dataSource={state.list}
            columns={[
                {
                    key: "name",
                    title: "Name",
                    dataIndex: "name",
                },

                {
                    key: "code",
                    title: "Code",
                    dataIndex: "code",
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
                    key: "created_at",
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
                    dataIndex: "id",
                    render: (value, data) => (
                        <Space>
                            <Button type='primary'>Edit</Button>
                            <Button danger type='primary' onClick={()=> handleDelete(data)}>Delete</Button>
                        </Space>
                    )
                },

                
            ]}
        />

        <Modal title="New Role" open={state.open} onCancel={handleCloseModal} footer={false}>
            <Form layout='vertical' onFinish={onFinish} form={formRef}>
                <Form.Item name={"name"} label="Role Name">
                    <Input placeholder='Name' />
                </Form.Item>

                <Form.Item name={"code"} label="Code">
                    <Input placeholder='Code' />
                </Form.Item>

                <Form.Item name={"description"} label="Description">
                    <Input placeholder='Description' />
                </Form.Item>

                <Form.Item name={"status"} label="Status">
                    <Select
                        placeholder= "Select Status"
                        options={[
                            {
                                label: "Active",
                                value: 1,
                            },
                            {
                                label: "Disble",
                                value: 0,
                            }
                        ]}
                    />
                </Form.Item>

                <div style={{textAlign: 'right'}}>
                    <Space >
                        <Button danger type='primary' onClick={handleCloseModal}>Cancel</Button>
                        <Button type='primary' htmlType='sumbit'>Save</Button>
                    </Space>
                </div>
                
            </Form>
        </Modal>

        

        {/* {state.list?.map((item, index) => (
            <div key={index}>
                <div>{item.name}</div>
            </div>
        ))} */}

        
    </div>
  )
}

export default RolePage;
