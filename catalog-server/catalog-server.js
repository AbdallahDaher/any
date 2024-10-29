const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();


app.use(express.json());

const catalogFile = 'C:\\Users\\Hp\\Desktop\\apps\\dos\\dosproject\\proj.csv';

function readCatalog() {
    return new Promise((resolve, reject) => {
        const books = [];
        fs.createReadStream(catalogFile)
            .pipe(csv())
            .on('data', (row) => books.push(row))
            .on('end', () => resolve(books))
            .on('error', (error) => reject(error));
    });
}

function updateCatalog(books) {
    const csvWriter = createCsvWriter({
        path: catalogFile,
        header: Object.keys(books[0]).map(key => ({ id: key, title: key }))
    });
    return csvWriter.writeRecords(books);
}

app.put('/update', async (req, res) => {
    const { id, stock, price } = req.body;
    try {
        const books = await readCatalog();
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
            if (stock !== undefined) books[bookIndex].stock = stock.toString();
            if (price !== undefined) books[bookIndex].price = price.toString();
            await updateCatalog(books);
            res.json(books[bookIndex]);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error updating catalog');
    }
});

app.listen(3001, () => {
    console.log(`run catalog successfully started`);
});
