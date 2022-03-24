INSERT INTO TradeOffers 
SET OfferorID_FK = (SELECT UserID FROM USERS WHERE Username = '${offerer}'), 
RecieverID_FK = (SELECT UserID FROM USERS WHERE Username = '${reciever}'), 
Status = 'Open';

INSERT INTO NFTList
SET NFTName = 'nft1',
HyperLink = '1';

SELECT @@IDENTITY;

INSERT INTO Request SET 
    TradeID = (SELECT TradeID FROM TradeOffers WHERE TradeID = @@IDENTITY), 
    NFTID = (SELECT NFTID FROM NFTList WHERE nftID = @@IDENTITY);
