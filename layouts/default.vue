<template>
  <div class="drawer drawer-mobile bg-base-200 shadow">
    <input id="custom_sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <Navbar />
      <slot />
    </div>
    <div class="drawer-side bg-base-100">
      <label for="custom_sidebar" class="drawer-overlay h-[90vh]"></label>
      <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content flex-nowrap h-screen">
        <!-- Show the magazines -->
        <div class="hidden md:inline mb-10">
          <LogoSvg className="w-48 h-12" isDark />
        </div>
        <div v-if="data && data.data && data.data.length > 0">
          <li class="menu-title">
            <span>Magazines</span>
          </li>
          <div v-for="magazine in data.data">
            <li><a :href="`/api/feeds/magazine/${magazine.progr}`">{{ magazine.name }}</a></li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import HttpResponse from '~/models/http_response';
import LogoSvg from '~/components/LogoSvg.vue';
useHead({
  htmlAttrs: {
    lang: 'en',
    'data-theme': 'dark',
  },
});
const { data } = await useFetch("/api/feeds/magazine") as HttpResponse; 
</script>
