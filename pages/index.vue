<template>
  <h1>Welcome to NewsFeedr!</h1>

  <div style="height: 40px;"></div>

  <div v-for="feed in data.feeds">
    <a :href="'https://' + feed.link">
      <div>
        <p class="text-3xl">{{ feed.title }}</p>
        <p class="text-xs">{{ feed.body }}</p>
      </div>
    </a>
    <br>
  </div>

</template>

<script setup>
    const { data } = await useFetch("/api/feeds");
    console.log(data)
</script>
