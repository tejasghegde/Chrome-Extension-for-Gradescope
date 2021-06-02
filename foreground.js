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
            var row1 = document.getElementsByClassName("odd");   // querySelectorAll('[role="row"]')
            var score1 = [];
            for (var i = 0; i < row1.length; i++) {
                if (!(row1[i].innerHTML.includes("Submitted")) &&
                !(row1[i].innerHTML.includes("No Submission")) &&
                !(row1[i].innerHTML.includes("Ungraded"))) {
                    var y1 = row1[i].innerHTML;
                    var a1 = y1.split("score\">");
                    var b1 = a1[1];
                    var c1 = b1.split("</div");
                    var d1 = c1[0];  // this is the score. Ex: 1.0 / 1.0
                    score1.push(d1);
                } else {
                    score1.push("None");
                }
            }

            var row2 = document.getElementsByClassName("even");   // querySelectorAll('[role="row"]')
            var score2 = [];
            for (var i = 0; i < row2.length; i++) {
                if (!(row2[i].innerHTML.includes("Submitted")) &&
                !(row2[i].innerHTML.includes("No Submission")) &&
                !(row2[i].innerHTML.includes("Ungraded"))) {
                    var y2 = row2[i].innerHTML;
                    var a2 = y2.split("score\">");
                    var b2 = a2[1];
                    var c2 = b2.split("</div");
                    var d2 = c2[0];  // this is the score. Ex: 1.0 / 1.0
                    score2.push(d2);
                } else {
                    score2.push("None");
                }
            }
            var score_list = [];
            for (var i = 0; i < row1.length + row2.length; i++) {
                if (i%2 == 0) {
                    score_list.push(score1.shift());
                } else {
                    score_list.push(score2.shift());
                }
            }            

            // code for parsing page based on user's input.

            var name_list = document.getElementsByClassName("table--primaryLink");
            var new_list = [];
            for (var j = 0; j < name_list.length; j++){
                if (name_list[j].children[0] != undefined) {
                    new_list.push(name_list[j].children[0].innerHTML); // push the name
                } else {
                    new_list.push("None")
                }
            }

            var targets = [];
            for (var i = 0; i < new_list.length; i++) {
                if (new_list[i].includes(ce_input.value) === true) {
                    targets.push(i);
                } else if (ce_input.value == "Homework" && 
                new_list[i].includes("HW")) {
                            targets.push(i);
                }
            }

            var numerator = 0;
            var denominator = 0;
            for (var i = 0; i < targets.length; i++) {
                if (score_list[targets[i]] != "None") {
                    var fraction = score_list[targets[i]].split(" ");
                numerator += Number(fraction[0]);
                denominator += Number(fraction[2]);
                }
            }

            var answer = numerator/denominator;
            answer = Math.round(answer * 10000)/100;
            answer = answer.toString() + "%";

            ce_name.innerHTML = `Percentage: ${answer}`;
        }
    });
});


