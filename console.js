let consoleBt = document.createElement('div')
Object.assign(consoleBt.style, {
	position: 'fixed',
	left: '10px',
	top: '10px',
	borderRadius: '50%',
	backgroundColor: '#00000080',
	backgroundImage: "url('https://github.com/Djalmir/consoleMobile/blob/0.0.2/floatButton.png?raw=true')",
	boxShadow: 'inset 0 0 0 2px #0030cc',
	backgroundSize: '100%',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	zIndex: '9999',
	color: '#fff',
	cursor: 'pointer',
	userSelect: 'none'
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
	localStorage.setItem('consoleBt.x', consoleBt.style.left)
	localStorage.setItem('consoleBt.y', consoleBt.style.top)
}

document.ontouchend = document.onmouseup

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

let h1 = document.createElement('h1')
h1.innerText = 'CONSOLE'
Object.assign(h1.style, {
	background: '#0000004d',
	margin: '0',
	padding: '20px 12px 40px',
	position: 'sticky',
	left: '0',
	borderBottom: '1px solid #0060ff',
	fontFamily: 'sans-serif'
})
container.appendChild(h1)

let pre = document.createElement('pre')
pre.id = 'pre'
Object.assign(pre.style, {
	position: 'relative',
	width: '100%',
	margin: '0',
	padding: '0 50px 50px 12px',
	boxSizing: 'border-box',
	fontSize: '14px',
	overflow: 'auto'
})

let style = document.createElement('style')
if (style.styleSheet) {
	style.styleSheet.cssText = `
	#pre ::-webkit-scrollbar {
		background: transparent;
		width: 2px;
		height: 0;
	}
	
	#pre ::-webkit-scrollbar-track {
		background: #612c7d4d;
	}
	
	#pre ::-webkit-scrollbar-thumb {
		background: #612c7d;
		box-shadow: inset 0px 0px 5px #00000080;
	}
	
	#pre ::selection {
		background: #612c7d;
		color: #fff;
	}
	`
}
else {
	style.appendChild(document.createTextNode(`
	#pre::-webkit-scrollbar {
		background: transparent!important;
		width: 8px;
		height: 0;
	}
	
	#pre::-webkit-scrollbar-track {
		background: #0060ff4d;
	}
	
	#pre::-webkit-scrollbar-thumb {
		background: #0030cc;
		box-shadow: inset 0px 0px 5px #00000080;
	}
	
	#pre ::selection {
		background: #0030cc;
		color: #fff;
	}
	`))
}
document.getElementsByTagName('head')[0].appendChild(style)


let output = document.createElement('code')
output.id = 'output'
Object.assign(output.style, {
	tabSize: '20px'
})

pre.appendChild(output)
container.appendChild(pre)

let input = document.createElement('input')
input.type = 'text'
input.autocomplete = 'off'
input.id = 'input'
Object.assign(input.style, {
	width: '100%',
	backgroundColor: '#0000004d',
	border: 'none',
	outline: 'none',
	padding: '8px 12px',
	boxSizing: 'border-box',
	fontSize: '16px',
	color: '#fff',
	borderBottom: '1px solid #0060ff'
})
input.onkeypress = callConsole
container.addEventListener('dblclick', (e) => {
	e.preventDefault()
	pre.scrollTo(0, pre.offsetHeight + 999)
	input.focus()
}, {passive: false})

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
				JSON.stringify(item, null, 2)
			}
		}
		else
			items[i] = item
		// items[i] = (typeof item === 'object' ? item.tagName ? item.outerHTML : JSON.stringify(item, null, 2) : item)
	})
	output.innerText += `\n${ items.join('') }\n`
	pre.scrollTo(0, pre.offsetHeight + 200)
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
}