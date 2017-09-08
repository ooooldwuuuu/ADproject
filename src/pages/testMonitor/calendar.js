function Calendarize() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	return {

		// Return the days in a month - given a year and the month number
		getDaysInMonth: function(month, year) {
			var date = new Date(year, month, 1);
			var days = [];
			while (date.getMonth() === month) {
				days.push(new Date(date));
				date.setDate(date.getDate() + 1);
			}
			return days;
		},

		// return an array of the first day of each month for a given year
		getMonthsInYear: function(year) {
			var date = new Date(year, 0, 1);
			var months = [];
			var monthCount = 0;
			while (monthCount < 12) {
				months.push(new Date(date));
				date.setMonth(date.getMonth() + 1);
				monthCount++;
			}
			return months;
		},

		getMonthsInRange: function(startDate, endDate) {
			var start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
			var end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
			var months = [];
			var monthCount = 0;
			while (start <= end) {
				months.push( new Date(start) );
				start.setMonth(start.getMonth() + 1);
				monthCount++;
			}
			return months;
		},

		// Create a full 12-month calendar
		buildYearCalendar: function(el, year) {
			var _this = this;
			var months = _this.getMonthsInYear(year);

			var opts = {
				showMonth: true,
				showDaysOfWeek: true,
				showYear: true,
				clickHandler: function(e) {
					var day = e.target.getAttribute("data-date");
					// alert(day);
					if(!e.target.classList.contains("holiday") && !e.target.classList.contains("notrade")){
						e.target.classList.add("holiday");
						e.target.style.backgroundColor = "pink";
					}

					else if(e.target.classList.contains("holiday")){
						e.target.classList.remove("holiday");
						e.target.classList.add("notrade");
						e.target.style.backgroundColor = "#5be5b1";
					}
					else if(e.target.classList.contains("notrade")){
						e.target.classList.remove("notrade");
						e.target.style.backgroundColor = "#a5d2ff";
					}
				}
			};

			months.forEach(function(a, b) {
				var $monthNode = _this.buildMonth(b, year, opts);
				el.appendChild($monthNode);
			});
		},

		buildMonthsInRange: function(el, opts, startDate, limit) {
			var _this = this;
			var endDate = new Date( new Date().setDate(startDate.getDate() + limit) );
			var months = _this.getMonthsInRange(startDate, endDate);
			
			opts = opts  || {};
			opts.limitDate = endDate || false;
			if (opts.reverse) months = months.reverse();

			months.forEach(function(a, b) {
				var month = a.getMonth();
				var year = a.getFullYear();
				var $monthNode = _this.buildMonth(month, year, opts);
				el.appendChild($monthNode);
			});
		},

		// Add days and place fillers for a given month
		// This function and the one above needs consolidated
		buildMonth: function(monthNum, year, opts) {
			//if (monthNum === undefined || year === undefined) return "something is missing";
			var _this = this;
			var dtm = new Date(year, monthNum, 1);
			var dtmMonth = dtm.getMonth();
			var prevM = new Date(dtm.setMonth(dtmMonth - 1));
			var nextM = new Date(dtm.setMonth(dtmMonth + 1));
			var daysInMonth = _this.getDaysInMonth(monthNum, year);
			var daysPrevMonth = _this.getDaysInMonth(prevM.getMonth(), prevM.getFullYear());
			var daysNextMonth = _this.getDaysInMonth(nextM.getMonth(), nextM.getFullYear());
			var $monthNode = document.createElement('div');
			var $titleNode = document.createElement('h4');
			var skipLength = daysInMonth[0].getDay();
			var preLength = daysInMonth.length + skipLength;
			var postLength = function() {
				if (preLength % 7 === 0) {
					return 0;
				} else {
					if (preLength < 35) {
						return 35 - preLength;
					} else {
						return 42 - preLength;
					}
				}
			}

			$monthNode.classList.add('month');

			// Add a Title to the month
			if (opts.showMonth) {
				$titleNode.innerText = monthNames[monthNum] + (opts.showYear ? " " + year : '');
				$monthNode.appendChild($titleNode);
			}


			// Add Days of week to the top row
			if (opts.showDaysOfWeek) {
				dayNames.forEach(function(a, b) {
					var $dayNode = document.createElement('div');
					$dayNode.classList.add('dow');
					$dayNode.innerText = dayNames[b];
					$monthNode.appendChild($dayNode);
				});
			}


			// Add blank days to fill in before first day
			for (var i = 0; i < skipLength; i++) {
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('dummy-day');
				$dayNode.innerText = daysPrevMonth.length - (skipLength - (i + 1));
				$monthNode.appendChild($dayNode);
			}


			// Place a day for each day of the month
			daysInMonth.forEach(function(c, d) {
				var today = new Date(new Date().setHours(0, 0, 0, 0));
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('day');
				$dayNode.setAttribute("data-date", c);
				$dayNode.innerText = (d + 1);
				var dow = new Date(c).getDay();
				var dateParsed = Date.parse(c);
				var todayParsed = Date.parse(today);

				if (dateParsed === todayParsed) $dayNode.classList.add('today');
				if (dateParsed > todayParsed) $dayNode.classList.add('future');
				if (dateParsed <todayParsed) $dayNode.classList.add('past');

				if (dow === 0 || dow === 6) {
					//$dayNode.classList.add("holiday");
					//$dayNode.classList.add('weekend');
				}
				if (opts.onlyCurrent && c < today) $dayNode.classList.add('dummy-day');
				if (opts.limitDate) {
					if (c > opts.limitDate) {
						$dayNode.classList.add('dummy-day');
					}
				}

				if (opts.filterDayOfWeek) {
					var valid = false;
					for (var i = 0; i < opts.filterDayOfWeek.length; i++) {
						if (c.getDay() == opts.filterDayOfWeek[i]) {
							valid = true;
						}
					}
					if (!valid) {
						$dayNode.classList.add('dummy-day');
					}
				}
				if (opts.clickHandler && !$dayNode.classList.contains('dummy-day')) {
					function handleEvent(e) {
						e = e || window.event;
						e.preventDefault();
						e.stopPropagation();
						var touches = false;
						if (!touches) {
							touches = true;
							setTimeout(function() {
								touches = false;
							}, 300);
							opts.clickHandler(e);
						}
					}
					$dayNode.addEventListener("touchstart", handleEvent);
					$dayNode.addEventListener("mousedown", handleEvent);
				}
				$monthNode.appendChild($dayNode);
			});

			// Add in the dummy filler days to make an even block
			for (var j = 0; j < postLength(); j++) {
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('dummy-day');
				$dayNode.innerText = j + 1;
				$monthNode.appendChild($dayNode);
			}

			return $monthNode;

		}
	}
}

function produceCalendar(){
	let inputYear = document.getElementById("inputYear").value;
	if(inputYear == ""){
		alert("請輸入年份");
		return;
	}
	let $calendar = document.getElementById("calendar");
	$calendar.innerHTML = "";
	let currentYear = new Date().getFullYear();
	let calendarize = new Calendarize();
	// alert(inputYear);
	calendarize.buildYearCalendar($calendar, inputYear);
	var oReq = new XMLHttpRequest();
	//oReq.onload = reqListener;
	let tmpUrl = "/api/data/" + inputYear;
	oReq.open("get", tmpUrl, true);
	// oReq.setRequestHeader('Content-Type', 'text/text');
	oReq.send();

	oReq.onloadend = onResponse;

	function onResponse(xhr) {
		let resJson = xhr.target.responseText;
		console.log(resJson);
		let resJsonObj = JSON.parse(resJson);
		let resHDobj = resJsonObj["holiday"];
		let resNTobj = resJsonObj["notrade"];
		//let resHDobjKeysArr = Object.keys(resHDobj);
		let monthList = document.getElementsByClassName("month");
		for(i = 0; i < 12; i++){
			let monthDayList = monthList[i].getElementsByClassName("day");
			let tmpKey = (i+1).toString().padStart(2, '0');
			let hdObjKeyValArr = resHDobj[tmpKey];
			if(hdObjKeyValArr == undefined)
				continue;
			for(j = 0; j < hdObjKeyValArr.length; j++){
				let dayNum = parseInt(hdObjKeyValArr[j])-1;
				monthDayList[dayNum].classList.add("holiday");
				monthDayList[dayNum].style.backgroundColor = "pink";
			}
		}
		for(i = 0; i < 12; i++){
			let monthDayList = monthList[i].getElementsByClassName("day");
			let tmpKey = (i+1).toString().padStart(2, '0');
			let hdObjKeyValArr = resNTobj[tmpKey];
			if(hdObjKeyValArr == undefined)
				continue;
			for(j = 0; j < hdObjKeyValArr.length; j++){
				let dayNum = parseInt(hdObjKeyValArr[j])-1;
				monthDayList[dayNum].classList.add("notrade");
				monthDayList[dayNum].style.backgroundColor = "#5be5b1";
			}
		}
	}
}

function clearCalendar(){
	document.getElementById("calendar").innerHTML = "";
	document.getElementById("inputYear").value = "";
}

function submitHoliday(){
	let monthList = document.getElementsByClassName("month");
	let monthDayList;
	let hdObj = {}, ntObj = {}, postObj = {};
	for(i = 0; i < 12; i++){
		monthDayList = monthList[i].getElementsByClassName("holiday");
		if(monthDayList.length == 0)
			continue;
		let pickDayArr = [];
		for(j = 0; j < monthDayList.length; j++){
			//console.log(monthDayList[j].getAttribute("data-date"));
			let dateInfoStr = monthDayList[j].getAttribute("data-date");
			let dateInfoArr = dateInfoStr.split(" ");
			pickDayArr.push(dateInfoArr[2]);
		}
		let mStr = (i+1).toString();
		mStr = mStr.padStart(2, '0');
		hdObj[mStr] = pickDayArr;
	}
	for(i = 0; i < 12; i++){
		monthDayList = monthList[i].getElementsByClassName("notrade");
		if(monthDayList.length == 0)
			continue;
		let pickDayArr = [];
		for(j = 0; j < monthDayList.length; j++){
			//console.log(monthDayList[j].getAttribute("data-date"));
			let dateInfoStr = monthDayList[j].getAttribute("data-date");
			let dateInfoArr = dateInfoStr.split(" ");
			pickDayArr.push(dateInfoArr[2]);
		}
		let mStr = (i+1).toString();
		mStr = mStr.padStart(2, '0');
		ntObj[mStr] = pickDayArr;
	}
	postObj['holiday'] = hdObj;
	postObj['notrade'] = ntObj;
	//console.log(hdObj)

	var oReq = new XMLHttpRequest();
	//oReq.onload = reqListener;
	oReq.open("post", "/api/data/?" + Date.now(), true);
	oReq.setRequestHeader('Content-Type', 'application/json');
	oReq.send(JSON.stringify(postObj));

	oReq.onloadend = onResponse;

	function onResponse(xhr) {
		console.log(xhr.target.responseText);
		if(xhr.target.responseText)
			alert('提交成功');
	};

}

function reqListener() {
	console.log('hi-1-0');
	console.log(this.responseText);
	console.log('hi-1-1');
};