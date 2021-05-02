create table global_commodities (
    position varchar,
    rec_id varchar PRIMARY KEY,
    year date,
    country varchar,
    commodity varchar,
    location varchar,
    fac_name date,
    latitude int,
    longitude int,
    maininvest varchar,
    status varchar,
    capacity int,
    units varchar,
    FOREIGN KEY (commodity)
    FOREIGN KEY (maininvest)
);

create table ev_population (
    VIN varchar PRIMARY KEY,
    County varchar,
    City varchar,
    State varchar,
    ZIP Code int,
    Model Year date,
    Electric Vehicle Type varchar,
    Clean Alternative Fuel Vehicle (CAFV) Eligibility varchar,
    Electric Range varchar,
    Base MSRP int,
    Legislative District varchar,
    DOL Vehicle ID varchar,
    Vehicle Location decimal
);
