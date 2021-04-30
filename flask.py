from matplotlib import style
style.use('fivethirtyeight')
import matplotlib.pyplot as plt

import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import datetime as dt

#################################################
# Database Setup
#################################################
# engine = create_engine('postgresql://postgres:admin@localhost:5432/sample_db')
url = 'postgresql://d_knowles:postgres@localhost:5432/sample_db'
engine = db.create_engine(url)
connection = engine.connect()
metadata = db.MetaData()
commodities_tb = db.Table('commodities', metadata, autoload=True, autoload_with=engine)
query = db.select([commodities_tb])
ResultProxy = connection.execute(query)
ResultSet = ResultProxy.fetchall()
print(ResultSet)



