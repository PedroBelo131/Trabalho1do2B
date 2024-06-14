/** @type{import('fastify').FastifyPluginAsync<>} */
import { INVALID_CREDENTIALS } from '../libs/errors.js';

export default async function auth(app, options) {
    const users = app.mongo.db.collection('users');

    app.post('/auth', async (request, reply) => {
        let user = request.body;
        request.log.info(`Login for user ${user.username}`);

        //check login details
        // procura o usuario desejado no banco
        let wantedUser = await users.findOne({username : user.username});

        if(user.password != wantedUser.password){

            throw new INVALID_CREDENTIALS();
        }
        
        delete user.password;
        return {
            'x-access-token' : app.jwt.sign(user)
        }
        
    });

}