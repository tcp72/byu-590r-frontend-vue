import axios from 'axios'
import API_URL from './env'
import authHeader from './auth-header'

class RecipesService {
    getRecipes() {
        return axios.get(API_URL + 'recipes', { headers: authHeader() }).then((response) => {
            return response.data.results //confirm if .data.data or .data.results in base controller (mine is results)
        })
    }
}

const recipesService = new RecipesService()
export default recipesService
