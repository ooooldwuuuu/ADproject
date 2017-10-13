// Validating Empty Field
let mediaSeq = 0;
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
	let videoContainer = document.getElementById('popVideoContainer');
	videoContainer.style.display = 'flex';
	requestVideoList(videoIcon);
}

function closeVideoFrame() {
	document.getElementById('videoarea').pause();
	document.getElementById('videoarea').src = '';
	document.getElementById('popVideoContainer').style.display = 'none';
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
	console.log(resVideoList);
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
	sortIcon.classList.add('fa', 'fa-sort');
	cellData[0].appendChild(sortIcon);
	cellData[1].appendChild(document.createTextNode(videoName));
	let playIcon = document.createElement('i');
	playIcon.classList.add('fa', 'fa-play');
	playIcon.setAttribute('movieurl', '/videos/' + videoName + '.mp4');
	playIcon.addEventListener('click', playVideo);
	cellData[2].appendChild(playIcon);
}
function playVideo() {
	let videoArea = document.getElementById('videoarea');
	let videoUrl = this.getAttribute('movieurl');
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
