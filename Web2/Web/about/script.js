document.addEventListener("DOMContentLoaded", function() {
  const radios = document.querySelectorAll('input[name="type"]');
  const select = document.getElementById("type-of-prod");
  const checkboxLabel = document.getElementById("form-chek");
  const checkbox = document.querySelector('#form-chek input');
  const priceOutput = document.getElementById("price");
  const hoursInput = document.getElementById("form-kol-vo");

  radios.forEach(radio => {
    radio.addEventListener("change", handleTypeChange);
    radio.addEventListener("change", updateTotal);
  });
  hoursInput.addEventListener("input", updateTotal);
  select.addEventListener("change", updateTotal);
  checkbox.addEventListener("change", updateTotal);

  function handleTypeChange(event) {
  const selectType = event.target.value;

  if (selectType === '2') {
    select.style.display = "block";
    checkboxLabel.style.display = "none";
    checkbox.checked = false;
  } 
  else if (selectType === '3') {
    select.style.display = "none";
    select.value = "0";
    checkboxLabel.style.display = "block";
  } 
  else {
    select.style.display = "none";
    select.value = "0";
    checkboxLabel.style.display = "none";
    checkbox.checked = false;
  }

  updateTotal();
}


  function updateTotal() {
    const hours = hoursInput.value.trim();
    const regx = /^[1-9]\d*$/;

    if (!regx.test(hours)) {
      priceOutput.style.color = "red";
      priceOutput.textContent = "Ошибка ввода";
      return;
    }

    let selectedType = null;
    radios.forEach(r => {
      if (r.checked) selectedType = r.value;
    });

    let typePrice = 0;
    switch (selectedType) {
      case '1': typePrice = 2500; break;
      case '2': typePrice = 500; break;
      case '3': typePrice = 1500; break;
    }

    const option = parseInt(select.value) || 0;
    const checked = checkbox.checked;
    const checkPrice = checked ? 1000 : 0;

    const total = parseInt(hours) * (typePrice + option + checkPrice);

    priceOutput.style.color = "black";
    priceOutput.textContent = "Итоговая цена: " + total + " ₽";
  }
});
