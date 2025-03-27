import { createStore } from 'vuex'
import { auth } from './auth.module'
import { user } from './user.module'
import { recipes } from './recipes.module'

const store = createStore({
    modules: {
        auth,
        user,
        recipes,
    },
})

export default store
