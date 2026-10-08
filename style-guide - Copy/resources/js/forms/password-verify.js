var password = document.getElementById("password");

var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var specialChar = document.getElementById("specialChar");
var min = document.getElementById("min");

//user clicks password field, show password error box
password.onfocus = function () {
  document.getElementById("error_password").style.display = "block";
};

//user outside of password field, hide password error box
password.onblur = function () {
  document.getElementById("error_password").style.display = "none";
};

const rules = {
  letter: /[a-z]/,
  capital: /[A-Z]/,
  number: /[0-9]/,
  length: (v) => v.length >= 8,
};

password.onkeyup = () => {
  const v = password.value;

  Object.entries(rules).forEach(([key, rule]) => {
    const el = window[key];
    const valid = rule instanceof RegExp ? rule.test(v) : rule(v);

    el.classList.toggle("valid", valid);
    el.classList;
  });
};

//validation (lowercase)
if (password.value.match(lowerCaseLetters)) {
  letter.classList.remove("invalid");
  letter.classList.remove("valid");
} else {
  letter.classList;
}

//validation (uppercase)
