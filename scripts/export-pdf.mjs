// Renders print.html (dev-only entry, not deployed) to an A4 PDF with headless Chrome over CDP.
// Usage: npm run pdf -- [output.pdf]   (default: ./portfolio.pdf)
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createServer } from 'vite'

const output = resolve(process.argv[2] ?? 'portfolio.pdf')
const browsers = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean)
const browserPath = browsers.find((path) => existsSync(path))
if (!browserPath) throw new Error('Chrome/Edge를 찾지 못했습니다. CHROME_PATH를 지정하세요.')

const sleep = (ms) => new Promise((done) => setTimeout(done, ms))

const server = await createServer({ server: { port: 5199, strictPort: false }, logLevel: 'error' })
await server.listen()
const pageUrl = `${server.resolvedUrls.local[0]}print.html`

const profileDir = mkdtempSync(join(tmpdir(), 'portfolio-pdf-'))
const port = 9333
const chrome = spawn(browserPath, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' })

try {
  let target
  for (let attempt = 0; !target && attempt < 50; attempt++) {
    await sleep(200)
    target = await fetch(`http://127.0.0.1:${port}/json/list`).then((res) => res.json()).then((list) => list.find((item) => item.type === 'page')).catch(() => undefined)
  }
  if (!target) throw new Error('헤드리스 브라우저에 연결하지 못했습니다.')

  const socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((done, fail) => { socket.onopen = done; socket.onerror = fail })
  let nextId = 0
  const pending = new Map()
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    if (!pending.has(message.id)) return
    const { done, fail } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) fail(new Error(message.error.message))
    else done(message.result)
  }
  const send = (method, params = {}) => new Promise((done, fail) => {
    const id = ++nextId
    pending.set(id, { done, fail })
    socket.send(JSON.stringify({ id, method, params }))
  })

  await send('Page.enable')
  await send('Page.navigate', { url: pageUrl })
  for (let attempt = 0; attempt < 100; attempt++) {
    const { result } = await send('Runtime.evaluate', { expression: 'document.documentElement.dataset.ready === "true" && [...document.images].every((img) => img.complete)', returnByValue: true })
    if (result.value) break
    await sleep(200)
  }
  await sleep(300)

  const { data } = await send('Page.printToPDF', { preferCSSPageSize: true, printBackground: true, generateDocumentOutline: true, generateTaggedPDF: true })
  writeFileSync(output, Buffer.from(data, 'base64'))
  socket.close()
  console.log(`PDF 저장: ${output}`)
} finally {
  chrome.kill()
  await server.close()
  await sleep(500)
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
}
