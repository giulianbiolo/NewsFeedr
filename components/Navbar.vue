<template>
  <div class="navbar bg-base-100 fixed top-0 z-20">
    <div class="flex-none">
      <LogoSvg className="w-16 h-16 p-3 hidden lg:flex" />
      <label for="custom_sidebar" class="drawer-button lg:hidden">
        <Bars3Icon class="w-16 h-16 p-3" />
      </label>
    </div>
    <div class="flex-auto gap-2">
      <div class="flex-auto form-control">
        <input type="text" placeholder="Search" class="input input-bordered" />
      </div>
      <div class="flex-none dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://api.dicebear.com/6.x/initials/svg?seed=Felix" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <button v-if="isLogged()" class="btn btn-primary" @click="logOut">LogOut</button>
          <button v-else class="btn btn-primary" @click="logIn">LogIn</button>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/solid";
import LogoSvg from "~/components/LogoSvg.vue";
const { status, signOut } = useAuth();

const isLogged = (): boolean => {
  return status.value == "authenticated";
}

const logOut = async () => {
  await signOut();
};

const logIn = () => {
  return navigateTo("/login");
};

</script>
