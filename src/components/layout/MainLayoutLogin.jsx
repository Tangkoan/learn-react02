import { Outlet,Link } from "react-router-dom";

const MainLayoutLogin = () => {

    return(
        <div style={{width: '100%', height: '100%'}}>
            <div style={{ padding: 10}}>
                <div>Welecome Login Or Regester</div>
                <div>
                    <Link to="/">Login</Link>
                    <Link to="/regester">Register</Link>
                </div>

                {/* outlet នេះសម្រាប់បង្ហាញ Content Page */}
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayoutLogin;