/*
    클래스는 설계도(문서)같은 것. 실체가 아니다. 

    클래스 vs 객체
    붕어빵틀 vs 붕어빵
*/
//#: 은닉화, 캡슐화
class StorageService {
    #storageName; //전역변수(속성), #이 붙으면 private(비공개) 외부에서 접근할 수 없는 속성 
    #lastId;

    //생성자, 객체를 생성하려면 꼭 생성자를 호출해야 합니다. 
    //메소드지만 특별하다. 객체 생성(객체화)할 때만 호출할 수 있다.
    constructor(storageName) { //파라미터, 객체 생성 때 외부에서 값이 들어온다.
        if(!storageName) {
            throw new Error('스토리지 이름을 입력해주세요.');
        }
        this.#storageName = storageName;
        // [수정] 1로 고정하는 대신, 기존 데이터에서 다음 ID를 찾아옵니다.
        this.#lastId = this.#getNextId();
    }
    // [추가] 다음 ID를 계산하는 프라이빗 메서드
    #getNextId() {
        const storageData = this.#getStorageData(); // 기존 데이터 { "1": {...}, "2": {...} }
        const keys = Object.keys(storageData); // ID 문자열 배열 ["1", "2"]
        
        if (keys.length === 0) {
            return 1; // 데이터가 없으면 1부터 시작
        }

        // 키값(ID)을 숫자형으로 변환 후 최댓값을 찾아서 +1
        const maxId = Math.max(...keys.map(key => Number(key))); //...은 주머니 속의 내용물들을 바닥에 촤르르 펼쳐서 보여준 것
        /*
        const numbers = [10, 20, 30];
        // 1. 그냥 넣었을 때
        console.log(numbers);    // 출력: [10, 20, 30] (배열 형태)
        // 2. ...을 써서 전개했을 때
        console.log(...numbers); // 출력: 10 20 30 (숫자만 낱개로 나열됨)
        */
        return maxId + 1;
    }

    // 스토리지 데이터 조회 p.161
    #getStorageData() {
        const json = localStorage.getItem(this.#storageName);
        if(json) { return JSON.parse(json); } //json문자열을 객체로 변환 후 리턴
        return {}; //빈 객체 리턴
    }

    // 스토리지 데이터 저장 p.161
    #saveStorageData(data) {
        const json = JSON.stringify(data); //객체(data)를 json문자열(value)로 변환 
        localStorage.setItem(this.#storageName, json); //value를 localStorage에 저장
    }

    // 신규 항목 추가 p.162
    addItem(item) {
        const storageData = this.#getStorageData();
        item.id = this.#lastId
        storageData[this.#lastId] = item;
        this.#saveStorageData(storageData);
        // [수정] 저장이 성공하면 다음을 위해 ID 1 증가
        this.#lastId++;
    }

    // 전체 항목 조회

    getItems() {
    return this.#getStorageData(); // 인자 없이 전체 데이터를 리턴
    }
    // 개별 조회가 따로 필요하다면 추가
    getItem(id) {
        const storageData = this.#getStorageData();
        return storageData[id];
    }

    delItem(id)    {
        const storageData = this.#getStorageData();
        delete storageData[id];
        this.#saveStorageData(storageData) //삭제하고 나서의 결과값을 다시 업데이트하기 위함
    }
    
}

const storageService = new StorageService('myMemo'); //'myMemo'라는 이름의 저장 공간을 관리하겠다고 선언. 앞으로 storageService를 통해서 메모를 저장하거나 가져올 수 있습니다.
export default storageService;