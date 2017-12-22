module.exports = function(req, res) {
    const config = require('../config.json');
    const path = req.path.replace('/track/', '');
    const track = config.track;

    let params = {
        redirect: path in track ? track[path] : track.default,
        gaId: config.ga_id,
        track: req.path.replace('/track/', '')
    };

    console.log('params', params);

    res.render('report.html', { params });
}