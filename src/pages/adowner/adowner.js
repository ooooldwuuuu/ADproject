// Validating Empty Field
let mediaSeq = 0;
let screenMap = new Map();
window.onload = () =>{
	requestADList();
};
function requestADList() {
	let sendObj = {
		userName: document.getElementById('userName').value,
	};
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/medias/');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(sendObj));
	xhr.onload = () => {
		mediaObjArr = xhr.responseText.split('\n');
		mediaObjArr.pop();
		mediaObjArr.forEach((e) => {
			let mediaObj = JSON.parse(e);
			addMedia(mediaObj);
		});
	};
}
function addMedia(mediaObj) {
	let url = mediaObj.url;
	let media_name = mediaObj.media_name;
	let table = document.getElementById('mediaTable');
	let newTableRow = table.insertRow(-1);
	let cellData = [];
	for (let i = 0; i < 6; i++) {
		cellData[i] = newTableRow.insertCell(i);
	}
	cellData[0].innerText = media_name;
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
function chooseLocate() {

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
	xhr.open('POST', '/api/media/new');
	// xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onloadend = () => {
		requestADList();
	};
	let sendObj = {
		no: screenNo,
		media_name: filename,
	};
	fd.append('field', JSON.stringify(sendObj));
	fd.append('file', file);
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
	xhr.open('POST', '/api/screens');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.responseType = 'text';
	xhr.onloadend = () => {
		let screenObjArr = xhr.responseText.split('\n');
		screenObjArr.pop();
		let screenList = document.getElementById('screenList');
		screenList.innerHTML = '';
		screenObjArr.forEach((e) => {
			let screenObj = JSON.parse(e);
			let option = document.createElement('option');
			option.setAttribute('value', screenObj.no + ' ' + screenObj.screen_name + ' ' + screenObj.location);
			option.innerText = screenObj.no + '\t' + screenObj.screen_name + '\t' + screenObj.location;
			screenList.appendChild(option);
			screenMap.set(screenObj.no, screenObj);
		});
	};
	console.log(screenMap);
	xhr.send();
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
