/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The Provider's name.
 *       example:
 *         name: 'samuel'
 *     Provider404:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           description: Error message for a non-existing provider
 *       example:
 *         error: The provider with the specified id can not be found
 */

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: Endpoints to manage providers
 */

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Return a list of all providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: Providers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Provider'
 *       400:
 *         description: The server returned an error
 */

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Provider'
 *     responses:
 *       201:
 *         description: The provider was  created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Provider'
 *       400:
 *          description: Error in request body
 */

/**
 * @swagger
 * /providers/{id}:
 *   patch:
 *     summary: Update a provider
 *     tags: [Providers]
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
 *             $ref: '#components/schemas/Provider'
 *     responses:
 *       200:
 *         description: The provider was  updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Provider'
 *       400:
 *         description: The server returned an error
 *       404:
 *         description: The provider with specified id can not be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Provider404'
 */

/**
 * @swagger
 * /providers/{id}:
 *   delete:
 *    summary: Delete a provider with the specified id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *       description: The provider was  deleted successfully.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description:The Confirmation of a successfull provider deletion
 *             example:
 *               message: 'The provider was deleted successfully'
 *      400:
 *        description: The server returned an error
 *      404:
 *        description: The provider with the specified can not be found
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#components/schemas/Provider404'
 */
