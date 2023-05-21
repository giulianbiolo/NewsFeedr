<template>
  <div v-for="feed in data.data">
    <a :href="feed.link">
      <div>
        <p class="text-3xl">{{ feed.title }}</p>
        <p class="text-xs">{{ feed.description }}</p>
      </div>
    </a>
    <br>
  </div>
</template>

<script setup>
  const { data } = await useFetch("/api/feeds");
</script>
