<template>
    <section class="about-page">
        <!-- Hero Section -->
        <div class="about-hero">
            <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Fresh ingredients"
                class="about-hero-img"
            />
            <div class="about-hero-text">
                <h1>Welcome to RecipeHub!</h1>
                <p>Your home for delicious, easy-to-follow recipes and culinary inspiration.</p>
            </div>
        </div>

        <!-- Personal/Intro Section -->
        <div class="about-intro">
            <h2>Meet the Creator</h2>
            <p>
                Hi! I'm Trevor, a passionate home cook and food explorer. I started RecipeHub to
                share my favorite recipes, kitchen tips, and stories from my culinary adventures.
                Whether you're a beginner or a seasoned chef, you'll find something tasty here!
            </p>
        </div>

        <!-- Highlights Section -->
        <div class="about-highlights">
            <div class="highlight">
                <h3>🍲 Several Curated Recipes</h3>
                <p>
                    From quick weeknight dinners to show-stopping desserts, our growing collection
                    is tested and loved by home cooks everywhere.
                </p>
            </div>
            <div class="highlight">
                <h3>📱 Mobile Friendly</h3>
                <p>
                    Our site is designed for cooks on the go—browse, save, and cook recipes easily
                    from your phone, tablet, or desktop.
                </p>
            </div>
            <div class="highlight">
                <h3>🌱 Community & Learning</h3>
                <p>
                    Join our food-loving community! Share your creations, ask questions, and
                    discover new favorites every week.
                </p>
            </div>
        </div>

        <!-- Call to Action -->
        <div class="about-cta">
            <h2>Ready to get cooking?</h2>
            <router-link to="/recipes" class="cta-btn">Browse Recipes</router-link>
        </div>
    </section>
</template>

<style scoped>
.about-page {
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #222;
    padding: 0 1rem 2rem 1rem;
    background: #fff;
}

.about-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
    background: #f8fafc;
    border-radius: 18px;
    overflow: hidden;
}

.about-hero-img {
    width: 100%;
    max-height: 220px;
    object-fit: cover;
}

.about-hero-text {
    padding: 1.5rem 1rem 1rem 1rem;
}

.about-hero h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #3a7d44;
}

.about-intro {
    max-width: 700px;
    margin: 0 auto 2rem auto;
    text-align: center;
}

.about-intro h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #3a7d44;
}

.about-highlights {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin: 2rem 0;
}

.highlight {
    background: #f0f5f1;
    border-radius: 12px;
    padding: 1.25rem;
    flex: 1 1 220px;
    min-width: 220px;
    max-width: 320px;
    box-shadow: 0 2px 8px rgba(58, 125, 68, 0.05);
}

.highlight h3 {
    margin-bottom: 0.5rem;
    color: #3a7d44;
    font-size: 1.1rem;
}

.about-cta {
    margin: 2.5rem 0 0 0;
    text-align: center;
}

.cta-btn {
    display: inline-block;
    margin-top: 1rem;
    background: #3a7d44;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 24px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: background 0.2s;
}
.cta-btn:hover {
    background: #286232;
}

@media (min-width: 700px) {
    .about-hero {
        flex-direction: row;
        text-align: left;
        min-height: 220px;
    }
    .about-hero-img {
        width: 50%;
        max-height: 300px;
    }
    .about-hero-text {
        width: 50%;
        padding: 2rem 2rem 2rem 2rem;
    }
    .about-highlights {
        flex-wrap: nowrap;
    }
}
</style>
