addNotes();
let submit = document.getElementById("submit");
// Storing text to local storage and clear text area
submit.addEventListener('click', function (e) {
    let textarea = document.getElementById('textarea');
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(textarea.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    textarea.value = "";
    addNotes();
})
// Add note function
function addNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = ``;
    notesObj.forEach(function (element, index) {
        html = `
            <div class="notes">
            <h3 class="heading">Note ${index + 1}</h3>
            <p>${element}</p>
            <button class="important" onclick="impMessage(this.parentElement)">*Important</button>
            <button id="${index}" onclick="deleteNote(this.id)" class="delete">Delete note</button>
            </div>  
            `
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML += html;
    }
    else {
        notesElm.innerHTML = `Add notes to see here`;
    }
}
// Delete note function
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    let note=JSON.stringify(notesObj);
    console.log(note);
    createNotes(index);
}
function createNotes(indx){
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let notesElm = document.getElementById("notes").childNodes;
    let html = ``;
    let j=0;
    // for(j=0;j<notesElm.length;j++){
    //     let cls=notesElm[j].className;
    //     console.log(cls);
    // }
    notesObj.forEach(function (element, index) {
        let cls=notesElm[2*j+1].className;
        console.log(index);
        console.log(index<indx);
        console.log(cls=='notes');
        if(index<indx){
            if(cls=='notes'){
                html += `
                    <div class="notes">
                    <h3 class="heading">Note ${index + 1}</h3>
                    <p>${element}</p>
                    <button class="important" onclick="impMessage(this.parentElement)">*Important</button>
                    <button id="${index}" onclick="deleteNote(this.id)" class="delete">Delete note</button>
                    </div>
                `
            }else{
                html += `
                    <div class="notes impNotes">
                    <h3 class="heading">Note ${index + 1}</h3>
                    <p>${element}</p>
                    <button class="important" onclick="impMessage(this.parentElement)">*Important</button>
                    <button id="${index}" onclick="deleteNote(this.id)" class="delete">Delete note</button>
                    </div>
               `
            }
                
        }else if(index>=indx){
            let cls=notesElm[2*j+3].className;
            if(cls=='notes'){
                html += `
                    <div class="notes">
                    <h3 class="heading">Note ${index + 1}</h3>
                    <p>${element}</p>
                    <button class="important" onclick="impMessage(this.parentElement)">*Important</button>
                    <button id="${index}" onclick="deleteNote(this.id)" class="delete">Delete note</button>
                    </div>
                `
            }else{
                html += `
                    <div class="notes impNotes">
                    <h3 class="heading">Note ${index + 1}</h3>
                    <p>${element}</p>
                    <button class="important" onclick="impMessage(this.parentElement)">*Important</button>
                    <button id="${index}" onclick="deleteNote(this.id)" class="delete">Delete note</button>
                    </div>
               `
            }
        }
        j++
    });
    let notesElms = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElms.innerHTML = html;
    }
    else {
        notesElms.innerHTML = `Add notes to see here`;
    }
}
// Search function
let text = document.getElementById('text');
text.addEventListener('input', function () {
    let inputVal = text.value;
    notes = document.getElementsByClassName("notes");
    Array.from(notes).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        console.log(cardTxt, inputVal);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    })
})
// Making note import
function impMessage(element) {
    // element.classList.remove('class');
    element.classList.add("impNotes");
    // console.log(element.parentElement.innerHTML);
}