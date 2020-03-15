module.exports = {
    licensePlateUpdate(req, res) {
        try {
            let {licenseResults} = req.body
            licenseResults = JSON.parse(licenseResults)
            let licensePlateNumber = licenseResults[0].results[0].plate
            console.log(licensePlateNumber)
            return res.json(licensePlateNumber);
         } catch (err) { console.error(err);return res.json(err); }
    }
}