let consoleBt = document.createElement('div')
Object.assign(consoleBt.style, {
	position: 'fixed',
	left: '10px',
	top: '10px',
	borderRadius: '50%',
	background: 'radial-gradient(#0000004d 40%, #0060ff)',
	//border: '2px solid #0060ff',
	backdropFilter: 'blur(10px)',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	zIndex: '9999',
	color: '#fff',
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
	background: 'radial-gradient(#0000004d 40%, #ff6000)',
	backdropFilter: 'blur(10px)',
	//border: '2px solid #ff60003d',
	width: '40px',
	height: '40px',
	webkitTapHighlightColor: 'transparent',
	zIndex: '9999',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	userSelect: 'none'
})
clearConsoleBt.innerHTML = '&#X1F5D1'

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

let pre = document.createElement('pre')
pre.id = 'pre'
Object.assign(pre.style, {
	width: '100%',
	margin: '0',
	padding: '0 0 50px 0',
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
	fontFamily: 'courier sans-serif'
})
pre.appendChild(h1)

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
	color: '#3582fd',
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
let h = ['left', 'center', 'right']
let v = ['top', 'center', 'bottom']
function showHideConsole() {
	showingConsole = !showingConsole
	if (showingConsole) {
		container.style.transformOrigin=`${h[Math.floor(Math.random()*3)]} ${v[Math.floor(Math.random()*3)]}`
		container.style.display = 'flex'
		setTimeout(function() {
			container.style.transform='scale(1)'
		}, 10)
		
	}
	else{
		container.style.transform='scale(0)'
		container.addEventListener('transitionend',hideConsole)
	}
}

function hideConsole(){
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
	output.classList.add('output')
	output.innerText += `${ items.join(' ') }\n`
	pre.appendChild(output)
	pre.scrollTo(0, pre.offsetHeight + 200)
}

function consoleInput(data) {
	let text = document.createElement('p')
	text.innerText = data
	Object.assign(text.style, {
		margin: '30px auto 0',
		padding: '0 12px',
		boxSizing: 'border-box',
		color:'#3582fd',
		width: '95%',
		overflow: 'auto'
	})
	pre.appendChild(text)
	try {
		console.log(eval(data))
	}
	catch (e) {
		let errorDiv = document.createElement('div')
		errorDiv.classList.add('errorDiv')

		let span = document.createElement('span')
		span.classList.add('error-span')
		span.innerText = e.stack + ' '
		errorDiv.appendChild(span)

		pre.appendChild(errorDiv)
	}
	finally{
		pre.scrollTo(0, pre.offsetHeight + 200)
	}
}

function callConsole(e) {
	if (e.key == 'Enter' && input.value.trim()!='') {
		consoleInput(input.value)
		input.value = ''
	}
}

function clearConsole() {
	pre.innerHTML = ''
	pre.appendChild(h1)
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

window.onerror = (msg, url, lineNo, columnNo, error) => {
	let errorDiv = document.createElement('div')
	errorDiv.classList.add('errorDiv')

	let b = document.createElement('b')
	b.classList.add('error-b')
	b.innerText = msg + ' '
	errorDiv.appendChild(b)

	let urlSpan = document.createElement('span')
	urlSpan.classList.add('urlSpan')

	let a = document.createElement('a')
	a.href = url
	a.target = '_blank'
	a.innerText = url
	a.classList.add('error-a')
	urlSpan.appendChild(a)

	let span = document.createElement('span')
	span.classList.add('error-lineCol-span')
	span.innerText = `Linha: ${ lineNo }	Coluna: ${ columnNo }`
	urlSpan.appendChild(span)

	errorDiv.appendChild(urlSpan)

	pre.appendChild(errorDiv)
	pre.scrollTo(0, pre.offsetHeight + 200)
}

let style = document.createElement('style')
style.appendChild(document.createTextNode(`
	// #pre::-webkit-scrollbar {
	// 	background: transparent!important;
	// 	width: 0;
	// 	height: 0;
	// }
	
	// #pre::-webkit-scrollbar-track {
	// 	background: #0060ff4d;
	// }
	
	// #pre::-webkit-scrollbar-thumb {
	// 	background: #0030cc;
	// 	box-shadow: inset 0px 0px 5px #00000080;
	// }
	
	#pre ::selection {
		background: #0030cc;
		color: #fff;
	}

	.output{
		tab-size: 20px;
		background: #0060ff2d;
		margin: 2px auto;
		padding: 12px 20px;
		box-sizing: border-box;
		border-radius: .2rem;
		width: 95%;
		overflow-x: auto;
		border: 1px solid #0000004d;
	}

	.errorDiv {
		background: #ff60003d;
		margin: 2px auto;
		padding: 20px;
		box-sizing: border-box;
		border-radius: .2rem;
		width: 95%;
		overflow-x: auto;
		border: 1px solid #0000004d;
	}

	// .output::-webkit-scrollbar,
	// .errorDiv::-webkit-scrollbar {
	// 	background: transparent!important;
	// 	width: 0;
	// 	height: 0;
	// }
	
	// .output::-webkit-scrollbar-track,
	// .errorDiv::-webkit-scrollbar-track {
	// 	background: #0060ff4d;
	// 	border-radius: 0 0 1rem 1rem;
	// }
	
	// .output::-webkit-scrollbar-thumb,
	// .errorDiv::-webkit-scrollbar-thumb {
	// 	background: #0030cc;
	// 	box-shadow: inset 0px 0px 5px #00000080;
	// 	border-radius: 0 0 1rem 1rem;
	// }
	
	.output ::selection,
	.errorDiv ::selection {
		background: #0030cc;
		color: #fff;
	}

	.error-b {
		font-weight: bolder;
		font-size: 18px;
		color: #ff6000;
	}

	.urlSpan {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-itens: center;
		margin-top: 8px;
	}

	.error-a {
		color: #0060ff;
		font-size: 16px;
		margin: 0 8px 8px 0;
	}

`))
document.getElementsByTagName('head')[0].appendChild(style)
