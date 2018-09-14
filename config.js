const authorization="Basic TWJ1eXVCSDpDb29scG9ldDEu"
const contentType="application/json"
const accept="application/json"

const  headers= {
    'Authorization': authorization,
    'Content-Type': contentType,
    'Accept':accept
}

module.exports = {
	name: 'API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 6500,
	base_url: process.env.BASE_URL || `http://localhost:${process.env.PORT}`,
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/devc',
	},
	salt:5,
	secret:'TWJ1eXVCSDpDb29scG9ldDEu'
};