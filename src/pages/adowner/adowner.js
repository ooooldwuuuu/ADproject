// Validating Empty Field
let mediaSeq = 0;
window.onload = () =>{
	// requestADList();
};
function requestADList() {
	let sendObj = {};
	sendObj.userName = document.getElementById('userName').value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/medias/');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(sendObj));
	xhr.onload = () => {
		prodADList(xhr.responseText.split('\n'));
	};
}
function prodADList(mediaObjArr) {
	for (let i = 0; i < mediaObjArr.length - 1; i++) {
		let mediaObj = JSON.parse(mediaObjArr[i]);
		addMedia(mediaObj);
	}
}
function addMedia(mediaObj) {
	let location = mediaObj.location;
	let fileName = mediaObj.media_name;
	let url = mediaObj.url;
	let table = document.getElementById('mediaTable');
	let newTableRow = table.insertRow(-1);
	let cellData = [];
	for (let i = 0; i < 6; i++) {
		cellData[i] = newTableRow.insertCell(i);
	}
	let locate = document.createElement('span');
	locate.classList.add('locateBtn');
	locate.addEventListener('click', chooseLocate);
	locate.innerHTML = '目前看板';
	cellData[2].appendChild(locate);

	let videoIcon = document.createElement('i');
	videoIcon.classList.add('fa', 'fa-film');
	videoIcon.setAttribute('videoSrc', url);
	videoIcon.addEventListener('click', showVideoFrame);
	cellData[4].appendChild(videoIcon);

	let removeIcon = document.createElement('i');
	removeIcon.classList.add('fa', 'fa-trash');
	removeIcon.addEventListener('click', removeAD);
	cellData[5].appendChild(removeIcon);
}
function checkFieldEmpty() {
	// let pic = document.getElementById('uploadPic').value;
	let video = document.getElementById('uploadVideo').value;
	if (video == '') {
		alert('Fill all fields !');
	} else {
		// document.getElementById('form').submit();
		// addAD(pic, video);
		//alert('Form Submitted Successfully...');
		hideForm();
		uploadFile();
	}
}
function uploadFile() {
	let file = document.getElementById('uploadVideo').files[0];
	let screenInfo = document.getElementById('choose').value.split(' ');
	let screenNo = screenInfo[0];
	let filename = file.name.split('.')[0];
	console.log(filename);
	// console.log(file);
	let fd = new FormData();
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/app/data/upload/video');
	xhr.onloadend = () => {
		requestADList();
	};
	fd.append('no', screenNo);
	fd.append('media_name', filename);
	fd.append('media', file);
	xhr.send(fd);
}
//Function To Display Popup
function showForm() {
	document.getElementById('popupContainer').style.display = 'flex';
	document.getElementById('videoForm').style.display = 'flex';
	clearFormContent();
	requestScreenList();
}
function requestScreenList() {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/media/screens/');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.responseType = 'text';
	xhr.onloadend = () => {
		let screenObjArr = xhr.responseText.split('\n');
		updateScreenList(screenObjArr);
	};
	xhr.send();
}
function updateScreenList(screenObjArr) {
	let screenList = document.getElementById('screenList');
	console.log(screenObjArr);
	screenList.innerHTML = '';
	for (let i = 0; i < screenObjArr.length - 1; i++) {
		let option = document.createElement('option');
		let screenObj = JSON.parse(screenObjArr[i]);
		option.setAttribute('value', screenObj.no + ' ' + screenObj.screen_name + ' ' + screenObj.location);
		screenList.appendChild(option);
	}
}
//Function to Hide Popup
function hideForm() {
	document.getElementById('popupContainer').style.display = 'none';
	document.getElementById('videoForm').style.display = 'none';
}

function clearFormContent() {
	document.getElementById('uploadVideo').value = '';
	document.getElementById('choose').value = '';
}

function showVideoFrame() {
	let videoContainer = document.getElementById('popVideoContainer');
	videoContainer.style.display = 'flex';
	let video = document.getElementById('videoarea');
	let url = this.getAttribute('videoSrc');
	if (url)
		video.src = url;
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
	let form = document.getElementById('logoutForm');
	document.getElementById('logoutUser').value = document.getElementById('userName').value;
	form.submit();
}
