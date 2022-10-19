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
            doc.getAttribute(`data-${key}`)
                ? encodeURIComponent(doc.getAttribute(`data-${key}`) ?? "")
                : item.default
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

        iFrame.style.boxSizing = "border-box";
        iFrame.style.width = "60px";
        iFrame.style.height = "70px";
        iFrame.style.border = "0px";
        iFrame.style.right = "20px";
        iFrame.style.bottom = "10px";
        iFrame.style.opacity = "1";
        iFrame.style.backgroundColor = "transparent";
        iFrame.style.position = "fixed";
        iFrame.style.zIndex = "999999";
        iFrame.style.overflow = "hidden";
        iFrame.style.padding = "0px";
        iFrame.style.transitionDuration = "250ms";
        iFrame.style.transitionTimingFunction = "250ms";
        // iFrame.style.transitionDuration =
        //     "cubic-bezier(0.645, 0.045, 0.355, 1)";
        iFrame.style.transitionProperty = "all"; //, top, bottom

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
    const screenshot = e.data.screenshot;
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

    // se a tela é de celular
    // e o widget esta aberto
    if (window.screen.width < 500 && width > 200) {
        width = window.screen.width;

        iFrameElement.style.right = "0px";
        iFrameElement.style.bottom = "0px";
    }

    // if (window.screen.height < 600 && width > 200) {
    //     // height = window.screen.height;
    // }

    iFrameElement.style.border = "0px solid #00FF00";
    iFrameElement.style.maxHeight = window.screen.height + "px";
    iFrameElement.style.maxWidth = window.screen.width + "px";

    iFrameElement.style.width = width + "px";
    iFrameElement.style.height = height + "px";

    console.log(" frame height::", iFrameElement.style.width);
    console.log(" frame width::", iFrameElement.style.height);

    // se mudar o tamanho da tela do site
    window.addEventListener("resize", function () {
        // se a tela é de celular
        // e o widget esta aberto

        iFrameElement.style.maxHeight = window.screen.height + "px";
        iFrameElement.style.maxWidth = window.screen.width + "px";
    });
}

// export { openWidget };
