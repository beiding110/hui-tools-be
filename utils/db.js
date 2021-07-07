module.exports = {
    dispatch(obj, fun, params) {
        return obj[fun](params);
    },
}