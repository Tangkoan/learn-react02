React Style​ មានបី ៖
    1. inline
        <p style={{color: "yellow", font:"bold"}}>Hello Style inline</p>

    2. internal (ពេលប្រើ Internal វាមិន suggest កូដអោយយើងទេ)
        import { useState } from "react";
            const HomePage = () => {

                // ប្រកាស style
                const container = {
                    width: 300,
                    height: 500,
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                    margin: 20,
                }
                // end style
                
                return(

                    // ហៅ steyle មកប្រើ
                    <div style={container}>
                        <p style={{color: "red", font:"bold"}}>Hello Style inline</p>
                    </div>
                )
        }
        export default HomePage;

    3. external
        កូដនេះដូចមេរៀន External Css ដែរ