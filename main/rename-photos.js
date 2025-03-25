const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, 'TDZ_2023-09-23 Falunap'); // Teljes elérési út

console.log(`Ellenőrzés: A mappa elérési útja: ${folderPath}`);

// Ellenőrizzük, hogy a mappa létezik-e
if (!fs.existsSync(folderPath)) {
    console.error(`A mappa nem található: ${folderPath}`);
    process.exit(1);
}

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Hiba a mappa olvasása közben:', err);
        return;
    }

    console.log(`A mappa tartalma: ${files.join(', ')}`);

    const jpgFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg');
    console.log(`Talált .jpg fájlok: ${jpgFiles.join(', ')}`);

    if (jpgFiles.length === 0) {
        console.log('Nincsenek .jpg fájlok a mappában.');
        return;
    }

    jpgFiles.forEach((file, index) => {
        const oldPath = path.join(folderPath, file);
        const newPath = path.join(folderPath, `photo${index + 1}.jpg`);

        console.log(`Átnevezés előkészítése: ${oldPath} -> ${newPath}`);

        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.error(`Hiba a fájl átnevezésekor: ${file}`, err);
            } else {
                console.log(`Sikeresen átnevezve: ${file} -> photo${index + 1}.jpg`);
            }
        });
    });
});
