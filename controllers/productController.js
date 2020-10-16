const Product = require('../models/productModel')
const { getPostData } = require('../utils')

// get all products
// route GET api/products
async function getProducts(req, res){
    try{
        const products = await Product.findAll()
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// get single product
// route GET api/products/:id
async function getProduct(req, res, id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-type': 'application/json'})
            res.end(JSON.stringify({ massage: "Product not found"}))
        } else{
            res.writeHead(200, {'Content-type': 'application/json'})
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log(error)
    }
}

// create a Product
// route POST api/products
async function createProduct(req, res){
    try{
        const body = await getPostData(req)

            const { name, description, price } = JSON.parse(body)
            const product = {
                name,
                description,
                price
            }
            const newProduct = await Product.create(product)

            res.writeHead(201,{'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

// update a Product
// route PUT api/products/:id
async function updateProduct(req, res, id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-type': 'application/json'})
            res.end(JSON.stringify({ massage: "Product not found"}))
        } else {
            const body = await getPostData(req)

            const { name, description, price } = JSON.parse(body)
            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(id, productData)

            res.writeHead(201,{'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updProduct))
        }


    } catch (error) {
        console.log(error)
    }
}

// delete single product
// route DELETE api/products/:id
async function deleteProduct(req, res, id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-type': 'application/json'})
            res.end(JSON.stringify({ massage: "Product not found"}))
        } else{
            await Product.remove(id)
            res.writeHead(200, {'Content-type': 'application/json'})
            res.end(JSON.stringify({messege: `Product ${id} removed`}))
        }

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}