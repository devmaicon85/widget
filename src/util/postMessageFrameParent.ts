export function postMessageFrameParent() {
    const height = document.getElementById("popover")?.offsetHeight ?? 0;
    const width = document.getElementById("popover")?.offsetWidth ?? 0;
    window.parent.postMessage({ width, height }, "*");
    // console.log(`Widget width: ${width} height: ${height}`);
}

// ENVIAR O SCREENSHOT PARA O WINDOW.PARENT (SITE HOSPEDEIRO)
export function postMessageScreenshotFrameParent() {
    window.parent.postMessage({ screenshot: true }, "*");
    // console.log("Enviado para window.parent screenshot: true");
}
