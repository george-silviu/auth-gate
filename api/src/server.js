require("dotenv").config();

const http = require("http");

const app = require("./app");
const { connectToDatabase } = require("./services/postgres");

const PORT = process.env.PORT || 3004;

const server = http.createServer(app);

async function startServer() {
  try {
    await connectToDatabase();

    server.listen(PORT, () => {
      const host =
        server.address().address === "::"
          ? "localhost"
          : server.address().address;
      const port = server.address().port;

      console.log(
        `Message: API listens for requests at http://${host}:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
