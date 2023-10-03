import { createSlice } from '@reduxjs/toolkit'

const teams = createSlice({
    name: 'teams',
    initialState: {
        value: [{
            name:'Team 1',
            members: [],
        }],
        length: 0,
        error: '',
        success: '',
    },
    reducers: {
        addTeam: (state, action) => {
            state.value = [...state.value, action.payload]
            state.length = state.value.length
        },
        addMember: (state, action) => {
            for (let i = 0; i < state.value.length; i++) {
                if (state.value[i].name === action.payload.teamName) {
                    //search if there exists a member with same id
                    for (let j = 0; j < state.value[i].members.length; j++) {
                        if (state.value[i].members[j].id === action.payload.member.id) {
                            state.error = 'Member already exists in the team'
                            return;
                        }
                    }
                    state.value[i].members = [...state.value[i].members, action.payload.member]
                    break;
                }
            }
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setSuccess: (state, action) => {
            state.success = action.payload
        },
    },
})

export const { addTeam, addMember, setError, setSuccess } = teams.actions

export default teams.reducer