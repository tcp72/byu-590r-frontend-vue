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
                <v-card class="recipe-card d-flex flex-column" outlined elevation="1" height="100%">
                    <v-img :src="recipe.file" height="180" class="rounded-t" cover></v-img>
                    <v-card-title class="headline font-weight-bold pb-0">
                        {{ recipe.recipe_name }}
                    </v-card-title>
                    <v-card-subtitle class="author-subtitle">
                        By: {{ recipe.author ? recipe.author.author_name : 'Unknown' }}
                    </v-card-subtitle>
                    <v-card-text class="flex-grow-1">
                        <div class="info-row">
                            <v-icon size="18" color="green darken-2" class="mr-1">mdi-timer</v-icon>
                            <span>{{ recipe.total_time }} min</span>
                        </div>
                        <div v-if="recipe.ingredients && recipe.ingredients.length" class="mt-2">
                            <strong>Ingredients:</strong>
                            <ul class="ingredients-list">
                                <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                                    {{ ingredient.ingredient_name }} ({{
                                        ingredient.pivot.quantity
                                    }})
                                </li>
                            </ul>
                        </div>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions class="justify-end">
                        <v-btn variant="text" color="primary" @click="openEditDialog(recipe)">
                            Edit
                        </v-btn>
                        <v-btn variant="text" color="error" @click="confirmDelete(recipe)">
                            Delete
                        </v-btn>
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
                        :rules="[
                            (v) => !!v || 'Recipe name is required',
                            (v) => (v && v.length <= 40) || 'Max 40 characters',
                        ]"
                        maxlength="40"
                        counter="40"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formData.total_time"
                        label="Total Time (minutes)"
                        type="number"
                        :rules="[
                            (v) => !!v || 'Total time is required',
                            (v) => /^\d{1,3}$/.test(String(v)) || 'Must be a number (max 3 digits)',
                            (v) => v > 0 || 'Must be greater than 0',
                            (v) => v <= 999 || 'Must be less than 1000',
                        ]"
                        min="1"
                        max="999"
                        maxlength="3"
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
                        v-if="formData.id"
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        label="Recipe Image"
                        @change="onExistingFileChange"
                        :rules="[
                            (v) => (!!v && v.length > 0) || 'Recipe image is required',
                            (v) =>
                                !v ||
                                (Array.isArray(v)
                                    ? /\.(jpe?g|png|gif)$/i.test(v[0]?.name)
                                    : /\.(jpe?g|png|gif)$/i.test(v.name)) ||
                                'Image must be JPG, JPEG, PNG, or GIF',
                        ]"
                        :loading="fileIsUpdating"
                    >
                    </v-file-input>
                    <v-file-input
                        v-else
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        label="Recipe Image"
                        @change="onNewRecipeFileChange"
                        :rules="[
                            (v) => (!!v && v.length > 0) || 'Recipe image is required',
                            (v) =>
                                !v ||
                                (Array.isArray(v)
                                    ? /\.(jpe?g|png|gif)$/i.test(v[0]?.name)
                                    : /\.(jpe?g|png|gif)$/i.test(v.name)) ||
                                'Image must be JPG, JPEG, PNG, or GIF',
                        ]"
                        :loading="fileIsUpdating"
                    >
                    </v-file-input>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="formDialog = false"
                    >Cancel</v-btn
                >
                <!-- Save button: When clicked, calls saveRecipe method in RecipesView.ts -->
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="saveRecipe"
                    :disabled="!valid || loading"
                >
                    <v-progress-circular
                        v-if="loading"
                        indeterminate
                        size="20"
                        color="white"
                        class="mr-2"
                    />
                    Save
                </v-btn>
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

.recipe-card {
    border-radius: 18px;
    transition: box-shadow 0.2s, transform 0.2s;
    min-height: 420px;
    margin-bottom: 1.5rem;
}
.recipe-card:hover {
    box-shadow: 0 6px 24px rgba(58, 125, 68, 0.12);
    transform: translateY(-2px) scale(1.01);
}
.rounded-t {
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
}
.author-subtitle {
    color: #62cd72;
    font-size: 1rem;
    margin-bottom: 0.2rem;
}
.info-row {
    display: flex;
    align-items: center;
    font-size: 0.98rem;
    margin-bottom: 0.3rem;
}
.ingredients-list {
    margin: 0.3rem 0 0 0.2rem;
    padding-left: 1.1rem;
    font-size: 0.96rem;
}
@media (max-width: 600px) {
    .recipe-card {
        min-height: 360px;
    }
}
</style>
