<template>
    <div v-for="recipe in recipes" :key="recipe.id">
        {{ recipe.recipe_name }}

        <v-img :src="recipe.file" width="300" height="400"></v-img>
    </div>
</template>

<script src="./RecipesView.ts"></script>
