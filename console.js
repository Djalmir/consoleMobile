let cM_consoleBt = document.createElement('div')
Object.assign(cM_consoleBt.style, {
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
if (localStorage.getItem('cM_consoleBt.x')) {
	cM_consoleBt.style.left = localStorage.getItem('cM_consoleBt.x')
	cM_consoleBt.style.top = localStorage.getItem('cM_consoleBt.y')
}

let cM_movingBt = false
let cM_innerClickX, cM_innerClickY
cM_consoleBt.onmousedown = (e) => {
	cM_movingBt = true
	Object.assign(cM_consoleBt.style, {
		transform: 'scale(.95)'
	})
	if (e.clientX) {
		cM_innerClickX = e.clientX - cM_consoleBt.offsetLeft
		cM_innerClickY = e.clientY - cM_consoleBt.offsetTop
	}
	else {
		cM_innerClickX = e.touches[0].clientX - cM_consoleBt.offsetLeft
		cM_innerClickY = e.touches[0].clientY - cM_consoleBt.offsetTop
	}
}
cM_consoleBt.ontouchstart = cM_consoleBt.onmousedown

cM_consoleBt.onmouseup = () => {
	Object.assign(cM_consoleBt.style, {
		transform: 'scale(1)'
	})
}
cM_consoleBt.ontouchcancel = cM_consoleBt.onmouseup
cM_consoleBt.ontouchend = cM_consoleBt.onmouseup
cM_consoleBt.onmouseleave = cM_consoleBt.onmouseup

cM_consoleBt.onclick = () => {cM_showHideConsole()}
cM_consoleBt.ontouch = () => {
	cM_consoleBt.onmouseup()
	cM_showHideConsole()
}

cM_consoleBt.innerHTML = `
	<svg viewBox="0 0 40 40" fill="transparent" stroke="#ccc" stroke-width="3.5" stroke-linecap="butt">
		<polyline points="10 11, 18 17, 10 23"/>
		<line x1="20" y1="26" x2="30" y2="26"/>
	</svg>
`

document.body.appendChild(cM_consoleBt)

let cM_container = document.createElement('div')
Object.assign(cM_container.style, {
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	display: 'none',
	flexDirection: 'column',
	backgroundColor: '#000000cc',
	//backdropFilter: 'blur(10px)',
	color: '#fff',
	boxSizing: 'border-box',
	zIndex: '9998',
	transition: '.2s ease-in-out',
	transform: 'scale(0)'
})

let cM_clearConsoleBt = document.createElement('div')
Object.assign(cM_clearConsoleBt.style, {
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
cM_clearConsoleBt.innerHTML = '&#X1F5D1'

if (localStorage.getItem('cM_clearConsoleBt.x')) {
	cM_clearConsoleBt.style.left = localStorage.getItem('cM_clearConsoleBt.x')
	cM_clearConsoleBt.style.top = localStorage.getItem('cM_clearConsoleBt.y')
}

let cM_movingClearConsoleBt = false
cM_clearConsoleBt.onmousedown = (e) => {
	cM_movingClearConsoleBt = true
	Object.assign(cM_clearConsoleBt.style, {
		transform: 'scale(.95)'
	})
	if (e.clientX) {
		cM_innerClickX = e.clientX - cM_clearConsoleBt.offsetLeft
		cM_innerClickY = e.clientY - cM_clearConsoleBt.offsetTop
	}
	else {
		cM_innerClickX = e.touches[0].clientX - cM_clearConsoleBt.offsetLeft
		cM_innerClickY = e.touches[0].clientY - cM_clearConsoleBt.offsetTop
	}
}
cM_clearConsoleBt.ontouchstart = cM_clearConsoleBt.onmousedown

cM_clearConsoleBt.onmouseup = () => {
	Object.assign(cM_clearConsoleBt.style, {
		transform: 'scale(1)'
	})
}
cM_clearConsoleBt.ontouchcancel = cM_clearConsoleBt.onmouseup
cM_clearConsoleBt.ontouchend = cM_clearConsoleBt.onmouseup
cM_clearConsoleBt.onmouseleave = cM_clearConsoleBt.onmouseup

cM_clearConsoleBt.onclick = () => {cM_clearConsole()}
cM_clearConsoleBt.ontouch = () => {
	cM_clearConsoleBt.onmouseup()
	cM_clearConsole()
}

cM_container.appendChild(cM_clearConsoleBt)

let cM_pre = document.createElement('pre')
cM_pre.id = 'cM_pre'
Object.assign(cM_pre.style, {
	width: '100%',
	margin: '0',
	padding: '0',
	boxSizing: 'border-box',
	fontSize: '14px',
	overflow: 'auto'
})

let cM_h1 = document.createElement('h1')
cM_h1.innerText = 'CONSOLE'
Object.assign(cM_h1.style, {
	background: '#0000004d',
	margin: '0 0 20px',
	width: '100%',
	padding: '10px 12px 20px',
	boxSizing: 'border-box',
	left: '0',
	borderBottom: '1px solid #0060ff',
	fontFamily: "'Ubuntu Mono', monospace"
})
cM_pre.appendChild(cM_h1)

let cM_input = document.createElement('textarea')
cM_input.rows = 1
Object.assign(cM_input.style, {
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

cM_input.addEventListener('input', () => {
	cM_input.rows = 1
	cM_input.rows = Math.floor(cM_input.scrollHeight / 17)
})

cM_input.onfocus = () => {
	cM_sendBt.style.display = 'flex'
}

cM_input.onblur = () => {
	if (cM_input.value.trim() == '')
		cM_sendBt.style.display = 'none'
}

cM_container.addEventListener('dblclick', (e) => {
	e.preventDefault()
	cM_pre.scrollTo(0, cM_pre.scrollHeight)
	cM_input.focus()
}, {passive: false})

let cM_sendBt = document.createElement('div')
Object.assign(cM_sendBt.style, {
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
	display: 'none',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	userSelect: 'none'
})

if (localStorage.getItem('cM_sendBt.x')) {
	cM_sendBt.style.left = localStorage.getItem('cM_sendBt.x')
	cM_sendBt.style.top = localStorage.getItem('cM_sendBt.y')
}

let cM_movingSendBt = false
cM_sendBt.onmousedown = (e) => {
	cM_movingSendBt = true
	Object.assign(cM_sendBt.style, {
		transform: 'scale(.95)'
	})
	if (e.clientX) {
		cM_innerClickX = e.clientX - cM_sendBt.offsetLeft
		cM_innerClickY = e.clientY - cM_sendBt.offsetTop
	}
	else {
		cM_innerClickX = e.touches[0].clientX - cM_sendBt.offsetLeft
		cM_innerClickY = e.touches[0].clientY - cM_sendBt.offsetTop
	}
}
cM_sendBt.ontouchstart = cM_sendBt.onmousedown

cM_sendBt.onmouseup = () => {
	Object.assign(cM_sendBt.style, {
		transform: 'scale(1)'
	})
}
cM_sendBt.ontouchcancel = cM_sendBt.onmouseup
cM_sendBt.ontouchend = cM_sendBt.onmouseup
cM_sendBt.onmouseleave = cM_sendBt.onmouseup

cM_sendBt.onclick = () => {cM_callConsole()}
cM_sendBt.ontouch = () => {
	cM_sendBt.onmouseup()
	cM_callConsole()
}

//<polyline points="0 18, 17 27, 31 13"/>
cM_sendBt.innerHTML = `
	<svg viewBox="0 0 40 40" fill="transparent" stroke="#ccc" stroke-width="4.5" stroke-linecap="butt">
		 <polyline points="12 19, 18 25, 28 16"/>
	</svg>
`

cM_container.appendChild(cM_sendBt)

cM_pre.appendChild(cM_input)
cM_container.appendChild(cM_pre)
document.body.appendChild(cM_container)

let cM_showingConsole = false
let cM_h = ['left', 'center', 'right']
let cM_v = ['top', 'center', 'bottom']
function cM_showHideConsole() {
	cM_showingConsole = !cM_showingConsole
	if (cM_showingConsole) {
		cM_container.style.transformOrigin = `${ cM_h[Math.floor(Math.random() * 3)] } ${ cM_v[Math.floor(Math.random() * 3)] }`
		cM_container.style.display = 'flex'
		setTimeout(async function () {
			cM_container.style.transform = await 'scale(1)'
			setTimeout(() => {
				cM_container.style.backdropFilter = 'blur(10px)'
			}, 10)
		}, 10)

	}
	else {
		cM_container.style.backdropFilter = ''
		cM_container.style.transform = 'scale(0)'
		cM_container.addEventListener('transitionend', cM_hideConsole)
	}
}

function cM_hideConsole() {
	cM_container.style.display = 'none'
	cM_container.removeEventListener('transitionend', cM_hideConsole)
}

let cM_oldLog = console.log

console.log = (...items) => {

	cM_oldLog.apply(this, items)

	items.forEach((item, i) => {
		if (typeof item === 'object') {
			if (item.tagName) {
				let cM_count = 0
				let cM_parent = item
				while (cM_parent.tagName != 'BODY') {
					cM_count++
					cM_parent = cM_parent.parentNode
				}

				let cM_itemLines = item.outerHTML.split(/\r?\n/)
				items[i] = cM_itemLines[0] + '\n'
				for (let o = 1; o < cM_itemLines.length; o++) {
					for (let p = 0; p < cM_count; p++) {
						cM_itemLines[o] = cM_itemLines[o].slice(1)
					}
					items[i] += cM_itemLines[o] + '\n'
				}
				while (cM_itemLines[cM_itemLines.length - 1].charAt(0) == ' ' || cM_itemLines[cM_itemLines.length - 1].charAt(0) == '\t') {
					items[i] = cM_itemLines[0] + '\n'
					for (let o = 1; o < cM_itemLines.length; o++) {
						cM_itemLines[o] = cM_itemLines[o].slice(1)
						items[i] += cM_itemLines[o] + '\n'
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
	let cM_output = document.createElement('div')
	cM_output.classList.add('cM_output')
	cM_output.innerText += `${ items.join(' ') }\n`
	cM_pre.insertBefore(cM_output, cM_input)
	cM_pre.scrollTo(0, cM_pre.scrollHeight)
	cM_sendBt.style.display = 'none'
}

function cM_consoleInput(data) {
	let cM_text = document.createElement('p')
	cM_text.innerText = data
	Object.assign(cM_text.style, {
		margin: '30px auto 0',
		padding: '0 12px',
		boxSizing: 'border-box',
		color: '#3582fd',
		width: '95%',
		overflow: 'auto'
	})
	cM_pre.insertBefore(cM_text, cM_input)
	try {
		console.log(eval(data))
	}
	catch (e) {
		let cM_errorDiv = document.createElement('div')
		cM_errorDiv.classList.add('cM_errorDiv')

		let cM_span = document.createElement('span')
		cM_span.classList.add('cM_error-span')
		cM_span.innerText = e.stack + ' '
		cM_errorDiv.appendChild(cM_span)

		cM_pre.insertBefore(cM_errorDiv, cM_input)
	}
	cM_pre.scrollTo(0, cM_pre.scrollHeight)
	cM_sendBt.style.display = 'none'
}

function cM_callConsole(e) {
	if (cM_input.value.trim() != '') {
		cM_consoleInput(cM_input.value)
		cM_input.value = ''
		cM_input.rows = 1
	}
}

function cM_clearConsole() {
	cM_pre.innerHTML = ''
	cM_pre.appendChild(cM_h1)
	cM_pre.appendChild(cM_input)
}

document.body.onresize = () => {
	if (cM_consoleBt.offsetLeft < 0) {
		cM_consoleBt.style.left = '0'
		localStorage.setItem('cM_consoleBt.x', cM_consoleBt.style.left)
	}
	if (cM_consoleBt.offsetLeft + cM_consoleBt.offsetWidth > window.innerWidth) {
		cM_consoleBt.style.left = window.innerWidth - cM_consoleBt.offsetWidth + 'px'
		localStorage.setItem('cM_consoleBt.x', cM_consoleBt.style.left)
	}
	if (cM_consoleBt.offsetTop < 0) {
		cM_consoleBt.style.top = '0'
		localStorage.setItem('cM_consoleBt.y', cM_consoleBt.style.top)
	}
	if (cM_consoleBt.offsetTop + cM_consoleBt.offsetHeight > window.innerHeight) {
		cM_consoleBt.style.top = window.innerHeight - cM_consoleBt.offsetHeight + 'px'
		localStorage.setItem('cM_consoleBt.y', cM_consoleBt.style.top)
	}

	if (cM_clearConsoleBt.offsetLeft < 0) {
		cM_clearConsoleBt.style.left = '0'
		localStorage.setItem('cM_clearConsoleBt.x', cM_clearConsoleBt.style.left)
	}
	if (cM_clearConsoleBt.offsetLeft + cM_clearConsoleBt.offsetWidth > window.innerWidth) {
		cM_clearConsoleBt.style.left = window.innerWidth - cM_clearConsoleBt.offsetWidth + 'px'
		localStorage.setItem('cM_clearConsoleBt.x', cM_clearConsoleBt.style.left)
	}
	if (cM_clearConsoleBt.offsetTop < 0) {
		cM_clearConsoleBt.style.top = '0'
		localStorage.setItem('cM_clearConsoleBt.y', cM_clearConsoleBt.style.top)
	}
	if (cM_clearConsoleBt.offsetTop + cM_clearConsoleBt.offsetHeight > window.innerHeight) {
		cM_clearConsoleBt.style.top = window.innerHeight - cM_clearConsoleBt.offsetHeight + 'px'
		localStorage.setItem('cM_clearConsoleBt.y', cM_clearConsoleBt.style.top)
	}

	if (cM_sendBt.offsetLeft < 0) {
		cM_sendBt.style.left = '0'
		localStorage.setItem('cM_sendBt.x', cM_sendBt.style.left)
	}
	if (cM_sendBt.offsetLeft + cM_sendBt.offsetWidth > window.innerWidth) {
		cM_sendBt.style.left = window.innerWidth - cM_sendBt.offsetWidth + 'px'
		localStorage.setItem('cM_sendBt.x', cM_sendBt.style.left)
	}
	if (cM_sendBt.offsetTop < 0) {
		cM_sendBt.style.top = '0'
		localStorage.setItem('cM_sendBt.y', cM_sendBt.style.top)
	}
	if (cM_sendBt.offsetTop + cM_sendBt.offsetHeight > window.innerHeight) {
		cM_sendBt.style.top = window.innerHeight - cM_sendBt.offsetHeight + 'px'
		localStorage.setItem('cM_sendBt.y', cM_sendBt.style.top)
	}
}

window.onerror = (msg, url, lineNo, columnNo, error) => {
	let cM_errorDiv = document.createElement('div')
	cM_errorDiv.classList.add('cM_errorDiv')

	let cM_b = document.createElement('b')
	cM_b.classList.add('cM_error-b')
	cM_b.innerText = msg + ' '
	cM_errorDiv.appendChild(cM_b)

	let cM_urlSpan = document.createElement('span')
	cM_urlSpan.classList.add('cM_urlSpan')

	let cM_a = document.createElement('a')
	cM_a.href = url
	cM_a.target = '_blank'
	cM_a.innerText = url
	cM_a.classList.add('cM_error-a')
	cM_urlSpan.appendChild(cM_a)

	let cM_span = document.createElement('span')
	cM_span.classList.add('cM_error-lineCol-span')
	cM_span.innerText = `Linha: ${ lineNo }	Coluna: ${ columnNo }`
	cM_urlSpan.appendChild(cM_span)

	cM_errorDiv.appendChild(cM_urlSpan)

	cM_pre.insertBefore(cM_errorDiv, cM_input)
	cM_pre.scrollTo(0, cM_pre.scrollHeight)
	cM_sendBt.style.display = 'none'
}

document.onmousemove = (e) => {
	if (cM_movingBt) {
		cM_consoleBt.style.left = e.clientX - cM_innerClickX + 'px',
			cM_consoleBt.style.top = e.clientY - cM_innerClickY + 'px'
	}
	if (cM_movingClearConsoleBt) {
		cM_clearConsoleBt.style.left = e.clientX - cM_innerClickX + 'px',
			cM_clearConsoleBt.style.top = e.clientY - cM_innerClickY + 'px'
	}
	if (cM_movingSendBt) {
		cM_sendBt.style.left = e.clientX - cM_innerClickX + 'px',
			cM_sendBt.style.top = e.clientY - cM_innerClickY + 'px'
	}
}
document.addEventListener('touchmove', (e) => {
	if (cM_movingBt) {
		e.preventDefault()
		cM_consoleBt.style.left = e.touches[e.touches.length - 1].clientX - cM_innerClickX + 'px',
			cM_consoleBt.style.top = e.touches[e.touches.length - 1].clientY - cM_innerClickY + 'px'
	}
	if (cM_movingClearConsoleBt) {
		e.preventDefault()
		cM_clearConsoleBt.style.left = e.touches[e.touches.length - 1].clientX - cM_innerClickX + 'px',
			cM_clearConsoleBt.style.top = e.touches[e.touches.length - 1].clientY - cM_innerClickY + 'px'
	}
	if (cM_movingSendBt) {
		e.preventDefault()
		cM_sendBt.style.left = e.touches[e.touches.length - 1].clientX - cM_innerClickX + 'px',
			cM_sendBt.style.top = e.touches[e.touches.length - 1].clientY - cM_innerClickY + 'px'
	}
}, {passive: false})

document.onmouseup = () => {
	if (cM_movingBt) {
		cM_movingBt = false
		localStorage.setItem('cM_consoleBt.x', cM_consoleBt.style.left)
		localStorage.setItem('cM_consoleBt.y', cM_consoleBt.style.top)
	}
	if (cM_movingClearConsoleBt) {
		cM_movingClearConsoleBt = false
		localStorage.setItem('cM_clearConsoleBt.x', cM_clearConsoleBt.style.left)
		localStorage.setItem('cM_clearConsoleBt.y', cM_clearConsoleBt.style.top)
	}
	if (cM_movingSendBt) {
		cM_movingSendBt = false
		localStorage.setItem('cM_sendBt.x', cM_sendBt.style.left)
		localStorage.setItem('cM_sendBt.y', cM_sendBt.style.top)
	}
}

document.ontouchend = document.onmouseup

let cM_style = document.createElement('style')
cM_style.appendChild(document.createTextNode(`
	@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap');

	#cM_pre ::selection {
		background: #0030cc;
		font-family: 'Ubuntu Mono', monospace;
		color: #fff;
	}

	.cM_output{
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

	.cM_errorDiv {
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

	.cM_output ::selection,
	.cM_errorDiv ::selection {
		background: #0030cc;
		color: #fff;
	}

	.cM_error-b {
		font-weight: bolder;
		font-size: 18px;
		color: #ff6000;
	}

	.cM_urlSpan {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-itens: center;
		margin-top: 8px;
	}

	.cM_error-a {
		color: #0060ff;
		font-size: 16px;
		margin: 0 8px 8px 0;
	}

`))
document.getElementsByTagName('head')[0].appendChild(cM_style)
