export default {
    name: 'LoginView',
    emits: ['authenticate'],
    data: function () {
        return {
            isAuthenticated: false
        }
    },
    methods: {
        submitLogin() {
            console.log("loginview.ts I am here and submitting login")
            this.isAuthenticated = true;
            this.$emit('authenticate', this.isAuthenticated)
        }
    }
}