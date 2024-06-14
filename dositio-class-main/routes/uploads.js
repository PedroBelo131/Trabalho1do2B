/** @type{import('fastify').FastifyPluginAsync<>} */
import util from 'util';
import { pipeline } from 'stream';
import fs from 'fs';
const pump = util.promisify(pipeline);

export default async function uploads(app, options) {

    app.post('/upload', async (request, reply) => {

        const data = await request.file();

        await pump(data.file, fs.createWriteStream(`public/${data.filename}`));

        return reply.code(200).send({message: 'Received'});
    });

}