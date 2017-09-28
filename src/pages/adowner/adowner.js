// Validating Empty Field
let mediaSeq = 0;
function checkFieldEmpty() {
	let pic = document.getElementById('uploadPic').value;
	let video = document.getElementById('uploadVideo').value;
	if (pic == '' && video == '') {
		alert('Fill at least one fields !');
	} else {
		// document.getElementById('form').submit();
		addAD(pic, video);
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

function addAD(pic, video) {
	let table = document.getElementById('mediaTable');
	//console.log(table.firstChild.innerHTML);
	let newTableRow = table.insertRow(-1);
	let cellData = [];
	for (i = 0; i < 8; i++) {
		cellData[i] = newTableRow.insertCell(i);
	}

	cellData[0].innerHTML = mediaSeq.toString();
	let adPath;
	if (pic) {
		let tmpImg = document.createElement('img');
		tmpImg.src = pic;
		cellData[1].appendChild(tmpImg);
	}
	if (video) {
		adPath = video;
	}

	let videoIcon = document.createElement('i');
	videoIcon.classList.add('fa', 'fa-film');
	videoIcon.videoSrc = adPath;
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
	let video = document.getElementsByClassName('videoarea');
	let adPath = this.videoSrc;
	if (adPath)
		video.src = adPath;
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
