import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''}); //обнуляем состояния чтобы текст внутри инпутов после создания поста чистился   двухстороннее связывание!
      }


    return (
        <div>
            <form>
            {/* Управляемый компонент */}
                <MyInput 
                type="text" 
                placeholder="Post name"
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                /> 
                <MyInput 
                type="text" 
                placeholder="Post discription"
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                />
                <MyButton onClick={addNewPost}>Create</MyButton>
            </form>
        </div>
    )
}

export default PostForm;