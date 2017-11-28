// Validating Empty Field
let dragSrcEl = null;
window.onload = () => {
	requestUserScreen();
};
function checkFieldEmpty() {
	let no = document.getElementById('no').value;
	let name = document.getElementById('name').value;
	let location = document.getElementById('location').value;
	let sendObj = {
		no: no,
		name: name,
		location: location,
	};
	if (no == '' || name == '' || location == '') {
		alert('Please Fill All Fields !');
		return;
	} else if (no != '') {
		console.log(no);
		if (!checkNo(no)) {
			alert('Number already be used !');
			return;
		}
	}
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/screen/new');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.responseType = 'text';
	xhr.onloadend = () => {
		addMedia(sendObj);
		hideForm();
	};
	xhr.send(JSON.stringify(sendObj));
}
function checkNo(no) {
	let table = document.getElementById('mediaTable');
	let screenRows = table.getElementsByClassName('screenRow');
	for (let i = 0; i < screenRows.length; i++) {
		if (no === screenRows[i].cells[0].innerHTML)
			return false;
	}
	return true;
}
function showForm() {
	document.getElementById('name').value = '';
	document.getElementById('no').value = '';
	document.getElementById('location').value = '';
	document.getElementById('popupContainer').style.display = 'flex';
}
function hideForm() {
	document.getElementById('popupContainer').style.display = 'none';
}
function addMedia(screenObj) {
	let table = document.getElementById('mediaTable');
	//console.log(table.firstChild.innerHTML);
	let newTableRow = table.insertRow(-1);
	newTableRow.classList.add('screenRow');
	let cellData = [];
	for (let i = 0; i < 8; i++) {
		cellData[i] = newTableRow.insertCell(i);
	}
	cellData[0].innerHTML = screenObj.no;
	cellData[1].innerHTML = screenObj.screen_name;
	cellData[2].innerHTML = screenObj.location;
	// cellData[3].innerHTML = screenObj.time;
	// cellData[4].innerHTML = screenObj.price;
	// cellData[5].innerHTML = screenObj.income;
	let videoIcon = document.createElement('i');
	videoIcon.classList.add('fa', 'fa-film');
	videoIcon.addEventListener('click', (e) => {
		//console.log(this);
		showVideoFrame(videoIcon);
	});
	cellData[6].appendChild(videoIcon);

	let removeIcon = document.createElement('i');
	removeIcon.classList.add('fa', 'fa-trash');
	removeIcon.addEventListener('click', removeMedia);
	cellData[7].appendChild(removeIcon);
}

function showVideoFrame(videoIcon) {
	document.getElementById('popVideoContainer').style.display = 'flex';
	document.getElementById('table_container').style.display = 'none';
	requestVideoList(videoIcon);
}

function closeVideoFrame() {
	document.getElementById('videoarea').pause();
	document.getElementById('videoarea').src = '';
	document.getElementById('popVideoContainer').style.display = 'none';
	document.getElementById('table_container').style.display = 'flex';
}
function requestUserScreen() {
	let userName = document.getElementById('userName').value;
	let sendObj = {};
	sendObj.userName = userName;
	let xhr = new XMLHttpRequest();
	xhr.responseType = 'text';
	xhr.open('POST', '/api/screens');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(sendObj));
	xhr.onload = () => {
		if (xhr.responseText === '')
			return;
		let screenObjArr = xhr.responseText.split('\n');
		screenObjArr.pop();
		screenObjArr.forEach((e) => {
			let screenObj = JSON.parse(e);
			addMedia(screenObj);
		});
	};
}
function requestVideoList(videoIcon) {
	//console.log(videoIcon);
	let userName = document.getElementById('userName').value;
	let sendObj = {};
	sendObj.userName = userName;
	sendObj.mediaSeqNo = videoIcon.parentNode.parentNode.firstChild.innerHTML;
	//console.log(sendObj);
	let xhr = new XMLHttpRequest();
	xhr.responseType = 'text';
	xhr.open('POST', '/api/screen/videos');
	xhr.setRequestHeader('Content-Type', 'application/json');
	//console.log(JSON.stringify(userObj));
	xhr.send(JSON.stringify(sendObj));
	xhr.onload = updateVideoList;
}
function updateVideoList() {
	let resVideoListObj = JSON.parse(this.responseText);
	let resVideoList = resVideoListObj.videoList;
	//console.log(resVideoList);
	let playList = document.getElementById('playlist');
	playList.innerHTML = '';
	for (let i = 0; i < resVideoList.length; i++) {
		addVideo(resVideoList[i], playList);
	}
}
function addVideo(videoName, playList) {
	let row = playList.insertRow(-1);
	let cellData = [];
	for (i = 0; i < 3; i++) {
		cellData[i] = row.insertCell(i);
	}
	let sortIcon = document.createElement('i');
	sortIcon.classList.add('fa', 'fa-bars');
	cellData[0].appendChild(sortIcon);
	cellData[1].appendChild(document.createTextNode(videoName));
	let playIcon = document.createElement('i');
	playIcon.classList.add('fa', 'fa-play');
	playIcon.setAttribute('movieurl', '/videos/' + videoName + '.mp4');
	playIcon.addEventListener('click', playVideo);
	cellData[2].appendChild(playIcon);
	row.setAttribute('draggable', 'true');
	row.addEventListener('dragstart', handleDragStart, false);
	row.addEventListener('dragenter', handleDragEnter, false);
	row.addEventListener('dragover', handleDragOver, false);
	row.addEventListener('dragleave', handleDragLeave, false);
	row.addEventListener('drop', handleDrop, false);
	row.addEventListener('dragend', handleDragEnd, false);
}
function handleDragStart(e) {
	// console.log(e.target);
	// e.target.style.opacity = '0.4'; // this / e.target is the source node.

	dragSrcEl = e.target;
	// console.log(dragSrcEl);
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text', e.target.innerHTML);
}
function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}
	e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
	return false;
}
function handleDragEnter(e) {
	// this / e.target is the current hover target.
	e.target.parentElement.classList.add('over');
}
function handleDragLeave(e) {
	e.target.parentElement.classList.remove('over'); // this / e.target is previous target element.
}
function handleDrop(e) {
	// this / e.target is current target element.
	if (e.stopPropagation) {
		e.stopPropagation(); // stops the browser from redirecting.
	}
	// console.log(e.target);
	let targetRow = e.target.parentElement;
	if (dragSrcEl != targetRow) {
		dragSrcEl.innerHTML = targetRow.innerHTML;
		// console.log(targetRow);
		targetRow.innerHTML = e.dataTransfer.getData('text');
		// console.log(targetRow);
		dragSrcEl.getElementsByClassName('fa-play')[0].addEventListener('click', playVideo);
		targetRow.getElementsByClassName('fa-play')[0].addEventListener('click', playVideo);
	}
	// See the section on the DataTransfer object.
	return false;
}
function handleDragEnd(e) {
	// this/e.target is the source node.
	let arr = document.getElementsByClassName('over');
	for (let i = 0; i < arr.length; i++) {
		arr[i].classList.remove('over');
	}
}
function playVideo(e) {
	let videoArea = document.getElementById('videoarea');
	let videoUrl = e.target.getAttribute('movieurl');
	videoArea.src = videoUrl;
	videoArea.autoplay = 'autoplay';
	console.log(videoUrl);
}
function removeMedia() {
	let cell = this.parentElement;
	let removedRow = cell.parentNode;
	let sendObj = {};
	sendObj.userName = document.getElementById('userName').value;
	sendObj.no = removedRow.firstChild.innerHTML;
	// console.log(removedRow.firstChild);
	sendObj.screen_name = removedRow.firstChild.nextSibling.innerHTML;
	sendObj.location = removedRow.firstChild.nextSibling.nextSibling.innerHTML;
	removedRow.parentNode.removeChild(removedRow);

	let xhr = new XMLHttpRequest();
	xhr.onloadend = () => {
	};
	xhr.open('POST', '/api/screen/delete');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(sendObj));
}

function logout() {
	let form = document.getElementById('logoutForm');
	document.getElementById('logoutUser').value = document.getElementById('userName').value;
	form.submit();
}
