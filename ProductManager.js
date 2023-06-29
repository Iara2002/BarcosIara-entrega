const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();
    const newProduct = {
      id: this.generateProductId(),
      ...product
    };
    products.push(newProduct);
    this.saveProductsToFile(products);
    console.log("Producto agregado:", newProduct);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find(p => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
    }
  }

  updateProduct(id, updatedProduct) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        id,
        ...updatedProduct
      };
      this.saveProductsToFile(products);
      console.log("Producto actualizado:", products[productIndex]);
    } else {
      console.log("Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1)[0];
      this.saveProductsToFile(products);
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.log("Producto no encontrado.");
    }
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  generateProductId() {
    const products = this.getProductsFromFile();
    if (products.length === 0) {
      return 1;
    }
    const lastProductId = products[products.length - 1].id;
    return lastProductId + 1;
  }
}

// Ejemplo de uso
const productManager = new ProductManager('productos.json');

productManager.addProduct({
  title: "Zapatillas",
  description: "Zapatillas deportivas",
  price: 99.99,
  thumbnail: "imagen1.jpg",
  code: "ZAP001",
  stock: 10
});

productManager.addProduct({
  title: "Camiseta",
  description: "Camiseta de algodón",
  price: 29.99,
  thumbnail: "imagen2.jpg",
  code: "CAM002",
  stock: 20
});

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productById = productManager.getProductById(2);
console.log("Producto por ID:", productById);

productManager.updateProduct(2, {
  title: "Nueva camiseta",
  price: 39.99
});

productManager.deleteProduct(1);
