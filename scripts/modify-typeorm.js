// For ESModule:
import fs from 'fs';
// For cjs
// const fs = require('fs');

/* Modify CapacitorQueryRunner.js */
const correctBugInCapacitorQueryRunner = (file) => {
 if (fs.existsSync(file)) {
   fs.readFile(file, 'utf8', function (err, data) {
     if (err) {
       return console.error(err);
     }

     // This key helps to identify that this file has been modified by this script
     const isModifiedKey = "/** correctBugInCapacitorQueryRunner */";
     const isModifiedIndex = data.indexOf(isModifiedKey);

     if (isModifiedIndex !== -1) {
       console.warn(`${isModifiedKey} found. Package probably fixed.`);
       return;
     }

     const index = data.indexOf(`"DROP",`)
     if (index === -1) {
       console.warn('Line not found. Package probably fixed.');
       return;
     }

     var result = data.replace(
       `    "DROP",`,
       `    "DROP",
       "PRAGMA"`

     );
     result = result.replace(
       'else if (["INSERT", "UPDATE", "DELETE", "PRAGMA"].indexOf(command) !== -1) {',
       'else if (["INSERT", "UPDATE", "DELETE"].indexOf(command) !== -1) {'
     );

     result += isModifiedKey;

     fs.writeFile(file, result, 'utf8', function (err) {
       if (err) return console.error(err);
     });
   });
 } else {
   utils.warn(`Couldn't find file ${file}`);
 }

}
/* Moddify CapacitorDriver.js */
const correctBugInCapacitorDriver = (file) => {
 if (fs.existsSync(file)) {
   fs.readFile(file, 'utf8', function (err, data) {
     if (err) {
       return console.error(err);
     }

     // This key helps to identify that this file has been modified by this script
     const isModifiedKey = "/** correctBugInCapacitorDriver */";
     const isModifiedIndex = data.indexOf(isModifiedKey);

     if (isModifiedIndex !== -1) {
       console.warn(`${isModifiedKey} found. Package probably fixed.`);
       return;
     }

     const index = data.indexOf('await connection.run(`PRAGMA foreign_keys = ON`);');
     if (index === -1) {
       console.warn('Line not found. Package probably fixed.');
       return;
     }

     var result = data.replace(
       'await connection.run(`PRAGMA foreign_keys = ON`);',
       'await connection.execute(`PRAGMA foreign_keys = ON`, false);'
     );

     result = result.replace(
       'await connection.run(`PRAGMA journal_mode = ${this.options.journalMode}`);',
       'await connection.execute(`PRAGMA journal_mode = ${this.options.journalMode}`, false);'
     );

     result += isModifiedKey;

     fs.writeFile(file, result, 'utf8', function (err) {
       if (err) return console.error(err);
     });
   });
 } else {
   utils.warn(`Couldn't find file ${file}`);
 }
}

correctBugInCapacitorQueryRunner('./node_modules/typeorm/driver/capacitor/CapacitorQueryRunner.js');
correctBugInCapacitorQueryRunner('./node_modules/typeorm/browser/driver/capacitor/CapacitorQueryRunner.js');
correctBugInCapacitorDriver('./node_modules/typeorm/driver/capacitor/CapacitorDriver.js');
correctBugInCapacitorDriver('./node_modules/typeorm/browser/driver/capacitor/CapacitorDriver.js');
