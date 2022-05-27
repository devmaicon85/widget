export function postMessageFrameParent() {
    let height = document.getElementById("popover")?.offsetHeight ?? 0;
    let width = document.getElementById("popover")?.offsetWidth ?? 0;

    width += 10;
    height += 10;
    window.parent.postMessage({ width, height }, "*");
    // console.log(`Send window.parent width:${width} height: ${height}`);
}

// ENVIAR O SCREENSHOT PARA O WINDOW.PARENT (SITE HOSPEDEIRO)
export function postMessageScreenshotFrameParent() {
    window.parent.postMessage({ screenshot: true }, "*");
    // console.log("Enviado para window.parent screenshot: true");
}
