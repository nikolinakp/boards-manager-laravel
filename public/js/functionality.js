function deleteSelectedBoard(){
    document.getElementById("finalDeleteBoard").addEventListener('click',removeBoard);
}
function editBoard(){
    document.getElementById("edit").style.visibility="visible";
}
function backFunction() {
    document.getElementById("edit").style.visibility="hidden";
    document.getElementById('myTitleArea').value="";
    document.getElementById('myDescriptionArea').value="";
}
function craeteTask(){
    document.getElementById('add').style.visibility="visible";
    document.getElementById("okayButton").addEventListener('click', createNewTask);
}
function backFunction2() {
    document.getElementById("add").style.visibility="hidden";
    document.getElementById('taskAdd').value="";
    document.getElementById('taskAdd').style.backgroundColor="gray";
}

function backFunction3() {
    document.getElementById("add").style.visibility="hidden";
}

let editedBoard={title:"",description:""};
const titleOfBoards=[];
let myBoard=[];
let countBoardElements=0;
const colorOfBoards=[];
const descriptionOfBoard=[];

let allBoards=[];
let key;

function getInformationFromDatabase(allBoards){

    const getRequest={
        method: "GET",
        headers: {"Content-Type":"application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('auth_token')},
    }

    fetch('http://localhost:8000/api/boards',getRequest)
        .then((response) => response.json())

        .then((result) => result.forEach(item => {

            let array=item.stickies;
            let obj=JSON.parse(array);
            item.stickies=obj;
          
            allBoards.push(item);
        }))
        .catch((error) => console.log("error",error));

       // console.log(allBoards);

        
}

getInformationFromDatabase(allBoards);


function addNewInformation(currentBoard){

    const postRequest={
        method:"POST",
        headers: {"Content-Type":"application/json",'Authorization': 'Bearer ' + localStorage.getItem('auth_token')},
        body: JSON.stringify(currentBoard),
    };

    fetch('http://localhost:8000/api/boards',postRequest)
        .then((response) => response.json())
        .then(response => allBoards.push(response))
        .then((result) => console.log(result))
        .catch((error) => console.log("error",error));
}

/*let counter;
function correctId(counter){
   for(let i=0; i<allBoards.length; i++){
        if(i==allBoards.length-1)
        {
            counter=allBoards[i].id;
            console.log(counter);

            return counter+1;
        }
   }
}*/

function saveBoardInformation(){
 
    if(document.getElementById('titleArea').value== ''){

        window.alert("Please enter title of your board!");

    }else{
        
        let nameKey= document.getElementById('titleArea').value;
        let description=document.getElementById('descriptionArea').value;

        titleOfBoards.push(nameKey);
        let defaultColor="#e6e6ff";
        colorOfBoards.push(defaultColor);
        descriptionOfBoard.push(description);


        let currentBoard={};

        currentBoard.title=document.getElementById('titleArea').value;;
        currentBoard.description=document.getElementById('descriptionArea').value;
        currentBoard.stickies=[...myBoard];
        myBoard=[];

        addNewInformation(currentBoard);


        document.getElementById('titleArea').value="";
        document.getElementById('descriptionArea').value="";

        renderOnScreen();

    }

}

function setGrayColor(){
    document.getElementById('taskAdd').style.backgroundColor="gray";
    document.getElementById('taskAdd').style.color="black";
}
function setYellowColor(){
    document.getElementById('taskAdd').style.backgroundColor="#ffffb3";
    document.getElementById('taskAdd').style.color="black";
}
function setGreenColor(){
    document.getElementById('taskAdd').style.backgroundColor="#00ffbf";
    document.getElementById('taskAdd').style.color="black";
}
function setWhiteColor(){
    document.getElementById('taskAdd').style.backgroundColor="white";
    document.getElementById('taskAdd').style.color="black";
}
function setPurpleColor(){
    document.getElementById('taskAdd').style.backgroundColor="#990099";
    document.getElementById('taskAdd').style.color="white";
}
function setBlueColor(){
    document.getElementById('taskAdd').style.backgroundColor="#80aaff";
    document.getElementById('taskAdd').style.color="black";
}

function saveNewDataBoard(){
    editedBoard.title=document.getElementById('myTitleArea').value;
    editedBoard.description=document.getElementById('myDescriptionArea').value;
    document.getElementById("edit").style.visibility="hidden";
    document.getElementById('myTitleArea').value='';
    document.getElementById('myDescriptionArea').value='';
    document.getElementById('titleArea').value=editedBoard.title;
    document.getElementById('descriptionArea').value=editedBoard.description;
}


function renderOnScreen(){

    const mainBox=document.getElementById('stickyPlace');
    mainBox.innerHTML="";

    for (let i = 0; i < myBoard.length; i++) {
    
    const newSticky = document.createElement("div");
    const checkbox = document.createElement('input');

    const voteButton=document.createElement('div');
    const textVote=document.createElement('p');
    const countVotes=document.createElement('p');
    const plus=document.createElement('button');
    plus.addEventListener('click',() => increaseVote(i));
    const minus=document.createElement('button');
    minus.addEventListener('click',() => decreaseVote(i));

    textVote.textContent="Vote:";
    countVotes.textContent=myBoard[i].vote;
    plus.textContent="+";
    minus.textContent="-";
    countVotes.id="currentCount";

    voteButton.id=i;
    voteButton.className="myVote";


    voteButton.classList.add('voteButton');
    textVote.classList.add('textStyle');
    countVotes.classList.add('styleVotes');
    plus.classList.add('smallButton');
    minus.classList.add('smallButton');

    checkbox.type = "checkbox";
    checkbox.className="myCheck";
    newSticky.id = i;
    checkbox.checked=myBoard[i].select;
    if(checkbox.checked==true)
    {
        checkbox.style.visibility="visible";
    }
    else{
        checkbox.style.visibility="hidden";
    }
    let currentSticky=myBoard[i];
    checkbox.onchange=function changeSelect()
    {
        currentSticky.select=!currentSticky.select;
    }

    checkbox.classList.add("myCheck");
    newSticky.classList.add("smallSticky");
    newSticky.style.backgroundColor=myBoard[i].color;
    newSticky.textContent=myBoard[i].text;

    newSticky.addEventListener('mouseover',viewVoteButton);
    newSticky.addEventListener('mouseout',hideVoteButton);
    
    mainBox.appendChild(newSticky);
    newSticky.appendChild(checkbox);

    newSticky.appendChild(voteButton);
    voteButton.appendChild(textVote);
    voteButton.appendChild(countVotes);
    voteButton.appendChild(plus);
    voteButton.appendChild(minus);
    }
}

function createNewTask(){

    let newTask={id: null, text:"",color:"" ,select:"",vote:0};

    newTask.text=document.getElementById('taskAdd').value;
    newTask.color=document.getElementById('taskAdd').style.backgroundColor;
    newTask.select=false;
    newTask.id = myBoard.length;

    myBoard.push(newTask);

    countBoardElements++;
    document.getElementById('add').style.visibility="hidden";
    document.getElementById('taskAdd').value="";
    document.getElementById('taskAdd').style.backgroundColor="gray";

    renderOnScreen();

    document.getElementById('okayButton').removeEventListener('click', createNewTask);
    document.getElementById('taskAdd').value="";
    document.getElementById('taskAdd').style.backgroundColor="gray";
}

function selectTask(){
   
    let checks = document.querySelectorAll(".myCheck");
    for(let check of checks){
        check.style.visibility="visible";
    }
}

function deleteElementOnBoard(){

    for(let i=0; i<myBoard.length; i++){

        for(let j=0; j<myBoard.length; j++){
            if(myBoard[j].select==true)
            {
                myBoard.splice(j,1);
            }
        }
        renderOnScreen();
    }
}

let idByUpdateElement;
function editSticky(){

    for(let j=0; j<myBoard.length; j++){
        if(myBoard[j].select==true)
        {
            idByUpdateElement=j;
            document.getElementById('taskAdd').value=myBoard[j].text;
            document.getElementById('taskAdd').style.backgroundColor=myBoard[j].color;
            document.getElementById('add').style.visibility="visible";
            const updateButton = document.getElementById('okayButton');
            updateButton.addEventListener('click', updateTask);
            break;
        }
    }   
}
 
function updateTask(){

    let newData= {text:"",color:""};
    newData.text=document.getElementById('taskAdd').value;
    newData.color=document.getElementById('taskAdd').style.backgroundColor;

    myBoard[idByUpdateElement].text=newData.text;
    myBoard[idByUpdateElement].color=newData.color; 
    
    document.getElementById('add').style.visibility="hidden";

    renderOnScreen();

    document.getElementById('okayButton').removeEventListener('click', updateTask);
 }

 function increaseVote(id){
    myBoard[id].vote++;

    renderOnScreen();
 }
 function decreaseVote(id){
        myBoard[id].vote--;
        if(myBoard[id].vote<0){
            myBoard[id].vote=0;
        }
        renderOnScreen();
    } 
function viewVoteButton(){

    let votes = document.querySelectorAll(".myVote");
    for(let vote of votes){
        vote.style.visibility="visible";
    }
}
function hideVoteButton(){
    let votes = document.querySelectorAll(".myVote");
    for(let vote of votes){
        vote.style.visibility="hidden";
    }
}
function sortTask(){
    let sortArray=myBoard.sort((a,b) => (a.color>b.color)? 1: -1);
    renderOnScreen();
}
function importWindow(){
    document.getElementById('importFiles').style.visibility="visible";
}

function submitAction(){

    document.getElementById('importFiles').style.visibility="hidden";

    //read file and save in array

      var files=document.querySelector('#file').files;
      if(files.length>0){ 

        var file=files[0];

        var reader=new FileReader();
        reader.readAsText(file);

        reader.onload=function(event){
            var content = event.target.result;
            var lines=content.split('\n');
           
            for(let line=1;line<lines.length-1; line++){

                var rowContent=lines[line].split(',');
                console.log(rowContent);
            
                const current={id:0,text:"",color:"",select:"",vote:0};
                let colorPart1,colorPart2,colorPart3;
                for(let j=0;j<rowContent.length; j++){
                    if(j==0){
                        current.id=parseInt(rowContent[j]);
                    }else if(j==1){
                        current.text=rowContent[j];
                    }else if(j==2){
                        colorPart1=rowContent[j];
                    }else if(j==3){
                        colorPart2=rowContent[j];
                    }else if(j==4){
                        colorPart3=rowContent[j];
                        current.color=colorPart1+colorPart2+colorPart3;
                    }else if(j==5){
                        current.select=rowContent[j];
                    }else if(j==6){
                        current.vote=parseInt(rowContent[j]);
                    }
                }
                myBoard.push(current);
            }
            renderOnScreen();
        };

      }else{
        alert("Please select a file.");
      }

}

function exportAction(){

    const refinedData=[];
    const titleKeys=Object.keys(myBoard[0]);
    refinedData.push(titleKeys);
    let flag = new Boolean(false);

    flag=true;
    myBoard.forEach(item => {
         if(item.select==true){
            refinedData.push(Object.values(item))}
        })
        let csvContent='';

        refinedData.forEach(row =>{
            csvContent+=row.join(',')+ '\n'
                 
        })

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
        const objUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', objUrl);
        link.setAttribute('download', 'File.csv');
        link.textContent = 'Click to Download';
        link.id="downloadCSV";
        document.querySelector('body').append(link);

    if(flag==false)
    {
        window.alert("Please select sticky to export it.");
    }
}

const redirectButton=document.getElementById('redirect');
if(redirectButton){
    addEventListener('click',async(event) => {

    try{

        const response =  await fetch('http://localhost:8000/login',{
            method: 'POST',
            headers:{'Content-Type':'application/json','Authorization': 'Bearer ' + localStorage.getItem('auth_token')},
            body: JSON.stringify({
                email: 'n.petrova@abv.bg',
                password: 'secret',
                //email: 'p.petrova@abv.bg',
                //password: 'Petya',
                 //email: 'n.unknown@abv.bg',
                //password: 'aaaabbbb',
            }),
        })
    
    
            if(!response.ok){
                window.location.href="unidentified";
                return;
            }
    
            const data= await response.json();
            const token=data.token;

            localStorage.setItem('auth_token',token);
            window.location.href="boardPage";
        } 
        catch{
            console.log('Error:');
        }
    })
};


function viewBoards(){

    const mainBox=document.getElementById('stickyPlace');
    mainBox.innerHTML="";
    document.getElementById('titleDiv').style.visibility="hidden";
    document.getElementById('descriptDiv').style.visibility="hidden";
    document.getElementById('buttonEdit').style.visibility="hidden";
    document.getElementById('buttonDelete').style.visibility="hidden";
    document.getElementById('buttonSave').style.visibility="hidden";
    document.getElementById('menuTasks').style.visibility="hidden";
    document.getElementById('paragraph').style.visibility="visible";

    document.getElementById('createButton').style.display= "inline";
    document.getElementById('finalDeleteBoard').style.display="inline";

    document.getElementById('paragraph').style.display="inline";
    document.getElementById('paragraph').innerHTML="Delete a board by clicking on some of the existing boards to slect it and use button Delete Selected Boards";

   allBoards.forEach(element => {
           titleOfBoards.push(element.title);
           descriptionOfBoard.push(element.description);
   });

  let lengthArr=allBoards.length;

        for(let i=0; i<lengthArr; i++)
        {
            const newBoard = document.createElement("div");
            newBoard.textContent="Title: " + titleOfBoards[i] + "\n" + "Description: " + descriptionOfBoard[i];
            newBoard.id=i;
    
            newBoard.classList.add('smallBoards');
    
            newBoard.addEventListener('click',() => changeColor(i));
    
            mainBox.appendChild(newBoard);
        };
    
}
function removeElementByArrayOfObjects(array,attribute,value){
    var i= array.length;
    while(i--){
        if(array[i] && array[i].hasOwnProperty(attribute) && (array[i][attribute]===value)) {
            array.splice(i,1);
        }
    }
}

function deleteElementFromDatabase(id){

    const deleteRequest={
        method:"DELETE",
        headers: {"Content-Type":"application/json",'Authorization': 'Bearer ' + localStorage.getItem('auth_token')},
    };

    fetch(` http://localhost:8000/api/boards/${id}`,deleteRequest)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

}
function removeBoard(){
   

    let lengthArr=allBoards.length;

        for(let j=0;j<lengthArr; j++){

             if(colorOfBoards[j] == '#cce6ff')
            {


                let selectedId=allBoards[j].id;
                console.log(selectedId);
                deleteElementFromDatabase(selectedId);

                let titleOfRemoveBoard=titleOfBoards[j];
                removeElementByArrayOfObjects(allBoards,'title',titleOfRemoveBoard);
                
                titleOfBoards.splice(j,1);
                colorOfBoards.splice(j,1);

                descriptionOfBoard.splice(j,1);

            }

            viewBoards();
    }
};


function changeColor(id){
    document.getElementById(id).style.backgroundColor="#cce6ff";
    colorOfBoards[id]="#cce6ff";
    
}

function CreateBoardInPage(){
    document.getElementById('titleDiv').style.visibility="visible";
    document.getElementById('descriptDiv').style.visibility="visible";
    document.getElementById('buttonEdit').style.visibility="visible";
    document.getElementById('buttonDelete').style.visibility="visible";
    document.getElementById('buttonSave').style.visibility="visible";
    document.getElementById('menuTasks').style.visibility="visible";
    document.getElementById('finalDeleteBoard').style.display="none";

    document.getElementById('paragraph').style.display="none";
    document.getElementById('stickyPlace').innerHTML="";

}

