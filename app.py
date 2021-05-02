import json
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, request

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

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
##################################

@app.route("/")
def generate():
    """List all available api routes."""
    dataset2 = "EVLytics"
    return render_template('index.html', title=dataset2, data=ResultSet)

@app.route("/get_data")
def query_db():
    query = db.select([commodities_tb])
    ResultProxy = connection.execute(query)
    ResultSet = ResultProxy.fetchall()
     
    return jsonify({'output': [dict(data) for data in ResultSet]})


if __name__ == "__main__":
    app.run(debug=True)

