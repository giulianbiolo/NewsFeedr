<template>
  <div v-if="data.statusCode == 200" v-for="feed in data.feeds">
    <a :href="feed.link">
      <div>
        <p class="text-3xl">{{ feed.title }}</p>
        <p class="text-xs">{{ feed.description }}</p>
      </div>
    </a>
    <br>
  </div>
  <div v-else>
    <p>Error while reading the data: </p>
    <p>{{ data.err.statusCode }}</p>
    <p>{{ data.err.message }}</p>
  </div>
</template>

<script setup>
  const { data } = await useFetch("/api/feeds");
</script>
