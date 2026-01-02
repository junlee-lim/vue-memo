<script setup>
import storageService from '@/serviecs/StorageService';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter(); //라우터 객체 주소값 얻기(주소값 이동, 운전기사)
const route = useRoute(); //라우트 객체 주소값 얻기(PathVariable 값 가져오기, 승차권)
const state = reactive({
    memo: {
        title: '',
        content: ''
    }
});
const submit = () => {
    storageService.addItem(state.memo);
    alert('saved');
    //라우팅 처리(path: '/')로 주소값 이동(화면 전환)
    router.push({
        path: '/'
    })
}

onMounted(() => {
    if(route.params.id){ //params는 주소창(path)에 숨겨둔 변수 주머니입니다! :id라고 이름을 지어두면, 어떤 숫자가 들어오든 그 숫자를 쏙 뽑아서 "아, 지금 사용자가 7번 메모를 보고 싶어 하는구나!"라고 알아낼 수 있게 해주는 고마운 존재입니다.
        const id = Number(route.params.id);
        state.memo = storageService.getItem(id);
    }
})

</script>

<template>
<form class="detail" @submit.prevent = "submit"> <!--button을 누르면 submit이 되는데 submit를 중지시키고 const submit한 걸 실행-->
    <div class="mb-3">
        <label for="title" class="form-label">title</label>
        <input type="text" id="title" class="form-control p3" v-model="state.memo.title">
    </div>
    <div class="mb-3">
        <label for="content" class="form-label">content</label>
        <textarea id="content" v-model="state.memo.content"></textarea>
    </div>
    <button class="btn btn-primary w-100 py-3">save</button>
</form>
</template>

<style scoped>

</style>