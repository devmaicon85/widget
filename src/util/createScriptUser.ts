import {
    DataScript,
    DataScriptIndexs,
    DataScriptType,
} from "../types/DataScriptTypes";

export function createScriptUser(props: DataScriptType) {
    // retorna o script que o usuário deve inserir no site dele.

    let script = "";
    Object.entries(DataScript).map(([key]) => {
        script += ` data-${key}="${props[key as DataScriptIndexs]}" `;
    });

    script = `<script async ${script} src="${window.location.origin}/widget.js"></script>`;
    // console.log(script);

    return script;
    // return `<script
    //         async
    //         data-theme="${props.theme}"
    //         data-title="${props.title}"
    //         data-email="${props.email}"
    //         data-whatsapp="${props.whatsapp}"
    //         data-open="${props.open}"
    //         data-screenshot="${props.screenshot}"

    //         src="${window.location.origin}/widget.js"></script>`;
}

export function executeScriptUser(props: DataScriptType) {
    // executa o script na pagina home
    let script: HTMLScriptElement;
    const htmlElement = document.getElementById("scriptWidgetDev");

    if (htmlElement) {
        script = htmlElement as HTMLScriptElement;
        document.body.removeChild(script);
    }

    script = document.createElement("script");

    script.id = "scriptWidgetDev";
    script.src = `${window.location.origin}/widget.js`;
    script.async = true;

    Object.entries(DataScript).map(([key, item]) => {
        script.setAttribute(`data-${key}`, props[key as DataScriptIndexs]);
    });

    // script.setAttribute("data-title", props.title);
    // script.setAttribute("data-email", props.email);
    // script.setAttribute("data-whatsapp", props.whatsapp);
    // script.setAttribute("data-open", props.open);
    // script.setAttribute("data-screenshot", props.screenshot);

    document.body.appendChild(script);
    // document.body.removeChild(script);
}
