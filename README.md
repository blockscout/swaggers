# Blockscout Swaggers

> This repo contains actual swagger files for blockscout microservices.

## Add new service

1. Install node_modules and run the script to generate swagger file

   ```bash
   npm install
   npm run new
   ```
2. Add github action job step to your CICD
   
    ```yaml
    jobs:
     other-jobs:
         ... 
   
    push-swagger:
      if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags'))
      uses: blockscout/blockscout-rs/.github/workflows/_push_swagger.yml@main
      with:
        service_name: '{service_name}'
        swagger_path: '{swagger_path}'
      secrets:
        api_token_github: ${{ secrets.BLOCKSCOUT_BOT_TOKEN }}
    ```


## Update existing service with new template version

* Run the script to generate swagger file

```bash
npm run regenerate
```


