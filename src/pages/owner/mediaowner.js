// Validating Empty Field
function checkFieldEmpty() {
    let userName = document.getElementById('name').value;
    let address = document.getElementById('address').value
    if (userName == "" || address == "") {
        alert("Fill All Fields !");
    } 
    else {
        // document.getElementById('form').submit();
        addMedia(userName, address);
        alert("Form Submitted Successfully...");
    }

}
//Function To Display Popup
function showForm() {
    document.getElementById('popupContainer').style.display = "flex";
}
//Function to Hide Popup
function hideForm(){
    document.getElementById('popupContainer').style.display = "none";
}

function addMedia(name, address){
    let table = document.getElementById("mediaTable");
    console.log(table.firstChild.innerHTML);
    let newTableRow = table.insertRow(-1);
    let cellData = [];
    for(i = 0; i < 5; i++){
        cellData[i] = newTableRow.insertCell(i);
    }
    cellData[1].innerHTML = name;
    cellData[2].innerHTML = address;
    console.log(name + address);
}