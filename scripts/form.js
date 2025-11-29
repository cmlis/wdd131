// PRODUCT ARRAY PROVIDED IN ASSIGNMENT
const products = [
    { id: 1, name: "UltraClean Vacuum" },
    { id: 2, name: "SmartHome Thermostat" },
    { id: 3, name: "AquaPure Water Filter" },
    { id: 4, name: "ProBlend Blender" },
    { id: 5, name: "BrightView LED Lamp" }
];

// POPULATE PRODUCT DROPDOWN
const productSelect = document.getElementById("product");

products.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.name;   // requirement: value = product name
    opt.textContent = item.name;
    productSelect.appendChild(opt);
});
