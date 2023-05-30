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

<script>
useHead({
  htmlAttrs: {
    lang: 'en',
    'data-theme': 'dark',
  },
})
</script>
