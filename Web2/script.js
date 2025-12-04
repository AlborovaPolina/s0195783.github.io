function click1()
{
    let f1 = document.getElementById("form-kol-vo").value.trim();
    let f2 = document.getElementById("type-of-prod").value;
    let p = document.getElementById("price");
    
    const regx = /^[1-9]\d*$/
    if(!regx.test(f1))
    {
        p.textContent = "Ошибка ввода";
        p.style.color = "red";
        return
    }

    const total = parseInt(f1) * parseInt(f2);
    p.textContent = "Итоговая цена: " + total + " ₽";
    p.style.color = "#1cc71cff";
}