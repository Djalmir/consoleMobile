let consoleBt = document.createElement('div')
Object.assign(consoleBt.style, {
	position: 'fixed',
	left: '10px',
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
	fontFamily: 'sans-serif',
	cursor: 'pointer',
	userSelect: 'none'
})
consoleBt.innerHTML = '<b>C</b>'

let movingBt = false
consoleBt.onmousedown = () => {
	movingBt = true
	Object.assign(consoleBt.style, {
		transform: 'scale(.95)'
	})
}
consoleBt.ontouchstart = consoleBt.onmousedown

document.onmousemove = (e) => {
	if (movingBt) {
		consoleBt.style.left = e.clientX - 20 + 'px',
			consoleBt.style.top = e.clientY - 20 + 'px'
	}
}
document.addEventListener('touchmove', (e) => {
	if (movingBt) {
		e.preventDefault()
		consoleBt.style.left = e.touches[e.touches.length - 1].clientX - 20 + 'px',
			consoleBt.style.top = e.touches[e.touches.length - 1].clientY - 20 + 'px'
	}
}, {passive: false})

document.onmouseup = () => {
	movingBt = false
}

document.ontouchend = () => {
	movingBt = false
}

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
	position: 'fixed',
	top: '-120vh',
	left: '0',
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#000000cc',
	backdropFilter: 'blur(10px)',
	transition: 'top .2s linear',
	color: '#fff',
	boxSizing: 'border-box',
	zIndex: '9998'
})

let clearConsoleBt = document.createElement('div')
Object.assign(clearConsoleBt.style, {
	position: 'absolute',
	right: '10px',
	top: '10px',
	borderRadius: '50%',
	backgroundColor: '#ff600080',
	boxShadow: 'inset 0 0 10px #000000dd',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	zIndex: '9999',
	color: '#fff',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontFamily: 'sans-serif',
	cursor: 'pointer',
	userSelect: 'none'
})
clearConsoleBt.innerHTML = '<b>&#X1F5D1</b>'

clearConsoleBt.onmousedown = () => {
	Object.assign(clearConsoleBt.style, {
		transform: 'scale(.95)'
	})
}
clearConsoleBt.ontouchstart = clearConsoleBt.onmousedown

clearConsoleBt.onmouseup = () => {
	Object.assign(clearConsoleBt.style, {
		transform: 'scale(1)'
	})
}
clearConsoleBt.ontouchcancel = clearConsoleBt.onmouseup
clearConsoleBt.ontouchend = clearConsoleBt.onmouseup
clearConsoleBt.onmouseleave = clearConsoleBt.onmouseup

clearConsoleBt.onclick = () => {clearConsole()}
clearConsoleBt.ontouch = () => {
	clearConsoleBt.onmouseup()
	clearConsole()
}

container.appendChild(clearConsoleBt)

let output = document.createElement('pre')
output.id = 'output'
Object.assign(output.style, {
	width: '100%',
	margin: '0',
	padding: '50px 12px',
	boxSizing: 'border-box',
	fontSize: '16px',
	overflow: 'auto'
})

let h1 = document.createElement('h1')
h1.innerText = 'CONSOLE'
h1.style.padding = '0'
output.appendChild(h1)

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
container.addEventListener('dblclick', (e) => {
	e.preventDefault()
	output.scrollTo(0, output.offsetHeight + 999)
	input.focus()
}, {passive: false})

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
	output.scrollTo(0, output.offsetHeight + 200)
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

function clearConsole() {
	output.innerHTML = ''
	let h1 = document.createElement('h1')
	h1.innerText = 'CONSOLE'
	h1.style.padding = '0'
	output.appendChild(h1)
}