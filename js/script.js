function submitForm(){
    document.getElementsByClassName("compute-button")[0].blur();
    clearErrors();
    const inputs = document.getElementsByClassName("input-field");
    for(let input of inputs){
        if(isEmpty(input.value)){
            addError(input, "Незаполненное поле");
        }
        executeCheck(input);
    }
    if(!hasError(inputs[0]) && !hasError(inputs[1]) && !hasError(inputs[2])){
        if(!isValidDate(inputs[0].value, inputs[1].value, inputs[2].value)){
            addError(inputs[0], "Неверная дата");
            addError(inputs[1], "");
            addError(inputs[2], "");
        }
        else if(new Date(`${inputs[1].value} ${inputs[0].value} ${inputs[2].value}`).getTime() > new Date().getTime()){
            addError(inputs[0], "Должно быть в прошлом");
            addError(inputs[1], "");
            addError(inputs[2], "");
        }
        else{
            const { year, month, day} = computeAge(+inputs[0].value, +inputs[1].value, +inputs[2].value);
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
                addError(input, "Неверный день месяца");
            }
        }
        else if(input.name === "month"){
            if(!isValidMonth(input.value)){
                addError(input, "Неверный месяц");
            }
        }
        else if(input.name === "year"){
            if(!isValidYear(input.value)){
                addError(input, "Неверный год");
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
function computeAge(dayP, monthP, yearP){
    const now = new Date();
    let year = now.getFullYear() - yearP;
    let month = now.getMonth() + 1 - monthP;
    if(now.getMonth() + 1 < monthP){
        --year;
        month += 12;
    }
    let day = now.getDate() - dayP;
    if(now.getDate() < dayP){
        --month;
        if(month < 0){
            month = 11;
            --year;
        }
        day += getDaysInMonth(monthP);
    }
    document.getElementById("years-span").textContent = "- -";
    document.getElementById("months-span").textContent = "- -";
    document.getElementById("days-span").textContent = "- -";
    animateNumber(year, "years-span");
    animateNumber(month, "months-span");
    animateNumber(day, "days-span");
    return { year, month, day };

}

function animateNumber(number, item){
    const step = 1;
    let interval = 2000;
    if(number !== 0){
        interval /= number;
    }
    let from = 0;
    let counter = setInterval(() => {
        if(from === number){
            clearInterval(counter);
            document.getElementById(item).textContent = number;
            return;
        }
        from += step;
        document.getElementById(item).textContent = from;
    }, interval);
}
function makeSingular(year, month, day){
    if(year !== 11 && year.toString().at(-1) === "1"){
        document.getElementById("year-word").textContent = "год";
    }
    else if((year !== 12 && year.toString().at(-1) === "2") || (year !== 13 && year.toString().at(-1) === "3") || (year !== 14 && year.toString().at(-1) === "4")){
        document.getElementById("year-word").textContent = "года";
    }
    else{
        document.getElementById("year-word").textContent = "лет";
    }
    if(month === 1){
        document.getElementById("month-word").textContent = "месяц";
    }
    else if(month === 2 || month === 3 || month === 4){
        document.getElementById("month-word").textContent = "месяца";
    }
    else{
        document.getElementById("month-word").textContent = "месяцев";
    }
    if(day !== 11 && day.toString().at(-1) === "1"){
        document.getElementById("day-word").textContent = "день";
    }
    else if((day !== 12 && day.toString().at(-1) === "2") || (day !== 13 && day.toString().at(-1) === "3") || (day !== 14 && day.toString().at(-1) === "4")){
        document.getElementById("day-word").textContent = "дня";
    }
    else{
        document.getElementById("day-word").textContent = "дней";
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
