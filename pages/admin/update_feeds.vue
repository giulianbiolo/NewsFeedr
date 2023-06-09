<template>
  <BaseLayout>
    <template #maincontent>
      <div class="px-4 pt-4">
        <div class="card bg-base-100 block shadow-lg h-[87vh]">
          <div class="card-body relative h-full overflow-hidden p-0">
            <button v-if="!isLoading" class="btn btn-primary mx-4" @click="updateFeeds()">Update Feeds</button>
            <span v-if="isLoading" class="pv-10">Loading....</span>
          </div>
        </div>
      </div>
    </template>
    <template #sidebar>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '~/layouts/BaseLayout.vue';
import HttpResponse from '~/models/http_response';

definePageMeta({
  middleware: [
    function () {
      const { status, data } = useAuth();
      if (status.value !== "authenticated" || !(data.value as any).isAdministrator) {
        return navigateTo('/login')
      }
    }
  ],
});

const isLoading = ref(false);

const updateFeeds = async () => {
  isLoading.value = true;

  const result = (
    await useFetch('/api/feeds/magazine/fetch', { method: 'get', })
  ).data.value as HttpResponse;

  isLoading.value = false;

  if (result.statusCode !== 200) {
    console.error(result.statusMessage);
  } else {
    return navigateTo('/')
  }
}
</script>
