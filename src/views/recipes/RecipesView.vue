<template>
    <v-container>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">Recipe Picture</th>
                    <th class="text-left">Recipe Name</th>
                    <th class="text-left">Preparation Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="recipe in recipes" :key="recipe.id" style="height: 150px">
                    <td class="py-6">
                        <v-img
                            v-if="recipe.file"
                            :src="recipe.file"
                            max-width="100"
                            max-height="100"
                        ></v-img>
                        <v-icon v-else>mdi-image-off</v-icon>
                    </td>
                    <td class="py-6">{{ recipe.recipe_name }}</td>
                    <td class="py-6">{{ recipe.total_time }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script src="./RecipesView.ts"></script>

<!-- <template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-h3 mb-6 text-center">Check Out These Recipes</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4" lg="3">
                <v-card class="mx-auto" max-width="344" elevation="3">
                    <v-img :src="recipe.file" height="200" cover></v-img>
                    <v-card-title>{{ recipe.recipe_name }}</v-card-title>
                    <v-card-text>
                        <p>Delicious homemade recipe</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" variant="text"> View Recipe </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn variant="text">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script src="./RecipesView.ts"></script>

<style scoped>
.v-card-title {
    font-size: 1.25rem;
    font-weight: 500;
}
</style> -->
