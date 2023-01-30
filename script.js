
var user = '';
var dataSize = 0;
var myTasks = document.getElementById('tasks');
var myForm = document.getElementById('myForm');
myForm.focus();
var taskList=[];
var pos =0;
var close = document.getElementsByClassName('close');
var tasks = 0;
var list = document.querySelector('ul');
var tipBox = document.getElementById("tip-box");
var closeTip = document.getElementById("tip-close");
setTimeout(showTip,3000);
closeTip.addEventListener("click",function(){ setTimeout(function(){closeTip.style.display = "none";tipBox.style.display = "none";},1000)});

if(localStorage.getItem("userData")){

 let sessionData= localStorage.getItem("userData");
 let userData = JSON.parse(sessionData);

 for(let i = 0;i < userData.length;i++){

     taskList[i] = userData[i];

 }

 dataSize = taskList.length;
 taskRender(taskList);

}else{
    

}

list.addEventListener('click',function(ev){
    if(ev.target.tagName === 'LI'){

        let key = ev.target.id;
        ev.target.classList.toggle('checked');
        updateCheck(taskList,key);

    }
},false);

function updateCheck(arr,kID){

    let existing = localStorage.getItem("userData");

    existing = existing ? JSON.parse(existing) : null;

    for(let i = 0; i < arr.length;i++){

        if(arr[i].id == kID){

            arr[i].checked = !arr[i].checked;
            if(existing){

                existing[i].checked = !existing[i].checked;
                localStorage.setItem("userData",JSON.stringify(existing));

            }
        }
    }
}

myForm.addEventListener('submit',function(event){
    event.preventDefault();
})
//create a new list item when clicking on the Add button
function addTask(text){
    let myTask={

        text,
        checked:false,
        id:Date.now()

    }

    taskList.push(myTask);
    taskRender(taskList);
}

function taskRender(taskArray){
   
  
  
  if(taskArray.length == 0){

  }else{
      
    if(dataSize > 0){
        for(let i = 0; i < dataSize;i++){
        pos++;
        
        let li = document.createElement('li');
        let txt = taskArray[i].text;
        let txtNode = document.createTextNode(txt);
        let idValue = taskArray[i].id;
        li.setAttribute('id',`${idValue}`);
        li.appendChild(txtNode);
          tasks++;
          if(taskArray[i].checked == true){

              li.setAttribute("class","checked");

          }

          document.getElementById('myUl').appendChild(li);
          var span = document.createElement('span');

      span.className = "close";
      var txt2 = document.createTextNode('\u00D7');
      span.appendChild(txt2);
      li.appendChild(span);

     let cSize =  document.getElementsByClassName('close').length;

      for(let j = 0;j < cSize;j++){
          close[j].onclick = function(){

              var div= this.parentElement;
              var key =div.id;
              div.style.display ="none";
              findAndRemove(taskList,key);
              tasks--;
              myTasks.innerHTML = tasks;
                pos--;
              
          }
      }
        }

        dataSize=0;
        myTasks.innerHTML = tasks;

    }else{

        let li = document.createElement('li');

        for(let i =pos; i <= pos;i++){

            let txt = taskArray[pos].text;
            let txtNode = document.createTextNode(txt);
            let idValue = taskArray[i].id;
            li.setAttribute('id',`${idValue}`);
            li.appendChild(txtNode);
              tasks++;
              document.getElementById('myUl').appendChild(li);
              var span = document.createElement('span');
          span.className = "close";
          var txt2 = document.createTextNode('\u00D7');
          span.appendChild(txt2);
          li.appendChild(span);

         let cSize =  document.getElementsByClassName('close').length;

          for(let j = 0;j < cSize;j++){
              
              close[j].onclick = function(){

                  var div= this.parentElement;
                  var key =div.id;
                  div.style.display ="none";
                  findAndRemove(taskList,key);
                  tasks--;
                  myTasks.innerHTML = tasks;
                    pos--;
               
              }
          }
          localStorage.setItem("userData", JSON.stringify(taskList));
          document.getElementById('myInput').value = '';
          
        }    
    }
    
    
  }
  
  function findAndRemove(myArr,keyValue){

      let existing = localStorage.getItem("userData");
      existing = existing ? JSON.parse(existing) : null;

      let size = myArr.length;
      for(let i = 0;i < size;i++){

          if(myArr[i].id == keyValue){
             
              myArr.splice(i,1);
              if(existing){
                existing.splice(i,1);

                localStorage.setItem("userData",JSON.stringify(existing));

              }
              
              break;
          }
      }
  }
  
}
function newElement(){
   
     var input = document.getElementById('myInput').value.trim();

     if(input === ''){

        alert("you must write something!");

     }else{

        addTask(input);
        pos++;
        myTasks.innerHTML = tasks;

     }

}

function  showTip(){
    tipBox.style.display ="block";
    setTimeout(function(){tipBox.style.display = "none"},25000)
}