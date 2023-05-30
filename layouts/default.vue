<template>
  <div class="drawer drawer-mobile bg-base-200 shadow">
    <input id="custom_sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <Navbar />
      <div class="px-4 pt-4">
        <div class="card bg-base-100 block shadow-lg h-full">
          <div class="card-body relative h-full overflow-hidden">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side bg-base-100">
      <label for="custom_sidebar" class="drawer-overlay h-[90vh]"></label>
      <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content flex-nowrap h-screen">
        <!-- Show the magazines -->
        <div class="hidden md:inline mb-10">
          <LogoSvg className="w-48 h-12" isDark />
        </div>
        <div>
          <li class="menu-title">
            <span>Magazines</span>
          </li>
          <div v-if="data" v-for="magazine in data.data">
            <li><a :href="`/api/feeds/magazine/${magazine.progr}`">{{ magazine.name }}</a></li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
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
