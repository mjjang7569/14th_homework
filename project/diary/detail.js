const 쿼드스트링 = location.search
const 잘게나누어담은통 = new URLSearchParams(쿼드스트링)
const 카드인덱스 = 잘게나누어담은통.get('number')     
let 카드내용 = JSON.parse(localStorage.getItem("일기카드들")) ||[]    

const 기분가져오는기능= ()=>{
    const 일기상세의기분 = 카드내용[카드인덱스].기분
    document.getElementById("기분").innerText= 카드내용[카드인덱스].기분
    switch (일기상세의기분){
        case "행복해요":{
            document.getElementById("기분이모지").src= './assets/CSS&JS마스터_small_image/행복해요(s).png'
            break
        }
        case "슬퍼요" : {
            document.getElementById("기분이모지").src= './assets/CSS&JS마스터_small_image/슬퍼요(s).png'
            break
        }
        case "놀랐어요" : {
                document.getElementById("기분이모지").src= './assets/CSS&JS마스터_small_image/놀랐어요(s).png'
            break
        }
        case "화나요" : {
            document.getElementById("기분이모지").src= './assets/CSS&JS마스터_small_image/화나요(s).png'
            break
        }
        case "기타" : {
            document.getElementById("기분이모지").src= './assets/CSS&JS마스터_small_image/기타(s).png'
            break
        }
    }
}

기분가져오는기능()


document.getElementById("제목").innerText = 카드내용[카드인덱스].제목
document.getElementById("내용").innerText = 카드내용[카드인덱스].내용
document.getElementById("날짜").innerText= 카드내용[카드인덱스].날짜

let 회고배열 = []
let 회고객체 = {}
let 최종회고내용

const 회고생성기능 = (event) =>{
      
    
      
    const 회고내용= event.target.value
    회고배열.push(회고내용)
    console.log("회고내용!!!",회고배열)
    최종회고내용 = 회고배열[회고배열.length - 1]

    
}

const 회고입력기능 = () =>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2,0);
    const day = String(today.getDate()).padStart(2,0);
    const 회고날짜 = `[${year}.${month}.${day}]`

    회고객체 ={
        회고내용 : 최종회고내용,
        회고날짜 : 회고날짜,
    }
    // 카드내용[카드인덱스]["회고내용"] = 최종회고내용
    // 카드내용[카드인덱스]["회고날짜"] = 회고날짜
    // console.log("1111",카드내용[카드인덱스])
    let 회고배열 = 카드내용[카드인덱스]["회고록"]||[]
    // console.log("222222", 회고배열)
    회고배열.push(회고객체)
    카드내용[카드인덱스]["회고록"] = 회고배열
    console.log("!!!!!!!1", 카드내용[카드인덱스])
    localStorage.setItem("일기카드들",JSON.stringify(카드내용))
    // const 회고내용날짜배열 = JSON.parse(localStorage.getItem("일기카드들")) || []
    document.getElementById("회고노출영역").innerHTML = 회고배열.map((ele, index)=>`
    <div id="회고내용">${ele.회고내용}</div>
    <div id="회고등록날짜">${ele.회고날짜}</div> 
    `).join("")
    document.getElementById("회고입력인풋").value = ""
}

const 내용복사기능 = () =>{
    const 일기내용 = document.getElementById("내용").innerText
    const 복사내용 = navigator.clipboard.writeText(일기내용)
    document.getElementById("복사토스트").style.display = "flex"
    setTimeout(()=>{document.getElementById("복사토스트").style.display = "none"}, 2000)
}

const 일기상세수정기능 = () =>{
    document.getElementById("수정시바뀌는영역").innerHTML = 
        `
            <div id= "기분" class="오늘의기분">
                <div>오늘 기분은 어땠나요?</div>
                <input id ="행복" class="오늘의기분" type="radio" name ="기분" value ="행복"/>
                <label for ="행복"> 행복해요 </label>
                <input id ="슬픔" class="오늘의기분" type="radio" name ="기분" value ="슬픔"/>
                <label for ="슬픔"> 슬퍼요 </label>
                <input id="놀람" class="오늘의기분" type="radio" name ="기분" value ="놀람"/>
                <label for ="놀람"> 놀랐어요 </label>
                <input id="화남" class="오늘의기분" type="radio" name ="기분" value ="화남"/>
                <label for ="화남"> 화나요 </label>
                <input id="기타" class="오늘의기분" type="radio" name ="기분" value ="기타"/>
                <label for ="기타"> 기타 </label>
            </div>
            <div class="제목">
                <div>제목</div>
                <input id="오늘의제목" type="text" placeholder="제목을 입력해 주세요."/>
            </div>
            <div class="내용">
                <div>내용</div>
                <textarea id="오늘의내용" placeholder="내용을 입력해 주세요."></textarea>
            </div>
        </div>
        <div class="일기_등록_취소_버튼">
            <button class="닫기버튼" onclick="수정취소기능()" >취소</button>
            <button class="등록하기버튼" onclick="수정완료기능()" >수정하기</button>
      `

}

const 수정완료기능 = () =>{
  
    const radioButtons = document.getElementsByName("기분");
    const 선택된기분 = Array.from(radioButtons).filter(ele => ele.checked);    
    console.log("된", 선택된기분[0].id)
    const label = document.querySelector(`label[for="${선택된기분[0].id}"]`)
    console.log("라벨", label)
    const 수정된기분 = label.innerText
    const 수정된제목 = document.getElementById("오늘의제목").value
    const 수정된내용 = document.getElementById("오늘의내용").value
    console.log("수정된기분", 수정된기분)
    카드내용[카드인덱스].기분 = 수정된기분
    카드내용[카드인덱스].제목 = 수정된제목
    카드내용[카드인덱스].내용 = 수정된내용
    localStorage.setItem("일기카드들", JSON.stringify(카드내용))
    history.back()

}
const 수정취소기능 = () =>{
    document.getElementById("수정시바뀌는영역").innerHTML = `
         <div id ="제목"></div>
        <div class="기분과날짜영역">
            <div class="기분영역">
                <img id ="기분이모지">
                <div id="기분"></div>
            </div>
            
            <div id= "날짜"></div>
        </div>
        <div id ="내용영역">
            <div>내용</div>
            <div id="내용"></div>
        </div>
        <div class="복사영역">
            <div class = "빈영역" ></div>
            <button class="내용복사" onclick="내용복사기능()">
                <img id="복사아이콘" src="./assets/copy_outline_light_xs.svg" >
                <div class="복사텍스트" >내용복사</div>
            </button>
        </div>            
        <div class="수정삭제버튼">
            <button id="수정버튼" onclick="일기상세수정기능()">수정</button><button id="삭제버튼">삭제</button>
        </div>
    `
    document.getElementById("제목").innerText = 카드내용[카드인덱스].제목
    document.getElementById("내용").innerText = 카드내용[카드인덱스].내용
    document.getElementById("날짜").innerText= 카드내용[카드인덱스].날짜
    기분가져오는기능()
}

const 일기상세삭제기능 = () =>{
    
}
window.onload = () =>{
    document.getElementById("회고노출영역").innerHTML = 카드내용[카드인덱스]["회고록"].map((ele, index)=>`
    <div id="회고내용">${ele.회고내용}</div>
    <div id="회고등록날짜">${ele.회고날짜}</div> 
    `).join("")

}