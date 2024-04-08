<template>
  <div class="confirm-toast">
    <p>Are you sure you want to delete this recipe?</p>
    <div class="button-container">
      <button class="cancel-delete-button" @click="onCancel">Cancel</button>
      <button class="confirm-delete-button" @click="onConfirm">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style>
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-delete-button {
  background-color: #a7bf6a;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  width: auto;
  height: auto;
  margin: 0 20px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.cancel-delete-button:hover {
  background-color: #596639;
}

.confirm-delete-button {
  background-color: #ff4b4b;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  width: auto;
  height: auto;
  margin: 0 20px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.confirm-delete-button:hover {
  background-color: #cc3333;
}
</style>
