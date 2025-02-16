import { useRouter } from 'vue-router' //added

export default {
    name: 'LoginView',
    emits: ['authenticate'],
    data: function () {
        return {
            isAuthenticated: false,
            alertType: 'error',
            errorMsg: '',
            password: '',
            email: '',
            dialog: false,
            isLoading: false,
            emailRules: [
                (value) => !!value || 'Required.',
                (value) => (value && value.length >= 3) || 'Min 3 characters',
            ],
            passwordRules: [
                (value) => !!value || 'Required.',
                (value) => (value && value.length >= 8) || 'Min 8 characters',
            ],
            isFormValid: false,
            hardCodedEmailForDemo: 'spiderman@gmail.com',
            hardCodedPasswordForDemo: 'trees243',
        }
    },

    setup() {
        const router = useRouter() // Import Vue Router; chat suggested
        return { router }
    },

    methods: {
        submitLogin() {
            if (!this.isFormValid) {
                return
            }

            this.errorMsg = ''
            if (
                this.hardCodedPasswordForDemo === this.password &&
                this.hardCodedEmailForDemo === this.email
            ) {
                this.alertType = 'success'
                this.errorMsg = 'Login Sucess. Redirecting'
                this.isLoading = true
                console.log('loginview.ts I am here and submitting login')
                setTimeout(() => {
                    this.isAuthenticated = true
                    this.$emit('authenticate', this.isAuthenticated)
                    this.router.push({ path: '/home', query: { message: "I'm in!" } }) // Redirect to HomeView
                }, 3000)
            } else if (this.email === this.password) {
                this.alertType = 'warning'
                this.errorMsg = 'Your username and password can not be the same!'
            } else {
                this.alertType = 'error'
                this.errorMsg = 'Login Failed! Can not Authenticate!'
            }
        },
        forgotPassword() {
            console.log('here in forgot password land')
        },
    },
}
