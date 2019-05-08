import sqlite3
from sqlite3 import Error


class BaseHandlers(object):
    def __init__(self, db_file):
        """ create a database connection to a SQLite database """
        try:
            self.connection = sqlite3.connect(db_file)
        except Error as e:
            raise Exception(e)

    def fetch_data_from_db(self, query):
        """
            Method to fetch the data from sqlite3 databse file

            @param query [Required] query to be executed against the
             databse file
            @return Fetched data from DB
        """
        # Create object for SQL connection
        obj = self.connection.cursor()
        # Execute the query
        obj.execute(query)
        # Get all fetched details
        data = obj.fetchall()
        return data

    def get_user(self, username):
        query = "select name from user_details where name='{}'".format(
            username
        )
        data = self.fetch_data_from_db(query)
        keys = ['username']
        result = dict(zip(keys, data[0])) if data else {}
        return result


if __name__ == '__main__':
    pass
