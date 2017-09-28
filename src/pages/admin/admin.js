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
	for (i = 0; i < 10; i++) {
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

	let verifySpan = document.createElement('span');
	verifySpan.classList.add('amendBtn');
	verifySpan.addEventListener('click', verifyAD);
	verifySpan.innerHTML = '修改';
	cellData[3].appendChild(document.createTextNode('未審核'));
	cellData[3].appendChild(verifySpan);
	let verifyListDiv = document.createElement('div');
	verifyListDiv.classList.add('listBox');
	let verifyBox1 = document.createElement('input');
	verifyBox1.type = 'radio';
	let verifyBox2 = document.createElement('input');
	verifyBox2.type = 'radio';
	verifyBox1.name = 'verify';
	verifyBox2.name = 'verify';
	verifyBox1.value = 'verify';
	verifyBox2.value = 'unverify';
	let verifyBoxBtn = document.createElement('span');
	verifyBoxBtn.classList.add('locateBtn');
	verifyBoxBtn.addEventListener('click', confirmVerify);
	verifyBoxBtn.innerHTML = '確認';
	let labelv1 = document.createElement('label');
	let labelv2 = document.createElement('label');
	labelv1.innerHTML = '通過';
	labelv2.innerHTML = '未通過';
	verifyListDiv.appendChild(verifyBox1);
	verifyListDiv.appendChild(labelv1);
	verifyListDiv.appendChild(verifyBox2);
	verifyListDiv.appendChild(labelv2);
	verifyListDiv.appendChild(verifyBoxBtn);
	cellData[3].appendChild(verifyListDiv);

	let locationListDiv = document.createElement('div');
	locationListDiv.classList.add('listBox');
	// let checkBox = document.createElement('input');
	// checkBox.type = 'checkbox';
	let locationBox1 = document.createElement('input');
	locationBox1.type = 'checkbox';
	let locationBox2 = document.createElement('input');
	locationBox2.type = 'checkbox';
	let locationBox3 = document.createElement('input');
	locationBox3.type = 'checkbox';
	locationBox1.name = 'media1';
	locationBox2.name = 'media2';
	locationBox3.name = 'media3';
	locationBox1.value = 'Jacky';
	locationBox2.value = 'Zenic';
	locationBox3.value = 'Jimmy';
	let locateBoxBtn = document.createElement('span');
	locateBoxBtn.classList.add('locateBtn');
	locateBoxBtn.addEventListener('click', confirmLocate);
	locateBoxBtn.innerHTML = '確認';
	let label1 = document.createElement('label');
	let label2 = document.createElement('label');
	let label3 = document.createElement('label');
	label1.setAttribute('for', 'media1');
	label2.setAttribute('for', 'media2');
	label3.setAttribute('for', 'media3');
	label1.innerHTML = 'Jacky';
	label2.innerHTML = 'Zenic';
	label3.innerHTML = 'Jimmy';

	
	locationListDiv.appendChild(locationBox1);
	locationListDiv.appendChild(label1);
	locationListDiv.appendChild(locationBox2);
	locationListDiv.appendChild(label2);
	locationListDiv.appendChild(locationBox3);
	locationListDiv.appendChild(label3);
	locationListDiv.appendChild(locateBoxBtn);
	cellData[5].appendChild(locationListDiv);

	let locate = document.createElement('span');
	locate.classList.add('locateBtn');
	locate.addEventListener('click', chooseLocate);
	locate.innerHTML = '選擇看板';
	cellData[5].appendChild(locate);

	let videoIcon = document.createElement('i');
	videoIcon.classList.add('fa', 'fa-film');
	videoIcon.setAttribute('videoSrc', adPath);
	videoIcon.addEventListener('click', showVideoFrame);
	cellData[8].appendChild(videoIcon);

	let removeIcon = document.createElement('i');
	removeIcon.classList.add('fa', 'fa-trash');
	removeIcon.addEventListener('click', removeAD);
	cellData[9].appendChild(removeIcon);

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
	//console.log(this.parentElement.firstChild);
	this.parentElement.firstChild.style.display = 'block';
	this.style.display = 'none';
}
function confirmLocate() {
	this.parentElement.style.display = 'none';
	this.parentElement.parentElement.lastChild.style.display = 'block';
}
function verifyAD() {
	// console.log(this.parentElement.firstChild);
	this.parentElement.firstChild.textContent = '';
	this.parentElement.firstChild.nextSibling.style.display = 'none';
	this.parentElement.lastChild.style.display = 'block';
}
function confirmVerify(){
	this.parentElement.style.display = 'none';
	this.parentElement.parentElement.firstChild.textContent = '已審核';
	this.parentElement.parentElement.firstChild.nextSibling.style.display = 'block';
}
