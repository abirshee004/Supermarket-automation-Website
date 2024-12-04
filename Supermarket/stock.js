let stock = [];

// Units for different product categories
const units = {
    packets: ["packets", "boxes"],
    kg: ["kg", "grams"],
    liters: ["liters", "milliliters"],
    pieces: ["pieces", "dozens"],
};

// Update quantity units based on selected product category
document.getElementById("productCategory").addEventListener("change", function () {
    const category = this.value;
    const unitDropdown = document.getElementById("quantityUnit");

    // Clear previous options
    unitDropdown.innerHTML = `<option value="" disabled selected>Select unit</option>`;

    // Populate units based on the selected category
    if (units[category]) {
        units[category].forEach((unit) => {
            const option = document.createElement("option");
            option.value = unit;
            option.textContent = unit;
            unitDropdown.appendChild(option);
        });
    }
});

// Handle adding stock
document.getElementById("receiveStockForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value.trim();
    const productCategory = document.getElementById("productCategory").value;
    const productQuantity = document.getElementById("productQuantity").value.trim();
    const quantityUnit = document.getElementById("quantityUnit").value;
    const productPrice = document.getElementById("productPrice").value.trim();

    if (!quantityUnit) {
        alert("Please select a valid unit for the product quantity.");
        return;
    }

    stock.push({
        name: productName,
        category: productCategory,
        quantity: `${productQuantity} ${quantityUnit}`,
        price: `₹${parseFloat(productPrice).toFixed(2)}`, // Format price with ₹ symbol
    });

    alert("Stock added successfully!");

    // Update the report
    updateStockReport();

    // Clear the form
    document.getElementById("receiveStockForm").reset();
    document.getElementById("quantityUnit").innerHTML = `<option value="" disabled selected>Select unit</option>`;
});

// Handle updating stock
document.getElementById("updateStockForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const updateProductName = document.getElementById("updateProductName").value.trim();
    const updateProductPrice = document.getElementById("updateProductPrice").value.trim();
    const updateProductQuantity = document.getElementById("updateProductQuantity").value.trim();

    // Find the product to update
    const product = stock.find(item => item.name.toLowerCase() === updateProductName.toLowerCase());

    if (!product) {
        alert("Product not found in stock.");
        return;
    }

    // Update the price and quantity if provided
    if (updateProductPrice) {
        product.price = `₹${parseFloat(updateProductPrice).toFixed(2)}`; // Update price
    }

    if (updateProductQuantity) {
        product.quantity = `${updateProductQuantity} ${product.category === "kg" ? "kg" : "pieces"}`; // Update quantity based on category
    }

    alert("Stock updated successfully!");

    // Update the report
    updateStockReport();

    // Clear the form
    document.getElementById("updateStockForm").reset();
});

// Generate stock report
document.getElementById("generateReport").addEventListener("click", function () {
    updateStockReport();
});

// Update stock report
function updateStockReport() {
    const report = document.getElementById("report");
    report.innerHTML = ""; // Clear previous report

    if (stock.length === 0) {
        report.textContent = "No products in stock.";
        return;
    }

    stock.forEach((item) => {
        const productInfo = document.createElement("p");
        productInfo.textContent = `Product: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`;
        report.appendChild(productInfo);
    });
}
