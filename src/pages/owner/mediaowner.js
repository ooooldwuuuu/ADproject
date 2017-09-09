// Validating Empty Field
let mediaSeq = 0;
function checkFieldEmpty() {
    let userName = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    if (userName == "" || address == "") {
        alert("Fill All Fields !");
    } 
    else {
        // document.getElementById('form').submit();
        addMedia(userName, address);
        // alert("Form Submitted Successfully...");
        hideForm();
    }

}
//Function To Display Popup
function showForm() {
    document.getElementById('popupContainer').style.display = "flex";
    clearFormContent();
}
//Function to Hide Popup
function hideForm(){
    document.getElementById('popupContainer').style.display = "none";
}

function addMedia(name, address){
    let table = document.getElementById("mediaTable");
    console.log(table.firstChild.innerHTML);
    let newTableRow = table.insertRow(-1);
    newTableRow.addEventListener("click", showVideoFrame);
    let cellData = [];
    for(i = 0; i < 6; i++){
        cellData[i] = newTableRow.insertCell(i);
    }
    // let seqElement = document.createElement('button');
    // seqElement.classList.add('seqButton');
    // seqElement.innerHTML = mediaSeq.toString();
    // seqElement.addEventListener("click", function (){
    //                                                   showVideoFrame();});
    
    // cellData[0].appendChild(seqElement);
    cellData[0].innerHTML = mediaSeq.toString();
    cellData[1].innerHTML = name;
    cellData[2].innerHTML = address;
    console.log(name + address);
    mediaSeq++;
}

function clearFormContent(){
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
}

function showVideoFrame(){
    alert('Hi');
}