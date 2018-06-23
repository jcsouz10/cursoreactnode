module.exports = function(req,res,next) {
    res.header('Access-Controll-Allow-Origin', '*')
    res.header('Access-Controll-Allow-Methos', 'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS')
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    next()
}