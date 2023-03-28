//extract html, css and javascript from the message
const extractCode = (message) => {
  const regexHtml = /---starthtml---([\s\S]*?)---endhtml---/;
  const regexCss = /---startcss---([\s\S]*?)---endcss---/;
  const regexJs = /---startjs---([\s\S]*?)---endjs---/;

  console.log(message.match(regexHtml)[1]);
  const html = message.match(regexHtml) ? message.match(regexHtml)[1] : "";
  const css = message.match(regexCss) ? message.match(regexCss)[1] : "";
  const js = message.match(regexJs) ? message.match(regexJs)[1] : "";
  return { html, css, js };
};

//updating preview
const updatePreview = (codes) => {
  // console.log("preview codes");
  // console.log(codes);
  const iframe = document.getElementById("preview"); //iframe with id 'preview' in Preview component
  const iframeContent = iframe.contentDocument;
  iframeContent.open();
  iframeContent.write(
    `<style>${codes.css}</style>${codes.html}<script>${codes.js}</script>` //write content in iFrame with the extracted code from message
  );
  iframeContent.close();
};

export { extractCode, updatePreview };
