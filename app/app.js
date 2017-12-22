const ExpressApplication = require('./expressApplication.js');

const config = {
    version: '0.0.1',
    port: 3000
};

let app = new ExpressApplication(config).getApp();

app.get('/admin', require('./routes/admin'));

app.get('/track/*', require('./routes/report'));

app.listen(app.get('port'));

console.info('App is running on port', app.get('port'));