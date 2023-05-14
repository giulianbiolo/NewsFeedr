<template>
  <h1>Welcome to NewsFeedr!</h1>

  <div style="height: 40px;"></div>

  <div v-for="feed in data.feeds">
    <p>{{ feed.title }}</p>
    <p>{{ feed.text }}</p>
    <br>
  </div>

</template>

<script setup>
    const { data } = await useFetch("/api/feeds");
</script>
