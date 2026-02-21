import React, { useState } from 'react';
import logo from '../../assets/images/logo.jpg'

import { FcCustomerSupport } from "react-icons/fc";


import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
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
  getItem('About', '/about', <DesktopOutlined />),
  getItem('Role', '/role', <DesktopOutlined />),
  getItem('Product', 'sub1', <UserOutlined />, [
    getItem('product', '/product'),
    getItem('Customer', '/customer',<FcCustomerSupport />),
    getItem('Alex', '5'),
  ]),
];
const MainLayout = () => {

    // Declar 
    const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
                  

                    <div style={{paddingTop: 10}}>
                        <h5>Vannchinh Kuy</h5>
                        <h5>Super Admin</h5>
                    </div>
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

