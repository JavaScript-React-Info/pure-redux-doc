import axios from "axios"

export const FetchPosts = async () => {

    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

    return {
        type: 'FETCH_POSTS',
        payload: response.data
    }
}

// WHY IS FETCHPOSTS NOT WORKING
// • Action creators can only return plain Javascript objects with a type
// property
// • The action will get sent to the reducer before the data is fetched
// from the API