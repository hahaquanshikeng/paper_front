# make network object and load file
from clustergrammer import Network
net = Network()
net.load_file('txt/new_matrix.txt')
# net.add_cats("col",[
#   {
#     "title": "year",
#     "cats": {
#       "1995": [
#         "p2",
#         "p3"
#       ],
#       "1998":[
#           "p1",
#           "p4"
#       ]
#     }
#   },
#   {
#     "title": "s_author",
#     "cats": {
#       "aa": [
#         "p1",
#         "p3"
#       ],
#       "bb":[
#           "p1",
#           "p2",
#           "p3",
#           "p4"
#       ],
#       "cc":[
#           "p1",
#           "p2",
#           "p4"
#       ],
#       "dd":[
#           "p2"
#       ],
#       "ee":[
#           "p4"
#       ]
#     }
#   }
# ])




# calculate clustering using default parameters
net.cluster()

# save visualization JSON to file for use by front end
net.write_json_to_file('viz', 'json/new_matrix.json')