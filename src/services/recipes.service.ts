import axios from 'axios'
import API_URL from './env'
import authHeader from './auth-header'

class RecipesService {
    // Fetches all recipes from the API

    getRecipes() {
        return axios.get(API_URL + 'recipes', { headers: authHeader() }).then((response) => {
            return {
                recipes: response.data.results.recipes, //Extracting results from the response; confirm if .data.data or .data.results in base controller (mine is results)
                authors: response.data.results.authors,
            }
        })
    }
    // Creates a new recipe //I think this is where the content for the actual postman request is being formed. Confirm??
    createRecipe(formData) {
        return axios
            .post(API_URL + 'recipes', formData, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'multipart/form-data', // Required for file upload
                },
            })
            .then((response) => {
                return response.data.results
            })
    }
    // Updates an existing recipe
    updateRecipe(id, formData) {
        formData.append('_method', 'PUT') // Laravel requires this for PUT requests with FormData
        return axios
            .post(API_URL + `recipes/${id}`, formData, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(
                    'here is response.data.results in recipes service',
                    response.data.results
                )
                return response.data.results
            })
    }
    // Deletes a recipe
    deleteRecipe(id) {
        return axios
            .delete(API_URL + `recipes/${id}`, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data.results
            })
    }
    getAuthors() {
        return axios.get(API_URL + 'authors', { headers: authHeader() }).then((response) => {
            return response.data.results
        })
    }
}

const recipesService = new RecipesService()
export default recipesService
