/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the admin.
 *         email:
 *           type: string
 *           description: Registered email of the admin.
 *         password:
 *           type: string
 *           description: The password of the admin.
 *       example:
 *         name: John Doe
 *         email: admin@example.com
 *         password: adminPassword123
 *
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: Registered email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         blocked:
 *           type: boolean
 *           description: Indicates whether the user is blocked or not.
 *         profileImageName:
 *           type: string
 *           description: The name of the user's profile image.
 *       example:
 *         name: John Smith
 *         email: john@example.com
 *         password: userPassword123
 *         blocked: false
 *         profileImageName: profile.jpg
 */
