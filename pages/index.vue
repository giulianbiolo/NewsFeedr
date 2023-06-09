<template>
  <BaseLayout @search-keyword="searchKeyword">
    <template #maincontent>
      <div class="px-4 pt-4 h-[90vh]">
        <div class="card bg-base-100 block shadow-lg h-full">
          <div class="card-body relative h-full overflow-hidden p-0">
            <div class="overflow-x-auto shadow-xl">
              <table class="table w-full">
                <tbody>
                  <tr v-if="feed_data.data" v-for="feed in feed_data.data" class="hover" :href="feed.link"
                    @click="openModalWithData(feed)">
                    <td>
                      <!-- Modify it to have onclick toggle a yellow color or neutral -->
                      <div class="btn btn-ghost btn-square" @click="toggleBookmark(feed); openModalWithData(feed);">
                        <BookmarkIcon class="h-6 w-6"
                          :class="feed.isBookmarked ? 'text-yellow-500' : 'text-gray-500'" />
                      </div>
                    </td>
                    <td class="p-0">
                      <div class="text-xs opacity-50">{{ feed.magazine.name }}</div>
                    </td>
                    <td>
                      <div class="font-bold">{{ feed.title.length > 150 ? feed.title.slice(0, 150) + "..." : feed.title }}
                      </div>
                      <div class="text-sm opacity-50">{{ feed.description.length > 150 ? feed.description.slice(0, 150) +
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
      <CustomModal :title="modal_title" :description="modal_description" :link="modal_link" :modalId="feedModalId" />
    </template>
    <template #sidebar>
      <div v-if="magazines_sidebar && magazines_sidebar.data && magazines_sidebar.data.length > 0">
        <li class="menu-title">
          <span>Magazines</span>
        </li>
        <li><a @click="showFeedsOfMagazine(undefined)">All magazines</a></li>
        <div v-for="magazine in magazines_sidebar.data">
          <li><a @click="showFeedsOfMagazine(magazine.progr)">{{ magazine.name }}</a></li>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '~/layouts/BaseLayout.vue';
import HttpResponse from '~/models/http_response';
import CustomModal from '~/components/CustomModal.vue';
import { BookmarkIcon } from '@heroicons/vue/24/outline';
import Feed from '~/models/feed';

const {data: userData} = useAuth();
const feedModalId = "feeds-popup-modal";

var modal_title = useState<string>('modal_title', () => '');
var modal_description = useState<string>('modal_description', () => '');
var modal_link = useState<string>('modal_link', () => '');

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

const { data: magazines_sidebar } = await useFetch("/api/feeds/magazine") as HttpResponse;
const feed_data = useState<HttpResponse>('feeds',   () => { return {} });
feed_data.value = (await useFetch("/api/feeds") as HttpResponse).data;


if (feed_data.value !== undefined && feed_data.value.data !== undefined) {
 feed_data.value.data = (feed_data.value.data as Feed[]).sort((a: any, b: any) => {
   return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
 });
}

async function showFeedsOfMagazine(progr_magazine: number | undefined) {
  var url = "/api/feeds";
  if (progr_magazine !== undefined) {
    url = url.concat(`/magazine/${progr_magazine}`);
  }

  feed_data.value = (await useFetch(url) as HttpResponse).data;
}

function openModalWithData(feed: Feed): void {
  const modal_toggle = document.getElementById(feedModalId);
  if (modal_toggle !== null) {
    modal_toggle.click();
  }
  modal_title.value = feed.title ? feed.title : "No title";
  modal_description.value = feed.description ? feed.description : "No description";
  modal_link.value = feed.link ? feed.link : "No link";

}

async function toggleBookmark(feed: Feed): Promise<void> {
  const userId = (userData.value as any).uid || '';

  if (feed.isBookmarked) {
    const result = (await useFetch('/api/feeds/bookmark', {
      method: 'delete',
      body: JSON.stringify({ userId: userId, feedId: feed._id }),
    })).data.value as HttpResponse;

    if (result.statusCode !== 200) {
      console.error("error: " + result.statusMessage);
    }

    feed.isBookmarked = false;
  } else {
    const result = (await useFetch('/api/feeds/bookmark', {
      method: 'put',
      body: JSON.stringify({userId: userId, feedId: feed._id}),
    })).data.value as HttpResponse;

    if (result.statusCode !== 200) {
      console.error("error: " + result.statusMessage);
    }
    
    feed.isBookmarked = true;
  }
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

async function searchKeyword(keyword: string): Promise<void> {
  const url = `/api/feeds/search?keyword=${keyword}`;
  const result = (await useFetch(url)).data.value as HttpResponse;

  if (result.statusCode !== 200) {
    console.error("error: " + result.statusMessage);
  }

  feed_data.value = result;
}
</script>
