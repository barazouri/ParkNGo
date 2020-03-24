module.exports = {
    licensePlateUpdate(req, res) {
        try {
            let {plateNumber} = req.body
            console.log(plateNumber)
            plateNumber = JSON.parse(plateNumber)
            let licensePlateNumber = plateNumber[0].results[0].plate
            console.log(licensePlateNumber)
            return res.json(licensePlateNumber);
         } catch (err) { console.error(err);return res.json(err); }
    }
}