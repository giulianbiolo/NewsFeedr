<template>
  <div class="navbar p-4 sticky top-0 z-20 bg-base-200 shadow-xl">
    <div class="flex-none">
      <label htmlFor="my-drawer-2" class="btn btn-ghost lg:hidden">
        <Bars3Icon class="w-6 h-6" />
      </label>
    </div>
    <div v-if="isLogged()" class="flex-1 mr-4">
      <div class="form-control w-full">
        <input type="text" placeholder="Search" class="input input-bordered w-full" v-model="keyword" />
      </div>
      <button class="btn btn-primary" @click="searchKeyword()">Search</button>
    </div>
    <div v-if="isLogged()" class="flex-none dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img :src="'https://api.dicebear.com/6.x/initials/svg?seed=' + data?.user?.name" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <router-link to="/profile" class="justify-between">
            Profile
            <span class="badge">New</span>
          </router-link>
        </li>
        <li><a>Settings</a></li>
        <li v-if="isAdministrator()">
          <router-link to="/admin/update_feeds" class="justify-between">
            Update Feeds
          </router-link>
        </li>
        <li>
          <NuxtLink to="/password_change">Change Password</NuxtLink>
        </li>
        <button v-if="isLogged()" class="btn btn-primary mx-4" @click="logOut">LogOut</button>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/solid";
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
</script>
