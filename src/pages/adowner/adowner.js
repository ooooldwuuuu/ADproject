// Validating Empty Field
let mediaSeq = 0;
window.onload = () =>{
	// requestADList();
};
function requestADList() {
	let sendObj = {};
	sendObj.userName = document.getElementById('userName').value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(sendObj));
	xhr.onload = () => {
		prodADList(JSON.parse(xhr.responseText));
	}
}
function prodADList(adObj) {
	let table = document.getElementById('mediaTable');
	let newTableRow = table.insertRow(-1);
	let cellData = [];
	for (i = 0; i < 8; i++) {
		cellData[i] = newTableRow.insertCell(i);
	}

	cellData[0].innerHTML = adObj.seqNo.toString();

	// let locationListDiv = document.createElement('div');
	// locationListDiv.classList.add('locationListBlock');
	// let locationBox1 = document.createElement('input');
	// locationBox1.type = 'checkbox';
	// let locationBox2 = document.createElement('input');
	// locationBox2.type = 'checkbox';
	// let locationBox3 = document.createElement('input');
	// locationBox3.type = 'checkbox';
	// locationBox1.name = 'media1';
	// locationBox2.name = 'media2';
	// locationBox3.name = 'media3';
	// locationBox1.value = 'Jacky';
	// locationBox2.value = 'Zenic';
	// locationBox3.value = 'Jimmy';
	// let locateBoxBtn = document.createElement('span');
	// locateBoxBtn.classList.add('locateBtn');
	// locateBoxBtn.addEventListener('click', confirmLocate);
	// locateBoxBtn.innerHTML = '確認';
	// let label1 = document.createElement('label');
	// let label2 = document.createElement('label');
	// let label3 = document.createElement('label');
	// label1.setAttribute('for', 'media1');
	// label2.setAttribute('for', 'media2');
	// label3.setAttribute('for', 'media3');
	// label1.innerHTML = 'Jacky';
	// label2.innerHTML = 'Zenic';
	// label3.innerHTML = 'Jimmy';

	
	// locationListDiv.appendChild(locationBox1);
	// locationListDiv.appendChild(label1);
	// locationListDiv.appendChild(locationBox2);
	// locationListDiv.appendChild(label2);
	// locationListDiv.appendChild(locationBox3);
	// locationListDiv.appendChild(label3);
	// locationListDiv.appendChild(locateBoxBtn);
	// cellData[4].appendChild(locationListDiv);

	let locate = document.createElement('span');
	locate.classList.add('locateBtn');
	locate.addEventListener('click', chooseLocate);
	locate.innerHTML = '選擇看板';
	cellData[4].appendChild(locate);

	let videoIcon = document.createElement('i');
	videoIcon.classList.add('fa', 'fa-film');
	videoIcon.setAttribute('videoSrc', adPath);
	videoIcon.addEventListener('click', showVideoFrame);
	cellData[6].appendChild(videoIcon);

	let removeIcon = document.createElement('i');
	removeIcon.classList.add('fa', 'fa-trash');
	removeIcon.addEventListener('click', removeAD);
	cellData[7].appendChild(removeIcon);

	// mediaSeq++;

}
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
	document.getElementById('typeDiv').style.display = 'flex';
	clearFormContent();
}
//Function to Hide Popup
function hideForm() {
	document.getElementById('popupContainer').style.display = 'none';
	document.getElementById('picForm').style.display = 'none';
	document.getElementById('videoForm').style.display = 'none';
}
function showPicForm() {
	document.getElementById('typeDiv').style.display = 'none';
	document.getElementById('picForm').style.display = 'flex';
}
function showVideoForm() {
	document.getElementById('typeDiv').style.display = 'none';
	document.getElementById('videoForm').style.display = 'flex';
}
function showScreenForm() {
	document.getElementById('chooseScreen').style.display = 'flex';
	document.getElementById('screenForm').style.display = 'flex';
}
function hideScreenForm() {
	document.getElementById('chooseScreen').style.display = 'none';
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
		pic = pic.replace('C:\\fakepath\\', '../../images/');
		let tmpImg = document.createElement('img');
		tmpImg.src = pic;
		tmpImg.classList.add('pic');
		cellData[1].appendChild(tmpImg);
	}
	if (video) {
		video = video.replace('C:\\fakepath\\', '../../videos/');
		adPath = video;
	}

	// let locationListDiv = document.createElement('div');
	// locationListDiv.classList.add('locationListBlock');
	// // let checkBox = document.createElement('input');
	// // checkBox.type = 'checkbox';
	// let locationBox1 = document.createElement('input');
	// locationBox1.type = 'checkbox';
	// let locationBox2 = document.createElement('input');
	// locationBox2.type = 'checkbox';
	// let locationBox3 = document.createElement('input');
	// locationBox3.type = 'checkbox';
	// locationBox1.name = 'media1';
	// locationBox2.name = 'media2';
	// locationBox3.name = 'media3';
	// locationBox1.value = 'Jacky';
	// locationBox2.value = 'Zenic';
	// locationBox3.value = 'Jimmy';
	// let locateBoxBtn = document.createElement('span');
	// locateBoxBtn.classList.add('locateBtn');
	// locateBoxBtn.addEventListener('click', confirmLocate);
	// locateBoxBtn.innerHTML = '確認';
	// let label1 = document.createElement('label');
	// let label2 = document.createElement('label');
	// let label3 = document.createElement('label');
	// label1.setAttribute('for', 'media1');
	// label2.setAttribute('for', 'media2');
	// label3.setAttribute('for', 'media3');
	// label1.innerHTML = 'Jacky';
	// label2.innerHTML = 'Zenic';
	// label3.innerHTML = 'Jimmy';

	
	// locationListDiv.appendChild(locationBox1);
	// locationListDiv.appendChild(label1);
	// locationListDiv.appendChild(locationBox2);
	// locationListDiv.appendChild(label2);
	// locationListDiv.appendChild(locationBox3);
	// locationListDiv.appendChild(label3);
	// locationListDiv.appendChild(locateBoxBtn);
	// cellData[4].appendChild(locationListDiv);

	let locate = document.createElement('span');
	locate.classList.add('locateBtn');
	// locate.addEventListener('click', chooseLocate);
	locate.addEventListener('click', showScreenForm)
	locate.innerHTML = '選擇看板';
	cellData[4].appendChild(locate);

	let videoIcon = document.createElement('i');
	videoIcon.classList.add('fa', 'fa-film');
	videoIcon.setAttribute('videoSrc', adPath);
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
	let video = document.getElementById('videoarea');
	let adPath = this.getAttribute('videoSrc');
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
function logout() {
	window.location.href = '../login/login.html';
}
function chooseLocate() {
	console.log(this.parentElement.firstChild);
	this.parentElement.firstChild.style.display = 'block';
	this.style.display = 'none';
}
function confirmLocate() {
	this.parentElement.style.display = 'none';
	this.parentElement.parentElement.lastChild.style.display = 'block';
}