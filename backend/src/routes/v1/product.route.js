const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.post('/', /**auth('manageProducts'),*/ validate(productValidation.addNewProduct), productController.addNewProduct);
router.get('/', validate(productValidation.getProducts), productController.getProducts);
router.get('/:productId', validate(productValidation.getProductById), productController.getProductById);
router.patch('/:productId', auth('manageProducts'), validate(productValidation.updateProduct), productController.updateProduct);
router.delete('/:productId', auth('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct);
router.get('/search/:name', validate(productValidation.searchProductsByName), productController.searchProductsByName);
router.patch('/update-quantities', auth('manageProducts'), validate(productValidation.updateProductQuantities), productController.updateProductQuantities);



/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management endpoints
 */

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
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [40, 41, 42]
 *               brand:
 *                 type: string
 *                 example: "Nike"
 *               price:
 *                 type: number
 *                 example: 3000000
 *               quantity:
 *                 type: number
 *                 example: 50
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
 *             required:
 *               - name
 *               - sizes
 *               - brand
 *               - price
 *               - quantity
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
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
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
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [40, 41, 42]
 *               brand:
 *                 type: string
 *                 example: "Nike"
 *               price:
 *                 type: number
 *                 example: 3200000
 *               quantity:
 *                 type: number
 *                 example: 60
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
 * /products/search/{name}:
 *   get:
 *     summary: Search products by name
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name to search (partial match, case-insensitive)
 *     responses:
 *       200:
 *         description: List of matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 */

/**
 * @swagger
 * /products/update-quantities:
 *   patch:
 *     summary: Update quantities of one or multiple products
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
 *               updates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     quantity:
 *                       type: number
 *                       example: -10
 *                 minItems: 1
 *             required:
 *               - updates
 *     responses:
 *       200:
 *         description: Updated products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
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