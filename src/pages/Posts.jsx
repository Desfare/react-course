import React, { useEffect, useState, useRef } from "react";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import { usePosts } from "../hooks/usePosts";
import { getPagesCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/Myselect";

/* import { useRef } from "react"; */
/* const bodyInputRef = useRef() */ // можно напрямую получать элементы DOM дерева
/* console.log(bodyInputRef.current.value) */
/* { Неуправляемый компонент }
<MyInput 
  type="text" 
  placeholder="Post discription"
  ref={bodyInputRef}
/> */


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    //общее количество постов
    const [totalPages, setTotalPages] = useState(0);
    //состояния для лимита и номера страницы
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1)
    //custom hook for sort and search simultaniously
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    //ссылка на последний элемент
    const lastElem = useRef();
    
    //custom hook for fetching posts
    const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    })

    useObserver(lastElem, page < totalPages, isPostsLoading, () => {
        setPage( page + 1 );
    })

    useEffect( () => {
        fetchPosts(limit, page);
    }, [page, limit])
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    //Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: "15px 0"}}></hr>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={"Posts per page"}
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Show all'},
                ]}
            />
            {postError &&
                <h1>Error: {postError}</h1>
            }
            <Pagination 
                page={page} 
                changePage={changePage} 
                totalPages={totalPages}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts JS"/>
            <div ref={lastElem} style={{heigth: 20}}></div>
            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <Loader/>
                </div>
            }
        </div>
    );
}

export default Posts;
