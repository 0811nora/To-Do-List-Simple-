const container = document.querySelector(".container");
const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");
const addBtn = document.querySelector(".add-btn");
const alert = document.querySelector(".alert");
const clearBtn = document.querySelector(".clear");

addBtn.addEventListener("click", addTask);



function addTask(){
    if(inputBox.value == ""){
        alert.classList.add("active"); //為元素新增一個 class
    }else{
        alert.classList.remove("active");  //移除新class 名稱ative

        let li = document.createElement("li"); //建立一個新的 HTML 元素 li
        li.textContent = inputBox.value;
        li.setAttribute("draggable","true");  //設定元素的屬性值， draggable 屬性設為 true 時，該元素變得可拖動。

        // 創建 checkbox input 元素
        let checkbox = document.createElement("input");  // 建立新的 input 元素
        checkbox.setAttribute("type", "checkbox");  // 設置 input 的 type 為 checkbox
        checkbox.className = "todo-check";  // 為 checkbox 設定 class 名稱

        listContainer.appendChild(li); // 把 li 加入 ul 裡面

        // 將 checkbox 附加到 li 裡面，讓每個待辦事項都帶有一個核取方塊
        li.insertBefore(checkbox, li.firstChild);  // 插入 checkbox 在 li 的開頭

        // 當 checkbox 改變時，添加/移除完成樣式
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                li.classList.add("completed"); // 添加完成樣式
                saveData();
                console.log("任務已完成，並儲存資料");
            } else {
                li.classList.remove("completed"); // 移除完成樣式
                saveData();
                console.log("任務已取消，並儲存資料");
            };
        });

        let span = document.createElement("span"); //建立一個新的 HTML 元素 span
        span.className = "close";
        span.innerHTML = "<i class='bx bxs-message-square-x'></i>"; //設置 span 的內容為 icon
        li.appendChild(span); // 把 span 加入 li 裡面
    }
    inputBox.value=""; // 輸入後就清空輸入欄
    saveData();
}


inputBox.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        event.preventDefault();  //會取消enter按鍵的預設行為。通常在輸入框中按下回車鍵會觸發表單的提交（如果輸入框在表單內）。
        addTask();
    }
});

listContainer.addEventListener("click" ,function(e){
    if(e.target.tagname == "LI"){  //指事件發生的具體元素，並返回該元素的標籤名稱; = 如果等於LI的話
        e.target.classlist.toggle("checked");  //用來切換指定的 class。如果該元素已有 "checked" 這個 class，則會將它移除；如果沒有這個 class，則會將它添加
        saveData();
    }else if(e.target.tagname == "SPAN" || e.target.tagName == "I"){  //如果是span
        e.target.parentElement.parentElement.remove();  //移除整個 LI (span的父元素)
        saveData();
    }
});

//手機版監聽
listContainer.addEventListener("touchstart",function(e){ //手指接觸屏幕時觸發
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
    }
});


//手指在螢幕上面滑動時，取消打勾，這樣移動後項目就不會有打勾
listContainer.addEventListener("touchmove" , function(e){  //手指在屏幕上移動時觸發
    if(e.target.tagName == "LI"){
        e.target.classList.remove("checked");
        e.target.style.backgroundColor = "gainsboro";  //背景變成灰色
    }
});

listContainer.addEventListener("touchend" ,function(e){  //手指從屏幕移開時觸發
    if(e.target.tagName == "SPAN"){  //如果點的是span，那就移除 LI
        e.target.parentElement.remove();
    }else if(e.target.tagName == "LI"){  //如果點的是LI，那背景就變透明色
        e.target.style.backgroungColor = "transparent";
    }
});

clearBtn.addEventListener("click" ,clearData);

function clearData(){
    let yes = confirm("是否將所有資料刪除??")
    if(yes){
        localStorage.clear();
        listContainer.innerHTML = "";
        console.log("執行-資料刪除")
    }else{
        console.log("取消執行-刪除資料")
    };
    
};

// localStorage.clear();  //可以清除資料

/*
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML); //將listContainer的內容存入 localStorage。
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data"); //作用: 從 localStorage 中取出先前儲存的資料，並將其顯示在頁面上。
}

showTask(); // 記得呼叫函式才會執行
*/

function saveData() {
    const tasks = []; //創建一個空陣列，用來存放每個待辦事項的物件資料。
    listContainer.querySelectorAll("li").forEach(li => { // 遍歷每個 li 元素
        const task = {  //建立物件
            text: li.textContent, // 取得該 li 的文字內容，並存入物件的 text 屬性。
            checked: li.querySelector("input[type='checkbox']").checked //取得該 li 內 checkbox 的 checked 狀態，並存入 task 物件的 checked 屬性。
        };
        tasks.push(task); //將每個 li 的待辦事項物件（包含文字和勾選狀態）加入到 tasks 陣列中。
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); //將 tasks 陣列轉換為 JSON 字串，並存入 localStorage

    //在使用 localStorage.setItem() 時，將資料轉換成 JSON 格式 (JSON.stringify()) 是因為 localStorage 只能儲存 字串 (string) 格式的資料。這也就是為什麼您必須先將物件或陣列等複雜資料結構轉換成字串後，才能使用 localStorage.setItem() 進行儲存。
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; //從 localStorage 讀取之前儲存的資料，使用 JSON.parse() 將其轉換為物件陣列。若無資料則回傳空陣列。
    tasks.forEach(task => { //遍歷 tasks 陣列，為每個待辦事項創建對應的 li 和 checkbox。
        let li = document.createElement("li"); 
        li.textContent = task.text; //將儲存的文字內容加到 li 元素中

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.className = "todo-check";

        // 根據儲存的資料設置 checkbox 是否被勾選
        if (task.checked) {
            checkbox.checked = true;
            li.classList.add("completed"); // 也加上完成樣式
        }

        li.insertBefore(checkbox, li.firstChild);

        checkbox.addEventListener("change", function() {
            if (this.checked) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }
            saveData(); // 每次變更狀態時儲存
        });

        let span = document.createElement("span");
        span.className = "close";
        span.innerHTML = "<i class='bx bxs-message-square-x'></i>";
        li.appendChild(span);

        listContainer.appendChild(li); // 把 li 加到清單中
    });
}
showTask();

new Sortable(listContainer,{  //要在html中加入拖曳套件後才可以使用
    animation: 200,
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


