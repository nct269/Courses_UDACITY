
function loadData() {
 
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Generate the streetview API URL to request
    var bgimg, street, city, address, url;
    bgimg = '<img class="%classData%" src="%urlData%"></img>';
    url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=%address%';

    street = $('#street').val();
    city = $('#city').val();

    address = street + ', ' + city;

    $greeting.text('So you want to live at ' + address);

    url = url.replace("%address%", address);
    
    bgimg = bgimg.replace("%classData%", "bgimg");
    bgimg = bgimg.replace("%urlData%", url);

    $body.append(bgimg);

    //NY Times
    var article , articleCore;

    article = '<li class=article>%data%</li>';
    articleSnippet = '<p>%data%</p>';

    var baseURI = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?';
    var NYTAPIKey = '&api-key=' + '28ff4dccd14dc5330780f6e91993733a:4:72602928' /*+ 'salt'*/;
    var sortArticles = '&sort=newest';
    var nbArticles = '&page=' + 1;

    //address = address.replace(/,/g, '');
    //q = 'q=' + address.replace(/ /g, '+');  

    q = 'q=' + address;

    //q=new+york+times&page=2&sort=oldest&api-key=####
    URI = baseURI + q + nbArticles + sortArticles + NYTAPIKey;


    $.getJSON(URI, function (data) {

        var articles, headline, snippet, formattedArticle, formattedSnippet;

        articles = data['response']['docs'];

            for (var i in articles) {

                headline = articles[i]['headline']['main'];
                snippet = articles[i]['snippet'];

                formattedArticle = article.replace('%data%', headline);
                formattedSnippet = articleSnippet.replace('%data%', snippet);

                $nytHeaderElem.text('New York Times Articles');
                $nytElem.append(formattedArticle);
                $('.article:last').append(formattedSnippet);
            }           
    }).error(function(e) {
         
        $nytHeaderElem.text("NYT articles can't be loaded sorry.");
        $nytElem.text('');  
    });

    //WIKI JSON-P
    var wikiURL = 'https://en.wikipedia.org/w/api.php?';

    wikiURL = wikiURL + 'action=opensearch&search=' + city + '&format=json&callback=wikDummyCallbak';

    console.log(wikiURL);

    var wikiRequestTimeout = setTimeout ( function (){
        $wikiElem.text("failed to get Wikipedia ressources.");
    }, 5000 );

    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        //jsonp:callback
        success: function(response){
            
            var articleList = response[1];
            var articleHref = response[3];

            for (var i in articleList ){

                $wikiElem.append("<li><a href=" + articleHref[i] + ">" + articleList[i]  + "</a></li>");
            }

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);


//loadData();
