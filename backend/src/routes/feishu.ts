import { Router, Request, Response, NextFunction } from 'express'
import * as feishuService from '../services/feishu-service'

const router = Router()

/**
 * GET /api/feishu/fields
 * 获取表格字段列表
 */
router.get('/fields', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { app_token, table_id } = req.query

    if (!app_token || !table_id) {
      res.status(400).json({
        success: false,
        error: '缺少必要参数: app_token 和 table_id',
        errorType: 'INVALID_PARAM'
      })
      return
    }

    const fields = await feishuService.getTableFields(
      String(app_token),
      String(table_id)
    )

    res.json({
      success: true,
      data: fields
    })
  } catch (error) {
    next(error)
  }
})

/**
 * POST /api/feishu/records
 * 获取表格记录列表
 */
router.post('/records', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { appToken, tableId, fieldIds, pageSize, pageToken } = req.body

    if (!appToken || !tableId) {
      res.status(400).json({
        success: false,
        error: '缺少必要参数: appToken 和 tableId',
        errorType: 'INVALID_PARAM'
      })
      return
    }

    const result = await feishuService.getTableRecords(appToken, tableId, {
      fieldIds,
      pageSize,
      pageToken
    })

    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

/**
 * POST /api/feishu/records/update
 * 批量更新记录
 */
router.post('/records/update', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { appToken, tableId, records } = req.body

    if (!appToken || !tableId || !records || !Array.isArray(records)) {
      res.status(400).json({
        success: false,
        error: '缺少必要参数或参数格式错误',
        errorType: 'INVALID_PARAM'
      })
      return
    }

    const result = await feishuService.updateTableRecords(appToken, tableId, records)

    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

export default router
