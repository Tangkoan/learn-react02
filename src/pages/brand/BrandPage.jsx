
import { Space, Input, Button, message, Modal, Table, Tag, Form, Select, Image, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoCloudOfflineOutline } from "react-icons/io5";

import { request } from "../../util/request";
import dayjs from 'dayjs';
import { dateClient } from '../../util/helper';

import { UploadOutlined, UserOutlined, LockOutlined, PhoneOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';



export const BrandPage = () => {

    // សម្រាប់អោយ Function Clear ក្នុង Input ករណីគេ Cancel Modal Form Add
    const [formRef] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    // មុខងារ Handle ការផ្លាស់ប្តូររូបភាព
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const [state, setState] = useState({
        list: [],
        total: 0,
        loading: false,
        open: false,

    });

    const [filter, setFilter] = useState({
        text_search: "",
        status: "",
    })

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {

        // កូដដែលត្រូវបន្ដការងារ search (filter)
        let query_param = "?page=1";
        
    
        // កូដដែលត្រូវបន្ដការងារ search (filter)
        if(filter.text_search !== null && filter.text_search !== ""){
            query_param += "&text_search="+filter.text_search
        }
        // ឆែក status (ប្រើវិធីនេះដើម្បីការពារ undefined, null, និង string ទទេ)
        // យើងឆែក !== undefined និង !== null ដើម្បីឱ្យលេខ 0 នៅតែអាចផ្ញើទៅបាន (បើ status ជាលេខ)
        if (filter.status !== undefined && filter.status !== null && filter.status !== "") {
            query_param += "&status=" + filter.status;
        }

        const res = await request("brand" + query_param, "get")

        // const res = await request("brand", "get")
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
        setFileList([]); // 🚩 ត្រូវថែមជួរនេះដើម្បី Clear រូបភាពចេញ
    }

    // const onFinish = async (values) => { // ប្តូរឈ្មោះពី item មក values ឱ្យងាយយល់
    //     const id = formRef.getFieldValue("id");
    //     let url = "brand"; // 👈 កែពី "brand" មក "brand"
    //     let method = "post"; 

    //     if (id) {
    //         url = "brand/" + id; 
    //         method = "post"; // 👈 ជាទូទៅ Update គេប្រើ PUT (អាស្រ័យលើ API Backend របស់អ្នក)
    //     }

    //     // ប្រសិនបើ API របស់អ្នកត្រូវការ FormData (ករណីមាន Upload រូបភាព) ត្រូវប្រើ FormData
    //     // តែបើ API ទទួលជា JSON ធម្មតា យើងអាចផ្ញើ values ទៅតែម្តង
    //     const res = await request(url, method, values); 
        
    //     if (res) {
    //         if (res.status === "success") { // ឆែកតាម Response structure របស់ API អ្នក
    //             message.success(res.message);
    //             handleCloseModal();
    //             getList();
    //         } else {
    //             message.error(res.message);
    //         }
    //     }
    // };


    const onFinish = async (item) => {
        let formData = new FormData();
        formData.append("name",item.name);
        formData.append("code",item.code);
        formData.append("from_country",item.from_country);
        formData.append("status",item.status);
        // if (fileList.length > 0) {
        //     formData.append('image', fileList[0].originFileObj);
        // }

        // ខាងលើសម្រាប់ Add ដល់កូដក្រោមនេះសម្រាប់ Edit ដែរ
        if (fileList.length > 0 && fileList[0].originFileObj) {
            // បើមាន originFileObj មានន័យថា User ទើបតែរើសរូបភាពថ្មី
            formData.append('image', fileList[0].originFileObj);
        }
        //
        let url = "brand";
        let method = "post";
        if (formRef.getFieldValue("id") != undefined){
            url += "/" + formRef.getFieldValue("id");
            method = "post"; // បើ put ដូរដាក់ put
        }

        // set Stateថ្មីត្រៀមពេលជោគជ័យឬបរាជ័យ
        setState((p)=>({
            ...p,
            loading: true,
        }));

        // បើកូដខាងលើត្រូវហើយត្រូវត្រៀមទទួលលទ្ធផល Success
        const res = await request(url, method, formData);

       if (res && res.status === "success") { // ឆែកតាម Response ជោគជ័យរបស់អ្នក
            message.success(res.message);
            handleCloseModal();
            getList();
        } else if (res && res.errors) {
            // ១. បង្ហាញ Error ក្រហមៗនៅពីក្រោម Input នីមួយៗក្នុង Form
            const fields = Object.keys(res.errors).map((key) => ({
                name: key,
                errors: res.errors[key],
            }));
            formRef.setFields(fields);// ២. 🚩 បង្ហាញ Toast Message (កន្លែងដែលអ្នកចង់បាន)
            // យើងឆែកមើលថា បើមាន error លើ image យើងបង្ហាញ error ហ្នឹងតែម្តង
            if (res.errors.image) {
                message.error(res.errors.image[0]); // បង្ហាញ "The image field must be an image."
            } else {
                message.error("សូមពិនិត្យមើលទិន្នន័យឡើងវិញ!");
            }
        } else {
            message.error(res?.message || "មានបញ្ហាអ្វីមួយ!");
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
                const res = await request("brand/"+data.id, "delete");
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

    const handleEdit = (data) => {
        // alert(JSON.stringify(data))
        
        formRef.setFieldsValue({
            ...data,
            id: data.id,
            // name: data.name
            // code : data.code គឺគេមិនចង់សរសេរច្រើនដងគេប្រើ 
        });

        // បន្ថែមការចាប់រូបភាពមកបង្ហាញក្នុង Upload Component
        if (data.image) {
            setFileList([
                {
                    // uid: '-1', // លេខសម្គាល់ចៃដន្យ
                    // name: 'image.png',
                    // status: 'done', // កំណត់ថា upload រួចរាល់
                    // url: data.image, // URL រូបភាពដែលបានមកពី API (Map URL រួចហើយក្នុង Laravel)

                    uid: data.id,
                    name: data.name,
                    status: "done",
                    url: data.image,

                    // url: config.image_path + data.image, // ករណី API មិនបាន Loop domain អៅយ
                },
            ]);
        } else {
            setFileList([]); // បើគ្មានរូបភាព ឱ្យវាទទេ
        }

        setState((p)=>({
                ...p,
                open: true,
        }));

        getList();
    }

    const handleFilter = () => {
        getList();
    }

    

  return (
    <div>
        <div className='main-page-header'>
            <h1>{filter.text_search}-{filter.status}</h1>
            <Space>
            <div>Role <span  style={{color: 'red', fontWeight: 'bold'}}> {state.list.length}</span></div>
            <Input.Search allowClear placeholder='Search...'onChange={(e)=>setFilter(p=>({...p,text_search:e.target.value}))}/>
            <Select
                style={{width: 130}}
                allowClear={true}
                placeholder="Select Status"
                options={[
                    {
                        label: "Active",
                        value: "active", // ប្តូរពី 1 មកជា "active"
                    },
                    {
                        label: "Disable",
                        value: "disble", // ប្តូរពី 0 មកជា "disble" (តាមឈ្មោះ enum ក្នុង backend របស់អ្នក)
                    }
                ]}
                onChange={(value)=>setFilter(p=>({...p,status:value}))}
            />
            <Button type='primary' onClick={handleFilter}>Filter</Button>
            </Space>

            

            <Button type='primary' onClick={handleOpenModal}>New</Button>
        </div>

        <h1>{formRef.getFieldValue("id")+ ""} </h1>

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
                    key: "from_country",
                    title: "From Country",
                    dataIndex: "from_country",
                },


                {
                    key: "image",
                    title: "Image",
                    dataIndex: "image",
                    // value គឺគ្រាន់តែឈ្មោះតំណាង ចង់ដាក់ថា  image ក៏បាន
                    render: (value)=> (
                        <Image src={value} width={70} alt=''/>
                        // <Image src={config.image_path + image} width={70} alt=''/> // ករណី API មិនបាន ត Domain/path_image
                    )
                },


                {
                    key: "status",
                    title: "Status",
                    dataIndex: "status",
                    // render: (value) => (value ? "Active" : "Disble")
                    render: (value) => (value=='active' ? <Tag color="green">Active</Tag> : <Tag color='red'>Disble</Tag>)
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
                            <Button type='primary' onClick={()=> handleEdit(data)}>Edit</Button>
                            <Button danger type='primary' onClick={()=> handleDelete(data)}>Delete</Button>
                        </Space>
                    )
                },

                
            ]}
        />

        <Modal 
            // title="New Role"
            title={formRef.getFieldValue("id") ? "Update Brand" : "New Brand"}
            open={state.open}
            onCancel={handleCloseModal}
            footer={false}>
                
            <Form layout='vertical' onFinish={onFinish} form={formRef}>
                <Form.Item
                    name={"name"} 
                    label="Brand Name" 
                    rules={[{ required: true, message: 'Please Enter Brand' }]}
                >
                    <Input placeholder='Name' />
                </Form.Item>

                <Form.Item
                    name={"code"} 
                    label="Brand Code" 
                    rules={[{ required: true, message: 'Please Enter Code' }]}
                >
                    <Input placeholder='Code' />
                </Form.Item>

                <Form.Item
                    name={"from_country"} 
                    label="from_country" 
                    rules={[{ required: true, message: 'Please Enter from_country' }]}
                >
                    <Input placeholder='from_country' />
                </Form.Item>

                <Form.Item
                        // label="រូបភាព Profile" 
                        style={{ textAlign:'left' }}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleChange}
                            // beforeUpload={() => false} // កុំឱ្យវា upload ទៅ server ភ្លាមៗ
                            maxCount={1}
                            beforeUpload={(file) => {
                                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                                if (!isJpgOrPng) {
                                    message.error('អ្នកអាចបញ្ចូលបានតែឯកសារប្រភេទ JPG/PNG តែប៉ុណ្ណោះ!');
                                    return Upload.LIST_IGNORE; // បដិសេធមិនយក File ហ្នឹងចូល fileList
                                }
                                const isLt2M = file.size / 1024 / 1024 < 2;
                                if (!isLt2M) {
                                    message.error('រូបភាពត្រូវតែតូចជាង 2MB!');
                                    return Upload.LIST_IGNORE;
                                }
                                return false; // ប្រាប់ Antd ថាកុំទាន់ Upload ទៅ server (យើងនឹង upload តាម manual ក្នុង onFinish)
                            }}
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>រូបភាព</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                

               

                <Form.Item name={"status"} label="Status">
                    <Select
                        placeholder= "Select Status"
                        options={[
                            {
                                label: "Active",
                                value: 'active',
                            },
                            {
                                label: "Disble",
                                value: 'disble',
                            }
                        ]}
                    />
                </Form.Item>

                <div style={{textAlign: 'right'}}>
                    <Space >
                        <Button danger type='primary' onClick={handleCloseModal}>Cancel</Button>
                        <Button type='primary' htmlType='sumbit'>{formRef.getFieldValue("id") ? "Update" : "Save"}</Button>
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

export default BrandPage;
