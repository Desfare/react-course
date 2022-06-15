import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/Myselect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput 
                type={filter.quary}
                onChange={e => setFilter({...filter, quary: e.target.value})}
                placeholder="Search..."
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sort by"
                options={[
                    {value: 'title', name: 'Name'},
                    {value: 'body', name: 'Discription'}
                ]}
            />
        </div>
    )
}

export default PostFilter;