import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "fetchedData",
    initialState: {
        pokeList: [],
        status: 'null',
    },
    reducers: {
        fetchPokes(state, action){
            state.pokeList = action.payload;
        },
        pendingRequest(state, action){
            state.status = action.payload;
        },
        finishedRequest(state, action){
            state.status = action.payload;
        },
    },
})

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;