import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPosts] = useState({});
    const [comments, setComments] = useState([]);
    const [FetchingById, isLoading, error] = useFetching( async(id) => {
        const response = await PostService.getById(id)
        setPosts(response.data);
    })

    const [FetchComments, isCommentsLoading, commentsError] = useFetching( async(id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })
    
    useEffect(() => {
        FetchingById(params.id);
        FetchComments(params.id);
    }, [])

    return (
        <div>
            <h1>You opened post page with Id = {params.id}</h1>
            {isLoading
                ?   <Loader/>   
                :   <div>{post.id}. {post.title}</div>
            }
            <h2>
                Comments
            </h2>
            {isCommentsLoading
                ?   <Loader/>   
                :   <div>
                        {comments.map(comm => 
                            <div key={comm.email} style={{marginTop: 15}}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
};

export default PostIdPage;