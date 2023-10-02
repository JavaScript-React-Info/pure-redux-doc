import axios from "axios"

// export const FetchPosts = async () => {

//     const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

//     return {
//         type: 'FETCH_POSTS',
//         payload: response.data
//     }
// }

// WHY IS FETCHPOSTS NOT WORKING
// • Action creators can only return plain Javascript objects with a type
// property
// • The action will get sent to the reducer before the data is fetched
// from the API

// we can load above code in babel and we can observe, the case where it is not returning object

export const FetchPosts = () => {
    return async (dispatch, getState) => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

        dispatch({type: 'FETCH_POSTS', payload: response.data})
    }
}
