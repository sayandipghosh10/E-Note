showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let noteTxt=document.getElementById("noteHeading");

    let notes = localStorage.getItem("notes");
    let heading=localStorage.getItem("heading");

    let notesObj;
    let headingObj;
    if (notes == null && heading==null) {
        notesObj = [];
        headingObj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        headingObj=JSON.parse(heading);
    }

    notesObj.push(addTxt.value);
    headingObj.push(noteTxt.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("heading", JSON.stringify(headingObj));

    addTxt.value = "";
    noteTxt.value="";

    showNotes();

});


function showNotes() {
    let notes = localStorage.getItem("notes");
    let heading=localStorage.getItem("heading");

    let notesObj;
    let headingObj;
    if (notes == null && heading==null) {
        notesObj = [];
        headingObj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        headingObj=JSON.parse(heading);
    }

    let html = '';
    notesObj.forEach(function (element, index) {

        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">

        <div class="card-body">         
            <h5 class="card-title">Note ${index + 1}</h5> 
            <h5 class="note-title">${headingObj[index]}</h5> 
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button>
        </div>
    </div>`

    });

    let notesEle = document.getElementById("notes");

    if (notesObj.length == 0 && headingObj.length==0) {
        notesEle.innerHTML = "No notes available";
    }
    else {
        notesEle.innerHTML = html;
    }

}
// Delete notes



function deleteNotes(indx) {
    let delEle = document.getElementById(indx);
    let notes = localStorage.getItem("notes");
    let heading=localStorage.getItem("heading");

    let notesObj;
    let headingObj;
    if (notes == null && heading==null) {
        notesObj = [];
        headingObj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        headingObj=JSON.parse(heading);
    }

    notesObj.splice(indx,1);
    headingObj.splice(indx,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("heading",JSON.stringify(headingObj));
    showNotes();
}

//search notes

let search=document.getElementById("searchTxt");


search.addEventListener("input",function(){

    let inputVal=search.value;
    let notesCards=document.getElementsByClassName("noteCard");

    Array.from(notesCards).forEach(function(element){
        let noteText=element.getElementsByTagName("p")[0].innerText;
        let headingText=element.getElementsByClassName("note-title")[0].innerHTML;

        if(noteText.includes(inputVal) || headingText.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }

    });



});