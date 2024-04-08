<!-- <template>
  <div>
    <button class="circle-button">
      <img class="logo" :src="this.logo" alt="button" />
    </button>
  </div>
</template>

<script>
export default {
  name: "Circle Button",
  props: {
    logo: String,
  },
};
</script>

<style scoped>
.circle-button {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #bd6b16;
  cursor: pointer;
  z-index: 1000;
}

.logo {
  width: 75%;
  height: 75%;
}
</style> -->

<template>
  <div class="circle-button">
    <img class="logo" :src="logo" alt="button" />
  </div>
</template>

<script>
export default {
  name: "CircleButton",
  props: {
    logo: String,
  },
};
</script>

<style scoped>
.circle-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #bd6b16;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.logo {
  width: 75%;
  height: 75%;
}
</style>
