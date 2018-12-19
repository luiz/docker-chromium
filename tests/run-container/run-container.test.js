const path = require('path');
const { dockerRunChromium } = require('../../index');

const dockerComposePath = path.join(__dirname, './config/docker-compose.yml');
const dockerFilePath = path.join(__dirname, './config/Dockerfile');
const alternativeDockerFilePath = path.join(__dirname, './config/Dockerfile2');

describe('runContainer', async () => {
    it('runs container and provides websocket uri', async () => {
        // setup getConfig mock in config module
        jest.mock('../../config');
        const config = require('../../config');

        config.getConfig.mockImplementation(() => ({
            dockerComposePath,
            dockerFilePath,
            alternativeDockerFilePath
        }));

        jest.setTimeout(120000); // give it 2 minutes to download image/run container

        // app code
        const webSocketUri = await dockerRunChromium();

        // assertions
        expect(webSocketUri).toContain('ws://');
    });
});