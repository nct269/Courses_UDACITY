from geocode import getGeocodeLocation
import json
import httplib2

import sys
import codecs
sys.stdout = codecs.getwriter('utf8')(sys.stdout)
sys.stderr = codecs.getwriter('utf8')(sys.stderr)

foursquare_client_id = "ZL0LKJIRU0EF4DVYBKB0YQLAWH51CCPF2ZPNIWQS5QWORPZV"
foursquare_client_secret = "ATGWOYGAEC2Y0WLBCPVVK353ENQMTLSN4IJPMVMVVOHTSSTN"


def findARestaurant(mealType,location):
	#1. Use getGeocodeLocation to get the latitude and longitude coordinates of the location string
        latitude , longitude = getGeocodeLocation(location)
	
	#2.  Use foursquare API to find a nearby restaurant with the latitude, longitude, and mealType strings.
	#HINT: format for url will be something like https://api.foursquare.com/v2/venues/search?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=20130815&ll=40.7,-74&query=sushi

        _v = '20161016'
        _ll = str(latitude) + "%2C" + str(longitude)
        _query = mealType

        h = httplib2.Http()

        url = 'https://api.foursquare.com/v2/venues/search?v=%s&ll=%s&query=%s&client_id=%s&client_secret=%s' %(_v,_ll, _query, foursquare_client_id, foursquare_client_secret)

        restaurants = json.loads(h.request(url,'GET')[1])
        
        restaurants_json = restaurants['response']['venues']
        #for restaurant in restaurants_json:
        #        print restaurant['name']
        
	#3. Grab the first restaurant
        restaurant = restaurants_json[0]
        restaurantName = restaurant['name']
        restaurantAddress = restaurant['location']['formattedAddress']

	#4. Get a  300x300 picture of the restaurant using the venue_id (you can change this by altering the 300x300 value in the URL or replacing it with 'orginal' to get the original picture
        # https://api.foursquare.com/v2/venues/VENUE_ID/photos
        _VENUE_ID = restaurant['id']

        url = 'https://api.foursquare.com/v2/venues/%s/photos?v=%s&client_id=%s&client_secret=%s' % (_VENUE_ID,_v, foursquare_client_id, foursquare_client_secret)
        pictures = json.loads(h.request(url,'GET')[1])

        #5. Grab the first image
        if pictures['response']['photos']['items']:
                picture = pictures['response']['photos']['items'][0]

                #To assemble a resolvable photo URL, take prefix + size + suffix
                #e.g. https://irs0.4sqi.net/img/general/300x500/2341723_vt1Kr-SfmRmdge-M7b4KNgX2_PHElyVbYL65pMnxEQw.jpg.
                _size = "300x300"
                imageUrl = '%s%s%s' % (picture['prefix'],_size, picture['suffix'])

        #6.  if no image available, insert default image url
        else:
                imageUrl = "http://pixabay.com/get/8926af5eb597ca51ca4c/1433440765/cheeseburger-34314_1280.png?direct"
	
	#7. Return a dictionary containing the restaurant name, address, and image url
        restaurantInfo = {'name':restaurantName, 'address':restaurantAddress, 'image':imageUrl}
        print restaurantInfo['name']
        print restaurantInfo['address']
        print restaurantInfo['image']

        return restaurantInfo

if __name__ == '__main__':
        findARestaurant("Pizza", "Tokyo, Japan")
        findARestaurant("Tacos", "Jakarta, Indonesia")
        findARestaurant("Tapas", "Maputo, Mozambique")
        findARestaurant("Falafel", "Cairo, Egypt")
        findARestaurant("Spaghetti", "New Delhi, India")
        findARestaurant("Cappuccino", "Geneva, Switzerland")
        findARestaurant("Sushi", "Los Angeles, California")
        findARestaurant("Steak", "La Paz, Bolivia")
        findARestaurant("Gyros", "Sydney Australia")

