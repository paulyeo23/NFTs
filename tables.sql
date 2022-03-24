DROP TABLE IF EXISTS NFTOwner, TradeOffers,Offer,Request;
DROP TABLE IF EXISTS Users, NFTList;

CREATE TABLE Users 
( 
 UserID INT NOT NULL AUTO_INCREMENT, 
 Username VARCHAR(255) UNIQUE, 
 Password VARCHAR(255),
 PRIMARY KEY(UserID)
 );
 
 CREATE TABLE NFTList 
 (  
 NFTID INT NOT NULL AUTO_INCREMENT,  
 NFTName VARCHAR(255) UNIQUE,  
 Hyperlink VARCHAR(255) UNIQUE,
 PRIMARY KEY(NFTID)
 );

CREATE TABLE NFTOwner 
( 
ReferenceID INT AUTO_INCREMENT,  
NFTID_FK INT,  
NFTOwnerID_FK INT,
PRIMARY KEY( ReferenceID),
FOREIGN KEY (NFTID_FK) REFERENCES NFTList(NFTID) ON DELETE CASCADE, 
FOREIGN KEY(NFTOwnerID_FK) REFERENCES Users(UserID) ON DELETE CASCADE 
);

CREATE TABLE  TradeOffers 
( 
TradeID INT AUTO_INCREMENT,
Status VARCHAR(255), 
OfferorID_FK INT, 
RecieverID_FK INT,
PRIMARY KEY(TradeID),
FOREIGN KEY (OfferorID_FK) REFERENCES Users(UserID) ON DELETE CASCADE,
FOREIGN KEY (RecieverID_FK) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE Offer
(
TradeID INT AUTO_INCREMENT,
ReferenceID_FK INT,
FOREIGN KEY (TradeID) REFERENCES TradeOffers(TradeID) ON DELETE CASCADE ,
FOREIGN KEY (ReferenceID_FK) REFERENCES NFTOwner(ReferenceID) ON DELETE CASCADE
);

CREATE TABLE Request
(
TradeID INT,
ReferenceID_FK INT,
FOREIGN KEY (TradeID) REFERENCES TradeOffers(TradeID) ON DELETE CASCADE,
FOREIGN KEY (ReferenceID_FK) REFERENCES NFTOwner(ReferenceID) ON DELETE CASCADE
);

-- INSERT INTO TradeOffers 
-- SET OfferorID_FK = (SELECT UserID FROM USERS WHERE Username = '${offerer}'), 
-- RecieverID_FK = (SELECT UserID FROM USERS WHERE Username = '${reciever}'), 
-- Status = 'Open';

-- INSERT INTO NFTList
-- SET NFTName = 'nft1',
-- HyperLink = '1';

SELECT @@IDENTITY;

-- INSERT INTO Request SET 
    -- TradeID = (SELECT TradeID FROM TradeOffers WHERE TradeID = @@IDENTITY), 
    -- ReferenceID_FK = (SELECT ReferenceID FROM NFTOwner WHERE ReferenceID = @@IDENTITY);

SELECT * FROM TradeOffers;

SELECT * FROM Request;
-- INSERT INTO  Offer
-- SET TradeID = (SELECT TradeID FROM TradeOffers WHERE 

INSERT INTO Users(Username,Password) VALUES('User1','Password1');
INSERT INTO Users(Username,Password) VALUES('User2','Password2');

INSERT INTO nftlist(NFTName,Hyperlink) VALUES ('Pepe invades ukraine','https://media.discordapp.net/attachments/696452836741087342/949891191007228014/unknown.png');

INSERT INTO nftowner
SET NFTID_FK = (SELECT NFTID FROM NFTList WHERE Hyperlink = 'https://media.discordapp.net/attachments/696452836741087342/949891191007228014/unknown.png'), 
NFTOwnerID_FK = (SELECT UserID FROM Users WHERE Username = "User1"); 

INSERT INTO nftowner
SET NFTID_FK = (SELECT NFTID FROM NFTList WHERE Hyperlink = 'https://media.discordapp.net/attachments/696452836741087342/949891191007228014/unknown.png'), 
NFTOwnerID_FK = (SELECT UserID FROM Users WHERE Username = 'User2'); 

INSERT INTO tradeoffers
SET Status = "Open",
OfferorID_FK = (SELECT UserID FROM Users WHERE UserID = '1'),
RecieverID_FK = (SELECT UserID FROM Users WHERE UserID = '2');

INSERT INTO offer
SET TradeID = (SELECT TradeID FROM tradeoffers WHERE TradeID = '1'),
ReferenceID_FK = (SELECT ReferenceID FROM NFTOwner WHERE ReferenceID = '2');

INSERT INTO request
SET TradeID = (SELECT TradeID FROM tradeoffers WHERE TradeID = '1'),
ReferenceID_FK = (SELECT ReferenceID FROM NFTOwner WHERE ReferenceID = '1');