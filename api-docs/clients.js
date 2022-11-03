/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         _id:
 *           type: string
 *           description: An auto-generated unique identifier id
 *         name:
 *           type: string
 *           description: The client's name 
 *         email:
 *           type: string
 *           description: The client's email
 *         phone:
 *           type: string
 *           description: The client's Phone number
 *         providers:
 *           type: array
 *           items:
 *             type: object
 *           description: The client's providers
 *         createdAt:
 *           type: string
 *           description: The date and time when the client was created
 *         updatedAt:
 *           type: string
 *           description: The date and time when the client was updated
 *       example:
 *         name: 'mugisha'
 *         email: 'mugisha@gmail.com'
 *         phone: '+250782067198'
 *         providers: [{_id: 'Provider's id 12333'}]
 *     Client404:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           description: Error message for a non-existing client
 *       example:
 *         error: The client with the specified id can not be found
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints to manage clients
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Return a list of all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Clients fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Client'
 *       400:
 *         description: The server returned an error
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Creates a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Client'
 *     responses:
 *       201:
 *         description: The client was created successfully .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client'
 *       400:
 *          description:The error in request body
 */

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: Updates a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Client'
 *     responses:
 *       200:
 *         description: The client was  updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client'
 *       400:
 *         description: The server returned an error
 *       404:
 *         description: The client with provided id can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Client404'
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *    summary: Delete a client with the specified id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *       description: The client was deleted successfully .
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: Confirmation of a successfull client deletion
 *             example:
 *               message: 'Client was deleted successfully'
 *      400:
 *        description: The server returned an error
 *      404:
 *        description: The client with the specified can not be found
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#components/schemas/Client404'
 */
