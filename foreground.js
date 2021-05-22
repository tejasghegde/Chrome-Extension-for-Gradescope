const ce_main_container = document.createElement("DIV");
const ce_name = document.createElement("DIV");
const ce_input = document.createElement("INPUT");
const ce_button = document.createElement("DIV");

ce_main_container.classList.add("ce_main");
ce_name.id = "ce_name";
ce_input.id = "ce_input";
ce_button.id = "ce_button";

ce_name.innerHTML = `Percentage: NAME`;
ce_button.innerHTML = `Calculate Score`;

ce_main_container.appendChild(ce_name);
ce_main_container.appendChild(ce_input);
ce_main_container.appendChild(ce_button);

document.querySelector("body").appendChild(ce_main_container);

chrome.runtime.sendMessage({
    message: "get_name"
}, response => {
    if (response.message == "success") {
        ce_name.innerHTML = `Percentage: ${response.payload}`
    }
}); 

ce_button.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        message: "change_name",
        payload: ce_input.value
    }, response => {
        if (response.message === "success") {
            var x = document.getElementsByClassName("submissionStatus--score");
            var y = [];
            var i;
            for (i = 0; i < x.length; i++) {
                y.push((x[i].innerHTML));
            }
            
            var numerator = 0;
            var denominator = 0;
            var j;
            for (j = 0; j < x.length; j++) {
                var fraction = y[j].split(" ");
                numerator += Number(fraction[0]);
                denominator += Number(fraction[2]);
            }
            var answer = numerator/denominator;
            var rounded = Math.round(answer * 10000)/100;
            var final = rounded.toString() + "%";
            ce_name.innerHTML = `Percentage: ${final}`  // ${ce_input.value}
            console.log(res)
        }
    });
});


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === "change_name") {
//         ce_name.innerHTML = `Hello ${request.payload}`;
//     }
// });