// Validating Empty Field
let mediaSeq = 0;
function checkFieldEmpty() {
	let pic = document.getElementById('uploadPic').value;
	let video = document.getElementById('uploadVideo').value;
	if (pic == '' && video == '') {
		alert('Fill at least one fields !');
	} else {
		// document.getElementById('form').submit();
		// addMedia(userName, address);
		//alert('Form Submitted Successfully...');
		hideForm();
	}
}
//Function To Display Popup
function showForm() {
	document.getElementById('popupContainer').style.display = 'flex';
	clearFormContent();
}
//Function to Hide Popup
function hideForm() {
	document.getElementById('popupContainer').style.display = 'none';
}

function addMedia(name, address) {
	let table = document.getElementById('mediaTable');
	console.log(table.firstChild.innerHTML);
	let newTableRow = table.insertRow(-1);
	let cellData = [];
	for (i = 0; i < 8; i++) {
		cellData[i] = newTableRow.insertCell(i);
	}
	// let seqElement = document.createElement('button');
	// seqElement.classList.add('seqButton');
	// seqElement.innerHTML = mediaSeq.toString();
	// seqElement.addEventListener('click', function (){
	//                                                   showVideoFrame();});
	// cellData[0].appendChild(seqElement);
	cellData[0].innerHTML = mediaSeq.toString();
	cellData[1].innerHTML = name;
	cellData[2].innerHTML = address;

	let videoIcon = document.createElement('i');
	videoIcon.classList.add('fa', 'fa-film');
	videoIcon.addEventListener('click', showVideoFrame);
	cellData[6].appendChild(videoIcon);

	let removeIcon = document.createElement('i');
	removeIcon.classList.add('fa', 'fa-trash');
	removeIcon.addEventListener('click', removeAD);
	cellData[7].appendChild(removeIcon);

	mediaSeq++;
}

function clearFormContent() {
	document.getElementById('uploadPic').value = '';
	document.getElementById('uploadVideo').value = '';
}

function showVideoFrame() {
	let videoContainer = document.getElementById('popVideoContainer');
	videoContainer.style.display = 'flex';
	let videoList = document.getElementsByClassName('movieID');
	console.log(videoList);
	for (let i = 0; i < videoList.length; i++) {
		videoList[i].addEventListener('click', playVideo);
	}
}

function closeVideoFrame() {
	document.getElementById('videoarea').pause();
	document.getElementById('popVideoContainer').style.display = 'none';
}

function removeAD() {
	let cell = this.parentElement;
	console.log(cell);
	let removedRow = cell.parentNode;
	console.log(removedRow);
	removedRow.parentNode.removeChild(removedRow);
}

function logout() {
	window.location.href = '../login/login.html';
}
