<template>
    <section class="home-hero">
        <div class="home-hero-content">
            <h1>Welcome to RecipeHub!</h1>
            <p class="home-subtitle">
                Discover delicious recipes, share your creations, and join our community of food
                lovers.
            </p>
            <p class="home-message">{{ message }}</p>
            <router-link to="/recipes" class="home-btn">Browse Recipes</router-link>
        </div>
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const message = route.query.message || 'Welcome!'
</script>

<style scoped>
.home-hero {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8fafc 60%, #e6f4ea 100%);
    padding: 2rem 1rem;
    border-radius: 18px;
    margin: 1.5rem auto;
    box-shadow: 0 2px 12px rgba(58, 125, 68, 0.06);
    max-width: 700px;
}

.home-hero-content {
    text-align: center;
}

.home-hero h1 {
    font-size: 2.3rem;
    color: #3a7d44;
    margin-bottom: 0.5rem;
}

.home-subtitle {
    font-size: 1.15rem;
    color: #555;
    margin-bottom: 1.25rem;
}

.home-message {
    color: #286232;
    font-weight: 500;
    margin-bottom: 1.5rem;
}

.home-btn {
    display: inline-block;
    padding: 0.7rem 1.5rem;
    background: #3a7d44;
    color: #fff;
    border-radius: 24px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.08rem;
    transition: background 0.2s;
}
.home-btn:hover {
    background: #286232;
}
</style>
