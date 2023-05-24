<template>
    <Navbar />
    <div class="drawer drawer-mobile">
    <input id="custom_sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content bg-base-200 mt-[5rem] block p-4 h-full overflow-y-scroll prettier-scrollbar">
      <!-- Page content here -->
      <div class="card bg-base-100 shadow-xl h-[87vh]">
        <slot />
      </div>
    </div>
    <div class="drawer-side lg:sticky mt-[5rem]">
      <label for="custom_sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Show the magazines -->
        <div v-if="data" v-for="magazine in data.data">
          <li><a :href="`/api/feeds/magazine/${magazine.progr}`">{{ magazine.name }}</a></li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import HttpResponse from '~/models/http_response';

useHead({
  htmlAttrs: {
    lang: 'en',
    'data-theme': 'dark',
  },
});

const {data} = await useFetch("/api/feeds/magazine") as HttpResponse; 
</script>
