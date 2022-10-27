// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
* https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node
*
* child_process.execFile() = No shell spawned. Use when we just need to execute an application 
* or a shell script and get the output
*
* child_process.exec() = Shell is spawned. Use when we need to utilize shell functionality such 
* as pipe, redirects, backgrounding
*
* child_process.execSync() = Identical to child_process.exec() except that the it blocks ALL other 
* operations until complete  source: https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
*
* Create destination dir if it does not exist and copy file:
*   mkdir -p "$d" && cp file "$d"        # source: https://stackoverflow.com/a/1529965/946957
*   
*   OR
*
*   mkdir -p /foo/bar && cp myfile "$_"  # source: https://stackoverflow.com/a/14085147/946957
* 
*  Copy a file (and its metadata) in Node.js:

    const fs = require('fs');

    // File destination.txt will be created or overwritten by default.
    fs.copyFile('source.txt', 'destination.txt', (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
    });
*
*/

/* 
* Use Next.js to execute server-side shell script on button click
* https://stackoverflow.com/questions/71646984/execute-server-side-shell-script-on-button-click
* https://stackoverflow.com/a/71668310/946957
*/
export default function handler(req, res) {

    // NB: w/synchronous external operations, server will not be able to serve other requests until it is finished
    const execSync = require('child_process').execSync;
    // import { execSync } from 'child_process';  // replace ^ if using ES modules

    const output = execSync('ls', { encoding: 'utf-8' });  // the default is 'buffer'
    const splitted = output.split(/\r?\n/);  
    const filtered = splitted.filter( e => {
        return e !== '';
    });

    console.log(filtered)
  res.status(200).json(filtered)
}
