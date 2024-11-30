<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- 控制面板 -->
    <div class="lg:col-span-1 space-y-6">
      <!-- 图标选择器 -->
      <div class="card p-6 space-y-4">
        <h3 class="section-title">图标设置</h3>
        <div class="space-y-4">
          <div class="flex gap-2">
            <input type="text" 
                   class="input-base flex-1" 
                   v-model="iconName" 
                   placeholder="输入图标名称，例如 logos:chrome" 
                   @input="loadIcon" />
            <a href="https://yesicon.app/" 
               target="_blank" 
               class="btn">图标库</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <label class="btn">
              选择背景图片
              <input type="file" 
                     class="hidden" 
                     accept="image/*" 
                     @change="updatePreview('bg', $event)">
            </label>
            <label class="btn">
              选择图标图片
              <input type="file" 
                     class="hidden" 
                     accept="image/*" 
                     @change="updatePreview('square', $event)">
            </label>
          </div>
        </div>
      </div>

      <!-- 颜色设置 -->
      <div class="card p-6 space-y-4">
        <h3 class="section-title">颜色设置</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="input-label">背景颜色</label>
            <input type="color" 
                   class="input-color" 
                   v-model="state.bgColor" 
                   @input="updatePreview('bgColor', $event)">
          </div>
          <div class="space-y-2">
            <label class="input-label">标题颜色</label>
            <input type="color" 
                   class="input-color" 
                   v-model="state.textColor" 
                   @input="updatePreview('textColor', $event)">
          </div>
          <div class="space-y-2">
            <label class="input-label">水印颜色</label>
            <input type="color" 
                   class="input-color" 
                   v-model="state.watermarkColor" 
                   @input="updatePreview('watermarkColor', $event)">
          </div>
          <div class="space-y-2">
            <label class="input-label">边框背景</label>
            <input type="color" 
                   class="input-color" 
                   v-model="state.iconColor" 
                   @input="updatePreview('iconColor', $event)">
          </div>
        </div>
      </div>

      <!-- 效果设置 -->
      <div class="card p-6 space-y-4">
        <h3 class="section-title">效果设置</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="input-label">背景模糊</label>
            <input type="range" 
                   class="input-range" 
                   min="0" max="8" 
                   v-model="state.bgBlur" 
                   @input="updatePreview('bgBlur', $event)">
          </div>
          <div class="space-y-2">
            <label class="input-label">图标大小</label>
            <input type="range" 
                   class="input-range" 
                   min="200" max="500" 
                   v-model="state.squareSize" 
                   @input="updatePreview('squareSize', $event)">
          </div>
          <div class="space-y-2">
            <label class="input-label">图标旋转</label>
            <input type="range" 
                   class="input-range" 
                   min="0" max="360" 
                   v-model="state.rotation" 
                   @input="updatePreview('rotation', $event)">
          </div>
          <div class="space-y-2">
            <label class="input-label">标题大小</label>
            <input type="range" 
                   class="input-range" 
                   min="20" max="300" 
                   v-model="state.textSize" 
                   @input="updatePreview('textSize', $event)">
          </div>
        </div>
      </div>

      <!-- 阴影设置 -->
      <div class="card p-6 space-y-4">
        <h3 class="section-title">阴影设置</h3>
        <div class="grid grid-cols-2 gap-4">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" 
                   name="shadowPreset" 
                   value="none" 
                   @change="updateShadowPreset"
                   class="text-accent-500 focus:ring-accent-500">
            <span class="text-gray-300">无阴影</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" 
                   name="shadowPreset" 
                   value="light" 
                   @change="updateShadowPreset"
                   class="text-accent-500 focus:ring-accent-500">
            <span class="text-gray-300">小阴影</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" 
                   name="shadowPreset" 
                   value="medium" 
                   @change="updateShadowPreset"
                   class="text-accent-500 focus:ring-accent-500">
            <span class="text-gray-300">中阴影</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" 
                   name="shadowPreset" 
                   value="heavy" 
                   checked 
                   @change="updateShadowPreset"
                   class="text-accent-500 focus:ring-accent-500">
            <span class="text-gray-300">大阴影</span>
          </label>
        </div>
      </div>

      <!-- 文本设置 -->
      <div class="card p-6 space-y-4">
        <h3 class="section-title">文本设置</h3>
        <div class="space-y-4">
          <input type="text" 
                 class="input-base" 
                 @input="updatePreview('text', $event)" 
                 placeholder="输入标题">
          <div class="flex gap-2">
            <input type="text" 
                   class="input-base" 
                   @input="updatePreview('watermark', $event)" 
                   placeholder="输入水印">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" 
                     v-model="state.iconBackground" 
                     @change="drawSquareImage"
                     class="text-accent-500 focus:ring-accent-500">
              <span class="text-gray-300">图标背景</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" 
                     v-model="state.iconBorder" 
                     @change="drawSquareImage"
                     class="text-accent-500 focus:ring-accent-500">
              <span class="text-gray-300">图标边框</span>
            </label>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-4">
        <button class="btn btn-primary flex-1" @click="saveWebp">
          保存图片
        </button>
        <button v-if="uploadApiUrl" 
                class="btn btn-primary flex-1" 
                @click="uploadImageToBackend">
          获取外链
        </button>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="lg:col-span-2">
      <div class="card p-4">
        <canvas id="canvasPreview" 
                width="1000" 
                height="500" 
                class="w-full h-auto rounded-lg"></canvas>
      </div>
    </div>

    <!-- 弹窗 -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showPopup" class="popup">
        <div class="popup-content">
          <div class="space-y-4">
            <p v-if="isSuccess" class="text-gray-300">{{ successMessage }}</p>
            <p v-else class="text-red-400">{{ errorMessage }}</p>
            <a v-if="isSuccess" 
               :href="uploadedImageUrl" 
               target="_blank"
               class="text-accent-400 hover:text-accent-300 block text-center">
              {{ uploadedImageUrl }}
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { state, updateShadowPreset, updatePreview, saveWebp, drawSquareImage, initialize } from '../assets/script.js';
export default {
  data() {
    return {
      state,
      iconName: '',
      iconUrl: null,
      externalLink: '',
      showPopup: false,
      uploadedImageUrl: '',
      isSuccess: false,
      successMessage: '',
      errorMessage: '',
      uploadApiUrl: process.env.VUE_APP_UPLOAD_API_URL
    };
  },
  mounted() {
    initialize();
  },
  methods: {
    updateShadowPreset,
    updatePreview,
    saveWebp,
    loadIcon() {
      if (this.iconName) {
        this.iconUrl = `https://api.iconify.design/${this.iconName}.svg`;
        this.selectIcon();
      } else {
        this.iconUrl = null;
        state.squareImageUrl = null;
      }
    },
    selectIcon() {
      if (this.iconUrl) {
        fetch(this.iconUrl)
          .then(response => response.blob())
          .then(blob => {
            const file = new File([blob], 'icon.svg', { type: 'image/svg+xml' });
            state.squareImageUrl = URL.createObjectURL(file);
            updatePreview('square', { target: { files: [file] } });
          })
          .catch(error => {
            console.error('加载图标时出错:', error);
            this.showSuccessPopup('加载图标时出错: ' + error.message, false);
          });
      }
    },
    drawSquareImage,
    uploadImageToBackend() {
      const canvas = document.getElementById('canvasPreview');
      canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('image', blob, 'Canvas-Ruom.webp');
        fetch(this.uploadApiUrl, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.result === 'success') {
            this.uploadedImageUrl = data.url;
            this.showSuccessPopup(data.url, true);
          } else {
            this.showSuccessPopup('图片上传失败: ' + data.message, false);
          }
        })
        .catch(error => {
          console.error('上传图片时出错:', error);
          this.showSuccessPopup('图片上传失败: ' + error.message, false);
        });
      }, 'image/webp');
    },
    showSuccessPopup(message, isSuccess) {
      this.isSuccess = isSuccess;
      if (isSuccess) {
        this.successMessage = '图片上传成功！链接已复制到剪切板。';
        this.errorMessage = '';
        this.uploadedImageUrl = message;
      } else {
        this.successMessage = '';
        this.errorMessage = message;
        this.uploadedImageUrl = '';
      }
      this.showPopup = true;
      navigator.clipboard.writeText(message).then(() => {
        setTimeout(() => {
          this.showPopup = false;
        }, 3000);
      });
    }
  }
};
</script>