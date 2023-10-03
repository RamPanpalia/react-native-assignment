import { configureStore } from '@reduxjs/toolkit'
import teams from './teams'

export default configureStore({
    reducer: {
        teams: teams,
    },
})