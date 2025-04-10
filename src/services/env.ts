//it knows if production of localhost; just elastic url with :8888/api/ on the end http://
let API_URL = 'http://18.216.69.251/api/'
if (import.meta.env.MODE === 'development') {
    API_URL = 'http://127.0.0.1:8000/api/'
}
export default API_URL

//below is before production
// const API_URL = 'http://127.0.0.1:8000/api/'
// export default API_URL
