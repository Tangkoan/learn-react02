import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.jpg'

import { FcCustomerSupport } from "react-icons/fc";

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';



import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { profileStore } from '../../store/profileStore';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Home', '/home', <PieChartOutlined />),
  getItem('Role', '/role', <DesktopOutlined />),
  // getItem('Category', '/category', <DesktopOutlined />),
  getItem('Product', 'sub1', <UserOutlined />, [
    getItem('product', '/product'),
    getItem('Category', '/category',<FcCustomerSupport />),
    // getItem('Alex', '5'),
  ]),

  getItem('User', 'user', <UserOutlined />, [
    getItem('User', '/user'),
    getItem('Role', '/role',),
    getItem('Permission', '/permission',),
  ]),

  getItem('Setting', 'setting', <UserOutlined />, [
    getItem('User', '/user'),
    getItem('Role', '/role',),
  ]),
];



const dropdown = [
  {
    key: '1',
    label: "Change Profile",
    // icon <SmileOutlined/>
  },{
    key: '2',
    label: "Change Password",
    // icon <SmileOutlined/>
  },{
    key: '3',
    label: "Logout",
    // icon <SmileOutlined/>
  },
];

const MainLayout = () => {

    // Declar 
    const navigate = useNavigate();

    // យើងប្រើ Zustand state  //
    const {profile, logout} = profileStore();
    useEffect(()=> {
      if(!profile){
        navigate("/login")
      }
    }, [])

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  if(!profile){
    return null; // អត់ show អីទេ
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            // action route 
            onClick={(item)=> navigate(item.key)}
            />
      </Sider>
      <Layout>
            <div className='header-main'>
                <div className='text-main'>
                    
                        
                    <div style={{display: 'flex'}}>
                      <img src={logo} alt=''  className='logo'/>
                      <div style={{paddingTop: 15, paddingLeft: 15}}>
                        <h5>Online Shop</h5>
                        <h5>Build Your Skill</h5>
                      </div>
                    </div>
                  

                     <Dropdown menu={{ items: dropdown, onClick: (item)=> {
                      // alert(item.key)
                      if (item.key === '3') { 
                          logout(); // សម្អាតទិន្នន័យក្នុង Store
                          localStorage.removeItem("access_token"); // លុប Token ចេញពី LocalStorage (បើមាន)
                          localStorage.removeItem("profile"); // លុប Profile ចេញពី LocalStorage (បើមាន)
                          navigate("/login"); // ប្តូរទៅទំព័រ Login
                        }
                     } }}>
                        <a onClick={e => e.preventDefault()}
                          
                          >
                          <Space>
                            <div style={{paddingTop: 10}}>
                                <h5>{profile?.name}</h5>
                                <h5>{profile?.role}</h5>
                            </div>
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                </div>
            </div>
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
          <div
            style={{
              marginTop: 24,
              padding: 24,
              paddingTop: 20,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};
export default MainLayout;

