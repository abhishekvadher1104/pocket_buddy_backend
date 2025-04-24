const route = require("express").Router();
const historyController = require("../controller/HistoryController");
route.post("/addhistory", historyController.addHistory);
route.get("/gethistory/:userId", historyController.getHistory);
route.delete('/deletehistory/:id',historyController.deleteHistory);
route.delete('/deleteall/:userId',historyController.deleteAll)

module.exports = route;
