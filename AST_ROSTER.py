#!pip install --user pymysql
from getpass import getpass  # Needed for secure password input.
import pandas as pd
from sharepoint import site_login, get_new_site

import logging
import sys
logging.basicConfig(stream=sys.stdout, level=logging.INFO)

sys.path.append('..')
site_url = "https://sites.bms.com/teams/ast-portfolio/"
site = site_login(site_url)

#get sharepoint list
my_list = site.get_list('Roster')

#replace extra string variables
my_list.columns = [i.replace('_x0020_', '_') for i in my_list.columns]
my_list.columns = [i.replace('_x0020', '_') for i in my_list.columns] 
my_list.columns = [i.replace('_x002', '_') for i in my_list.columns] 
my_list.columns = [i.replace('_x0022', '_') for i in my_list.columns]
my_list.columns = [i.replace('_x0', '_') for i in my_list.columns]
my_list.columns = [i.replace('_0', '') for i in my_list.columns]
my_list.columns = [i.replace('0', '') for i in my_list.columns]
my_list.columns = [i.replace('__8_e', '') for i in my_list.columns]

#rename columns
my_list.rename(columns={'Function_f_Group':'Function_Group','Project_Role':'Functional_Role','Title':'Name',
                       'Overhead_Allocation':'Base_Business_Allocation'},inplace=True)

#take only columns we need
my_list.drop(labels=['Attachments',"AuthorId","ComplianceAssetId","ContentTypeId","EditorId","FileSystemObjectType","GUID",
                    "ID","Id","Modified","OData__UIVersionString","ServerRedirectedEmbedUri","ServerRedirectedEmbedUrl","ResourceStringId"], axis=1, inplace=True)

#convert to appropriate datatypes
my_list.Created = pd.to_datetime(my_list.Created)
my_list.Finish_Date = pd.to_datetime(my_list.Finish_Date)
my_list.Start_Date = pd.to_datetime(my_list.Start_Date)
my_list.ResourceId = my_list.ResourceId.astype(str)

#add column "PPM_Name"
my_list["PPM_Name"] = my_list.Name.str.replace(',',';').str.replace('Miller; Paul','Miller (SYR); Paul')

# ------------------------------------------------
#!pip install --user cx_Oracle
import os
import cx_Oracle
import datetime
import time
import pandas as pd
from sqlalchemy import create_engine

host='ushpwbmslpz216.net.bms.com'
port=1521
sid='IHUB'
user='AW_GIC_B2'
password='JW0bCsWN222Y9r'
sid2 = cx_Oracle.makedsn(host, port, sid=sid)

cstr = 'oracle://{user}:{password}@{sid}'.format(
    user=user,
    password=password,
    sid=sid2
)

engine1 =  create_engine(
    cstr,
    convert_unicode=True,
    pool_recycle=10,
    pool_size=50,
    echo=True
)
# print("Connected to Oracle")

# load/replace table
my_list.to_sql('IHUB.Z_AST_ROSTER',if_exists='replace',con=engine1,index=False,chunksize=1)