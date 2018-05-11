<template>
  <div class="container">
    <input type="text" v-model="unicode" placeholder="plaintext" autofocus :style="{ fontSize }" />
    <input type="text" v-model="ascii" placeholder="punycode" :style="{ fontSize }" />
  </div>
</template>

<script>
import { toUnicode, toASCII } from 'punycode';
export default {
  data() {
    return {
      unicode: decodeURIComponent(location.hash.slice(1)) || '',
      width: innerWidth,
      height: innerHeight,
    };
  },
  computed: {
    ascii: {
      get() {
        return toASCII(this.unicode);
      },
      set(v) {
        this.$nextTick(() => this.unicode = toUnicode(v));
      },
    },
    fontSize() {
      return Math.min(this.width / Math.max(10, this.ascii.length), this.height) + 'px';
    },
  },
  watch: {
    unicode(v) {
      location.replace('#' + encodeURIComponent(v));
    },
  },
  methods: {
    update() {
      this.unicode = decodeURIComponent(location.hash.slice(1));
    },
    resize() {
      this.width = innerWidth;
      this.height = innerHeight;
    },
  },
  mounted() {
    addEventListener('hashchange', this.update, false);
    addEventListener('resize', this.resize, false);
  },
  destroyed() {
    removeEventListener('hashchange', this.update, false);
    removeEventListener('resize', this.resize, false);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  position: absolute;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

input[type=text] {
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  text-align: center;
  font-family: monospace;
  flex: 1;
  opacity: .3;
  transition: all ease .7s;
}

input[type=text]:focus {
  opacity: 1;
}
</style>
