import axios from 'axios'

const API = axios.create({
  baseURL: 'https://dharoharai-backend.onrender.com',
})

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const registerUser = (data) => API.post('/users/register', data)
export const loginUser = (data) => API.post('/users/login', data)
export const getMe = () => API.get('/users/me')
export const getLeaderboard = () => API.get('/users/leaderboard')
export const addBookmark = (data) => API.post('/users/bookmark', data)
export const getBookmarks = () => API.get('/users/bookmarks')
export const saveQuizScore = (data) => API.post('/users/quiz-score', data)

// Monuments
export const getMonuments = (params) => API.get('/monuments', { params })
export const getMonument = (id) => API.get(`/monuments/${id}`)
export const getMonumentStory = (id) => API.get(`/monuments/${id}/ai-story`)

// Quiz
export const getQuestions = () => API.get('/quiz/questions')
export const submitQuiz = (answers) => API.post('/quiz/submit', answers)

// Festivals
export const getFestivals = (params) => API.get('/festivals', { params })

// Community
export const getPosts = () => API.get('/community/posts')
export const createPost = (data) => API.post('/community/posts', data)
export const likePost = (id) => API.post(`/community/posts/${id}/like`)

export default API