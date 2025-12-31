export class StorageService {
    #storageName; //전역변수(속성), #이 붙으면 private(비공개): 외부에서 접근할 수 없는 속성

    //생성자, 객체를 생성하려면 꼭 생성자 호출해야 함
    //메소드지만, 객체 생성할 때만 호출할 수 있어서 특별.
    constructor(storageName){ //파라미터, 객체 생성 때 외부에서 값이 들어옴
        if(!storageName){
            throw new Error('스토리지 이름 입력해 주세요')
        }
        this.#storageName = storageName;
    }
}