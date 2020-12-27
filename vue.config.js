module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/styles/base.scss";
                    @import "@/styles/h.scss";
                `
            }
        }
    }
}