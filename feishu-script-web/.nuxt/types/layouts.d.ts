import _default from "E:/phpStudy/WWW/feishuScript/feishu-script-web/layouts/default.vue";
import script from "E:/phpStudy/WWW/feishuScript/feishu-script-web/layouts/script.vue";
import type { ComputedRef, MaybeRef } from 'vue'
declare module 'nuxt/app' {
  interface NuxtLayouts {
    'default': InstanceType<typeof _default>['$props'],
    'script': InstanceType<typeof script>['$props'],
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}