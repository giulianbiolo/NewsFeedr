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
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
        <!-- Automatically load the dynamic sidebar for the user -->
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
