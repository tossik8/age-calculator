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
            computeAge(new Date(`${inputs[1].value} ${inputs[0].value} ${inputs[2].value}`));
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
    const dobYear = birthday.getYear();
    const dobMonth = birthday.getMonth();
    const dobDate = birthday.getDate();

    const now = new Date();
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    let yearAge = currentYear - dobYear;

    let monthAge = currentMonth - dobMonth;

    if (currentMonth < dobMonth){
      yearAge--;
      monthAge += 12;
    }
    let dateAge = currentDate - dobDate;

    if (currentDate < dobDate){
      monthAge--;
      dateAge += 31;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
    countTo(yearAge, "years-span");
    countTo(monthAge, "months-span");
    countTo(dateAge, "days-span");

}
function countTo(to, id){
    const step = 1;
    let from = 0;
    if(from === to){
        document.getElementById(id).textContent = to;
        return;
    }
    let counter = setInterval(() => {
        from += step;
        document.getElementById(id).textContent = from;
        if(from === to){
            clearInterval(counter);
        }
    }, 100);
}
