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
 *                  $ref: '#/components/schemas/v'
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
 * /user/EditUser:
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
 *                  - userdelete
 *                  - userId
 *                  - userfirstname 
 *                  - userlastname
 *                  - userlogin
 *                  - userpassword
 *                  - userRol
 *                  - userPermission
 *                  - userVideo
 *              properties:
 *                  userdelete:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  userfirstname:
 *                      type: string
 *                  userlastname:
 *                      type: string
 *                  userlogin:
 *                      type: string
 *                  userpassword:
 *                      type: string
 *                  userRol:
 *                      type: string
 *                  userPermission:
 *                      type: string
 *                  userVideo:
 *                      type: string
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
*/

/**
 *  @swagger
 * /user/EditVideo:
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
 *                  - videodelete
 *                  - videoId
 *                  - videoName
 *                  - videoPermission
 *              properties:
 *                  videodelete:
 *                      type: string
 *                  videoId:
 *                      type: string
 *                  videoName:
 *                      type: string
 *                  videoPermission:
 *                      type: string
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
*/


/**
 *  @swagger
 * /user/CreateVideo:
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
 *                  - videoName
 *              properties:
 *                  videoName:
 *                      type: string
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
 *          403:
 *              description: can not take token
*/




/**
 *  @swagger
 * /user/video:
 *  get:
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
 *          403:
 *              description: can not take token
*/

/**
 *  @swagger
 * /user/CanWatchUserVideo:
 *  get:
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
 *          403:
 *              description: can not take token
*/


/**
 *  @swagger
 * /user/AllVideo:
 *  get:
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
*/

/**
 *  @swagger
 * /user/AllPermission:
 *  get:
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
*/

/**
 *  @swagger
 * /user/AllUser:
 *  get:
 *     security:
 *       components:
 *          type: apiKey
 *          in: cookie
 *          name: token
 *     responses:
 *          200:
 *              description: Succes
 *          400:
 *              description: error
 *          401:
 *              description: error
*/
