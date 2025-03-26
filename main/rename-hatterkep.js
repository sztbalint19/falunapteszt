const fs = require('fs');
const path = require('path');

// A mappa elérési útja
const folderPath = path.resolve(__dirname, 'TDZ_2022-09-24 Falunap');

if (!fs.existsSync(folderPath)) {
    console.error(`A mappa nem található: ${folderPath}`);
    process.exit(1);
}

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Hiba a mappa olvasása közben:', err);
        return;
    }

    const jpgFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg');
    console.log(`Talált .jpg fájlok: ${jpgFiles.join(', ')}`);

    if (jpgFiles.length === 0) {
        console.log('Nincsenek .jpg fájlok a mappában.');
        return;
    }

    let index = 1;

    jpgFiles.forEach((file) => {
        const oldPath = path.join(folderPath, file);
        const newPath = path.join(folderPath, `hatterkep${index}.jpg`);

        console.log(`Átnevezés: ${oldPath} -> ${newPath}`);

        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.error(`Hiba a fájl átnevezésekor: ${file}`, err);
            } else {
                console.log(`Sikeresen átnevezve: ${file} -> hatterkep${index}.jpg`);
            }
        });

        index++;
    });
});
