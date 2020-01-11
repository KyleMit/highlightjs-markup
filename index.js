const hljs = require("highlight.js")

main()

async function main() {

    let lang = "html"
    let htmlCode = `<a href="url"> Link </a>`
    let htmlRaw = `&lt;a href="<mark>url</mark>"&gt; Link &lt;/a&gt;`

    let reg = highlightCode(lang, htmlCode)
    let raw = highlightRaw(lang, htmlRaw)

    console.log(reg)
    console.log(raw)

    let html = `
    <html>
    <body>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/styles/github.min.css" />
    
    <h3>Highlight Code</h3>
    <pre><code class="language-${lang} hljs">${reg}</code></pre>
    
    <h3>Highlight Raw</h3>
    <pre><code class="language-${lang} hljs">${raw}</code></pre>
    
    </body>
    </html>
    `

    const { promises: fs } = require("fs");

    await fs.writeFile("index.html", html)

}


function highlightCode(lang, value) {
    let codeSourceHighlight = hljs.highlight(lang, value).value
    return codeSourceHighlight
}

function highlightRaw(lang, value) {
    // get window methods
    const Window = require('window');
    const window = new Window();

    // make document available globally
    document = window.document

    // create text as node
    let pre = window.document.createElement('pre');
    pre.innerHTML = `<code class="language-${lang}">${value}</code>`
    let node = pre.childNodes[0]

    hljs.highlightBlock(node)

    return node.innerHTML;
}