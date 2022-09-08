// Wrapping in a function to not leak/modify variables if the script
// was already inserted before.
(function() {
    if (window.hasRun === true) {
        window.hasRun = false;
        return true;  // Will ultimately be passed back to executeScript
    } else {
        window.hasRun = true;
    }

    const container = document.createElement("DIV");

    const ce_header = document.createElement("DIV");

    const ce_button = document.createElement("DIV");

    const ce_main_container = document.createElement("DIV");
    const ce_name = document.createElement("DIV");
    const ce_input = document.createElement("INPUT");

    const ce_span = document.createElement("DIV");
    const ce_name2 = document.createElement("DIV");
    const ce_value = document.createElement("DIV");

    const ce_toggle = document.createElement("DIV");
    const ce_button2 = document.createElement("INPUT");
    const ce_button3 = document.createElement("INPUT");

    const ce_weight_container = document.createElement("DIV");
    const ce_weight = document.createElement("DIV");
    const ce_weight_input = document.createElement("INPUT");

    container.id = "container";

    ce_header.id = "ce_header";
    ce_header.innerHTML = `Percentage: 0%`;

    ce_button.id = "ce_button";
    ce_button.innerHTML = "Calculate Score";
    ce_button.type = "button";

    ce_main_container.id = "ce_main_container";
    ce_name.id = "ce_name";
    ce_input.id = "ce_input";
    ce_name.innerHTML = `Category`;

    ce_span.id = "ce_span";
    ce_name2.id = "ce_name2";
    ce_value.id = "ce_value";
    var x = 0;
    ce_name2.innerHTML = `Drops`;
    ce_value.innerHTML = x;

    ce_toggle.id = "toggler";
    ce_button2.id = "ce_button2";
    ce_button2.value = "+";
    ce_button2.type = "button";
    ce_button3.id = "ce_button3";
    ce_button3.value = "–";
    ce_button3.type = "button";

    ce_weight_container.classList.add("weight");
    ce_weight.id = "ce_weight";
    ce_weight_input.id = "ce_weight_input";
    var weightage = 100;
    ce_weight.innerHTML = `Weight`

    const ce_table = document.createElement("TABLE")
    const ce_table_container1 = document.createElement("TR");
    const ce_table_category = document.createElement("TD");
    const ce_table_weight = document.createElement("TD");
    const ce_table_score = document.createElement("TD");

    ce_table_container1.id = "table1";
    ce_table_category.id = "table_category";
    ce_table_weight.id = "table_weight";
    ce_table_score.id = "table_score";

    ce_table_category.innerHTML = `Category`;
    ce_table_weight.innerHTML = `Weight`;
    ce_table_score.innerHTML = `Score`;

    var table_data = [];

    ce_main_container.append(ce_name, ce_input);

    ce_toggle.append(ce_button2, ce_button3);

    ce_span.append(ce_name2, ce_value, ce_toggle);

    ce_weight_container.append(ce_weight, ce_weight_input);

    ce_table_container1.append(ce_table_category, ce_table_weight,
        ce_table_score);
    
    ce_table.append(ce_table_container1);

    container.append(ce_header, ce_main_container, 
        ce_weight_container, ce_span, ce_button,
        ce_table);

    document.querySelector("body").append(container);

    dragElement(document.getElementById("container"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        document.getElementById("ce_header").onmousedown = dragMouseDown;
    

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

    if (document.getElementById("ce_button") !== null) {
        chrome.runtime.sendMessage({
            message: "remove"
        }); 
    }

    ce_button2.addEventListener("click", () => {
        x++
        ce_value.innerHTML = `${x}`;
    })

    ce_button3.addEventListener("click", () => {
        if (x > 0) {
            x--;
            ce_value.innerHTML = `${x}`;
        }
    })

    ce_button.addEventListener("click", () => {
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
                } else if (row1[i].innerHTML.includes("No Submission")) {
                    score1.push("None")
                } else {
                    score1.push("Not yet");
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
                } else if (row2[i].innerHTML.includes("No Submission")){
                    score2.push("None");
                } else {
                    score2.push("Not yet");
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
                if (new_list[i].toLowerCase().includes(ce_input.value.toLowerCase()) === true) {
                    targets.push(i);
                } else if (ce_input.value.toLowerCase() == "homework" && 
                new_list[i].includes("HW")) {
                            targets.push(i);
                }
            }
            
            if (targets.length === 0) {
                ce_header.innerHTML = `Invalid category, reload page`;
                return;
            }
            var percentage_list = [];
            for (var i = 0; i < targets.length; i++) {
                if (score_list[targets[i]] != "Not yet") {
                    if (score_list[targets[i]] != "None") {
                        var fraction = score_list[targets[i]].split(" ");
                        var numerator2 = Number(fraction[0]);
                        var denominator2 = Number(fraction[2]);
                        percentage_list.push([(numerator2 / denominator2), targets[i]])
                    } else {
                        percentage_list.push([0.0, targets[i]]);
                    }
                }
            }

            if (x >= 1) {
                for (var i = 0; i < x; i++) {
                    for (j = 0; j < percentage_list.length - 1; j++) {
                        if (percentage_list[j][0] < percentage_list[j + 1][0]) {
                            var tmp = percentage_list[j];
                            percentage_list[j] = percentage_list[j + 1];
                            percentage_list[j + 1] = tmp;
                        }   
                    }
                    percentage_list.pop();
                }
            }

            x = 0;
            ce_value.innerHTML = `${x}`;
            
            var new_targets = [];
            for (var i = 0; i < percentage_list.length; i++) {
                new_targets.push(percentage_list[i][1]);
            }

            var numerator = 0;
            var denominator = 0;
            for (var i = 0; i < new_targets.length; i++) {
                if (score_list[new_targets[i]] != "None" && 
                        score_list[new_targets[i]] != "Not yet") {
                    var fraction = score_list[new_targets[i]].split(" ");
                    numerator += Number(fraction[0]);
                    denominator += Number(fraction[2]);
                }
            }

            var answer = numerator/denominator;
            if (ce_weight_input.value != "") {
                weightage = ce_weight_input.value;
            }
            answer = Math.round(answer * 10000)/100;
            answer = answer.toString() + "%";
            weightage = 100;
            

            if (ce_input.value == "") {
                table_data.push(["Overall", 100, parseFloat(answer)])
            } else if (ce_weight_input.value == ""){
            table_data.push([ce_input.value, 100, parseFloat(answer)])
            } else {
                table_data.push([ce_input.value, ce_weight_input.value, parseFloat(answer)])
            }

            total_weight = 0;
            for (var i = 0; i < table_data.length; i++) {
                total_weight += parseFloat(table_data[i][1]);
                if (total_weight > 100) {
                    ce_header.innerHTML = `Invalid weight, reload page`;
                    return;
                }
            }
            if (table_data.length == 1){
                const ce_table_container2 = document.createElement("TR");
                const ce_table_category_1 = document.createElement("TH");
                ce_table_category_1.id = "table_category_1";
                ce_table_category_1.innerHTML = `${table_data[0][0]}`;

                ce_table_container2.appendChild(ce_table_category_1);

                const ce_table_weight_1 = document.createElement("TH");
                ce_table_weight_1.id = "table_weight_1";
                ce_table_weight_1.innerHTML = `${table_data[0][1]}`;

                ce_table_container2.appendChild(ce_table_weight_1);

                const ce_table_score_1 = document.createElement("TH");
                ce_table_score_1.id = "table_score_1";
                ce_table_score_1.innerHTML = `${table_data[0][2]}`;

                ce_table_container2.appendChild(ce_table_score_1);

                ce_table.append(ce_table_container2);

                document.getElementById("ce_input").value = "";
                document.getElementById("ce_weight_input").value = "";
            }
                
            if (table_data.length == 2) {
                const ce_table_container3 = document.createElement("TR");
                const ce_table_category_2 = document.createElement("TH");
                ce_table_category_2.id = "table_category_2";
                ce_table_category_2.innerHTML = `${table_data[1][0]}`;
    
                ce_table_container3.appendChild(ce_table_category_2);
    
                const ce_table_weight_2 = document.createElement("TH");
                ce_table_weight_2.id = "table_weight_2";
                ce_table_weight_2.innerHTML = `${table_data[1][1]}`;
    
                ce_table_container3.appendChild(ce_table_weight_2);
    
                const ce_table_score_2 = document.createElement("TH");
                ce_table_score_2.id = "table_score_2";
                ce_table_score_2.innerHTML = `${table_data[1][2]}`;
    
                ce_table_container3.appendChild(ce_table_score_2);
    
                ce_table.append(ce_table_container3);

                document.getElementById("ce_input").value = "";
                document.getElementById("ce_weight_input").value = "";
            }

            if (table_data.length == 3) {
                const ce_table_container4 = document.createElement("TR");
                const ce_table_category_3 = document.createElement("TH");
                ce_table_category_3.id = "table_category_3";
                ce_table_category_3.innerHTML = `${table_data[2][0]}`;
    
                ce_table_container4.appendChild(ce_table_category_3);
    
                const ce_table_weight_3 = document.createElement("TH");
                ce_table_weight_3.id = "table_weight_3";
                ce_table_weight_3.innerHTML = `${table_data[2][1]}`;
    
                ce_table_container4.appendChild(ce_table_weight_3);
    
                const ce_table_score_3 = document.createElement("TH");
                ce_table_score_3.id = "table_score_3";
                ce_table_score_3.innerHTML = `${table_data[2][2]}`;
    
                ce_table_container4.appendChild(ce_table_score_3);
    
                ce_table.append(ce_table_container4);

                document.getElementById("ce_input").value = "";
                document.getElementById("ce_weight_input").value = "";
            }

            if (table_data.length == 4) {
                const ce_table_container5 = document.createElement("TR");
                const ce_table_category_4 = document.createElement("TH");
                ce_table_category_4.id = "table_category_4";
                ce_table_category_4.innerHTML = `${table_data[3][0]}`;
    
                ce_table_container5.appendChild(ce_table_category_4);
    
                const ce_table_weight_4 = document.createElement("TH");
                ce_table_weight_4.id = "table_weight_4";
                ce_table_weight_4.innerHTML = `${table_data[3][1]}`;
    
                ce_table_container5.appendChild(ce_table_weight_4);
    
                const ce_table_score_4 = document.createElement("TH");
                ce_table_score_4.id = "table_score_4";
                ce_table_score_4.innerHTML = `${table_data[3][2]}`;
    
                ce_table_container5.appendChild(ce_table_score_4);
    
                ce_table.append(ce_table_container5);

                document.getElementById("ce_input").value = "";
                document.getElementById("ce_weight_input").value = "";
            }

            if (table_data.length == 5) {
                const ce_table_container6 = document.createElement("TR");
                const ce_table_category_5 = document.createElement("TH");
                ce_table_category_5.id = "table_category_5";
                ce_table_category_5.innerHTML = `${table_data[4][0]}`;
    
                ce_table_container6.appendChild(ce_table_category_5);
    
                const ce_table_weight_5 = document.createElement("TH");
                ce_table_weight_5.id = "table_weight_5";
                ce_table_weight_5.innerHTML = `${table_data[4][1]}`;
    
                ce_table_container6.appendChild(ce_table_weight_5);
    
                const ce_table_score_5 = document.createElement("TH");
                ce_table_score_5.id = "table_score_5";
                ce_table_score_5.innerHTML = `${table_data[4][2]}`;
    
                ce_table_container6.appendChild(ce_table_score_5);
    
                ce_table.append(ce_table_container6);

                document.getElementById("ce_input").value = "";
                document.getElementById("ce_weight_input").value = "";
            }

            sum = 0;
            for (var i = 0; i < table_data.length; i++) {
                sum += (table_data[i][2] * table_data[i][1]) / 100;
            }
            sum = Math.round(sum * 100)/100;
            ce_header.innerHTML = `Percentage: ${sum}%`;
        });
    // No return value here, so the return value is "undefined" (without quotes).
})(); // <-- Invoke function. The return value is passed back to executeScript
