let consoleBt = document.createElement('div')
Object.assign(consoleBt.style, {
	position: 'absolute',
	right: '10px',
	top: '20px',
	borderRadius: '50%',
	backgroundColor: '#0060ff80',
	boxShadow: 'inset 0 0 10px #000000dd',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	zIndex: '9999',
	color: '#fff',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontFamily: 'sans-serif'
})
consoleBt.innerHTML='<b>C</b>'

consoleBt.onmousedown = () => {
	Object.assign(consoleBt.style, {
		transform: 'scale(.95)'
	})
}
consoleBt.ontouchstart = consoleBt.onmousedown

consoleBt.onmouseup = () => {
	Object.assign(consoleBt.style, {
		transform: 'scale(1)'
	})
}
consoleBt.ontouchcancel = consoleBt.onmouseup
consoleBt.ontouchend = consoleBt.onmouseup
consoleBt.onmouseleave = consoleBt.onmouseup

consoleBt.onclick = () => {showHideConsole()}
consoleBt.ontouch = () => {
	consoleBt.onmouseup()
	showHideConsole()
}

document.body.appendChild(consoleBt)

let container = document.createElement('div')
Object.assign(container.style, {
	position: 'absolute',
	top: '-120vh',
	left: '0',
	width: '100%',
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#000000cc',
	backdropFilter: 'blur(10px)',
	transition: 'top .2s linear',
	color: '#fff',
	boxSizing: 'border-box',
	overflowY: 'auto',
	zIndex: '9998'
})

let h1 = document.createElement('h1')
h1.innerText = 'CONSOLE'
h1.style.padding = '0 12px'
container.appendChild(h1)

let output = document.createElement('pre')
output.id = 'output'
Object.assign(output.style, {
	width: '100%',
	padding: '8px 12px',
	boxSizing: 'border-box',
	fontSize: '16px'
})
container.appendChild(output)

let input = document.createElement('input')
input.type = 'text'
input.id = 'input'
input.autocomplete = 'off'
Object.assign(input.style, {
	width: '100%',
	backgroundColor: '#0000004d',
	border: 'none',
	outline: 'none',
	resize: 'none',
	padding: '8px 12px',
	boxSizing: 'border-box',
	fontSize: '16px',
	color: '#fff',
	borderBottom: '1px solid #0060ff'
})
input.onkeypress = callConsole
container.appendChild(input)

document.body.appendChild(container)

let showingConsole = false
function showHideConsole() {
	showingConsole = !showingConsole
	if (showingConsole) {
		container.style.top = '0'
	}
	else
		container.style.top = '-120vh'
}

let oldLog = console.log

console.log = (...items) => {

	oldLog.apply(this, items)

	items.forEach((item, i) => {
		items[i] = (typeof item === 'object' ? JSON.stringify(item, null, 2) : item)
	})
	output.innerHTML += '<br />' + items.join(' ') + '<br />'

}

function consoleInput(data) {
	console.log(data)
	try {
		console.log(eval(data))
	}
	catch (e) {
		console.log(e.stack)
	}
}

function callConsole(e) {
	if (e.key == 'Enter') {
		consoleInput(input.value)
		input.value = ''
	}
}