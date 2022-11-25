const calculadora= document.getElementById("calculadora_form");
const output = document.getElementById("output");
const number_buttons = document.querySelectorAll("button[data-type=number]");
const operator_buttons = document.querySelectorAll("button[data-type=operator]");

calculadora.addEventListener("submit", (event) => {
  event.preventDefault();
});

let is_operator = false;
let value_output = [];

const remove_active = () => {
  operator_buttons .forEach((btn) => {
    btn.classList.remove("active");
  });
};

number_buttons.forEach((numbers) => {
  numbers.addEventListener("click", (event) => {
    remove_active();
    if (output.value == "0") {
      output.value = event.target.value;      
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + event.target.value.replace(".", "");      
    } else if (is_operator) {
      is_operator = false;
      output.value = event.target.value;     
    } else {
      output.value = output.value + "" + event.target.value;      
    }
  });
});

operator_buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
      case "=":
        value_output.push(output.value);
        output.value = eval(value_output.join(""));
        value_output = [];
        remove_active();
        break;
      default:
        let last_item = value_output[value_output.length - 1];
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          value_output.pop();
          value_output.push(e.target.value);
        } else {
          value_output.push(output.value);
          value_output.push(e.target.value);
        }
        is_operator = true;
        break;
        
    }
  });
});