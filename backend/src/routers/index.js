import express from 'express';
import * as controller from '../controller/index.js';
const routers = express.Router();

routers.route('/').get(controller.serverHome);
routers.route('/token').post(controller.webrtcToken);

export default routers;