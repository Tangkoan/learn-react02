ក្នុងមេរៀននេះគឺយើងរៀនក្នុងការបង្កើត Fome Add Role ដោយប្រើ Modal របស់ antd
ចំពោះមេរៀនថ្មីដែលត្រូវកត់សម្គាល់គឺ យើងរៀនបង្កើត Function ដែលយក Function ទៅប្រើក្នុង Button ផ្សេងៗដោយអាចអោយវាមាន Action 


// សម្រាប់អោយ Function Clear ក្នុង Input ករណីគេ Cancel Modal Form Add
    const [formRef] = Form.useForm();

    ប្រើក្នុង Form ដើម្បីពេល Close Modal គឺវាធ្វើការ Clare Form 
    <Form layout='vertical' onFinish={onFinish} form={formRef}>