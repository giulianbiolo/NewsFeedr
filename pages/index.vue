<template>
  <div class="px-4 pt-4">
    <div class="card bg-base-100 block shadow-lg h-full">
      <div class="card-body relative h-full overflow-hidden p-0">
        <div class="overflow-x-auto shadow-xl">
          <table class="table w-full">
            <tbody>
              <tr v-if="feed_data.data" v-for="feed in feed_data.data" class="hover" :href="feed.link"
                @click="openModalWithData(feed)">
                <td>
                  <!-- Modify it to have onclick toggle a yellow color or neutral -->
                  <div class="btn btn-ghost btn-square" @click="toggleBookmark(feed.link); openModalWithData(feed);">
                    <BookmarkIcon class="h-6 w-6"
                      :class="isBookmarked(feed.link) ? 'text-yellow-500' : 'text-gray-500'" />
                  </div>

                </td>
                <td class="p-0">
                  <div class="text-xs opacity-50">{{ getFeedsMagazine(feed.progr_magazine) }}</div>
                </td>
                <td class="w-80">
                  <div class="font-bold">{{ feed.title.length > 150 ? feed.title.slice(0, 150) + "..." : feed.title }}
                  </div>
                  <div class="text-sm opacity-50">{{ feed.description.length > 200 ? feed.description.slice(0, 200) +
                    "..." :
                    feed.description }}</div>
                </td>
                <td class="text-right pl-0 py-0">
                  <div>{{ calcTimeDiff(feed.pubDate) }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <CustomModal :title="modal_title" :description="modal_description" :modalId="feedModalId" />
</template>

<script setup lang="ts">
import HttpResponse from '~/models/http_response';
import Magazine from '~/models/magazine';
import CustomModal from '~/components/CustomModal.vue';
import { BookmarkIcon } from '@heroicons/vue/24/outline';
import Feed from '~/models/feed';

const feedModalId = "feeds-popup-modal";

var bookmarks = useState<string[]>('bookmarks', () => []);
var modal_title = useState<string>('modal_title', () => '');
var modal_description = useState<string>('modal_description', () => '');

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

var { data: feed_data } = await useFetch("/api/feeds") as HttpResponse;
var { data: magazines } = await useFetch("/api/feeds/magazine") as HttpResponse;

if (feed_data !== undefined && feed_data.data !== undefined) {
  feed_data.data = feed_data.data.sort((a: any, b: any) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
  console.log("Feed:");
  console.log(feed_data);
}

function openModalWithData(feed: Feed): void {
  console.log("Opening modal with data:");
  console.log(feed);
  const modal_toggle = document.getElementById(feedModalId);
  if (modal_toggle !== null) {
    modal_toggle.click();
  }
  modal_title.value = feed.title ? feed.title : "No title";
  modal_description.value = feed.description ? feed.description : "No description";
}

function toggleBookmark(link: string): void {
  if (bookmarks.value.includes(link)) {
    bookmarks.value.splice(bookmarks.value.indexOf(link), 1);
  } else {
    bookmarks.value.push(link);
  }
}

function isBookmarked(link: string): boolean {
  return bookmarks.value.includes(link);
}

function getFeedsMagazine(feed_progr: number): string {
  if (magazines !== undefined && magazines._rawValue !== undefined && magazines._rawValue.data !== undefined) {
    for (let i = 0; i < magazines._rawValue.data.length; i++) {
      let magazine: Magazine = magazines._rawValue.data[i];
      if (magazine.progr as number === feed_progr as number) {
        return magazine.name as string;
      }
    };
  }
  return "Unknown journal";
}

function calcTimeDiff(date: string): string {
  let now: Date = new Date();
  let parsed_date: Date = new Date(date);
  let diff: number = now.getTime() - parsed_date.getTime();
  let months: number = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  let days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours: number = Math.floor(diff / (1000 * 60 * 60));
  let minutes: number = Math.floor(diff / (1000 * 60));
  let seconds: number = Math.floor(diff / 1000);
  return (
    months > 0
      ? months.toString() + "mo"
      : days > 0
        ? days.toString() + "d"
        : hours > 0
          ? hours.toString() + "h"
          : minutes > 0
            ? minutes.toString() + "m"
            : seconds.toString() + "s"
  );
}
</script>
