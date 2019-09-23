import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/candy.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

#print(db.engine.tables_names())

# Save references to each table
Candy = Base.classes.candy
Diabetes = Base.classes.diabetes
Combined = Base.classes.combined
Consumption = Base.classes.consumption

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/candy-consumption")
def candy_consumption():
    """Return candy comnsumption by state"""

    # Use Pandas to perform the sql query
    candy_stmt = db.session.query(Candy).statement
    candy_df = pd.read_sql_query(candy_stmt, db.session.bind)
    candy_df = candy_df[
        ["State",
         "State_2",
         "Per_Capita_Consumption_Pounds_Per_Person"]]

    return candy_df.to_json()

@app.route("/diabetes-rate")
def diabetes_rate():
    """Return diabetes rate by state"""

    # Use Pandas to perform the sql query
    diabetes_stmt = db.session.query(Diabetes).statement
    diabetes_df = pd.read_sql_query(diabetes_stmt, db.session.bind)
    diabetes_df = diabetes_df[
        ["State",
         "State_2",
         "Diabetes Rate 2018"]]

    return diabetes_df.to_json()

@app.route("/consumption_data")
def consumption():
    """Return Pounds Consumed by State"""

    # Use Pandas to perform the sql query
    candy_stmt = db.session.query(Consumption).statement
    candy_df = pd.read_sql_query(candy_stmt, db.session.bind)
    #candy_df = candy_df[
    #    ["State",
    #      "State_2",
    #      "Per_Capita_Consumption_Pounds_Per_Person"]]

    return candy_df.to_json()

@app.route("/candy-diabetes-combined")
def candy_diabetes_combined():
    """Return diabetes rate and per capita consumption by state"""

    # # Use Pandas to perform the sql query
    # candy_stmt = db.session.query(Candy).statement
    # candy_df = pd.read_sql_query(candy_stmt, db.session.bind)
    # candy_df = candy_df[
    #     ["State",
    #      "State_2",
    #      "Per_Capita_Consumption_Pounds_Per_Person"]]

    # # Use Pandas to perform the sql query
    # diabetes_stmt = db.session.query(Diabetes).statement
    # diabetes_df = pd.read_sql_query(diabetes_stmt, db.session.bind)
    # diabetes_df = diabetes_df[
    #     ["State_2",
    #      "Diabetes Rate 2018"]]

    # combined_df = candy_df.merge(diabetes_df, on="State_2")

    combined_stmt = db.session.query(Combined).statement
    combined_df = pd.read_sql_query(combined_stmt, db.session.bind)
    combined_df['combined_pounds'] =\
         combined_df['1st_Pounds']\
         +  combined_df['2nd_Pounds']\
         +  combined_df['3rd_Pounds']
    combined_df['per_capita_consumption'] =\
         combined_df.combined_pounds * 100 / combined_df.Population_2019
    combined_df.to_json

    return combined_df.to_json()

if __name__ == "__main__":
    app.run()
