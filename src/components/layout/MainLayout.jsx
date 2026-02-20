import React, { useState } from 'react';
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
  getItem('Product', 'sub1', <UserOutlined />, [
    getItem('product', '/product'),
    getItem('Customer', '/customer'),
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
          <div
            style={{
              padding: 24,
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




// import { Outlet,Link } from "react-router-dom";

// const MainLayout = () => {

//     return(
//         <div style={{width: '100%', height: '60px',backgroundColor: "yellow"}}>
//             <div style={{width: '100%',}}>
//                 <div>Brand Name</div>
//                 <div>
//                     <Link to="/home">Home</Link>
//                     <Link to="/about">About</Link>
//                 </div>

//                 {/* outlet នេះសម្រាប់បង្ហាញ Content Page */}
//                 <div style={{backgroundColor: "green", height:"100px"}}>
//                     <Outlet/>
//                 </div>

//                 {/* Footer */}
//                 <div style={{ backgroundColor: "red", padding: 10}}>
//                     <h1>Footer</h1>
//                     <div>Facebook</div>
//                     <div>Youtube</div>
//                     <div>TikTok</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MainLayout;