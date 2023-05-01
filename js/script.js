function submitForm(){
    clearErrors();
    const inputs = document.getElementsByClassName("input-field");
    for(let input of inputs){
        if(isEmpty(input.value)){
            addError(input, "This field is required");
        }
        executeCheck(input);
    }
    if(!hasError(inputs[0]) && !hasError(inputs[1]) && !hasError(inputs[2])){
        if(!isValidDate(inputs[0].value, inputs[1].value, inputs[2].value)){
            addError(inputs[0], "Must be a valide date");
            addError(inputs[1], "");
            addError(inputs[2], "");
        }
        else{
            const { year, month, day} = computeAge(new Date(`${inputs[1].value} ${inputs[0].value} ${inputs[2].value}`));
            makeSingular(year, month, day);
        }
    }
}
function clearErrors(){
    Array.from(document.getElementsByClassName("error-border")).map(item => {
        item.classList.remove("error-border");
    });
    Array.from(document.getElementsByClassName("error-label")).map(item => {
        item.classList.remove("error-label");
    });
    Array.from(document.getElementsByClassName("error-message")).map(item => {
        item.textContent = "";
    })
}
function isEmpty(text){
    return text.trim() === "";
}
function executeCheck(input){
    if(!hasError(input)){
        if(input.name === "day"){
            if(!isValidDay(input.value)){
                addError(input, "Must be a valid day");
            }
        }
        else if(input.name === "month"){
            if(!isValidMonth(input.value)){
                addError(input, "Must be a valid month");
            }
        }
        else if(input.name === "year"){
            if(!isValidYear(input.value)){
                addError(input, "Must be in the past");
            }
        }
    }
}
function hasError(input){
    return input.classList.contains("error-border");
}
function isValidDay(day){
    return !Number.isNaN(day) &&  1 <= day && day <= 31
}
function isValidYear(year){
    return !Number.isNaN(year) && 0 <= year && year <= 2023
}
function isValidMonth(month){
    return !Number.isNaN(month) && 1 <= month && month <= 12;
}
function isValidDate(day, month, year){
    const date = new Date(`${month} ${day} ${year}`);
    return !Number.isNaN(date.getTime()) && day == date.getDate();
}
function addError(input, text){
    document.getElementById(`${input.name}-error`).textContent = text;
    document.getElementsByName(input.name)[0].classList.add("error-border");
    input.parentElement.classList.add("error-label");
}
function computeAge(birthday){
    const now = new Date();
    let year = now.getFullYear() - birthday.getFullYear();
    let month = now.getMonth() - birthday.getMonth();
    if(now.getMonth() < birthday.getMonth()){
        --year;
        month += 12;
    }
    let day = now.getDate() - birthday.getDate();
    if(now.getDate() < birthday.getDate()){
        --month;
        if(month < 0){
            month = 11;
            --year;
        }
        day += getDaysInMonth(birthday.getMonth() + 1);
    }
    document.getElementById("years-span").textContent = year;
    document.getElementById("months-span").textContent = month;
    document.getElementById("days-span").textContent = day;
    return { year, month, day };

}
function makeSingular(year, month, day){
    if(year === 1){
        document.getElementById("single-year").textContent = "";
    }
    else{
        document.getElementById("single-year").textContent = "s";
    }
    if(month === 1){
        document.getElementById("single-month").textContent = "";
    }
    else{
        document.getElementById("single-month").textContent = "s";
    }
    if(day === 1){
        document.getElementById("single-day").textContent = "";
    }
    else{
        document.getElementById("single-day").textContent = "s";
    }
}
function getDaysInMonth(month){
    if(month === 1){
        return 31;
    }
    else if(month === 2){
        return 28;
    }
    else if(month === 3){
        return 31;
    }
    else if(month === 4){
        return 30;
    }
    else if(month === 5){
        return 31;
    }
    else if(month === 6){
        return 30;
    }
    else if(month === 7){
        return 31;
    }
    else if(month === 8){
        return 31;
    }
    else if(month === 9){
        return 30;
    }
    else if(month === 10){
        return 31;
    }
    else if(month === 11){
        return 30;
    }
    else return 31;
}
