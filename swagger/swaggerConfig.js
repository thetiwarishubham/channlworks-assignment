// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Channlwork Assignment API Documents",
    version: "1.0.0",
    description: "Find all API documentation here.",
  },
  docExpansion: 'none',
  servers: [
    { url: "http://localhost:5001/" },
  ],
};
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ["./swagger/**/*.yaml"],
};

module.exports = options;
