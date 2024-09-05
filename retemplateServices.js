const fs = require('fs');
const path = require('path');

// Define paths
const servicesDir = path.join(__dirname, 'services');
const templatePath = path.join(__dirname, 'utils', 'version_page_template.html');

// Function to retemplate all services
function retemplateServices() {
    try {
        // Step 1: Read the current template
        const versionTemplate = fs.readFileSync(templatePath, 'utf-8');

        // Step 2: Get the list of service directories
        const services = fs.readdirSync(servicesDir).filter(file => {
            return fs.statSync(path.join(servicesDir, file)).isDirectory();
        });

        services.forEach(serviceName => {
            // Step 3: Replace the placeholder in the template
            const newIndexContent = versionTemplate.replace(/{{SERVICE_NAME}}/g, serviceName);

            // Step 4: Write the updated index.html for each service
            const serviceIndexPath = path.join(servicesDir, serviceName, 'index.html');
            fs.writeFileSync(serviceIndexPath, newIndexContent);
            console.log(`Updated: ${serviceIndexPath}`);
        });
    } catch (error) {
        console.error('Error updating services:', error);
    }
}

// Run the retemplate process
retemplateServices();
