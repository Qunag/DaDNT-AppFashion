const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management endpoints
 */

router
    .route('/create')
    .post(/**auth('manageProducts'),*/ validate(productValidation.createProduct), productController.createProduct)

router
    .route('/').get(validate(productValidation.getProducts), productController.getProducts);

router
    .route('/filter')
    .get(validate(productValidation.filterProducts), productController.filterProducts);

router
    .route('/search')
    .get(validate(productValidation.searchProductsByName), productController.searchProductsByName);

router
    .route('/:productId')
    .get(validate(productValidation.getProductById), productController.getProductById)
    .patch(/**auth('manageProducts'),*/ validate(productValidation.updateProduct), productController.updateProduct)
    .delete(auth('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct);

router
    .route('/quantities')
    .patch(/**auth('manageProducts'),*/ validate(productValidation.updateProductQuantities), productController.updateProductQuantities);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nike Air Max"
 *               brand:
 *                 type: string
 *                 example: "Nike"
 *               price:
 *                 type: number
 *                 example: 3000000
 *               colors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     color_name:
 *                       type: string
 *                       example: "Đen"
 *                     image_url:
 *                       type: string
 *                       example: "https://example.com/black.jpg"
 *                     sizes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           size:
 *                             type: number
 *                             example: 40
 *                           quantity:
 *                             type: number
 *                             example: 50
 *                         required:
 *                           - size
 *                           - quantity
 *                   required:
 *                     - color_name
 *                     - image_url
 *                     - sizes
 *             required:
 *               - name
 *               - brand
 *               - price
 *               - colors
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get multiple products with pagination and filtering
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand (partial match, case-insensitive)
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by color (partial match, case-insensitive)
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: Filter by size
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *         description: Filter products with quantity > 0
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, brand, price, createdAt]
 *           default: "createdAt"
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 */

/**
 * @swagger
 * /products/filter:
 *   get:
 *     summary: Filter products by specific fields
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand (partial match, case-insensitive)
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by color (partial match, case-insensitive)
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: Filter by size
 *       - in: query
 *         name: hasQuantity
 *         schema:
 *           type: boolean
 *         description: Filter products with quantity > 0
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, brand, price, createdAt]
 *           default: "createdAt"
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 */

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name to search (partial match, case-insensitive)
 *       - in: query
 *         name: exact
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Perform exact match search
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: List of matching products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{productId}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nike Air Max Updated"
 *               brand:
 *                 type: string
 *                 example: "Nike"
 *               price:
 *                 type: number
 *                 example: 3200000
 *               colors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     color_name:
 *                       type: string
 *                       example: "Đen"
 *                     image_url:
 *                       type: string
 *                       example: "https://example.com/black.jpg"
 *                     sizes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           size:
 *                             type: number
 *                             example: 40
 *                           quantity:
 *                             type: number
 *                             example: 50
 *                         required:
 *                           - size
 *                           - quantity
 *                   required:
 *                     - color_name
 *                     - image_url
 *                     - sizes
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/quantities:
 *   patch:
 *     summary: Update quantities of a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               updates:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   properties:
 *                     color_name:
 *                       type: string
 *                       example: "Đen"
 *                     size:
 *                       type: number
 *                       example: 40
 *                     quantity:
 *                       type: number
 *                       example: 10
 *                   required:
 *                     - color_name
 *                     - size
 *                     - quantity
 *             required:
 *               - productId
 *               - updates
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */

module.exports = router;