import { Router, Request, Response, NextFunction } from 'express'
import * as urlExpanderService from '../services/url-expander-service'

const router = Router()

/**
 * POST /api/url-expand/batch
 * 批量解析 URL
 */
router.post('/batch', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { urls } = req.body

    if (!urls || !Array.isArray(urls)) {
      res.status(400).json({
        success: false,
        error: '缺少必要参数: urls (必须是数组)',
        errorType: 'INVALID_PARAM'
      })
      return
    }

    if (urls.length === 0) {
      res.json({
        success: true,
        data: {
          total: 0,
          successCount: 0,
          failedCount: 0,
          results: []
        }
      })
      return
    }

    if (urls.length > 100) {
      res.status(400).json({
        success: false,
        error: 'URL数量过多 (最多100个)',
        errorType: 'INVALID_PARAM'
      })
      return
    }

    const result = await urlExpanderService.expandUrls(urls)

    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

export default router
