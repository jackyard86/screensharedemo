import { WebSR } from '@websr/websr'

async function main() {
    const gpu = await WebSR.initWebGPU();
    if (!gpu) {
        console.log("Browser/device doesn't support WebGPU");
        return;
    }

    const videoelem = document.getElementById("client-video");
    const canvaselem = document.getElementById("client-canvas");
    const weights = await (await fetch('./models/cnn-2x-l-rl.json')).json();

    const websr = new WebSR({
        videoelem,
        network_name: "anime4k/cnn-2x-l",
        weights,
        gpu,
        canvaselem
    });

    await websr.start();

    const button = document.getElementById("join");
    button.addEventListener("click", () => {
        document.location = "index.html";
    });
}

main().catch(err => {
    console.error("An error occurred while initializing:", err);
});
