យើងរៀនបង្កើត Function 

const onClickNew = () => {
        // body function execute
        // action create new record role
        var objRole = {
            id: 1,
            name: "Tangkoan",
            group: "Admin"
        };
        setState((p)=>({
            ...p, // រក្សាទិន្នន័យចាស់គេកុំអោយបាត់បង់
            list: [...p.list, objRole],
        }));
}

// កូដក្នុង return()
<Button type='primary' onClick={onClickNew}>New</Button>

















កូដសម្រាប់មើលទាក់ទងការប្រើប្រាស់ state និង input data get data form user input
import { Space, Input, Button } from 'antd';
import React, { useState } from 'react';
import { IoCloudOfflineOutline } from "react-icons/io5";


export const RolePage = () => {

    const [state, setState] = useState({
        // array object ឬ object នៅក្នុង array
        // list: [
        //     {
        //         id: 1,
        //         name: "admin",
        //         group: "Admin"
        //     },
        //     {
        //         id: 2,
        //         name: "SEO",
        //         group: "Admin"
        //     },
        //     {
        //         id: 3,
        //         name: "Web Developer",
        //         group: "Admin"
        //     },
        //     {
        //         id: 4,
        //         name: "Mobile Developer",
        //         group: "Admin"
        //     },
        //     {
        //         id: 5,
        //         name: "UX/UI Designer",
        //         group: "Admin"
        //     },
        //     {
        //         id: 6,
        //         name: "Sale",
        //         group: "Admin"
        //     },
        // ],
        list: [],
        loading: false,
        total: 100,
    });

    const [objRole, setObjRole] = useState({
        id: "",
        name: "",
        group: ""
    });
    
    const onSave = () => {
        setState((p)=>({
            ...p,
            list: [...p.list, objRole],
        }));
    };

    const onClickNew = () => {
        // body function execute
        // action create new record role
        

        
    }

  return (
    <div>
        <div className='main-page-header'>
            <Space>
            <div>Role , total<span  style={{color: 'red', fontWeight: 'bold'}}> {state.list.length}</span></div>
            <Input.Search allowClear placeholder='Search...'/>
            </Space>
            <Button type='primary' onClick={onClickNew}>New</Button>
        </div>

        <h1>
            {objRole.id} -{objRole.name} -{objRole.group} 
        </h1>

        {/* Form Add New Role */}
            <div>
                <Space>
                    <Input placeholder='id' value={objRole.id} onChange={(event) => setObjRole((p)=> ({
                        ...p, id: event.target.value
                    }))}/>
                    <Input placeholder='name' value={objRole.name} 
                        onChange={(event) => setObjRole((p)=> ({
                            ...p, name: event.target.value
                        }))}
                    />
                    <Input placeholder='group' value={objRole.group} 
                        onChange={(event) => setObjRole((p)=> ({
                            ...p, group: event.target.value
                        }))}
                    />
                </Space>
                <Button type='primary' onClick={onSave}>Save</Button>
            </div>
        {/* End Add New Role */}

        {/* call state to show if no record */}
        {state.list.length == 0 && <div style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>
            <IoCloudOfflineOutline style={{fontSize: 60}}/>
            <div>No Record</div>
            </div>}
        {/* Call state to show or get data */}
        {state.list.map((item, index)=> (
            <div key={index} style={{padding: 10, backgroundColor: "#EEEEEE", marginBottom: 5, marginTop: 10, borderRadius: 10,}}>
                
                <Space>
                    <div style={{width:40, height:40, borderRadius: 20, backgroundColor: 'gray'}}></div>
                    <div>
                        <div>{item.name}</div>
                        <div>{item.group}</div>
                    </div>
                </Space>
                <div style={{ textAlign: "right"}}>
                    <Space>
                        <Button type='primary'>Edit</Button>
                        <Button type='primary' danger>Delete</Button>
                    </Space>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RolePage;
