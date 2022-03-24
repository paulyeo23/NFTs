import express from "express";
import { waitForDebugger } from "inspector";
import { createConnection } from "mysql";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let con = createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "nft",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
});

function SQLAddUser(username, password) {
  let sql = `INSERT INTO 
    Users(Username,Password) 
    VALUES ("${username}","${password}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

async function SQLLogin(username, password) {
  let login = false;
  var sql = `SELECT username,password 
    FROM Users
    WHERE Username = '${username}' 
    AND Password = '${password}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record searched");
    //console.log(result.length);
    if (result.length > 0) {
      login = true;
    }
  });
  await wait(100);
  return login;
}

function SQLAddNft(nftName, hyperlink) {
  let unique = true;
  for (let i = 0; i < nftList.length; i++) {
    let hyperlinkCopy = nftList[i].hyperlink;
    if (hyperlink === hyperlinkCopy) {
      unique = false;
    }
  }
  if (unique == true) {
    var sql = `INSERT INTO 
      NFTList (NFTName,Hyperlink) 
      VALUES ("${nftName}","${hyperlink}")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }
}

function SQLAddNftOwner(NFTID_FK, NFTOwnerID_FK) {
  var sql = `INSERT INTO TradeOffers SET 
    NFTID_FK= (SELECT UserID FROM USERS WHERE Username = '${NFTID_FK}'), 
    NFTOwnerID_FK = (SELECT UserID FROM USERS WHERE Username = '${NFTOwnerID_FK}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function SQLSendTradeOffer(offererID, acceptorID) {
  var sql = `INSERT INTO TradeOffers SET 
    OfferorID_FK = (SELECT UserID FROM USERS WHERE Username = '${offererID}'), 
    RecieverID_FK = (SELECT UserID FROM USERS WHERE Username = '${acceptorID}'), 
    Status = 'Open'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function SQLOffer(tradeID, nftID) {
  var sql = `INSERT INTO Offer SET 
    TradeID = (SELECT TradeID FROM TradeOffers WHERE TradeID = '${tradeID}'), 
    NFTID = (SELECT NFTID FROM NFTList WHERE nftID = '${nftID}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function SQLRequested(tradeID, nftID) {
  var sql = `INSERT INTO Request SET 
    TradeID = (SELECT TradeID FROM TradeOffers WHERE TradeID = '${tradeID}'), 
    NFTID = (SELECT NFTID FROM NFTList WHERE nftID = '${nftID}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// function updateUserList() {}

// function updateAllNFTlist() {
//   var sql = `SELECT * FROM NFTLIST`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     allNftList = result;
//     console.log(allNftList);
//   });
// }

// function updateOwnedNFTlist(id = -1) {
//   var sql = `SELECT * FROM NFTOwner WHERE NFTOwnerID_FK = ${id}`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     ownedNftList = result;
//     console.log(result);
//   });
// }

// function updateTradeOffers(id) {
//   var sql = `SELECT * FROM TradeOffers WHERE OfferorID_FK = ${id}; SELECT * FROM TradeOffers WHERE RecieverID_FK = ${id}`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     ownedNftList = result;
//     console.log(result);
//   });
// }

let user = "";
let tradeOffers = [];
let offers = [];
let requests = [];
let nftlist = [];
let nftOwners = [];
let users = [];
let data = [];
let ownedNft = [];
// let nfts = [];

function updateUserTradeOffer(id) {
  let data = [];
  for (let i = 0; i < tradeOffers.length; i++) {
    if (tradeOffers[i].RecieverID_FK == id) {
      data.push(tradeOffers[i]);
      console.log("data", data);
    }
  }
}

function updateAllLists() {
  let sql = `SELECT * FROM TradeOffers`;
  con.query(sql, function (err, result) {
    tradeOffers = result;
    console.log("tradeOffers", tradeOffers);
  });

  sql = `SELECT * FROM Request`;
  con.query(sql, function (err, result) {
    requests = result;
    console.log("requests", requests);
  });

  sql = `SELECT * FROM NftList`;
  con.query(sql, function (err, result) {
    nftlist = result;
    console.log("nftlist", nftlist);
  });

  sql = `SELECT * FROM USERS`;
  con.query(sql, function (err, result) {
    users = result;
    console.log("users", users);
  });

  sql = `SELECT * FROM NFTOwner`;
  con.query(sql, function (err, result) {
    nftOwners = result;
    console.log("nftOwners", nftOwners);
  });

  sql = `SELECT * FROM Offer;`;
  con.query(sql, function (err, result) {
    offers = result;
    console.log("offers", offers);
  });

  // sql = `SELECT * FROM nfts;`;
  // con.query(sql, function (err, result) {
  //   nfts = result;
  // });
}

async function sendTrade(referenceIDList) {
  SQLSendTradeOffer(offerer, acceptor);

  con.query(sql, referenceIDList, function (err, result) {
    if (err) throw err;
  });
}

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Done waiting");
      resolve(ms);
    }, ms);
  });
}

async function homePage(request, response) {
  updateAllLists();
  wait(100);
  //console.log("allnfts", nftlist);
  console.log("nftlist", nftlist.hyperlink);
  response.render("homePage", nftlist[0]);
  user = request.headers.cookie;
}

app.get("/", async function (request, response) {
  //console.log("allnfts", nftlist);
  console.log("nftlist", nftlist[0].Hyperlink);
  response.render("homePage", nftlist[0]);
  user = request.headers.cookie;
});

app.get("/register", function (request, response) {
  response.render("registerUserPage");
});

app.post("/register", function (request, response) {
  let data = request.body;
  let username = data.Username;
  let password = data.Password;
  let sql = `SELECT (Username) FROM Users WHERE Username = '${username}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log(result.length);
    if (result.length == 0) {
      SQLAddUser(username, password);
      response.redirect("/");
    }
  });
});

app.get("/login", function (request, response) {
  response.render("loginPage");
});

app.post("/login", function (request, response) {
  let username = request.body.Username;
  let password = request.body.Password;

  SQLLogin(username, password).then(function (result) {
    if (result == true) {
      let index = users.findIndex(function (obj) {
        //console.log(obj);
        return obj.Username == username;
      });
      //console.log("index", index);
      let userId = users[index].UserID;
      console.log("users[0]", users[0].UserID);
      console.log(username);
      response.cookie("userId", userId);
      //console.log("userId= ", userId);
      response.redirect("/");
    } else {
      //console.log("failed login");
    }
  });
});

app.get("/logout", function (request, response) {
  response.clearCookie("userId");
  response.redirect("/");
});

app.get("/tradeoffers", async function (request, response) {
  let idString = request.headers.cookie.split("=")[1];
  let id = Number(idString);
  let data = [];
  for (let i = 0; i < tradeOffers.length; i++) {
    if (tradeOffers[i].RecieverID_FK == 2) {
      data.push(tradeOffers[i]);
      console.log("data", data);
    }
  }
  console.log(id);
  console.log(tradeOffers.length);
  console.log("data", data[0]);
  let sql = "1";
  con.query(sql);
  await wait(100);
  response.render("tradeOffers", data[0]);
});

app.post("/tradeoffers", function (request, response) {
  console.log(request.body.option);
});

app.get("/deleteuser", function (request, response) {
  let idString = request.headers.cookie.split("=")[1];
  let id = Number(idString);
  let sql = `DELETE FROM Users WHERE UserID='${id}'`;
  con.query(sql);
  response.redirect("/");
});

app.get("/sendtrade", function (request, response) {
  let idString = request.headers.cookie.split("=")[1];
  let id = Number(idString);
  let ownedNft = [];
  for (let i = 0; i < nftlist.length; i++) {
    if (nftlist[i].NFTID == 1) {
      ownedNft.push(nftlist[i]);
    }
  }
  console.log(ownedNft);
  response.render("sendTrade", ownedNft[0]);
});

app.post("/sendtrade", async function (request, response) {
  let reciever = request.body.reciever;
  let nftOfferList = request.body.list;
  console.log("request", request.body);
  let sql =
    "UPDATE NFTOWner SET NFTOwnerID_FK = (SELECT UserID FROM Users WHERE Username = 'User1') WHERE REFERENCEID = 2;";
  response.redirect("/");
  //User to trade to + nftlist
});

updateAllLists();

app.listen(3004);
