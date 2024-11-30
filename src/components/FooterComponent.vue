<template>
  <footer class="bg-dark-900 border-t border-dark-800 mt-12">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-center gap-4 mb-4">
        <span v-for="value in coreValues" 
              :key="value" 
              class="text-gray-500 hover:text-white transition-colors cursor-default">
          {{ value }}
        </span>
      </div>
      
      <div class="flex flex-col items-center space-y-2 text-sm">
        <div class="flex items-center space-x-2 text-gray-400">
          <span>© 2024</span>
          <a href="https://www.mysticstars.cn/" 
             target="_blank" 
             class="hover:text-white transition-colors">
            Mystic Stars
          </a>
          <a v-if="icpNumber" 
             href="https://beian.miit.gov.cn/" 
             target="_blank"
             class="hover:text-white transition-colors">
            {{ icpNumber }}
          </a>
        </div>
        <button @click="toggleTips" 
                class="px-3 py-1 text-accent-400 hover:text-accent-300 transition-colors">
          小提示
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showTipsPopup" class="popup">
        <div class="popup-content">
          <div class="space-y-4">
            <p class="text-gray-300">为避免性能问题，建议不要连续做图</p>
            <p class="text-gray-300">
              建议经常
              <a href="/" class="text-accent-400 hover:text-accent-300">刷新页面</a>
              优化性能
            </p>
            <p class="text-red-400 font-semibold">
              重要提示：请确保您的浏览器和设备性能良好
            </p>
          </div>
        </div>
      </div>
    </transition>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      showTipsPopup: false,
      icpNumber: process.env.VUE_APP_ICP_NUMBER,
      coreValues: ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']
    };
  },
  methods: {
    toggleTips() {
      this.showTipsPopup = !this.showTipsPopup;
      if (this.showTipsPopup) {
        setTimeout(() => {
          this.showTipsPopup = false;
        }, 3000);
      }
    }
  }
};
</script>
