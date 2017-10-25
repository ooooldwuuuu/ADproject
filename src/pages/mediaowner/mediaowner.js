// Validating Empty Field
let mediaSeq = 0;
let dragSrcEl = null;
function checkFieldEmpty() {
	let userName = document.getElementById('name').value;
	let location = document.getElementById('location').value;
	if (userName == '' || location == '') {
		alert('Please Fill All Fields !');
	} else {
		hideForm();
	}
}
function showForm() {
	document.getElementById('name').value = '';
	document.getElementById('location').value = '';
	document.getElementById('popupContainer').style.display = 'flex';
}
function hideForm() {
	document.getElementById('popupContainer').style.display = 'none';
}
function addMedia(mediaObj) {
	let table = document.getElementById('mediaTable');
	//console.log(table.firstChild.innerHTML);
	let newTableRow = table.insertRow(-1);
	let cellData = [];
	for (i = 0; i < 8; i++) {
		cellData[i] = newTableRow.insertCell(i);
	}
	cellData[0].innerHTML = mediaObj.seqNo;
	cellData[1].innerHTML = mediaObj.mediaName;
	cellData[1].classList.add('ownerName');
	cellData[2].innerHTML = mediaObj.location;
	cellData[3].innerHTML = mediaObj.time;
	cellData[4].innerHTML = mediaObj.price;
	cellData[5].innerHTML = mediaObj.income;
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

	mediaSeq++;
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
function requestUserMedia() {
	let userName = document.getElementById('userName').value;
	let sendObj = {};
	sendObj.userName = userName;
	let xhr = new XMLHttpRequest();
	xhr.responseType = 'text';
	xhr.open('POST', '/app/data/media');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(sendObj));
	xhr.onload = updateMediaList;
}

function updateMediaList() {
	let resMediaListObj = JSON.parse(this.responseText);
	let resMediaList = resMediaListObj.mediaList;
	console.log(resMediaList);
	for (let i = 0; i < resMediaList.length; i++) {
		addMedia(resMediaList[i]);
	}
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
	xhr.open('POST', '/app/data/video');
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
	for(let i = 0; i < arr.length; i++){
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
	sendObj.seqNo = removedRow.firstChild.innerHTML;
	removedRow.parentNode.removeChild(removedRow);

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			return;
		}
	};
	xhr.open('POST', '/app/data/delete');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(sendObj));
}

function logout() {
	// window.location.href = '../login/login.html';
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.open();
			document.write(xhr.responseText);
			document.close();
		}
	};
	xhr.open('GET', '/app/data/logout');
	xhr.send(null);
}
