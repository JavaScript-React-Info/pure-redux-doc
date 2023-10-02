import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPosts } from "./postsAction";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state)

    useEffect(()=>{
        dispatch(FetchPosts())
    }, [])

    return(
        <div>
             {posts}
        </div>
    )
}
export default Posts