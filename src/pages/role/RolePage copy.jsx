import { Space, Input, Button, message, Modal } from 'antd';
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

    const onClear = () => {
        setObjRole((e)=>({
            id: "",
            name: "",
            group: ""
        }))
    }
    
    const onSave = () => {

        if(idEdit == null){
            if(objRole.id == ""){
            message.warning("Please fill id");
            return
        }else if(objRole.name == ""){
            message.warning("Please fill name");
            return
        }else if(objRole.group == ""){
            message.warning("Please fill group");
            retrun
        }

        // Check Conditon ដើម្បីមើលថា​ ID ស្ទួនឬអត់
        const indexFound = state.list.findIndex((item) => item.id == objRole.id);
        if(indexFound != -1){
            message.warning("id alredy exitst!!");
            return;
        }

        // លក្ខខណ្ឌចុងក្រោយគឺ ដើរកូដខាងក្រោម
        setState((p)=>({
            ...p,
            list: [...p.list, objRole],
        }));

        // clear when sumbit success
        setObjRole((e)=>({
            id: "",
            name: "",
            group: ""
        }))
        message.success("Add Success");
        }
        else{
            // edit
            var indexUpdate = state.list.findIndex((item)=>item.id == idEdit);
            // state.list[indexUpdate].id = objRole.id;
            state.list[indexUpdate].name = objRole.name;
            state.list[indexUpdate].group = objRole.group;
            setState((p)=>({
                ...p,
                list:[...state.list]
            }));

            setObjRole((p) => ({
                id: "",
                name: "",
                group: ""
            }));
            setIdEdit(null);
            message.success("Update Success");
        }
    };

    const onClickNew = () => {
        // body function execute
        // action create new record role        
    }

    const onDelete = (item, index) => {

        
        // template ដែលមានស្រាប់ជាមួយ Form Confrim
        Modal.confirm({
            title: "Delete Data",
            content: "Are you sure delete this data?",
            onOk: () => {
                 const newList = state.list.filter((data) => data.id != item.id);
                setState((p)=>({
                    ...p,
                    list: newList,
                }));
                message.success("Delete success");
            }
        })
    }

    // ប្រកាស ID ក្លែងក្លាយសម្រាប់អាចអោយ Form ដឹងថាយើងកំពុងចង់ Edit មិនមែន Delete ទេ
    const [idEdit, setIdEdit] = useState(null);

    const onEdit = (item, index) => {

        setIdEdit(item.id);

        setObjRole((p) => ({
            ...p,
            ...item,
            // ...item គឺមានអត្ថន័យថា
            // id: item.id,
            // name: item.name,
            // group: item.group
            // ទៅថ្ងៃខាងមុខបើមាន 10 គឺគេត្រូវហត់ក្នុងការប្ដូរ ចឹងយើងអាចសរសេរ ...item ទៅស្រួល
        }))
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
            <div style={{backgroundColor: "red", height: 80, padding: 20, borderRadius: 25}}>
                <Space>
                    <Input disabled={idEdit ? true : false} placeholder='id' value={objRole.id} onChange={(event) => setObjRole((p)=> ({
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
                <Button danger style={{marginLeft: 10}} onClick={onClear}>Clear</Button>
                <Button type='primary' style={{marginLeft: 10}} onClick={onSave}>
                    {/* ដាក់លក្ខខណ្ឌ */}
                    {idEdit ? "Update" : "Save"}
                </Button>
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
                        <div> ID: {item.id}</div>
                        <div> Name : {item.name}</div>
                        <div>Group : {item.group}</div>
                    </div>
                </Space>
                <div style={{ textAlign: "right"}}>
                    <Space>
                        <Button type='primary' onClick={() => onEdit(item, index)}>Edit</Button>
                        <Button type='primary' danger onClick={() => onDelete(item, index)}>Delete</Button>
                    </Space>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RolePage;
