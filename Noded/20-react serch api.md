មេរៀននេះយើងនឹងធ្វើ

- select status
=> សរសេរកូដ select status ក្រោមកូដ Search ហើយនឹងបង្កើត Button ដើម្បី Fliter នឹង function handleFilter
នៅពេលគេវាយអក្សរចូល Search box គឺត្រូវចាប់ Value ដែលគេវាយបញ្ចូល
នៅពេលគេជ្រើសរើស status ដែល Active ឬ Disble គឺត្រូវចាប់ Value ថា 1,0 
=> Function getList គឺមានការផ្លាស់ប្ដូរកូដដោយសារយើង ប្រើ Filter នោះ varible res ក៏បានចាប់ផ្ដើមកែប្រែកូដដោយមាន "role" + query_param, "get"

កិច្ចការ Frontend គឺប៉ុន្នឹង បន្ដគឺ API ត្រូវសរសេរ

