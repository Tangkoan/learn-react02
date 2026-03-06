
import { Space, Input, Button, message, Modal, Table, Tag, Form, Select, Image, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoCloudOfflineOutline } from "react-icons/io5";

import { request } from "../../util/request";
import dayjs from 'dayjs';
import { dateClient } from '../../util/helper';

import { UploadOutlined, UserOutlined, LockOutlined, PhoneOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';

import { Row, Col, Card } from 'antd'; // Import បន្ថែម

export const ProductPage = () => {

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
        // បន្ថែមពីរបន្ទាត់នេះ ដើម្បីផ្ញើ ID ទៅ Laravel
        if (filter.category_id) {
            query_param += "&category_id=" + filter.category_id;
        }
        
        if (filter.brand_id) {
            query_param += "&brand_id=" + filter.brand_id;
        }

        const res = await request("product" + query_param, "get")

        // const res = await request("product", "get")
        // console.log(res)
        if(res) {
            setState((pre)=>({
                ...pre,
                // list.data{}
                list:res.list?.data,  // res.data ព្រោះ api មិនមែនបស់ជា [] ទេគឺបស់ជា {data:[{}]} មកពីវាបស់ជា obj ដែលទិន្នន័យស្ថិតក្នុង data ទើប res ត្រូវសរសេរជា res.data
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

   

    const onFinish = async (item) => {
        let formData = new FormData();
        formData.append("product_name", item.product_name); // កែពី name មក product_name ឱ្យត្រូវតាម API
        formData.append("category_id", item.category_id);
        formData.append("brand_id", item.brand_id);
        formData.append("description", item.description);
        formData.append("quantity", item.quantity);
        formData.append("price", item.price);
        formData.append("status", item.status);
        
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('image', fileList[0].originFileObj);
        }
        //
        let url = "product";
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
                const res = await request("product/"+data.id, "delete");
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

    // បង្កើត State និងទាញទិន្នន័យ (ក្នុង ProductPage component)
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getList();
        getCategoryAndBrand(); // បង្កើត function ថ្មីមួយទៀត
    }, []);

    // បន្ថែម Param 'name' ដើម្បីស្វែងរកចំគោលដៅ
    const getCategories = async (name = "") => {
        const res = await request(`categories?text_search=${name}`, "get");
        if (res && res.data) {
            setCategories(res.data);
        }
    };

    const getBrands = async (name = "") => {
        const res = await request(`brand?text_search=${name}`, "get");
        if (res && res.data) {
            setBrands(res.data);
        }
    };

    const getCategoryAndBrand = async () => {
        const resCat = await request("categories", "get"); // ហៅ API category
        const resBrand = await request("brand", "get");   // ហៅ API brand
        if (resCat) setCategories(resCat.data || []); // ប្រើ .data មិនមែន .list ទេ ព្រោះ api របស់ api/categroies គឺ 'data'{}
        if (resBrand) setBrands(resBrand.data || []);
    };
    

  return (
    <div>
        <div className='main-page-header' style={{ marginBottom: 20 }}>
            {/* បន្ថែម justify="start" ដើម្បីឱ្យវាចាប់ផ្ដើមពីឆ្វេង និង gutter ដើម្បីឃ្លាតពីគ្នា */}
            <Row gutter={[16, 16]} align="middle" justify="start">
                
                {/* ១. បង្កើន Col ចំណងជើងឱ្យធំជាងមុន (ពី ២ មក ៤ ឬ ៥) ដើម្បីកុំឱ្យជាន់ */}
                <Col xs={24} sm={8} md={6} lg={4} xl={3}>
                    <h2 style={{ margin: 0, whiteSpace: 'nowrap' }}>Product</h2>
                </Col>
                
                {/* ២. ផ្នែក Filters - កែតម្រូវទំហំ Col ឱ្យសមស្របតាមអេក្រង់ */}
                <Col xs={24} sm={16} md={18} lg={20} xl={21}>
                    <Row gutter={[8, 8]} align="middle">
                        {/* Search - វែង */}
                        <Col xs={24} md={10} lg={10}>
                            <Input.Search 
                                allowClear 
                                placeholder='Search product...' 
                                onChange={(e)=>setFilter(p=>({...p,text_search:e.target.value}))}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        
                        {/* Select Category */}
                        <Col xs={12} md={5} lg={5}>
                            <Select
                                placeholder="Category"
                                allowClear
                                onChange={(val) => setFilter(p => ({ ...p, category_id: val }))}
                                style={{ width: '100%' }}
                            >
                                {categories.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                            </Select>
                        </Col>

                        {/* Select Brand */}
                        <Col xs={12} md={5} lg={5}>
                            <Select
                                placeholder="Brand"
                                allowClear
                                onChange={(val) => setFilter(p => ({ ...p, brand_id: val }))}
                                style={{ width: '100%' }}
                            >
                                {brands.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                            </Select>
                        </Col>

                        {/* ប៊ូតុង Filter និង New */}
                        <Col xs={24} md={4} lg={4}>
                            <Space>
                                <Button type='primary' onClick={handleFilter}>
                                    Filter
                                </Button>
                                <Button type='primary' onClick={handleOpenModal} style={{ backgroundColor: '#1677ff' }}>
                                    New
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

        {/* <h1>{formRef.getFieldValue("id")+ ""} </h1> */}

        <Table 
            rowKey="id"
            dataSource={state.list}
            scroll={{ x: 800 }} // ប្រាប់ឱ្យវាមាន Scroll បើ Screen តូចជាង 800px
            columns={[
                {
                    key: "product_name",
                    title: "Product Name",
                    dataIndex: "product_name",
                },

                {
                    key: "category",
                    title: "Category",
                    dataIndex: "category", // ចាប់យក Object category
                    render: (category) => category?.name || "N/A", // បង្ហាញឈ្មោះ category
                },
                {
                    key: "brand",
                    title: "Brand",
                    dataIndex: "brand", // ចាប់យក Object brand
                    render: (brand) => brand?.name || "N/A", // បង្ហាញឈ្មោះ brand
                },
                {
                    key: "price",
                    title: "Price",
                    dataIndex: "price",
                    render: (value) => `$${value}`, // បន្ថែមសញ្ញាដុល្លារ
                },

                {
                    key: "quantity",
                    title: "Quantityde",
                    dataIndex: "quantity",
                },

                {
                    key: "description",
                    title: "Description",
                    dataIndex: "description",
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
                            <Button type='primary' onClick={()=> handleEdit(data)}>Edit</Button>
                            <Button danger type='primary' onClick={()=> handleDelete(data)}>Delete</Button>
                        </Space>
                    )
                },

                
            ]}
        />

        <Modal 
            // title="New Role"
            title={formRef.getFieldValue("id") ? "Update Product" : "New Product"}
            open={state.open}
            onCancel={handleCloseModal}
            footer={false}>
                
                
            <Form layout='vertical' onFinish={onFinish} form={formRef}>


                <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}>
                                <Input placeholder='Product Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                                <Input type="number" placeholder="Price" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="category_id" label="Category">
                                <Select
                                    showSearch
                                    placeholder="Search Category..."
                                    filterOption={false} // បិទការ Filter ក្នុង Client-side
                                    onSearch={(value) => getCategories(value)} // ហៅ API ពេលអ្នកប្រើវាយអក្សរ
                                    notFoundContent={null}
                                >
                                    {categories.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="brand_id" label="Brand">
                                <Select
                                    showSearch
                                    placeholder="Search Brand..."
                                    filterOption={false}
                                    onSearch={(value) => getBrands(value)}
                                >
                                    {brands.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name={"description"} 
                                label="Description" 
                                rules={[{ required: true, message: 'Please Enter Description' }]}
                            >
                                <Input placeholder='Description' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>  
                            <Form.Item
                                name={"quantity"} 
                                label="Quantity" 
                                rules={[{ required: true, message: 'Please Enter Quantity' }]}
                            >
                                <Input placeholder='Quantity' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>  
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
                        </Col>


                        <Col xs={24} md={12}>  
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
                        </Col>

                        <Col xs={24} md={12}>  
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
                        </Col>
                        {/* ... ដាក់ Col បែបនេះសម្រាប់ Item ផ្សេងទៀត ... */}
                </Row>

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

export default ProductPage;
