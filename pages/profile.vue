<template>
  <BaseLayout>
    <template #maincontent>
      <div class="px-4 pt-4">
        <div class="card bg-base-100 block shadow-lg h-[87vh]">
          <div class="card-body relative h-full overflow-hidden p-10">
            <div v-if="isLogged()" class="flex flex-col items-center w-full">
              <label tabindex="0" class="avatar">
                <div class="w-[10rem] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img :src="'https://api.dicebear.com/6.x/initials/svg?seed=' + data?.user?.name" />
                </div>
              </label>
              <div class="pt-[1.75rem] text-center flex flex-col justify-between space-y-3">
                <div class="text-2xl font-bold">{{ data?.user?.name }}</div>
                <div class="text-sm opacity-50">{{ data?.user?.email }}</div>
                <!-- Edit profile and change password buttons -->
                <NuxtLink to="/password_change" class="btn btn-info">
                  <PencilSquareIcon class="w-5 h-5" />
                  Change Password
                </NuxtLink>
                <div class="btn btn-error" @click="deleteNotImplemented();">
                  <TrashIcon class="w-5 h-5" />
                  Delete Profile
                </div>
              </div>
            </div>
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
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
const { status, signOut, data } = useAuth();
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
const isLogged = (): boolean => {
  return status.value == "authenticated";
}
const deleteNotImplemented = () => {
  window.alert('Method Not Implemented Yet...');
  signOut();
}
</script>
