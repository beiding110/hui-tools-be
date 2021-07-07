module.exports = function() {
    var args = [...arguments],
        response = {
            code: 'v',
            tdata: undefined,
            msg: '',
        };

    if(args.length === 1) {
        response.tdata = args[0];
    } else {
        response.code = args[0];
        response.tdata = args[1];
        response.msg = args[2] || '';
    }

    return response;
}