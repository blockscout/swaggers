const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// Define the location of the template
const versionTemplatePath = path.join(__dirname, 'utils', 'version_page_template.html');
const randomEmojis = ['🔗', '📊', '💾', '🛡️', '☁️', '🖊️', '✅', '📈', '🔍', '👁️'];

// Function to add new service
async function addNewService() {
    try {
        // Step 1: Get service name and optional emoji from user
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'serviceName',
                message: 'Enter the service name:',
                validate: input => input ? true : 'Service name cannot be empty!',
            },
            {
                type: 'input',
                name: 'emoji',
                message: 'Enter an emoji for the service (optional):',
                default: () => randomEmojis[Math.floor(Math.random() * randomEmojis.length)],
            }
        ]);

        const { serviceName, emoji } = answers;
        const serviceFolder = path.join(__dirname, 'services', serviceName);

        // Step 2: Append service info to hosted_services.csv
        const csvPath = path.join(__dirname, 'hosted_services.csv');
        const newServiceLine = `${serviceName},${emoji}\n`;
        fs.appendFileSync(csvPath, newServiceLine);
        console.log(`Service "${serviceName}" with emoji "${emoji}" added to hosted_services.csv.`);

        // Step 3: Create folder inside services/ with the service name
        if (!fs.existsSync(serviceFolder)) {
            fs.mkdirSync(serviceFolder, { recursive: true });
            console.log(`Folder created: ${serviceFolder}`);
        } else {
            console.log(`Folder already exists: ${serviceFolder}`);
        }

        // Step 4: Read template from utils/version_page_template.html and replace the service name
        const versionTemplate = fs.readFileSync(versionTemplatePath, 'utf-8');
        const indexContent = versionTemplate.replace(/{{SERVICE_NAME}}/g, serviceName);

        const indexPath = path.join(serviceFolder, 'index.html');
        fs.writeFileSync(indexPath, indexContent);
        console.log(`File created: ${indexPath}`);

        // Step 5: Create an empty hosted_versions.txt file in the same folder
        const versionsFilePath = path.join(serviceFolder, 'hosted_versions.txt');
        fs.writeFileSync(versionsFilePath, '');
        console.log(`File created: ${versionsFilePath}`);

    } catch (error) {
        console.error('Error adding new service:', error);
    }
}

// Run the CLI
addNewService();
