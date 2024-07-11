let container = document.querySelector('.container')
let body = document.querySelector('body');

let events = [
	{
		from: 2,
		to: 5,
		color: 'red',
		task: 'feed cat',
		day:"09.07.2024"
	},
	{
		from: 10,
		to: 14,
		color: 'green',
		task: "wash bicycle",
		day:"10.07.2024"
	},
	{
		from: 1,
		to: 5,
		color: 'blue',
		task: 'eat lunch',
		day:"11.07.2024"
	}
]

//add new / done

const fromInput = document.querySelector('.from');
const toInput = document.querySelector('.to');
const taskInput = document.querySelector('.task');
const newBtn = document.querySelector('.new-event'
);
let newContainer = document.createElement('div')

class Event {
	constructor(from, to, color, task = '') {
		this.from = from;
		this.to = to;
		this.color = color;
		this.task = task
	}
	setHours(from=this.from,to=this.to) {
		if ((to - 1) <= 24) {
			this.taskHours.innerText = (from - 1) + ":00" + ' / ' + (to - 1) + ":00";
			newContainer.innerHTML = '';
			
		} else if ((to - 1) > 24) {
			this.taskHours.innerText = (from - 1) + ":00" + ' / ' + (to - 25) + ":00";
			
			newContainer.innerHTML = `<div class="container">
			<div class="resizable ${this.color}" draggable="true" style="grid-row: 1 / ${to - 25};"><p style="padding-left: 30px;">${from - 1 + ":00"} / ${to - 25 + ':00'}</p><p>${this.task}</p></div>
  <div class="hour" style="grid-area: 1 / 1 / 2 / 2;"><span>0:00</span></div><div class="hour" style="grid-area: 2 / 1 / 3 / 2;"><span>1:00</span></div><div class="hour" style="grid-area: 3 / 1 / 4 / 2;"><span>2:00</span></div><div class="hour" style="grid-area: 4 / 1 / 5 / 2;"><span>3:00</span></div><div class="hour" style="grid-area: 5 / 1 / 6 / 2;"><span>4:00</span></div><div class="hour" style="grid-area: 6 / 1 / 7 / 2;"><span>5:00</span></div><div class="hour" style="grid-area: 7 / 1 / 8 / 2;"><span>6:00</span></div><div class="hour" style="grid-area: 8 / 1 / 9 / 2;"><span>7:00</span></div><div class="hour" style="grid-area: 9 / 1 / 10 / 2;"><span>8:00</span></div><div class="hour" style="grid-area: 10 / 1 / 11 / 2;"><span>9:00</span></div><div class="hour" style="grid-area: 11 / 1 / 12 / 2;"><span>10:00</span></div><div class="hour" style="grid-area: 12 / 1 / 13 / 2;"><span>11:00</span></div><div class="hour" style="grid-area: 13 / 1 / 14 / 2;"><span>12:00</span></div><div class="hour" style="grid-area: 14 / 1 / 15 / 2;"><span>13:00</span></div><div class="hour" style="grid-area: 15 / 1 / 16 / 2;"><span>14:00</span></div><div class="hour" style="grid-area: 16 / 1 / 17 / 2;"><span>15:00</span></div><div class="hour" style="grid-area: 17 / 1 / 18 / 2;"><span>16:00</span></div><div class="hour" style="grid-area: 18 / 1 / 19 / 2;"><span>17:00</span></div><div class="hour" style="grid-area: 19 / 1 / 20 / 2;"><span>18:00</span></div><div class="hour" style="grid-area: 20 / 1 / 21 / 2;"><span>19:00</span></div><div class="hour" style="grid-area: 21 / 1 / 22 / 2;"><span>20:00</span></div><div class="hour" style="grid-area: 22 / 1 / 23 / 2;"><span>21:00</span></div><div class="hour" style="grid-area: 23 / 1 / 24 / 2;"><span>22:00</span></div><div class="hour" style="grid-area: 24 / 1 / 25 / 2;"><span>23:00</span></div><div class="hour" style="grid-area: 25 / 1 / 26 / 2;"><span>24:00</span></div></div>`

			
			document.body.appendChild(newContainer);
		}
	}
	
	reschedule(from, to) {
		this.from = from;
		this.to = to;

		this.setHours(from,to);
		this.eventDiv.style.gridRow = this.from + '/' + this.to;
	}
	
	createDomElement() {
		this.eventDiv = document.createElement('div');
		this.eventDiv.classList.add('resizable')
		this.eventDiv.setAttribute("draggable",true)
		
		this.taskHours = document.createElement('p');
		this.taskHours.style.paddingLeft = "30px";
		this.taskDiv = document.createElement('p');

		this.setHours();
		
		this.eventDiv.append(this.taskHours, this.taskDiv);
		this.taskDiv.innerText = this.task;
		this.eventDiv.classList.add(this.color);
		this.eventDiv.style.gridRow = Number(this.from+1) + '/' + Number(this.to+1);


		this.eventDiv.addEventListener('dragover', (event) =>{
			event.preventDefault()
			
		})
		this.eventDiv.addEventListener('drag', (event) =>{
			const coordinates = event.toElement.getBoundingClientRect()
			// console.log(event.pageX, event.clientX)
			// console.log(event.pageY, event.clientY)
				// console.log('grag started',coordinates)
			const currentHeight = this.to - this.from;
			const newFrom = Math.round((event.clientY-20) / 20)
			
			this.reschedule(newFrom, newFrom + currentHeight)
			
		})
		this.eventDiv.addEventListener('mouseup', (event) =>{
			const coordinates = event.toElement.getBoundingClientRect()
			// console.log('stopped rescheduling', coordinates, this.from)
			let newHours = Math.round((coordinates.height) / 20)
			this.reschedule(this.from, this.from + newHours)


			this.eventDiv.style.height = (this.to - this.from) * 20 + "px";
		})
		return this.eventDiv
	}
	static generateHours() {
		for (let i = 0; i <= 24; i++) {
			const hour = document.createElement('div');
			hour.classList.add("hour");
			hour.style.gridRow = (i+1) + '/' + (i+2);
			hour.style.gridColumn = "1/2";
			hour.innerHTML = `<span>${i}:00</span>`;
			container.append(hour);
		}
	}
	
	
}

newBtn.addEventListener('click', function() {
	let from = fromInput.value;
	let to = toInput.value;
	let task = taskInput.value;

	let newEvent = new Event(from, to, 'new', task)
	events.push(newEvent);



	container.append(newEvent.createDomElement());
	// setInterval(()=>{
	// 	newEvent.reschedule(Math.round(Math.random()*12), Math.round(Math.random()*12) + 12)
	// },1000)

	fromInput.value = '';
	toInput.value = '';
})

function generateWeek(day) {
	let todayEvents =[] // events.filter()
	let today = new Date(day);
	const options = {
		year: 'numeric',
		month: "2-digit",
		day: '2-digit',
	};

	let todayDate = today.toLocaleDateString('de-DE', options)
	for (let i = 0; i < events.length; i++) {
		 if (events[i].day == todayDate) {
			 todayEvents.push(events[i]);
		 }
	}
	if(generateWeek.events){
		generateWeek.events.forEach(e=>e.remove())
	}else{
		generateWeek.events = []
	}
	
	for (let i = 0; i < todayEvents.length; i++) {
		let event = todayEvents[i];
		let eventClass = new Event(event.from, event.to, event.color, event.task)

		const eventDiv = eventClass.createDomElement()
		generateWeek.events.push(eventDiv)
		container.append(eventDiv);
		// eventDiv.classList.add()
	}
}
let startDay = new Date()
generateWeek(startDay)


const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

previous.addEventListener('click', function() {
	startDay.setDate(startDay.getDate() - 1);
	generateWeek(startDay)
})

next.addEventListener('click', function() {
	startDay.setDate(startDay.getDate() + 1);
	generateWeek(startDay)
})
//add left right btns
//when click left btn we generate week with one day before data
// when right day after

Event.generateHours()
// add new input, when creating new event, where user can enter day 
//add title with current preview day
