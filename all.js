
//使用 querySelector 來選擇 Class物件，用宣告變數在 js中
const container = document.querySelector(".container");
const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");
const addBtn = document.querySelector(".add-btn");
const alert = document.querySelector(".alert");
const clearBtn = document.querySelector(".clear");


// ---- 新增待辦事項的按鈕  ----
//監聽按鈕被按下去，就執行 [addTask] 函式
addBtn.addEventListener("click", addTask);


// ---- 函式：addTask() ----
//執行 [新增待辦事項的按鈕] 時，所做的動作
function addTask(){
    if(inputBox.value == ""){
        alert.classList.add("active"); 
        // 當輸入框等於空值時執行
        // 加入[active] 的class
        // .classList:可以用來取得元素 class
        // .add:新增一個 class
        // 加上[active] 的目的是讓她跳提示
        

    }else{ //如果輸入框"不等於"空值時執行
        alert.classList.remove("active");  
        // 移除[active]這個class


        // ---- 創建 li (事項本身) ----
        let li = document.createElement("li"); 
        li.textContent = inputBox.value;
        li.setAttribute("draggable","true");  
        // 建立一個新的 HTML 元素 [li]
        // [li] 的文字內容 = 輸入框的值
        // .textContent: 獲取或設置元素的文本內容
        // .setAttribute: 設定元素的屬性值，draggable 屬性設為 true 時，該元素變得可拖動。


        // ---- 創建 checkbox input 元素 ----
        let checkbox = document.createElement("input");  
        checkbox.setAttribute("type", "checkbox");  
        checkbox.className = "todo-check";  
        // 在HTML中建立新的[input]元素
        // [input] 元素的 type 為 "check box"，因應待辦事項的勾選功能
        // className: 為 checkbox 設定 class 名稱叫做 [todo-check]


        // ---- li 的位置設定 ----
        listContainer.appendChild(li); 
        li.prepend(checkbox); 
        // .appendChild: 把 li 加入 ul 裡面 (ul = class[listContainer] ) 
        // .prepend:將 checkbox 插入到 li 的第一個子節點之前
        // 作用是可以讓人勾選是否完成。
        


        // ---- checkbox功能 ---- 
        checkbox.addEventListener("change", function() {
            // 監聽 checkbox 的值改變時觸發函式
            // change: 當表單元素的值改變時觸發

            if (this.checked) {
                li.classList.add("completed"); 
                saveData();
                // 當監聽事件change觸發時，如果checked = true 就執行
                // 在 li 新增 class [completed]
                // 並且存入data

            } else {
                li.classList.remove("completed"); 
                saveData();
                // 如果checked = false 就執行
                // 在 li 移除 class [completed]
                // 並且存入data
            };
                // ( input 元素類型為 checkbox 或 radio，它自動會有 checked 屬性，是一個布林值)
                // ( 當 checkbox 被選中時，checked 的值會是 true，當沒有被選中時，值是 false)
        });


        // ---- 刪除項目的[X] ----
        let span = document.createElement("span"); 
        span.className = "close";
        span.innerHTML = "<i class='bx bxs-message-square-x'></i>"; //設置 span 的內容為 icon
        li.appendChild(span); // 把 span 加入 li 裡面
        // 在HTML中建立新的[span]元素
        // 這個[span] class名稱命名為 "close"
        // 將 [span] 的內容改為一個icon
        // 將 [span] 加入li 中的最後面
    }
    inputBox.value=""; 
    saveData();
    // 輸入框在輸入後，就清空輸入的內容，並存入data
}



// ---- 按Enter輸入事項 ----
inputBox.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        event.preventDefault();  
        addTask();
    }
    // 輸入框[inputBox] 監聽 keydown事件: 按下任意鍵時觸發函式
    // keyCode(鍵碼) 13 是 Enter
    // 如果 按下的是"Enter鍵"，就執行 addTask()
    // .preventDefault(): 取消enter按鍵的預設行為
});


// ---- li 中的[check box]及 [刪除鍵] 效果 ----
listContainer.addEventListener("click" ,function(e){
    if(e.target.tagname == "LI"){  
        e.target.classlist.toggle("checked");  
        saveData();
        // 如果點擊的元素是一個 <li> 元素，進行以下操作。
        // checked 的值 = true，點擊會變false，若值 = false，點擊會變true
        // 意味著讓畫面顯示出：畫面完成打勾，也可以取消打勾。
        // .classlist.toggle: 切換元素的 class，如果有則移除，沒有則新增。
        // 結果會存入savaData


    }else if(e.target.tagname == "SPAN" || e.target.tagName == "I"){  //如果是span
        e.target.closest("li").remove();  
        saveData();
        // 如果點擊的元素是一個 [span] 或是[i]，進行以下操作。(i 是指刪除的icon)
        // 用 .closest("li") 找到最近的li元素，並起刪除。
        // 結果會存入savaData
    }
    
});


// ---- li 中的[check box]效果 ----
// 手機版
listContainer.addEventListener("touchstart",function(e){ 
    // touchstart: 手指接觸屏幕時觸發
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
    }
});



// ---- li 中的[刪除鍵] 效果 ----
// 手機版
listContainer.addEventListener("touchend" ,function(e){  
    // touchend: 手指從屏幕移開時觸發
    if(e.target.tagName == "SPAN"){  
        e.target.closest("li").remove(); 
    }
});


// ---- 清除全部項目按鈕 ---
// 監聽按鈕按下時，執行 "clearData"函式
clearBtn.addEventListener("click" ,clearData);

function clearData(){
    let yes = confirm("是否將所有資料刪除??")
    // 宣告 yes 就是 彈跳視窗Confirm Box的代號
    // 語法 :.confirm("彈跳視窗想要顯示的文字")，待配if else使用。

    if(yes){
        localStorage.clear();  
        listContainer.innerHTML = "";
    };
        // 如果按下[確認]鈕(表示yes = ture)，執行清除localStorage指令
        // 並將 listContainer 變成空值
        
};


// ---- 儲存資料到localStorage ---- 
function saveData() {
    const tasks = []; 
    //創建一個空陣列，用來存放每個待辦事項的物件資料。
    
    listContainer.querySelectorAll("li").forEach(li => { 
        // .querySelectorAll("li"): 選擇 listContainer 元素內所有的 <li> 標籤
        // .forEach: 對每個 listContainer 中的 <li> 執行函式裡的動作
        // 回呼函式(li => {...})：這個函式叫做li

        const task = {  
            text: li.textContent, 
            checked: li.querySelector("input[type='checkbox']").checked 
            // 建立物件 task
            // text: 取得該 li 的文字內容，並存入物件的 text 屬性。
            // checked: 取得該 li 內 checkbox 的 checked 狀態，並存入 task 物件的 checked 屬性。
        };
        tasks.push(task); 
        // .push(task): 在陣列最後方加入新元素
        // 將每個 li 的待辦事項物件（包含文字和勾選狀態）加入到 tasks 陣列中。
    });

    localStorage.setItem("tasks", JSON.stringify(tasks)); 
    // 將 tasks 陣列轉換為 JSON 字串，並存入 localStorage
    // setItem(key, value)：用來在 localStorage 中儲存資料的方法。它需要兩個參數：
    // --------- key：代表儲存資料的名稱
    // --------- value：代表要儲存的資料內容。
    // JSON.stringify(): 將 JavaScript 資料轉換成 JSON 格式字串的方法。

    // 在使用 localStorage.setItem() 時，
    // 將資料轉換成 JSON 格式是因為 localStorage 只能儲存字串 (string) 格式的資料。
    // 這也就是為什麼必須先將物件或陣列轉換成字串後，才能使用 localStorage.setItem()進行儲存。
}

// ---- 將儲存的資料顯示出來 (重建UI) ----
function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    // JSON.parse(): 用來將字串轉換成 JavaScript 的物件或陣列
    // 因從 localStorage 取得的資料是 JSON 格式的字串，需要使用 JSON.parse() 將它轉換回 JavaScript 資料型別
    // localStorage.getItem("tasks"): 用來從 localStorage 中取得 "tasks" 的資料，取出的資料是 字串格式
    // || []: 如果 localStorage 沒有存任何 "tasks"，就會使用一個預設的空陣列
    

    tasks.forEach(currentTask => { 
        let li = document.createElement("li"); 
        li.textContent = currentTask.text; 

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.className = "todo-check";

        
        if (currentTask.checked) {
            checkbox.checked = true;
            li.classList.add("completed"); 
        }

        li.insertBefore(checkbox, li.firstChild);
        // insertBefore: 用來插入元素的方法，將一個新的元素插入到某個父元素的現有子元素之前
        // 將 checkbox 加到 li 的最前面

        checkbox.addEventListener("change", function() {
            if (this.checked) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }
            saveData(); 
        });

        let span = document.createElement("span");
        span.className = "close";
        span.innerHTML = "<i class='bx bxs-message-square-x'></i>";
        li.appendChild(span);

        listContainer.appendChild(li); 
    });
}
showTask(); 
// 執行將資料顯示出來

new Sortable(listContainer,{  //要在html中加入拖曳套件後才可以使用
    animation: 200,

    // Sortable() 是一個建構函式，用來建立可拖放排序的功能。
    // listContainer 是一個指向要進行拖放排序的父元素
    // {}中，可以用來配置拖放行為
    // animation 設置了拖放操作完成後，元素在新位置上進行動畫的時間
});



//drag：在桌面版的瀏覽器中，當使用者拖曳一個 draggable 元素時觸發。
//touchend：在行動裝置上，當使用者結束觸控操作時觸發。
if(window.innerWidth > 600){ 
    window.addEventListener("drag", function(){ //電腦版執行拖曳時，存資料
        saveData();
    })
}else{
    window.addEventListener("touchend", function(){//手機版觸控結束時，存資料
        saveData();
    })
}


