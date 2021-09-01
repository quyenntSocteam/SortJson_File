const fs = require('fs')

// read JSON object from file
fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
        throw err
    }
    // parse JSON object
    const datas = JSON.parse(data.toString());

    var dataMachines = datas.Machines

    // remove data duplicate
    function getUnique(arr, key) {
        return [...new Map(arr.map(item =>
            [item[key], item]
        )).values()]
    }

    // find storeid datamachines
    const dataMachinesUnique = getUnique(dataMachines, 'StoreId')

    dataMachinesUnique.sort(function (a, b) {
        var aNumber = parseInt(a.StoreId)
        var bNumber = parseInt(b.StoreId)
        if (aNumber < bNumber) { return -1 }
        if (aNumber > bNumber) { return 1 }
        return 0
    })

    var dataMachineObj = {
        "Machines": dataMachinesUnique
    }

    const fileDataMachines = JSON.stringify(dataMachineObj);
    fs.writeFile('dataNew.json', fileDataMachines, (b, err) => {
        if (err) {
            throw err
        } else {
            b == null
        }
    })
});

