import json
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

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
    dataset2 = "The future of green economy"
    return render_template('index.html', title=dataset2, data=ResultSet)

@app.route("/get_data")
def query_db():
    query = db.select([commodities_tb])
    ResultProxy = connection.execute(query)
    ResultSet = ResultProxy.fetchall()
    # result_dict = {}
    # for position, value in enumerate(ResultSet):
    #     result_dict.update({str(position):value})
    # query_result = json.dumps(ResultSet[0])

    # print(query_result)

    # print(result_dict)
    # return query_result  
    return jsonify({'output': [dict(data) for data in ResultSet]})

if __name__ == "__main__":
    app.run(debug=True)