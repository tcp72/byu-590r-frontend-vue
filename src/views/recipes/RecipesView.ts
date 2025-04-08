import { mapState } from 'vuex'
import { useDisplay } from 'vuetify'
import API_URL from '@/services/env'
export default {
    name: 'RecipesView',
    // data() defines the component's reactive data properties (that we can reference beneath)
    data() {
        return {
            deleteDialog: false, // Controls visibility of delete confirmation dialog
            formDialog: false, // Controls visibility of create/edit form dialog
            editMode: false, // Determines if form is in edit or create mode
            valid: false, // Form validation status
            changeImage: false, // Flag to indicate if image should be changed during edit
            selectedRecipe: null, // Stores the currently selected recipe for edit/delete operations
            recipeImage: null, // Stores the selected image file for create/edit
            formData: {
                // Stores form data for create/edit operations
                recipe_name: '',
                total_time: '',
                author_id: 1, // Default author ID
            },
        }
    },
    // computed properties are cached and only re-evaluated when dependencies change
    computed: {
        ...mapState({
            recipes() {
                //get recipes from the state to this component
                return this.$store.state.recipes.recipesList
            },
            authors() {
                return this.$store.state.recipes.authorsList
            },
        }),
    },
    //this lifecycle hook is called after the instance is creted
    created() {
        this.getRecipes() //Fetch recipes when component is created; gets recipes and authors
    },
    methods: {
        // Dispatches action to fetch recipes from API
        getRecipes() {
            this.$store.dispatch('recipes/getRecipes') // This action is defined in recipes.module.ts and calls the API via recipes.service.ts
        },

        // Called when delete button is clicked in RecipesView.vue
        confirmDelete(recipe) {
            this.selectedRecipe = recipe
            this.deleteDialog = true // Shows delete confirmation dialog
        },

        // Called when delete is confirmed in delete confirmation dialog
        deleteRecipe() {
            // Dispatches delete action to Vuex store
            this.$store.dispatch('recipes/deleteRecipe', this.selectedRecipe.id).then(() => {
                this.deleteDialog = false
                this.selectedRecipe = null
            })
            // This action is defined in recipes.module.ts and calls the API via recipes.service.ts
        },

        // Called when create button is clicked in RecipesView.vue
        openCreateDialog() {
            this.editMode = false
            this.formData = {
                recipe_name: '',
                total_time: '',
                author_id: '', // DO I NEED TO CHANGE THIS HERE??????? HOW DO I HANDLE IT DYNAMICALLY IN THE FUTURE????????????
            }
            this.recipeImage = null
            this.formDialog = true // Shows create form dialog
        },

        // Called when edit button is clicked in RecipesView.vue
        openEditDialog(recipe) {
            this.editMode = true
            this.selectedRecipe = recipe
            this.formData = {
                id: recipe.id,
                recipe_name: recipe.recipe_name,
                total_time: recipe.total_time,
                author_id: recipe.author_id,
            }
            this.changeImage = false
            this.formDialog = true // Shows edit form dialog
        },

        // Called when save button is clicked in create/edit form dialog PLEASE EXPLAIN THIS METHOD A LITTLE MORE
        saveRecipe() {
            if (!this.$refs.form.validate()) return // Form validation

            const formData = new FormData()

            // Add form fields to FormData
            Object.keys(this.formData).forEach((key) => {
                formData.append(key, this.formData[key])
            })

            // Add image if provided
            if (this.recipeImage && (this.changeImage || !this.editMode)) {
                formData.append('file', this.recipeImage)
            }

            if (this.editMode) {
                // Dispatch update action to Vuex store
                this.$store
                    .dispatch('recipes/updateRecipe', {
                        id: this.selectedRecipe.id,
                        formData,
                    })
                    .then(() => {
                        this.formDialog = false
                    })
                // This action is defined in recipes.module.ts and calls the API via recipes.service.ts
            } else {
                // Dispatch create action to Vuex store
                this.$store.dispatch('recipes/createRecipe', formData).then(() => {
                    this.formDialog = false
                })
                // This action is defined in recipes.module.ts and calls the API via recipes.service.ts
            }
        },
        onNewFileChange(event) {
            this.recipeImage = null

            if (!event || !event.target || !event.target.files) return // Safety check

            const image = event.target.files || event.dataTransfer.files
            if (!image.length) return

            this.recipeImage = image[0]
            console.log(this.recipeImage)
        },
    },
}
