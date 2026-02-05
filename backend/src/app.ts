import express, { Application } from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './middleware/error-handler'
import { config } from './config'

const app: Application = express()

// CORS 配置
console.log('[App] Setting up CORS with origin:', config.corsOrigin)
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API 路由
app.use('/api', routes)

// 错误处理
app.use(errorHandler)

export default app
