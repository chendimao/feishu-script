<template>
  <div class="app-logo" :class="{ compact: size === 'small' }">
    <svg 
      :width="logoSize" 
      :height="logoSize" 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      class="logo-svg"
    >
      <!-- 背景圆形 -->
      <circle 
        cx="32" 
        cy="32" 
        r="30" 
        :fill="showBackground ? 'url(#gradient)' : 'transparent'" 
        stroke="#E5E7EB" 
        stroke-width="2"
      />
      
      <!-- 渐变定义 -->
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- 表格图标 -->
      <g transform="translate(16, 16)">
        <!-- 表格框架 -->
        <rect 
          x="2" 
          y="2" 
          width="28" 
          height="28" 
          rx="4" 
          :fill="showBackground ? 'white' : '#F8FAFC'" 
          :fill-opacity="showBackground ? '0.9' : '1'"
        />
        
        <!-- 表格线条 -->
        <line x1="2" y1="12" x2="30" y2="12" stroke="#3B82F6" stroke-width="1.5"/>
        <line x1="2" y1="20" x2="30" y2="20" stroke="#3B82F6" stroke-width="1.5"/>
        <line x1="12" y1="2" x2="12" y2="30" stroke="#3B82F6" stroke-width="1.5"/>
        <line x1="21" y1="2" x2="21" y2="30" stroke="#3B82F6" stroke-width="1.5"/>
        
        <!-- 脚本符号 -->
        <g transform="translate(22, 21)">
          <circle cx="4" cy="4" r="2.5" fill="#10B981"/>
          <text 
            x="4" 
            y="6" 
            text-anchor="middle" 
            font-family="monospace" 
            font-size="4" 
            fill="white" 
            font-weight="bold"
          >S</text>
        </g>
        
        <!-- 数据点 -->
        <circle cx="7" cy="7" r="1.5" fill="#6366F1"/>
        <circle cx="16.5" cy="7" r="1.5" fill="#8B5CF6"/>
        <circle cx="7" cy="16" r="1.5" fill="#EC4899"/>
        <circle cx="16.5" cy="16" r="1.5" fill="#F59E0B"/>
      </g>
    </svg>
    
    <!-- 文字标识 -->
    <div v-if="showText" class="logo-text"> 
      <span v-if="showSubtitle" class="app-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  showSubtitle?: boolean
  showBackground?: boolean
  appName?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  showText: true,
  showSubtitle: false,
  showBackground: true,
  appName: '多维表格脚本管理',
  subtitle: '让工作更高效'
})

const logoSize = computed(() => {
  switch (props.size) {
    case 'small': return 32
    case 'large': return 80
    default: return 48
  }
})
</script>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-logo.compact {
  gap: 8px;
}

.logo-svg {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.logo-svg:hover {
  transform: scale(1.05);
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
}

.app-subtitle {
  font-size: 1.25rem; 
  line-height: 1.2;
}

.compact .app-name {
  font-size: 0.875rem;
}

.compact .app-subtitle {
  font-size: 0.625rem;
}
</style>
