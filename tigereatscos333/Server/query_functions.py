
## DEPRECATED  

# from pymongo import MongoClient 
# from urllib.parse import quote_plus
# from pymongo.errors import ConnectionFailure
# import sys 
# import json
# from bson import ObjectId

# def get_users():

#     db = db_connect()
#     cursor = db.users.find()
#     users = []
#     for user in cursor:
#         users.append(user)
#     return py2json(users)

# def get_distinct_values(collection, field):

#     db = db_connect()
#     coll = db[collection]
#     values = coll.distinct(field)
#     return py2json(values)

# # returns the database after connecting to it 
# def db_connect():
#     # connect to database server
#     dbuser = 'pfrazao'
#     dbpassword = 'y7gnykTXHj8j7EK'
#     dbhost = 'ds053380.mlab.com'
#     dbport = '53380'
#     dbname = 'tiger_eats_db'
#     uri = "mongodb://%s:%s@%s:%s/%s" % (
#         quote_plus(dbuser), quote_plus(dbpassword), dbhost, dbport, dbname)
#     client = MongoClient(uri)

#     # check if sever is available
#     try:
#         # The ismaster command is cheap and does not require auth.
#         client.admin.command('ismaster')
#     except ConnectionFailure:
#         print("Server not available", file=sys.stderr)
#         exit()

#     return client[dbname]

# def py2json(python_obj):

#     # overrides JSONEncoder to include 
#     # objectId representation 
#     class JSONEncoder(json.JSONEncoder):
#         def default(self, o):
#             if isinstance(o, ObjectId):
#                 return str(o)
#             return json.JSONEncoder.default(self, o)

#     return json.dumps(JSONEncoder().encode(python_obj))

# def main():
#     collection = 'users'
#     field = 'team'
#     print(get_distinct_values(collection, field))
#     print(get_users())

# if __name__ == '__main__':
#     main()
