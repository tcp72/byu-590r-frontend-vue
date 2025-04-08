import recipeService from '../services/recipes.service'

const initialState = {
    recipesList: [],
    authorsList: [],
}

export const recipes = {
    namespaced: true,
    state: initialState,
    actions: {
        // Fetches all recipes from the API
        getRecipes({ commit }) {
            return recipeService.getRecipes().then((data) => {
                // When API call succeeds, commit mutation to update state
                commit('setRecipes', data.recipes) //confirm if this should be data.recipes or just recipes. Same w authors
                commit('setAuthors', data.authors)
                console.log(
                    'here is data.authors in recipes.module after the .then()',
                    data.authors
                )
                console.log('and here is data.recipes', data.recipes)
                return Promise.resolve(data)
            })
        },
        // Creates a new recipe
        createRecipe({ commit }, formData) {
            return recipeService.createRecipe(formData).then((recipe) => {
                // When API call succeeds, commit mutation to add new recipe to state
                commit('addRecipe', recipe)
                return Promise.resolve(recipe)
            })
        },
        // Updates an existing recipe
        updateRecipe({ commit }, { id, formData }) {
            return recipeService.updateRecipe(id, formData).then((recipe) => {
                // When API call succeeds, commit mutation to update recipe in state
                commit('updateRecipe', recipe)
                return Promise.resolve(recipe)
            })
        },
        // Deletes a recipe
        deleteRecipe({ commit }, id) {
            return recipeService.deleteRecipe(id).then(() => {
                // When API call succeeds, commit mutation to remove recipe from state
                commit('deleteRecipe', id)
                return Promise.resolve()
            })
        },
        //get authors
        // getAuthors({ commit }) {
        //     return recipeService.getAuthors().then((authors) => {
        //         commit('setAuthors', authors)
        //         return Promise.resolve(authors)
        //     })
        // },
    },
    mutations: {
        // Sets the entire recipes list in state
        setRecipes(state, recipes) {
            state.recipesList = recipes
        },
        // Adds a single recipe to the state
        addRecipe(state, recipe) {
            state.recipesList.push(recipe) //what does .push do here?
        },
        // Updates a single recipe in the state
        updateRecipe(state, updatedRecipe) {
            const index = state.recipesList.findIndex((recipe) => recipe.id === updatedRecipe.id)
            if (index !== -1) {
                state.recipesList.splice(index, 1, updatedRecipe)
            }
        },
        // Removes a recipe from the state
        deleteRecipe(state, id) {
            state.recipesList = state.recipesList.filter((recipe) => recipe.id !== id)
        },
        setAuthors(state, authors) {
            state.authorsList = authors
        },
    },
}
