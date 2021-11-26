import { promises as fs } from "fs";
import hljs from "highlight.js";
import Window from 'window';
global.document = new Window().document;

hljs.configure({ ignoreUnescapedHTML: true })
const { highlight, highlightElement } = hljs

main()

async function main() {

    const lang = "html"
    const htmlCode = `<a href="url"> Link </a>`
    const htmlRaw = `&lt;a href="<mark>url</mark>"&gt; Link &lt;/a&gt;`

    const reg = highlightCode(lang, htmlCode)
    const raw = highlightRaw(lang, htmlRaw)

    const html = `
<html>
<title>HighlightJS Demo</title>
<body>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github.min.css" />

<h3>Highlight Code</h3>
<pre><code class="language-${lang} hljs">${reg}</code></pre>

<h3>Highlight Raw</h3>
<pre><code class="language-${lang} hljs">${raw}</code></pre>

</body>
</html>
`

    await fs.writeFile("index.html", html)

}


function highlightCode(lang, value) {
    const result = highlight(value, { language: lang})
    return result.value
}

function highlightRaw(lang, value) {
    // get window methods


    // create text as node
    const pre = document.createElement('pre');
    pre.innerHTML = `<code class="language-${lang}">${value}</code>`
    const node = pre.childNodes[0]

    // https://github.com/highlightjs/highlight.js/issues/2886
    highlightElement(node)

    return node.innerHTML;
}
