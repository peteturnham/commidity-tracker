%matplotlib inline
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
# reflect an existing database into a new model
# Base = automap_base()
# reflect the tables
# Base.prepare(engine, reflect=True)

# Save reference to the table
# commodities = Base.classes.commodities
# ev_population = Base.classes.ev_population
# print(Base.classes.keys)
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
##################################

# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/precipitation<br/>"
#         f"/api/v1.0/stations<br/>"
#         f"/api/v1.0/tobs<br/>"
#         f"/api/v1.0/<start><br/>"
#         f"/api/v1.0/<start>/<end><br/>"
#     )

# @app.route("/api/v1.0/precipitation")
# def precipitation():
# # Create our session (link) from Python to the DB
#     session = Session(engine)
# #Find the most recent date in the data set
# latest_date_str = session.query(Measurement).order_by(Measurement.date.desc()).first().date
# latest_date = dt.datetime.strptime(latest_date_str, '%Y-%m-%d')
# one_year_ago_date = latest_date - dt.timedelta(days = 365)
# # Design a query to retrieve the last 12 months of precipitation data and plot the results. 
# # Starting from the most recent data point in the database. 
# results = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date >= one_year_ago_date).all()

# session.close()

# # Convert the query results to a dictionary using `date` as the key and `prcp` as the value.
# all_precip = []
# for date, prcp in results:
#     precip_dict = {}
#     precip_dict["date"] = prcp
#     all_precip.append(precip_dict)
# return jsonify(all_precip)

# @app.route("/api/v1.0/stations")
# # Return a JSON list of stations from the dataset.
# session = Session(engine)
# # query for stations 
# stations = session.query(Station.station, Station.name, Station.latitude, Station.longitude, Station.elevation).all()
# session.close()

# # convert results to dictionary 

# all_stations = []

# for station, name, latitude, longitude, elevation in stations:
#     station_dict = {}
#     station_dict["station"] = station
#     station_dict["name"] = name
#     station_dict["latitude"] = latitude
#     station_dict["longitude"] = longitude
#     station_dict["elevation"] = elevation
#     all_stations.append(station_dict)
# return jsonify(all_stations)

# @app.route("/api/v1.0/tobs")
# # Query the dates and temperature observations of the most active station for the last year of data.
# session = Session(engine)
# # query temps for most active station
# station_db = session.query(Measurement.tobs).filter(Measurement.station == 'USC00519281').all()
# session.close()

# # convert to dictionary
# all_temps = []
# for date, temp in station_db:
#     temp_dict = {}
#     temp_dict[date] = temp
#     all_temps.append(temp_dict)
# return jsonify(all_temps)



