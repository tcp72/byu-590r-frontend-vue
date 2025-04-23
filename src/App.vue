<template>
    <v-app :theme="theme">
        <!-- App Bar -->
        <v-app-bar
            v-if="isAuthenticated"
            color="primary"
            dark
            density="comfortable"
            elevate-on-scroll
            app
        >
            <!-- Hamburger for mobile -->
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />

            <!-- Title (hidden on xs for space) -->
            <span class="app-title hidden-xs-only">{{ title }}</span>

            <v-spacer />

            <!-- Desktop Navigation -->
            <div class="hidden-sm-and-down">
                <v-btn to="/home" variant="text">Home</v-btn>
                <v-btn to="/about" variant="text">About</v-btn>
                <v-btn to="/recipes" variant="text">Recipes</v-btn>
                <v-btn
                    :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                    @click="changeTheme"
                    variant="text"
                    >Toggle Theme</v-btn
                >
            </div>

            <!-- User Avatar/Menu -->
            <v-menu min-width="200px" rounded>
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-avatar color="brown" size="large">
                            <v-img v-if="avatarURL" :src="avatarURL" alt="Avatar"></v-img>
                            <v-icon v-else :color="profile.color" :icon="profile.icon"></v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">
                            <h3>{{ profile.name }}</h3>
                            <v-divider class="my-3"></v-divider>
                            <v-btn @click="changeTheme">Toggle Theme</v-btn>
                            <v-btn @click="profileDialog = true">Profile</v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn @click="logout()">Logout</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </v-app-bar>

        <!-- Mobile Navigation Drawer -->
        <v-navigation-drawer v-model="drawer" app temporary class="hidden-md-and-up">
            <v-list>
                <v-list-item to="/home">Home</v-list-item>
                <v-list-item to="/about">About</v-list-item>
                <v-list-item to="/recipes">Recipes</v-list-item>
                <v-list-item @click="changeTheme">Toggle Theme</v-list-item>
                <v-list-item @click="logout()">Logout</v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Main Content -->
        <v-main>
            <v-container>
                <div v-if="isAuthenticated">
                    <RouterView />
                </div>
                <LoginView
                    v-else
                    :is-authenticated="isAuthenticated"
                    @authenticate="checkAuth($event)"
                />
            </v-container>

            <!-- Profile Dialog -->
            <v-dialog v-model="profileDialog">
                <v-form>
                    <v-card>
                        <v-card-title>Profile</v-card-title>
                        <v-card-subtitle>Enter your profile options here</v-card-subtitle>
                        <v-card class="mx-auto" max-width="434" rounded="0">
                            <v-img cover v-if="avatarURL" :src="avatarURL"></v-img>
                            <v-icon v-else :color="profile.color" :icon="profile.icon"></v-icon>
                            <v-file-input
                                accept="image/*"
                                :loading="profileIsUploading"
                                :disabled="profileIsUploading"
                                @change="onAvatarChange"
                                :label="profilePictureChangeLabel"
                            ></v-file-input>
                        </v-card>
                        <v-card-actions>
                            <v-btn @click="removeAvatar">Remove Profile Picture</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>
        </v-main>

        <!-- Email Verification Dialog (optional) -->
        <v-dialog v-model="showEmailNotVerifiedDialog" persistent></v-dialog>
    </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/login/LoginView.vue'
import { mapState } from 'vuex'
import { ref } from 'vue'

export default {
    setup() {
        const theme = ref('dark')
        const drawer = ref(false)
        function changeTheme() {
            theme.value = theme.value === 'light' ? 'dark' : 'light'
        }
        return { theme, changeTheme, drawer }
    },
    name: 'App',
    components: {
        LoginView,
        RouterLink,
        RouterView,
    },
    data: function () {
        return {
            profileDialog: false,
            profileIsUploading: false,
            verificationEmailLoading: false,
            showEmailNotVerifiedDialog: false,
            showChangeEmailTextField: false,
            changeEmail: false,
            successVerificationMessage: '',
            changeEmailRules: [
                (value) => !!value || 'Required.',
                (value) => (value && value.length >= 3) || 'Min 3 characters',
            ],
            profile: {
                avatar: '',
                name: '',
                title: '',
                icon: 'mdi-account-circle',
                color: 'info',
            },
            profilePictureImage: '',
            emailOfVerification: '',
        }
    },
    computed: {
        ...mapState({
            user() {
                return this.$store.state.user.user
            },
            auth() {
                return this.$store.state.auth
            },
            authUser() {
                return this.auth.user
            },
            isAuthenticated() {
                return this.auth.status.loggedIn && this.authUser.token !== undefined
            },
            title() {
                return 'Welcome ' + this.authUser.name + '!'
            },
            avatarURL() {
                return this.auth.user.avatar
            },
            profilePictureChangeLabel() {
                return 'Profile picture change'
            },
        }),
    },
    updated() {
        if (this.isAuthenticated) {
            this.$router.push({ name: 'home' })
        }
    },
    created() {
        if (this.authUser) {
            this.getCurrentUser()
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
        },
        checkAuth(auth) {
            console.log('Authenticated!', auth)
        },
        onAvatarChange(e) {
            var image = e.target.files || e.dataTransfer.files
            if (!image.length) return
            this.profileIsUploading = true
            this.$store
                .dispatch('user/uploadAvatar', image[0], { root: true })
                .then((response) => {
                    this.$store.commit('auth/uploadAvatarSuccess', response.avatar)
                    this.profileIsUploading = false
                })
                .catch((error) => {
                    alert('Error. Try again')
                    this.profileIsUploading = false
                })
        },
        removeAvatar() {
            this.profileIsUploading = true
            this.$store
                .dispatch('user/removeAvatar')
                .then((response) => {
                    this.$store.commit('auth/uploadAvatarSuccess', response.avatar)
                    this.profileIsUploading = false
                })
                .catch((error) => {
                    alert('Error. Try again')
                    this.profileIsUploading = false
                })
        },
        getCurrentUser() {
            this.profile.name = this.authUser.name
            this.profile.title = this.title
            this.$store
                .dispatch('user/getUser')
                .then((response) => {
                    if (response.avatar) {
                        this.$store.commit('auth/uploadAvatarSuccess', response.avatar)
                    }
                })
                .catch(() => {
                    this.logout()
                })
        },
    },
}
</script>

<style scoped>
.app-title {
    font-size: 1.13rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    margin-left: 0.5rem;
}
@media (max-width: 600px) {
    .app-title {
        font-size: 1rem;
        margin-left: 0.2rem;
    }
}
</style>
