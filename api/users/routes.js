const routeOptions = require('./routeOptions');
const controller = require('./controller');

const userRoutes = [
    { method: 'POST', path: '/scores/postScore', handler: controller.postScore },
]

module.exports = userRoutes;