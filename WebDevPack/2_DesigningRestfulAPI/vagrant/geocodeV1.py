import httplib2
import json

def getGeocodeLocation(inputString):
    # Use Google Maps to convert a location into Latitute/Longitute coordinates
    # FORMAT: https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
    google_api_key = "AIzaSyA7MXZ2C66om88FLTMZ_I10uRPwGU1wPeI"
    locationString = inputString.replace(" ", "+")
    url = ('https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s'% (locationString, google_api_key))
    h = httplib2.Http()
    response , content = h.request(url,'GET')
    result = json.loads(content)

    print "response header: %s \n \n" % response
    
    return result

