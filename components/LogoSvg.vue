<template>
  <NuxtLink to="/">
    <svg version="1.0" width="425.000000pt" height="442.000000pt" viewBox="0 0 425.000000 442.000000"
      preserveAspectRatio="xMidYMid meet" :class="className">

      <g transform="translate(0.000000,442.000000) scale(0.100000,-0.100000)" stroke="none" :fill="fillColor">
        <path d="M1113 3477 l-983 -569 0 -469 0 -468 57 33 c32 18 450 260 928 536
      479 276 895 517 925 535 l55 31 365 -212 c796 -463 1174 -683 1378 -801 l212
      -122 0 468 0 469 -592 342 c-326 189 -611 355 -633 370 -22 15 -159 96 -305
      180 -146 84 -301 174 -345 200 l-80 46 -982 -569z" />
        <path d="M1107 2153 l-977 -566 2 -295 3 -295 145 -83 c80 -46 151 -83 158
      -84 7 0 380 212 830 472 449 259 821 471 827 471 12 0 653 -367 730 -418 79
      -52 903 -525 915 -525 6 0 78 39 160 88 l149 87 1 291 0 292 -602 347 c-332
      191 -610 353 -618 360 -23 19 -728 425 -737 425 -4 -1 -448 -256 -986 -567z" />
        <path d="M1990 1318 c-47 -28 -152 -90 -235 -138 -82 -47 -208 -120 -280 -162
      -71 -41 -173 -100 -225 -130 -187 -108 -415 -241 -439 -255 l-24 -15 34 -21
      c18 -12 200 -117 403 -234 l371 -212 70 38 c39 21 149 84 245 140 96 55 180
      101 185 101 6 0 89 -46 185 -101 96 -56 207 -119 245 -140 l70 -38 101 58 c56
      32 114 68 130 79 16 11 130 77 254 147 124 71 245 140 269 155 l44 28 -24 15
      c-13 8 -85 50 -159 93 -285 165 -349 202 -406 238 -32 20 -133 80 -224 133
      -91 52 -233 135 -317 184 -83 49 -160 89 -170 89 -10 -1 -56 -24 -103 -52z" />
      </g>
    </svg>
  </NuxtLink>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
import { computed } from '@vue/reactivity';
const props = withDefaults(defineProps<{
  className?: string
  isLight?: boolean
  isDark?: boolean
}>(), {
  className: '',
  isLight: false,
  isDark: false
});
const fillColor = computed(() => {
  if (props.isLight) return '#264960';
  if (props.isDark) return '#8ED081';
  return '#264960';
});
</script>
