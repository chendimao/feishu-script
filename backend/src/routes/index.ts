import { Router } from 'express'
import healthRouter from './health'
import feishuRouter from './feishu'
import urlExpandRouter from './url-expand'

const router = Router()

// 健康检查
router.use('/health', healthRouter)

// 飞书 API
router.use('/feishu', feishuRouter)

// URL 解析
router.use('/url-expand', urlExpandRouter)

export default router
