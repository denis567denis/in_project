
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - login
 *         - password
 *         - firstname
 *         - lastname
 *         - rol
 *         - permission
 *         - video
 *       properties:
 *              login:
 *                  type: string
 *              password:
 *                  type: string
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              rol:
 *                  type: string
 *              permission:
 *                 $ref: '#/components/schemas/permission'
 *              video:
 *                  $ref: '#/components/schemas/video'
 *                      
 *          
 */

 /**
 * @swagger
 * components:
 *   schemas:
 *     video:
 *       type: object
 *       required:
 *         - videoname
 *         - permission
 *       properties:
 *              videoname:
 *                  type: string
 *              permission:
 *                  $ref: '#/components/schemas/permission'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     permission:
 *       type: object
 *       required:
 *         - mayWatch
 *       properties:
 *              mayWatch:
 *                  type: string
 */


/**
 *  @swagger
 * /auth/login:
 *  post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                  - login
 *                  - password
 *              properties:
 *                  login:
 *                      type: string
 *                  password:
 *                      type: string
 *     responses:
 *       200:
 *         description: Succes
 *       401:
 *         description: No such user
 *       404:
 *         description: Invalid password
 * 
 */

/**
 *  @swagger
 * /auth/register:
 *  post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                  - login
 *                  - password
 *                  - firstName
 *                  - lastname
 *              properties:
 *                  login:
 *                      type: string
 *                  password:
 *                      type: string
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: User don't create
 */

/**
 * @swagger
 * /auth/refreshtoken:
 *  post:
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: Refreshtoken
 *     responses:
 *      200:
 *         description: Succes
 *      401:
 *         description: Unauthorized
 *      403:
 *          description: can not take token
 */


/**
 *  @swagger
 * /auth/change_password:
 *  post:
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                  - oldPassword
 *                  - newPassword
 *              properties:
 *                  oldPassword:
 *                      type: string
 *                  newPassword:
 *                      type: string
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: password is empty
 *          401:
 *              description: password empty
 *          403:
 *              description: can not take token
 */


/**
 * @swagger
 * /auth/logout:
 *  post:
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *     responses:
 *      200:
 *         description: Succes
 *      401:
 *         description: Unauthorized
 *      403:
 *          description: can not take token
 */
