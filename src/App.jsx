
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/auth/login/LoginPage'
import HomePage from './pages/home/HomePage'
import AboutPage from './pages/about/AboutPage'
import RegesterPage from './pages/auth/register/RegesterPage'
import NotFound from './pages/404/404'
import MainLayout from './components/layout/MainLayout'
import MainLayoutLogin from './components/layout/MainLayoutLogin'
import ProductPage from './pages/product/ProductPage'
import CustomerPage from './pages/customer/CustomerPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/product" element={<ProductPage/>}/>
          <Route path="/customer" element={<CustomerPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>

        <Route element={<MainLayoutLogin />}>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/regester" element={<RegesterPage/>}/>
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
