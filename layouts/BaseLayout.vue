<template>
  <div class="drawer drawer-mobile bg-base-200 shadow">
    <input id="custom_sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <Navbar @search-keyword="searchKeyword"/>
      <slot name="maincontent" />
    </div>
    <div class="drawer-side bg-base-100">
      <label for="custom_sidebar" class="drawer-overlay h-[90vh]"></label>
      <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content flex-nowrap h-screen">
        <!-- Show the magazines -->
        <div class="hidden md:inline mb-10">
          <LogoSvg className="w-48 h-12" isDark />
        </div>
        <slot name="sidebar" />
      </ul>
    </div>
  </div>
</template>



<script setup lang="ts">
import LogoSvg from '~/components/LogoSvg.vue';
useHead({
  htmlAttrs: {
    lang: 'en',
    'data-theme': 'dark',
  },
});

const emit = defineEmits(['searchKeyword']);

const searchKeyword = (keyword: string) => {
  emit('searchKeyword', keyword);
}
</script>
