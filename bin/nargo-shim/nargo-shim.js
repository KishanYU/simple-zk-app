const fs = require('fs');
const path = require('path');
const { Noir } = require('@noir-lang/noir_js');
const { compile, createFileManager } = require('@noir-lang/noir_wasm');
const toml = require('toml');
const { ReadableStream } = require('node:stream/web');

// Polyfill for noir_wasm in Node.js
if (!global.ReadableStream) {
    global.ReadableStream = ReadableStream;
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === '--version') {
        console.log('nargo version 1.0.0-beta.20 (shim)');
        return;
    }

    if (command === 'compile') {
        try {
            console.log('Compiling Noir circuit via shim...');
            const root = process.cwd();
            const fm = createFileManager(root);
            
            const mainNrPath = path.join(root, 'src', 'main.nr');
            const nargoTomlPath = path.join(root, 'Nargo.toml');
            
            await fm.writeFile('src/main.nr', fs.readFileSync(mainNrPath, 'utf8'));
            await fm.writeFile('Nargo.toml', fs.readFileSync(nargoTomlPath, 'utf8'));

            const compiled = await compile(fm);
            
            const targetDir = path.join(root, 'target');
            if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
            
            const outputPath = path.join(targetDir, 'simple_circuit.json');
            fs.writeFileSync(outputPath, JSON.stringify(compiled.program));
            console.log('Compilation successful! Updated target/simple_circuit.json');
        } catch (err) {
            console.error('Nargo shim compile error:', err.message);
            process.exit(1);
        }
        return;
    }

    if (command === 'execute') {
        try {
            const root = process.cwd();
            const targetPath = path.join(root, 'target', 'simple_circuit.json');
            
            // Always check if circuit is compatible, if not recompile
            let circuit;
            try {
                circuit = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
                if (circuit.noir_version && !circuit.noir_version.includes('1.0.0-beta.20')) {
                    throw new Error('Version mismatch');
                }
            } catch (e) {
                console.log('Circuit version mismatch or missing. Recompiling...');
                process.argv = [process.argv[0], process.argv[1], 'compile'];
                return main();
            }

            const noir = new Noir(circuit);
            const proverTomlPath = path.join(root, 'Prover.toml');
            const proverTomlRaw = fs.readFileSync(proverTomlPath, 'utf8');
            const inputs = toml.parse(proverTomlRaw);

            console.log('Executing circuit with inputs:', inputs);
            const { witness } = await noir.execute(inputs);
            
            const witnessPath = path.join(root, 'target', 'simple_circuit.gz');
            fs.writeFileSync(witnessPath, Buffer.from(witness));
            
            console.log('Witness generated successfully at target/simple_circuit.gz');
        } catch (err) {
            console.error('Nargo shim execute error:', err.message);
            process.exit(1);
        }
    } else {
        console.log(`Command "${command}" is not implemented in the Windows shim yet.`);
    }
}

main();
