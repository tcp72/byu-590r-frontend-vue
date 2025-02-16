<template>
    <div>
        <h1>Welcome to Home! I'm in!</h1>
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const message = route.query.message || 'Welcome!'
</script>

<!--I added all of this from chat besides the initial template and h1-->
