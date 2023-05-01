function submitForm(){
    const inputs = document.getElementsByClassName("input-field");
    for(let input of inputs){
        if(isEmpty(input.value)){
            document.getElementById(`${input.name}-error`).textContent = "This field is required";

            document.getElementsByName(input.name)[0].classList.add("error-border");
            input.parentElement.classList.add("error-label")
        }
    }
}
function isEmpty(text){
    return text.trim() === "";
}
function isValidDay(day){

}
function isValidYear(year){

}
function isValidMonth(month){

}
function isValidDate(day, month, year){

}
