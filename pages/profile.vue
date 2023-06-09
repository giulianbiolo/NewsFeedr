<template>
  <BaseLayout>
    <template #maincontent>
      <div class="px-4 pt-4">
        <div class="card bg-base-100 block shadow-lg h-[87vh]">
          <div class="card-body relative h-full overflow-hidden p-0">
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
definePageMeta({
  middleware: [
    function () {
      const { status } = useAuth();
      if (status.value !== "authenticated") {
        return navigateTo('/login')
      }
    }
  ],
});
</script>
