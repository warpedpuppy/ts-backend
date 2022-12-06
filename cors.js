
const cors = require('cors')
let allowedOrigins = [ 'http://localhost:3000', 'https://tugtug.com','http://localhost:3001','http://localhost:8000', 'https://www.tryingsomething.com', 'https://tryingsomething.com', 'https://kind-montalcini-cc92fa.netlify.app' ];


module.exports = app => {
	app.use(cors({
		origin: (origin, callback) => {
			console.log("lets test origin", origin)
			console.log("allowedOrigins.indexOf(origin)", allowedOrigins.indexOf(origin))
			if(!origin) return callback(null, true);
			if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
			let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
			return callback(new Error(message ), false);
			}
			return callback(null, true);
		}
	}));
}