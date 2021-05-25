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

if(typeof chrome.app.isInstalled!=='undefined'){
    chrome.runtime.sendMessage({
        message: "get_name"
    }, response => {
        if (response.message == "success") {
            ce_name.innerHTML = `Percentage: 0%`
        }
    }); 
}
ce_button.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        message: "change_name",
        payload: ce_input.value
    }, response => {
        if (response.message === "success") {
            var x = document.getElementsByClassName("submissionStatus--score");
            var score_list = [];
            var i;
            for (i = 0; i < x.length; i++) {
                score_list.push(x[i].innerHTML);
            }

            var row = document.getElementsByClassName("odd");
            var tejas = [];
            for (var i = 0; i < row.length; i++) {
                var y = row[i].innerHTML.split("Submitted");
                if (y === row[i].innerHTML) {
                    var row1 = document.getElementsByClassName("submissionStatus--score");
                }
            }
            //Proficiency Check 1A: Variable Attributes (Final Try)
            //Submitted
            ce_name.innerHTML = `Percentage: ${row[0]}`

            // code for parsing page based on user's input.

            // var name_list = document.getElementsByClassName("table--primaryLink");
            // var new_list = [];
            // for (var j = 0; j < name_list.length; j++){
            //     if(typeof score_list[j] !== 'undefined')
            //         new_list.push([name_list[j],score_list[j]]) // push an array with [name, score]
            // }
            
            // var targets = [];
            // for (var i = 0; i < new_list.length; i++){
            //     if (new_list[i][0].innerHTML.includes(ce_input.value)){
            //         if (typeof new_list[i][1] !== 'undefined'){
            //             targets.push(new_list[i][1])
            //         }
            //     }
            // }
            // var numerator = 0;
            // var denominator = 0;
            // for (var j = 0; j < targets.length; j++) {
            //     var fraction = targets[j].split(" ");
            //     numerator += Number(fraction[0]);
            //     denominator += Number(fraction[2]);
            // }
            // var answer = numerator/denominator;
            // answer = Math.round(answer * 10000)/100;
            // answer = answer.toString() + "%";
            // ce_name.innerHTML = `Percentage: ${targets}`
        }
    });
});


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === "change_name") {
//         ce_name.innerHTML = `Hello ${request.payload}`;
//     }
// });