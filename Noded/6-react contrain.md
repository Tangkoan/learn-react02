មេរៀននេះនិយាយពីកូដខាងក្រោមដោយប្រើប្រាស់ State 
        
        import { useState } from "react";
        const HomePage = () => {
            const [value1, setValue1] = useState("");
            const [value2, setValue2] = useState("");
            const [sum, setSum] = useState(null);
            // function
            const onSum = () => {
                setSum(Number(value1) + Number(value2));
            }
            return(
                <div>
                    <h1>Home Page</h1>

                    <input onChange={(event)=>setValue1(event.target.value)} type="text" placeholder="Please inter Number"/>
                    <input onChange={(event)=>setValue2(event.target.value)} type="text" placeholder="Please inter Number"/>

                    <button onClick={onSum}> Sum = {sum}</button>
                </div>
            )
        }
        export default HomePage;