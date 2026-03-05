import React, { useState } from 'react';
import { Button, Form, Input, Upload, message, Card, Typography } from 'antd';
import { UploadOutlined, UserOutlined, LockOutlined, PhoneOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';
import { profileStore } from '../../../store/profileStore';
import { useNavigate, Link } from 'react-router-dom';
import { request } from "../../../util/request";

const { Title } = Typography;

const RegisterPage = () => {
    const { setProfile, setAccessToken } = profileStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    // មុខងារ Handle ការផ្លាស់ប្តូររូបភាព
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const onFinish = async (values) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('password_confirmation', values.password_confirmation);
        formData.append('phone', values.phone);
        formData.append('address', values.address);

        if (fileList.length > 0) {
            formData.append('image', fileList[0].originFileObj);
        }

        const res = await request("register", "post", formData);

        // ១. ប្តូរលក្ខខណ្ឌត្រង់នេះ (Backend អត់បញ្ជូន access_token មកទេ)
        if (res && res.user) { 
            // បង្ហាញ Message ជោគជ័យដែលមកពី Backend
            message.success(res.message || "ចុះឈ្មោះបានជោគជ័យ!");
            
            // រក្សាទុកទិន្នន័យ User (បើចង់)
            // setProfile(res.user);

            // ២. ដោយសារអត់មាន Token សម្រាប់ Login ភ្លាមៗ 
            // យើងគួរ navigate គាត់ទៅទំព័រ Login ដើម្បីឱ្យគាត់វាយ Password ចូលម្តងទៀត
            setTimeout(() => {
                navigate("/login"); 
            }, 1500); // រង់ចាំ ២ វិនាទីឱ្យគាត់មើលឃើញ Message ជោគជ័យសិន

        } else {
            // បើ Backend បញ្ជូន error មក (res?.message)
            message.error(res?.message || "ការចុះឈ្មោះមិនបានសម្រេច");
        }
    } catch (error) {
        message.error("មានបញ្ហាបច្ចេកទេស!");
    } finally {
        setLoading(false);
    }
};

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#f0f2f5',
            padding: '20px'
        }}>
            <Card style={{ 
                width: '100%', 
                maxWidth: 450, 
                borderRadius: 12, 
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)' 
            }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={2} style={{ color: '#1890ff', margin: 0 }}>Register</Title>
                    <p style={{ color: '#8c8c8c' }}>បង្កើតគណនីថ្មីរបស់អ្នក</p>
                </div>

                <Form
                    layout="vertical" // ប្តូរមកប្រើ Vertical ល្អសម្រាប់ Mobile
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {/* រូបភាព Profile */}
                    <Form.Item
                        // label="រូបភាព Profile" 
                        style={{ textAlign:'left' }}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleChange}
                            beforeUpload={() => false} // កុំឱ្យវា upload ទៅ server ភ្លាមៗ
                            maxCount={1}
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>រូបភាព</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'សូមបញ្ចូលឈ្មោះ!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="ឈ្មោះអ្នកប្រើប្រាស់" size="large" />
                    </Form.Item>

                     <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'សូមបញ្ចូលអ៊ីម៉ែល!'},{ 
                            type: 'email', 
                            message: 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវឡើយ (ឧទាហរណ៍៖ example@gmail.com)!' 
                        }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="អ៊ីម៉ែលអ្នកប្រើប្រាស់" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'សូមបញ្ចូលលេខសម្ងាត់!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="លេខសម្ងាត់" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password_confirmation"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'សូមបញ្ចូលការបញ្ជាក់លេខសម្ងាត់!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('លេខសម្ងាត់មិនស៊ីគ្នា!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="បញ្ជាក់លេខសម្ងាត់" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'សូមបញ្ចូលលេខទូរស័ព្ទ!' }]}
                    >
                        <Input prefix={<PhoneOutlined />} placeholder="លេខទូរស័ព្ទ" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'សូមបញ្ចូលអាសយដ្ឋាន!' }]}
                    >
                        <Input prefix={<HomeOutlined />} placeholder="អាសយដ្ឋាន" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                            ចុះឈ្មោះ
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        មានគណនីរួចហើយ? <Link to="/">ចូលប្រើប្រាស់</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;