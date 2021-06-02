const ce_main_container = document.createElement("DIV");
const ce_button = document.createElement("DIV");

ce_main_container.classList.add("ce_main");
ce_button.id = "ce_button";

ce_button.innerHTML = `GS`;

ce_main_container.appendChild(ce_button);

document.querySelector("body").appendChild(ce_main_container);

ce_button.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        message: "clicked",
    }, response => {
        if (response.message === "proceed") {
            
        }
    });
});