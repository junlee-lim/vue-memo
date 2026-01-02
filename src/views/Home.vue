<script setup>
import storageService from '@/serviecs/StorageService';
import { reactive, onMounted } from 'vue';

const state = reactive({
  memos:{}
})

// onMounted(() => state.memos = storageService.getItems());
const fetchMemos = () => {
  state.memos = storageService.getItems();
};
onMounted(fetchMemos);

const remove = id => {
  if (confirm('삭제하시겠습니까?')) {
    storageService.delItem(id); // 창고에서 삭제
    fetchMemos(); // 삭제 후 목록 다시 불러오기 (새로고침 효과)
  }
};

</script>

<template>
  <div class="memo-list">
    <router-link class="item" v-for="item in state.memos" :to="`/memos/${item.id}`"> <!--변수가 들어가야 할 땐 콜론(:) 써야 함-->
      <div class="d-flex pt3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between">
            <b>{{ item.title }}</b>
            <div>
              <span role="button" @click.prevent="remove(item.id)">delete</span>
            </div>
          </div>
          <div class="mt-2">{{ item.content }}</div>
        </div>
      </div>
    </router-link>
    <router-link to="/memos/add" class="add btn btn-light">add</router-link>
  </div>
</template>
