import { DataScript } from "../../types/DataScriptTypes";
import { widgetScreenshot } from "./screenshot";

// SCRIPT PUBLICO DO USUARIO
// A CADA MUDANÇA NESSE ARQUIVO RODAR NPM RUN DEV OU BUILD para gerar o arquivo widget.js NA PASTA PUBLIC

const iframeWidget = "iframeWidget";

(function () {
    const doc = document.currentScript;

    if (!doc) return false;

    const src = doc.getAttribute("src")!;

    let srcIframe = src; //http://widget.online/widget.js
    srcIframe = src.slice(0, src.lastIndexOf("/")); //http://widget.online
    srcIframe += "/widget?";

    Object.entries(DataScript).map(([key, item]) => {
        srcIframe += `${key}=${
            doc.getAttribute(`data-${key}`) ?? item.default
        }&`;
    });

    // const theme = doc.getAttribute("data-theme") ?? "0";
    // const title = doc.getAttribute("data-title") ?? "Deixe seu WedFeedback";
    // const email = doc.getAttribute("data-email") ?? "oi@widgetdev.online";
    // const whatsApp = doc.getAttribute("data-whatsapp") ?? "";
    // const open = doc.getAttribute("data-open") ?? "true";
    // const dataScreenshot = doc.getAttribute("data-screenshot") ?? "true";

    // srcIframe += `?theme=${theme}`;
    // srcIframe += `&title=${title}`;
    // srcIframe += `&email=${email}`;
    // srcIframe += `&whatsapp=${whatsApp}`;
    // srcIframe += `&open=${open}`;
    // srcIframe += `&screenshot=${dataScreenshot}`;

    srcIframe = encodeURI(srcIframe);

    let iFrame: HTMLIFrameElement;
    let iFrameElement = document.getElementById(iframeWidget);

    if (!iFrameElement) {
        iFrame = document.createElement("iframe");
        iFrame.id = iframeWidget;
        iFrame.tabIndex = 0;

        iFrame.title = "iframe Widget";
        iFrame.scrolling = "no";
        iFrame.setAttribute(
            "style",
            "position:fixed; background-color:transparent; border:0px; height:75px; width:66px; right:20px; bottom:10px;  z-index:999998; opacity: 1; overflow:hidden; padding: 0px; transition-duration: 250ms; transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1); transition-property: opacity, top, bottom;"
        );
        document.body.appendChild(iFrame);
        iFrameElement = document.getElementById(iframeWidget);
    }

    if (!iFrameElement) {
        console.log("element widget não criado e/ou localizado!");
        return false;
    }

    iFrame = iFrameElement as HTMLIFrameElement;
    iFrame.src = srcIframe;

    iFrame.onload = function () {
        if (isIFrame(iFrame) && iFrame.contentWindow) {
            iFrame.contentWindow.postMessage("widgetdev ok", "*");
        }

        if (window.addEventListener) {
            window.addEventListener("message", OnMessage, false);
        }
    };
})();

const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === "IFRAME";

async function OnMessage(e: MessageEvent) {
    // AQUI É O EVENT QUANDO O SITE HOSPEDEIRO RECEBE UMA MENSAGEM DO IFRAME

    let width = e.data.width;
    let height = e.data.height;

    const iFrameElement = document.getElementById(iframeWidget);
    if (!iFrameElement) {
        console.log("element widget não foi localizado na página!");
        return false;
    }

    // IFRAME SOLICITOU UM SCREENSHOT?
    let screenshot = e.data.screenshot;
    if (screenshot) {
        const base64image = await widgetScreenshot();

        const iFrame = iFrameElement as HTMLIFrameElement;

        // envia o screenshot em base64image PARA O IFRAME
        if (isIFrame(iFrame) && iFrame.contentWindow) {
            iFrame.contentWindow.postMessage({ base64image }, "*");
        }
    }

    if (height < 75) {
        height = 75; // altura do botao minimo pra ter animação
    }

    if (window.screen.width < 400) {
        width = window.screen.width;
    }

    iFrameElement.style.width = width + "px";
    iFrameElement.style.height = height + "px";
}

// export { openWidget };
