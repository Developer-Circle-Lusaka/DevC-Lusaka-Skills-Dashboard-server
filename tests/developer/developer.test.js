const  request = require('supertest')

const  server =require('../../express_server')

describe('GET /DEVELOPERS',()=>{
    it('returns a list of developers ',(done)=>{
         request(server).get('/api/developers').set('Accept', 'application/json')
         .expect(200)
         .then(response=>{
              
             expect(JSON.parse(response.text)).toBe([])
         });
    });
});