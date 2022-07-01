import axios from 'axios'


const API = axios.create({ baseURL: 'https://api.hatchways.io/assessment/students' })


export const fetchStudents = () => API.get('')



//export const signIn = (formData: AuthFormStateType) => API.post('/user/signin', formData)
