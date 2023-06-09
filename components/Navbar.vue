<template>
  <div class="navbar p-4 sticky top-0 z-20 bg-base-200 shadow-xl">
    <div class="flex-none">
      <label htmlFor="my-drawer-2" class="btn btn-ghost lg:hidden">
        <Bars3Icon class="w-6 h-6" />
      </label>
    </div>
    <div v-if="isLogged()" class="flex-1 mr-4">
      <div class="form-control w-full">
        <input type="text" placeholder="Search" class="input input-bordered w-full" v-on:input="searchKeyword()"
          v-model="keyword" />
      </div>
      <button class="btn btn-square btn-ghost ml-2">
        <MagnifyingGlassIcon class="w-6 h-6" />
      </button>
    </div>
    <div v-if="isLogged()" class="flex-none dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar online">
        <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img :src="'https://api.dicebear.com/6.x/initials/svg?seed=' + data?.user?.name" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <NuxtLink to="/profile">
            <AdjustmentsHorizontalIcon class="h-5" />
            Profile
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/password_change">
            <PencilSquareIcon class="h-5" />
            Change Password
          </NuxtLink>
        </li>
        <li v-if="isAdministrator()">
          <NuxtLink @click="updateFeeds">
            <SquaresPlusIcon class="h-5" />
            Update Feeds
          </NuxtLink>
        </li>
        <button v-if="isLogged()" class="btn btn-primary btn-sm mt-1" @click="logOut">
          <ArrowLeftOnRectangleIcon class="h-5 mr-2" />
          LogOut
        </button>
      </ul>
    </div>
  </div>
  <CustomModal title="" description="" link="" modalId="update_feeds_loading_modal">
    <div class="flex flex-col text-center items-center">
      <h1 class="font-bold text-xl">Updating Feeds...</h1>
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  </CustomModal>
</template>


<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/solid";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, PencilSquareIcon, ArrowLeftOnRectangleIcon, SquaresPlusIcon } from "@heroicons/vue/24/outline";
import HttpResponse from "~/models/http_response";
const { status, signOut, data } = useAuth();
const emit = defineEmits(['searchKeyword']);

const keyword = useState<string>('keyword');

const searchKeyword = () => {
  emit('searchKeyword', keyword.value);
}

const isLogged = (): boolean => {
  return status.value == "authenticated";
}

const isAdministrator = (): boolean => {
  return (data.value as any).isAdministrator;
}

const logOut = async () => {
  await signOut();
};

const updateFeeds = async () => {
  if (!isAdministrator()) { return navigateTo('/login'); }
  const update_feeds_loading_modal = document.getElementById('update_feeds_loading_modal');
  if (!update_feeds_loading_modal) { return; }
  update_feeds_loading_modal.click();
  const result = (
    await useFetch('/api/feeds/magazine/fetch', { method: 'get', })
  ).data.value as HttpResponse;
  update_feeds_loading_modal.click();
  if (result.statusCode !== 200) {
    console.error(result.statusMessage);
  } else {
    return navigateTo('/')
  }
}
</script>
