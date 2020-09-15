// Execute the react build process
// Rename the build folder to www as cordova uses the www folder for everything

const path = require('path');
const { exec } = require('child_process');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const { resolve } = require('path');

function renameOutputFolder(buildFolderPath, outputFolderPath) {
    return new Promise((resolve, reject) => {
        fs.rename(buildFolderPath, outputFolderPath, (err) => {
            if(err) {
                reject(err);
            } else {
                resolve('Successfully built!');
            }
        });
    });
}

async function execPreReactBuild(projectPath) {

    await fs.copy(path.resolve(projectPath, './src'), path.resolve(projectPath, './cordova/src'));
    await fs.copy(path.resolve(projectPath, './public'), path.resolve(projectPath, './cordova/public'));

    await fs.copyFile(path.resolve(projectPath, './package.json'), path.resolve(projectPath, './cordova/package.json'))

    return "Successfully copied folders!"
}

function execPostReactBuild(buildFolderPath, outputFolderPath) {
    return new Promise((resolve, reject) => {
        if(fs.existsSync(buildFolderPath)) {
            if(fs.existsSync(outputFolderPath)) {
                rimraf(outputFolderPath, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    renameOutputFolder(buildFolderPath, outputFolderPath)
                        .then(val => resolve(val))
                        .catch(e => reject(e));
                });
            } else {
                renameOutputFolder(buildFolderPath, outputFolderPath)
                    .then(val => resolve(val))
                    .catch( e => reject(e));
            };
        } else {
            reject(new Error('build folder does not exist'));
        }
    });
}

module.exports = () => {
    const buildScriptPath = path.resolve(process.cwd(), './../node_modules/.bin/react-scripts');
    return new Promise((resolve, reject) => {
        projectPath = path.resolve(process.cwd(), './../')
        execPreReactBuild(projectPath).then(() => {
            exec(`${buildScriptPath} build`,
            (error) => {
                if(error) {
                    console.error(error);
                    reject(error)
                    return;
                }
                execPostReactBuild(path.resolve(__dirname, '../build/'), path.join(__dirname, '../www/'))
                    .then((s) => {
                        console.log(s);
                        resolve(s);
                    })
                    .catch((e) => {
                        console.error(e);
                        reject(e);
                    });
                });
        });
    });
}