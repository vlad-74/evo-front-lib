// evo-front-lib\projects\evo-lib\tools\evo-generator\index.js

const args = process.argv.slice(2);

// Текущая директория - где пользователь выполнил команду
const targetPath = process.cwd();

// Директория скрипта (tools/evo-generator)
const scriptPath = __dirname;

// Выбор команды
const command = args[0];
const options = parseArgs(args.slice(1));

async function main() {
    console.log(`\n🚀 EVO Generator v2.0`);
    console.log(`📂 Целевая директория: ${targetPath}\n`);

    switch(command) {
        case 'component-exchange':
            const componentExchange = require('./commands/component-exchange');
            await componentExchange(targetPath, scriptPath, options);
            break;
        case 'page-detail':
            const pageDetail = require('./commands/page-detail');
            await pageDetail(targetPath, scriptPath, options);
            break;
        case 'page-data':
            const pageData = require('./commands/page-data');
            await pageData(targetPath, scriptPath, options);
            break;
        default:
            console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    EVO GENERATOR COMMANDS                    ║
╠══════════════════════════════════════════════════════════════╣
║  component-exchange  - Компонент с NgExchangeSubscribeComponent
║  page-detail         - Страница детализации (с устройствами)
║  page-data           - Страница со списком + 5 сервисов
╚══════════════════════════════════════════════════════════════╝

📖 Примеры:
  npm run evo component-exchange -- --name user-card --style scss
  npm run evo page-detail -- --name user-profile --style scss
  npm run evo page-data -- --name users-list --style scss --path features/admin
            `);
    }
}

function parseArgs(args) {
    const options = { style: 'scss' };
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--name') options.name = args[++i];
        if (args[i] === '--style') options.style = args[++i];
        if (args[i] === '--path') options.path = args[++i];
    }
    return options;
}

main().catch(error => {
    console.error(`❌ Ошибка: ${error.message}`);
    process.exit(1);
});
