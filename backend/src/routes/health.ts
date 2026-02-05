import { Router, Request, Response } from 'express'

const router = Router()

/**
 * GET /api/health
 * 健康检查接口
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  })
})

export default router
