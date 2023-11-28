import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${process.env.APPLICATION_NAME} Server API Documentation`,
      description: "Basic documentation - WIP",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Dev server"
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt",
        },
      },
    },
  },
  apis: ["./backend/routes/**/*.js", "./backend/models/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function generateSwaggerDocs(app) {

  // ======================= CSS Options =======================
  let styleOptions;
  // Uncomment the following line to remove default header in the API Documentation
  // styleOptions = {
  //   customCss: '.swagger-ui .topbar { display: none }'
  // };


  // Swagger documentation page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, styleOptions));

  // API Documentation in JSON format
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(swaggerSpec);
  });
}

export default generateSwaggerDocs;
