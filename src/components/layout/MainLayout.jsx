import { Outlet,Link } from "react-router-dom";

const MainLayout = () => {

    return(
        <div style={{width: '100%', height: '60px',backgroundColor: "yellow"}}>
            <div style={{width: '100%',}}>
                <div>Brand Name</div>
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                </div>

                {/* outlet នេះសម្រាប់បង្ហាញ Content Page */}
                <div style={{backgroundColor: "green", height:"100px"}}>
                    <Outlet/>
                </div>

                {/* Footer */}
                <div style={{ backgroundColor: "red", padding: 10}}>
                    <h1>Footer</h1>
                    <div>Facebook</div>
                    <div>Youtube</div>
                    <div>TikTok</div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;