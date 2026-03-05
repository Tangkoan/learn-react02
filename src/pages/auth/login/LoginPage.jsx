import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { profileStore } from '../../../store/profileStore';
import { useNavigate,Outlet,Link } from 'react-router-dom';
import { request } from "../../../util/request";

const LoginPage = () => {
    // ១. ប្រកាស Hooks នៅខាងក្នុង Component Body
    const { setProfile,setAccessToken } = profileStore();
    const navigate = useNavigate();

    // សម្រាប់ Loading
    const [loading, setLoading] = useState(false);
    // សម្រាប់ defalut គឺ false តែទាល់តែពេល Request ទៅកាន់ API ទើប True(បានន័យថាកំពុង Loading ទាល់ចប់ទើប False វិញ)

    // ២. រុញ Function onFinish ចូលមកក្នុងនេះ ដើម្បីប្រើ navigate និង setProfile បាន
    const onFinish = async (values) => {
        
        // ​Loading ពេលកំពុងស្នើគឺ True
        setLoading(true)

        const param = {
            name: values.name,
            password: values.password,
        };
        const res = await request("login", "post", param);
        // ពេល Loading ចប់គឺ Falseវិញ
        if (res && !res.error && res.access_token) {
            // setProfile(res.user);
            setProfile({
                ...res.user?.profile,
                ...res.user,
            });
            setAccessToken(res.access_token);
            navigate("/home");
        } else {
            // បង្ហាញ Error បើ Login មិនចូល
            alert(res?.message || "Login failed");
        }

        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Spin spinning={loading}>
            <div style={{
                width: 350, // កែឱ្យធំបន្តិចដើម្បីកុំឱ្យដាច់អក្សរ label
                border: "1px solid #eee",
                backgroundColor: "#fff",
                padding: 25,
                margin: "auto",
                marginTop: 50,
                borderRadius: 10,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ remember: true }}
                    initialValues={{
                            name: "vc", // ឈ្មោះ key ត្រូវតែដូចទៅនឹង name="name" របស់ Form.Item
                            password: "Tangkoan@1100", 
                        }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                    <div>
                        <Link to="/regester">Register</Link>
                    </div>
                </Form>
            </div>
        </Spin>
    );
};

export default LoginPage;