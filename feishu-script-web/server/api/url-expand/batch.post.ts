/**
 * 批量URL解析API
 * 接收URL数组，返回解析结果
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { urls } = body

  if (!urls || !Array.isArray(urls)) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必要参数: urls (必须是数组)'
    })
  }

  if (urls.length === 0) {
    return {
      success: true,
      total: 0,
      successCount: 0,
      failedCount: 0,
      results: []
    }
  }

  if (urls.length > 100) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL数量过多 (最多100个)'
    })
  }

  try {
    // 使用真实的URL解析逻辑
    const results = await Promise.all(urls.map(async (url: string) => {
      try {
        // 检查是否为支持的短链接格式
        const supportedDomains = [
          'bit.ly', 't.co', 't.cn', 'tinyurl.com', 'goo.gl', 
          'ow.ly', 'short.link', 'tiny.cc', 'is.gd', 'buff.ly'
        ]
        
        const isSupported = supportedDomains.some(domain => url.includes(domain))
        
        if (!isSupported) {
          return {
            success: false,
            originalUrl: url,
            error: '不支持的短链接格式'
          }
        }

        // 创建超时控制器
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时
        
        try {
          // 尝试通过HTTP HEAD请求获取重定向URL
          const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
            signal: controller.signal,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          })
          
          clearTimeout(timeoutId)
          const expandedUrl = response.url
          
          // 检查是否真的被解析了
          if (expandedUrl && expandedUrl !== url) {
            return {
              success: true,
              originalUrl: url,
              expandedUrl: expandedUrl
            }
          } else {
            // 如果HEAD请求没有重定向，尝试GET请求
            const getController = new AbortController()
            const getTimeoutId = setTimeout(() => getController.abort(), 10000)
            
            try {
              const getResponse = await fetch(url, {
                method: 'GET',
                redirect: 'follow',
                signal: getController.signal,
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
              })
              
              clearTimeout(getTimeoutId)
              return {
                success: true,
                originalUrl: url,
                expandedUrl: getResponse.url || url
              }
            } catch (getError: any) {
              clearTimeout(getTimeoutId)
              throw getError
            }
          }
        } catch (fetchError: any) {
          clearTimeout(timeoutId)
          throw fetchError
        }
      } catch (error: any) {
        console.error(`解析URL失败 ${url}:`, error.message)
        return {
          success: false,
          originalUrl: url,
          error: `解析失败: ${error.message}`
        }
      }
    }))
    
    const successCount = results.filter(r => r.success).length
    const failedCount = results.length - successCount

    return {
      success: true,
      total: urls.length,
      successCount,
      failedCount,
      results
    }
  } catch (error: any) {
    console.error('批量URL解析失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '批量URL解析失败'
    })
  }
})
