
export default function showDialog(dialogEl) {
    const btnYes = dialogEl.querySelector("button.yes");
    const btnNo = dialogEl.querySelector("button.no");
    $(dialogEl).modal("show");
    const promise = new Promise((resolve, reject) => {
        btnYes.onclick = resolve;
        btnNo.onclick = reject;
    });
    return promise;
}
