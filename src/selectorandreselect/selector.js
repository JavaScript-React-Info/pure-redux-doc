import { createSelector } from "reselect";

export const usersSelector = (state) => state.users

// when user chnages we are calling mapstatetoprop again and again, this results in huge performance problem. we want filtering to be done one when search changes
// we can use reselect lib

// export const filteredUserSelector = (state) => {
//     return usersSelector(state).filter((user) => {
//         console.log("filtering...........");
//         return user.includes(state.search)
//     })
// }


export const filteredUserSelector = createSelector(
    state => state.users,
    state => state.search,
    (users, search) => {
        return users.filter((user) => {
            console.log("filtering...........");
            return user.includes(search)
        })
    }
)