<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-h3 mb-6 text-center">Check Out These Recipes</h1>
                <v-btn color="success" class="mb-4" @click="openCreateDialog">
                    Create New Recipe
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <!--iterate through recipes from store-->

            <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4" lg="3">
                <v-card class="mx-auto" max-width="344" elevation="3">
                    <v-img :src="recipe.file" height="200" cover></v-img>
                    <v-card-title>{{ recipe.recipe_name }}</v-card-title>
                    <v-card-subtitle>
                        By: {{ recipe.author ? recipe.author.author_name : 'Unknown' }}
                    </v-card-subtitle>
                    <v-card-text>
                        <div>Total Time: {{ recipe.total_time }} minutes</div>
                        <div v-if="recipe.ingredients && recipe.ingredients.length">
                            <strong>Ingredients:</strong>
                            <ul>
                                <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                                    {{ ingredient.ingredient_name }} ({{
                                        ingredient.pivot.quantity
                                    }})
                                </li>
                            </ul>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <!-- Edit button: calls openEditDialog method;  Delete button: calls confirmDelete method in RecipesView.ts -->
                        <v-btn variant="text" @click="openEditDialog(recipe)">Edit</v-btn>
                        <v-btn color="error" variant="text" @click="confirmDelete(recipe)"
                            >Delete</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!--dialogs beneath here-->
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
            <v-card-title>Delete Recipe</v-card-title>
            <v-card-text>Are you sure you want to delete this recipe?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="deleteDialog = false"
                    >Cancel</v-btn
                >
                <v-btn color="error" variant="text" @click="deleteRecipe">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Create/Edit Recipe Dialog -->
    <v-dialog v-model="formDialog" max-width="600px">
        <v-card>
            <v-card-title>{{ editMode ? 'Edit Recipe' : 'Create Recipe' }}</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        v-model="formData.recipe_name"
                        label="Recipe Name"
                        :rules="[(v) => !!v || 'Recipe name is required']"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formData.total_time"
                        label="Total Time (minutes)"
                        type="number"
                        :rules="[(v) => !!v || 'Total time is required']"
                        required
                    ></v-text-field>

                    <v-select
                        v-model="formData.author_id"
                        :items="authors"
                        item-title="author_name"
                        item-value="id"
                        label="Author"
                        :rules="[(v) => !!v || 'Author is required']"
                        required
                    ></v-select>

                    <v-file-input
                        v-if="!editMode || (editMode && changeImage)"
                        @change="onNewFileChange"
                        label="Recipe Image"
                        accept="image/*"
                    ></v-file-input>

                    <v-checkbox
                        v-if="editMode"
                        v-model="changeImage"
                        label="Change Recipe Image"
                    ></v-checkbox>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="formDialog = false"
                    >Cancel</v-btn
                >
                <!-- Save button: When clicked, calls saveRecipe method in RecipesView.ts -->
                <v-btn color="blue-darken-1" variant="text" @click="saveRecipe" :disabled="!valid"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./RecipesView.ts"></script>

<style scoped>
.v-card-title {
    font-size: 1.25rem;
    font-weight: 500;
}
</style>
