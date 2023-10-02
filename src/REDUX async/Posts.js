import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FetchPosts } from "./postsAction";

const Posts = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(FetchPosts())
    }, [])

    return(
        <div>
             posts
        </div>
    )
}
export default Posts