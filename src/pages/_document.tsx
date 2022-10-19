import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-br">
                <Head>
                <link
                    rel="shortcut icon"
                    href={"/assets/favicon.svg"}
                    type="image/svg"
                />
                    {/* // NAO PODE EXCLUIR HEAD MESMO VAZIO CASO CONTRARIO PERDE TODO O CSS */}
                </Head>
                <body>
                    <Main />
                    <div id="root_modal"></div>
                    <NextScript />
                </body>
            </Html>
        );
    }
}
