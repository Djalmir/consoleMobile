let consoleBt = document.createElement('div')
Object.assign(consoleBt.style, {
	position: 'fixed',
	left: '10px',
	top: 'calc(100% - 50px)',
	borderRadius: '50%',
	background: 'radial-gradient(#0000008d 50%, #0060ff)',
	//border: '2px solid #0060ff',
	backdropFilter: 'blur(10px)',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	zIndex: '9999',
	cursor: 'pointer',
	userSelect: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
})
if (localStorage.getItem('consoleBt.x')) {
	consoleBt.style.left = localStorage.getItem('consoleBt.x')
	consoleBt.style.top = localStorage.getItem('consoleBt.y')
}

let movingBt = false
consoleBt.onmousedown = () => {
	movingBt = true
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

consoleBt.innerHTML = `
	<svg viewBox="0 0 40 40" fill="transparent" stroke="#ccc" stroke-width="3.5" stroke-linecap="butt">
		<polyline points="10 11, 18 17, 10 23"/>
		<line x1="20" y1="26" x2="30" y2="26"/>
	</svg>
`

document.body.appendChild(consoleBt)

let container = document.createElement('div')
Object.assign(container.style, {
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	display: 'none',
	flexDirection: 'column',
	backgroundColor: '#000000cc',
	backdropFilter: 'blur(10px)',
	color: '#fff',
	boxSizing: 'border-box',
	zIndex: '9998',
	transition: '.1s linear',
	transform: 'scale(0)'
})

let clearConsoleBt = document.createElement('div')
Object.assign(clearConsoleBt.style, {
	position: 'absolute',
	right: '10px',
	top: '10px',
	borderRadius: '50%',
	background: 'radial-gradient(#0000004d 50%, #ff6000)',
	backdropFilter: 'blur(10px)',
	//border: '2px solid #ff60003d',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	userSelect: 'none'
})
clearConsoleBt.innerHTML = '&#X1F5D1'

if (localStorage.getItem('clearConsoleBt.x')) {
	clearConsoleBt.style.left = localStorage.getItem('clearConsoleBt.x')
	clearConsoleBt.style.top = localStorage.getItem('clearConsoleBt.y')
}

let movingClearConsoleBt = false
clearConsoleBt.onmousedown = () => {
	movingClearConsoleBt = true
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

let pre = document.createElement('pre')
pre.id = 'consoleMobile_pre'
Object.assign(pre.style, {
	width: '100%',
	margin: '0',
	padding: '0',
	boxSizing: 'border-box',
	fontSize: '14px',
	overflow: 'auto'
})

let h1 = document.createElement('h1')
h1.innerText = 'CONSOLE'
Object.assign(h1.style, {
	background: '#0000004d',
	margin: '0 0 20px',
	width: '100%',
	padding: '10px 12px 20px',
	boxSizing: 'border-box',
	left: '0',
	borderBottom: '1px solid #0060ff',
	fontFamily: "'Ubuntu Mono', monospace"
})
pre.appendChild(h1)

let input = document.createElement('textarea')
input.rows = 1
Object.assign(input.style, {
	width: '100%',
	minHeight: '60px',
	background: 'linear-gradient(to bottom, #0000004d, transparent)',
	border: 'none',
	outline: 'none',
	padding: '8px 12px',
	boxSizing: 'border-box',
	fontSize: '16px',
	color: '#3582fd',
	marginTop: '50px',
	borderTop: '1px solid #0060ff',
	borderBottom: '1px solid #0060ff',
	fontFamily: "'Ubuntu Mono', monospace",
	resize: 'none',
	tabSize: '20px'
})

input.addEventListener('input', () => {
	input.rows = Math.floor(input.scrollHeight / 17)
})

container.addEventListener('dblclick', (e) => {
	e.preventDefault()
	pre.scrollTo(0, pre.scrollHeight)
	input.focus()
}, {passive: false})



let sendBt = document.createElement('div')
Object.assign(sendBt.style, {
	position: 'absolute',
	right: '10px',
	bottom: '10px',
	padding: '0',
	borderRadius: '50%',
	background: 'radial-gradient(#0000004d 50%, #00ff00)',
	backdropFilter: 'blur(10px)',
	//border: '2px solid #ff60003d',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	userSelect: 'none'
})

if (localStorage.getItem('sendBt.x')) {
	sendBt.style.left = localStorage.getItem('sendBt.x')
	sendBt.style.top = localStorage.getItem('sendBt.y')
}

let movingSendBt = false
sendBt.onmousedown = () => {
	movingSendBt = true
	Object.assign(sendBt.style, {
		transform: 'scale(.95)'
	})
}
sendBt.ontouchstart = sendBt.onmousedown

sendBt.onmouseup = () => {
	Object.assign(sendBt.style, {
		transform: 'scale(1)'
	})
}
sendBt.ontouchcancel = sendBt.onmouseup
sendBt.ontouchend = sendBt.onmouseup
sendBt.onmouseleave = sendBt.onmouseup

sendBt.onclick = () => {callConsole()}
sendBt.ontouch = () => {
	sendBt.onmouseup()
	callConsole()
}

sendBt.innerHTML = `
	<svg viewBox="0 0 40 40" fill="transparent" stroke="#ccc" stroke-width="4.5" stroke-linecap="butt">
		<polyline points="9 18, 17 27, 31 13"/>
	</svg>
`

container.appendChild(sendBt)



pre.appendChild(input)
container.appendChild(pre)
document.body.appendChild(container)

let showingConsole = false
let h = ['left', 'center', 'right']
let v = ['top', 'center', 'bottom']
function showHideConsole() {
	showingConsole = !showingConsole
	if (showingConsole) {
		container.style.transformOrigin = `${ h[Math.floor(Math.random() * 3)] } ${ v[Math.floor(Math.random() * 3)] }`
		container.style.display = 'flex'
		setTimeout(function () {
			container.style.transform = 'scale(1)'
		}, 10)

	}
	else {
		container.style.transform = 'scale(0)'
		container.addEventListener('transitionend', hideConsole)
	}
}

function hideConsole() {
	container.style.display = 'none'
	container.removeEventListener('transitionend', hideConsole)
}

let oldLog = console.log

console.log = (...items) => {

	oldLog.apply(this, items)

	items.forEach((item, i) => {
		if (typeof item === 'object') {
			if (item.tagName) {
				let count = 0
				let parent = item
				while (parent.tagName != 'BODY') {
					count++
					parent = parent.parentNode
				}

				let itemLines = item.outerHTML.split(/\r?\n/)
				items[i] = itemLines[0] + '\n'
				for (let o = 1; o < itemLines.length; o++) {
					for (let p = 0; p < count; p++) {
						itemLines[o] = itemLines[o].slice(1)
					}
					items[i] += itemLines[o] + '\n'
				}
				while (itemLines[itemLines.length - 1].charAt(0) == ' ' || itemLines[itemLines.length - 1].charAt(0) == '\t') {
					items[i] = itemLines[0] + '\n'
					for (let o = 1; o < itemLines.length; o++) {
						itemLines[o] = itemLines[o].slice(1)
						items[i] += itemLines[o] + '\n'
					}
				}
			}
			else {
				items[i] = JSON.stringify(item, null, 2)
			}
		}
		else
			items[i] = item
		// items[i] = (typeof item === 'object' ? item.tagName ? item.outerHTML : JSON.stringify(item, null, 2) : item)
	})
	let output = document.createElement('div')
	output.classList.add('consoleMobile_output')
	output.innerText += `${ items.join(' ') }\n`
	pre.insertBefore(output, input)
	pre.scrollTo(0, pre.scrollHeight)
}

function consoleInput(data) {
	let text = document.createElement('p')
	text.innerText = data
	Object.assign(text.style, {
		margin: '30px auto 0',
		padding: '0 12px',
		boxSizing: 'border-box',
		color: '#3582fd',
		width: '95%',
		overflow: 'auto'
	})
	pre.insertBefore(text, input)
	try {
		console.log(eval(data))
	}
	catch (e) {
		let errorDiv = document.createElement('div')
		errorDiv.classList.add('consoleMobile_errorDiv')

		let span = document.createElement('span')
		span.classList.add('consoleMobile_error-span')
		span.innerText = e.stack + ' '
		errorDiv.appendChild(span)

		pre.insertBefore(errorDiv, input)
	}
	pre.scrollTo(0, pre.scrollHeight)
}

function callConsole(e) {
	if (input.value.trim() != '') {
		consoleInput(input.value)
		input.value = ''
		input.rows = 1
	}
}

function clearConsole() {
	pre.innerHTML = ''
	pre.appendChild(h1)
	pre.appendChild(input)
}

document.body.onresize = () => {
	if (consoleBt.offsetLeft < 0) {
		consoleBt.style.left = '0'
		localStorage.setItem('consoleBt.x', consoleBt.style.left)
	}
	if (consoleBt.offsetLeft + consoleBt.offsetWidth > window.innerWidth) {
		consoleBt.style.left = window.innerWidth - consoleBt.offsetWidth + 'px'
		localStorage.setItem('consoleBt.x', consoleBt.style.left)
	}
	if (consoleBt.offsetTop < 0) {
		consoleBt.style.top = '0'
		localStorage.setItem('consoleBt.y', consoleBt.style.top)
	}
	if (consoleBt.offsetTop + consoleBt.offsetHeight > window.innerHeight) {
		consoleBt.style.top = window.innerHeight - consoleBt.offsetHeight + 'px'
		localStorage.setItem('consoleBt.y', consoleBt.style.top)
	}

	if (clearConsoleBt.offsetLeft < 0) {
		clearConsoleBt.style.left = '0'
		localStorage.setItem('clearConsoleBt.x', clearConsoleBt.style.left)
	}
	if (clearConsoleBt.offsetLeft + clearConsoleBt.offsetWidth > window.innerWidth) {
		clearConsoleBt.style.left = window.innerWidth - clearConsoleBt.offsetWidth + 'px'
		localStorage.setItem('clearConsoleBt.x', clearConsoleBt.style.left)
	}
	if (clearConsoleBt.offsetTop < 0) {
		clearConsoleBt.style.top = '0'
		localStorage.setItem('clearConsoleBt.y', clearConsoleBt.style.top)
	}
	if (clearConsoleBt.offsetTop + clearConsoleBt.offsetHeight > window.innerHeight) {
		clearConsoleBt.style.top = window.innerHeight - clearConsoleBt.offsetHeight + 'px'
		localStorage.setItem('clearConsoleBt.y', clearConsoleBt.style.top)
	}

	if (sendBt.offsetLeft < 0) {
		sendBt.style.left = '0'
		localStorage.setItem('sendBt.x', sendBt.style.left)
	}
	if (sendBt.offsetLeft + sendBt.offsetWidth > window.innerWidth) {
		sendBt.style.left = window.innerWidth - sendBt.offsetWidth + 'px'
		localStorage.setItem('sendBt.x', sendBt.style.left)
	}
	if (sendBt.offsetTop < 0) {
		sendBt.style.top = '0'
		localStorage.setItem('sendBt.y', sendBt.style.top)
	}
	if (sendBt.offsetTop + sendBt.offsetHeight > window.innerHeight) {
		sendBt.style.top = window.innerHeight - sendBt.offsetHeight + 'px'
		localStorage.setItem('sendBt.y', sendBt.style.top)
	}
}

window.onerror = (msg, url, lineNo, columnNo, error) => {
	let errorDiv = document.createElement('div')
	errorDiv.classList.add('consoleMobile_errorDiv')

	let b = document.createElement('b')
	b.classList.add('consoleMobile_error-b')
	b.innerText = msg + ' '
	errorDiv.appendChild(b)

	let urlSpan = document.createElement('span')
	urlSpan.classList.add('consoleMobile_urlSpan')

	let a = document.createElement('a')
	a.href = url
	a.target = '_blank'
	a.innerText = url
	a.classList.add('consoleMobile_error-a')
	urlSpan.appendChild(a)

	let span = document.createElement('span')
	span.classList.add('consoleMobile_error-lineCol-span')
	span.innerText = `Linha: ${ lineNo }	Coluna: ${ columnNo }`
	urlSpan.appendChild(span)

	errorDiv.appendChild(urlSpan)

	pre.insertBefore(errorDiv, input)
	pre.scrollTo(0, pre.scrollHeight)
}

document.onmousemove = (e) => {
	if (movingBt) {
		consoleBt.style.left = e.clientX - 20 + 'px',
			consoleBt.style.top = e.clientY - 20 + 'px'
	}
	if (movingClearConsoleBt) {
		clearConsoleBt.style.left = e.clientX - 20 + 'px',
			clearConsoleBt.style.top = e.clientY - 20 + 'px'
	}
	if (movingSendBt) {
		sendBt.style.left = e.clientX - 20 + 'px',
			sendBt.style.top = e.clientY - 20 + 'px'
	}
}
document.addEventListener('touchmove', (e) => {
	if (movingBt) {
		e.preventDefault()
		consoleBt.style.left = e.touches[e.touches.length - 1].clientX - 20 + 'px',
			consoleBt.style.top = e.touches[e.touches.length - 1].clientY - 20 + 'px'
	}
	if (movingClearConsoleBt) {
		e.preventDefault()
		clearConsoleBt.style.left = e.touches[e.touches.length - 1].clientX - 20 + 'px',
			clearConsoleBt.style.top = e.touches[e.touches.length - 1].clientY - 20 + 'px'
	}
	if (movingSendBt) {
		e.preventDefault()
		sendBt.style.left = e.touches[e.touches.length - 1].clientX - 20 + 'px',
			sendBt.style.top = e.touches[e.touches.length - 1].clientY - 20 + 'px'
	}
}, {passive: false})

document.onmouseup = () => {
	if (movingBt) {
		movingBt = false
		localStorage.setItem('consoleBt.x', consoleBt.style.left)
		localStorage.setItem('consoleBt.y', consoleBt.style.top)
	}
	if (movingClearConsoleBt) {
		movingClearConsoleBt = false
		localStorage.setItem('clearConsoleBt.x', clearConsoleBt.style.left)
		localStorage.setItem('clearConsoleBt.y', clearConsoleBt.style.top)
	}
	if (movingSendBt) {
		movingSendBt = false
		localStorage.setItem('sendBt.x', sendBt.style.left)
		localStorage.setItem('sendBt.y', sendBt.style.top)
	}
}

document.ontouchend = document.onmouseup

let style = document.createElement('style')
style.appendChild(document.createTextNode(`
	@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap');

	#consoleMobile_pre ::selection {
		background: #0030cc;
		font-family: 'Ubuntu Mono', monospace;
		color: #fff;
	}

	.consoleMobile_output{
		tab-size: 20px;
		background: #0060ff2d;
		margin: 2px auto;
		padding: 12px 20px;
		box-sizing: border-box;
		border-radius: .2rem;
		width: 95%;
		overflow-x: auto;
		border: 1px solid #0000004d;
		font-family: 'Ubuntu Mono', monospace;
	}

	.consoleMobile_errorDiv {
		background: #ff60003d;
		margin: 2px auto;
		padding: 20px;
		box-sizing: border-box;
		border-radius: .2rem;
		width: 95%;
		overflow-x: auto;
		border: 1px solid #0000004d;
		font-family: 'Ubuntu Mono', monospace;
	}

	.consoleMobile_output ::selection,
	.consoleMobile_errorDiv ::selection {
		background: #0030cc;
		color: #fff;
	}

	.consoleMobile_error-b {
		font-weight: bolder;
		font-size: 18px;
		color: #ff6000;
	}

	.consoleMobile_urlSpan {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-itens: center;
		margin-top: 8px;
	}

	.consoleMobile_error-a {
		color: #0060ff;
		font-size: 16px;
		margin: 0 8px 8px 0;
	}

`))
document.getElementsByTagName('head')[0].appendChild(style)
