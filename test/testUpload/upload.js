document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('ajax-upload').addEventListener('submit', function (e) {
		e.preventDefault();
		let form = e.target;
		let data = new FormData(form);
		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			document.getElementById('result').innerText = request.responseText;
		};

		request.open(form.method, form.action);
		request.send(data);
	});
});
