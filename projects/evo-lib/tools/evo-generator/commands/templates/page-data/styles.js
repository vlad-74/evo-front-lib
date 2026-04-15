// commands/templates/page-data/styles.js

const getMainStylesTemplate = () => `:host {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    overflow: hidden;

    font-size: 30px;
}`;

const getDeviceStylesTemplate = () => `:host {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    overflow: hidden;

    .desktop { background: green; }
    .tablet { background: blue; }
    .phone { background: red; }

    .vertical { color: white; }
    .horizontal { color: yellow; text-decoration: underline; }
}`;

module.exports = {
    getMainStylesTemplate,
    getDeviceStylesTemplate
};
