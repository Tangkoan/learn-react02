ក្នុងមេរៀននេះគឺរៀន Remove Data 

// Function
const handleDelete = async (data) => {
        //  alret នេះគឺចង់មើលថាមួយ Obj មានអីខ្លះ
        // alert(JSON.stringify(data))
        // data.id
        

        Modal.confirm({
            title: "Delete",
            content: "Are you sure delete this data?",
            onOk: async() =>{
                const res = await request("role/"+data.id, "delete");
                if (res) {
                    if (res.status === "success") {
                        message.success(res.message);
                        getList();
                    } else if (res.status === "error") {
                        // ត្រង់នេះវានឹងបង្ហាញ "សូមបញ្ចូលឈ្មោះ Role!" ពី API
                        message.error(res.message); 
                    }
                } else {
                    message.error("Something went wrong!");
                }
            }
        })
    }






    /// ផ្នែក Button 
                {
                    key: "action",
                    title: "Action",
                    dataIndex: "id",
                    render: (value, data) => (
                        <Space>
                            <Button type='primary'>Edit</Button>
                            <Button danger type='primary' onClick={()=> handleDelete(data)}>Delete</Button>
                        </Space>
                    )
                },