module.exports = (isDev) => {
    return {
        preserveWhitepace: true,
        extractCSS: !isDev,
        // hotReload: false, // 根据环境变量生成
    }
};
