import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/users'
})

export const getAllTask = () => taskApi.get('/')

export const getTask = (id) => taskApi.get(`/${id}/`) 

export const createTask= (task) => taskApi.post('/', task)

export const deleteTask = (id) => taskApi.delete(`/${id}`)

export const updateTask = (id, task) => taskApi.patch(`/${id}/`, task)