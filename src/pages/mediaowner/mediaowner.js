// Validating Empty Field
let mediaSeq = 0;
function checkFieldEmpty() {
	let userName = document.getElementById('name').value;
	let location = document.getElementById('location').value;
	if (userName == '' || location == '') {
		alert('Fill All Fields !');
	} else {
		//uploadMediaInfo(userName, location);
		//addMedia(userName, location);
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
function uploadMediaInfo(userName, location) {
	// let formBody = document.getElementById('formBody');
	// console.log(formBody);
	// let fd = new FormData(formBody);
	let xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.onreadystatechange = () => {
		if (this.readyState == 4 && this.status == 200) {
			console.log('新增成功');
		}
	};
	xhr.open('POST', '/app/data/add');
	xhr.onload = function() {
		console.log(this.response);
	};
	let sendStr = 'name=' + userName + '&' + 'location=' + location;
	console.log(sendStr);
	xhr.send(sendStr);
}
function addMedia(mediaObj) {
	let table = document.getElementById('mediaTable');
	//console.log(table.firstChild.innerHTML);
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
	//cellData[0].innerHTML = mediaSeq.toString();
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
		console.log(this);
		showVideoFrame(videoIcon);
	});
	cellData[6].appendChild(videoIcon);

	let removeIcon = document.createElement('i');
	removeIcon.classList.add('fa', 'fa-trash');
	removeIcon.addEventListener('click', removeMedia);
	cellData[7].appendChild(removeIcon);

	// console.log(name + location);
	mediaSeq++;
}

function clearFormContent() {
	document.getElementById('name').value = '';
	document.getElementById('location').value = '';
}

function showVideoFrame(videoIcon) {
	let videoContainer = document.getElementById('popVideoContainer');
	videoContainer.style.display = 'flex';
	console.log(videoIcon);
	requestVideoList(this);

	let ownerList = document.getElementsByClassName('ownerName');
	let playIcon = document.createElement('i');
	playIcon.classList.add('fa', 'fa-play');
	let video1 = document.createElement('li');
	let video2 = document.createElement('li');
	let video3 = document.createElement('li');
	video1.classList.add('movieID');
	video2.classList.add('movieID');
	video3.classList.add('movieID');
	// video1.setAttribute('movieurl', 'http://html5videoformatconverter.com/data/images/happyfit2.mp4');
	// video2.setAttribute('movieurl', 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4');
	// video3.setAttribute('movieurl', 'http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm');
	video1.setAttribute('movieurl', '../../videos/feet.mp4');
	video2.setAttribute('movieurl', '../../videos/chanel.mp4');
	video3.setAttribute('movieurl', '../../videos/dior.mp4');
	video1.appendChild(document.createElement('i'));
	video2.appendChild(document.createElement('i'));
	video3.appendChild(document.createElement('i'));
	video1.getElementsByTagName('i')[0].classList.add('fa', 'fa-play');
	video2.getElementsByTagName('i')[0].classList.add('fa', 'fa-play');
	video3.getElementsByTagName('i')[0].classList.add('fa', 'fa-play');
	video1.appendChild(document.createTextNode(' Happy Fit'));
	video2.appendChild(document.createTextNode(' Chanel'));
	video3.appendChild(document.createTextNode(' Dior'));
	let playList = document.getElementById('playlist');
	playList.innerHTML = '';
	let seqNum = this.parentNode.parentNode.firstChild.innerHTML;
	// console.log(this.parentNode);
	console.log(seqNum);
	if (seqNum === '0') {
		playList.appendChild(video1);
		playList.appendChild(video2);
		playList.appendChild(video3);
	} else if (seqNum === '1') {
		playList.appendChild(video2);
		playList.appendChild(video3);
	} else if (seqNum === '2') {
		playList.appendChild(video3);
	} else {
		playList.appendChild(video1);
		playList.appendChild(video2);
		playList.appendChild(video3);
	}

	// for (let i = 0; i < ownerList.length; i++){
	// 	if(ownerList[i].innerHTML == "")
	// }
	let videoList = document.getElementsByClassName('movieID');
	console.log(videoList);
	for (let i = 0; i < videoList.length; i++) {
		videoList[i].addEventListener('click', playVideo);
	}
}

function closeVideoFrame() {
	document.getElementById('videoarea').pause();
	document.getElementById('videoarea').src = '';
	document.getElementById('popVideoContainer').style.display = 'none';
}

function playVideo() {
	console.log('hi');
	let videoArea = document.getElementById('videoarea');
	let videoUrl = this.getAttribute('movieurl');
	//let videoPic = this.getAttribute('moviesposter');
	//videoArea.poster = videoPic;
	videoArea.src = videoUrl;
	videoArea.autoplay = 'autoplay';
	console.log(videoUrl);
}

function removeMedia() {
	let cell = this.parentElement;
	let removedRow = cell.parentNode;
	console.log(removedRow);
	removedRow.parentNode.removeChild(removedRow);
}

function logout() {
	window.location.href = '../login/login.html';
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

function requestVideoList(icon) {
	console.log(icon);
	let userName = document.getElementById('userName').value;
	let sendObj = {};
	sendObj.userName = userName;
	// sendObj.mediaSeqNo
	// let xhr = new XMLHttpRequest();
	// xhr.responseType = 'text';
	// xhr.open('POST', '/app/data/media');
	// xhr.setRequestHeader('Content-Type', 'application/json');
	// //console.log(JSON.stringify(userObj));
	// xhr.send(JSON.stringify(sendObj));
	// xhr.onload = updateMediaList;
}
