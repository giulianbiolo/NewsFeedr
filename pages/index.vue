<template>
  <div v-if="data" v-for="feed in data.data">
    <a :href="feed.link">
      <div>
        <p class="text-3xl">{{ feed.title }}</p>
        <p class="text-xs">{{ feed.description }}</p>
      </div>
    </a>
    <br>
  </div>
</template>

<script setup lang="ts">
import HttpResponse from '~/models/http_response';

definePageMeta({
  middleware: [
    function () {
      const {status} = useAuth();

      if (status.value !== "authenticated") {
          return navigateTo('/login')
      }
    }
  ],
});


var { data } = await useFetch("/api/feeds") as HttpResponse;
</script>
