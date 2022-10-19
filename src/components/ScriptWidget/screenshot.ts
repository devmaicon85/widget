import html2canvas from "html2canvas";

export async function widgetScreenshot() {
    const doc = document.body;
    const canvas = await html2canvas(doc);

    return canvas.toDataURL("images/png");
}
