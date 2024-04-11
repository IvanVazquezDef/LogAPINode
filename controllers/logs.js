const { response } = require('express');
const fs = require('fs');

const getLoyalCustomers = async(req, res = response) => {
    const loyalCustomers = [];
    const mapUserPages = new Map();
    const file1 = getFileData('controllers/file1.json');
    const file2 = getFileData('controllers/file2.json');

    for (const log of file1) {
        addRecordToMap(log.userId, log.pageId)
    }
    
    for (const log of file2) {
        if (mapUserPages.has(log.userId)) {
            addRecordToMap(log.userId, log.pageId)
        }
    }

    for (const userId of mapUserPages.keys()) {
        if (mapUserPages.get(userId).size >= 2) {
            loyalCustomers.push(userId);
        }
    }

    res.json({
        ok: true,
        loyalCustomers
    });

    function getFileData(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (readError) {
            console.error('Error reading or parsing JSON:', readError);
        }
    } 

    function addRecordToMap(userId, pageId) {
        if (!mapUserPages.has(userId)) {
            mapUserPages.set(userId, new Set());
        }

        mapUserPages.get(userId).add(pageId);
    }
}

module.exports = {
    getLoyalCustomers
}