import { mapState } from 'vuex'
import { useDisplay } from 'vuetify'
export default {
    name: 'RecipesView',
    computed: {
        ...mapState({
            recipes() {
                //get recipes from the state
                return this.$store.state.recipes.recipesList
            },
        }),
    },
    created() {
        this.getRecipes()
    },
    methods: {
        getRecipes() {
            this.$store.dispatch('recipes/getRecipes').then(() => {
                //when page loads dispatch to recipes module and getRecipes
                this.isLoadingRecipes = false //optional
            })
        },
    },
}
