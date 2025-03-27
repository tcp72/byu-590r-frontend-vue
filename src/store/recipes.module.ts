import recipeService from '../services/recipes.service'

const initialState = { recipesList: [] }

export const recipes = {
    namespaced: true,
    state: initialState,
    actions: {
        getRecipes({ commit }) {
            return recipeService.getRecipes().then((recipes) => {
                commit('setRecipes', recipes)
                return Promise.resolve(recipes)
            })
        },
    },
    mutations: {
        setRecipes(state, recipes) {
            state.recipesList = recipes
        },
    },
}
