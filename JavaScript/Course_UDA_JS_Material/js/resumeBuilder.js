//Must be called with helper.js containing the method

var bio = {
	"name" : "Olivier",
	"role" : "Future CEO at myfairclothing.com",
	"welcomeMessage" : "Hi dude !",
	"skills" : ["Versatile","Out of the box thinking","Positive attitude", "Persevering"],
	"contacts" : {
		"mobile" : "123-456",  
		"mails" : [
			{
				"mail":"foo@yahoo.com"
			},
			{
				"mail":"foo@gmail.com"
			}
		],
		"github" : "nct269",
		"location" : "Cambridge MA"
	},
	"bioPic" : "images/fry.jpg"
};

bio.display = function(){
	var formattedRole = array_helper.formatSingleValue(bio.role, HTMLheaderRole);
    $("#header").prepend(formattedRole);

    var formattedName = array_helper.formatSingleValue(bio.name, HTMLheaderName);
    $("#header").prepend(formattedName);

    var formattedPhone = array_helper.formatSingleValue(bio.contacts.mobile, HTMLmobile);
    $("#topContacts").append(formattedPhone);

    var formattedMails = array_helper.formatArrayWithSingleKey(bio.contacts.mails, HTMLemail)
    $("#topContacts").append(formattedMails);

    var formattedgithub = array_helper.formatSingleValue(bio.contacts.github,HTMLgithub)
    $("#topContacts").append(formattedgithub);

    var formattedLocation = array_helper.formatSingleValue(bio.contacts.location,HTMLlocation)
    $("#topContacts").append(formattedLocation);

    //Pic
    var formattedPic = array_helper.formatSingleValue(bio.bioPic, HTMLbioPic);
    $("#header").append(formattedPic);

    //Welcome
    var formattedWelcome = array_helper.formatSingleValue(bio.welcomeMessage, HTMLwelcomeMsg);
    
    $("#header").append(formattedWelcome);

    $("#header").append(HTMLskillsStart);
    var formattedSkills = array_helper.formatArrayWithoutKey(bio.skills, HTMLskills);
    $("#skills").append(formattedSkills);
};

var work = {
    "jobs": [
        {
            "employer": "BCV",
            "title": "Trader",
            "location": "Lausanne",
            "dates": "2007-2011",
            "description": "Doing strucured products for the bank."
        },
        {
            "employer": "UBS",
            "title": "Quant analyst",
            "location": "Zurich",
            "dates": "2011-2015",
            "description": "Quant development"
        }
    ]
};

work.display = function(){
  
  if (work.jobs.length > 0 ){

    for (var job in work.jobs ) {

      $("#workExperience").append(HTMLworkStart);

      var formattedEmployer = HTMLworkEmployer.replace("%data%",  work.jobs[job].employer);
      var formattedTitle = HTMLworkTitle.replace( "%data%", work.jobs[job].title);
      var formattedEmployerTitle = formattedEmployer + formattedTitle;
      $(".work-entry:last").append(formattedEmployerTitle);

      var formattedDates = HTMLworkDates.replace("%data%",  work.jobs[job].dates);
      $(".work-entry:last").append(formattedDates);

      var formattedDescription = HTMLworkDescription.replace("%data%",  work.jobs[job].description);
      $(".work-entry:last").append(formattedDescription);
    }
  }


};

var projects = {
	"projects" : [
    	{
    		"title" : "Ziyou",
    		"date" : "2015",
    		"description" : "Create a fair trade clothing company",
    		"images" : [{"image":"images/197x148.gif"}, {"image":"images/197x148.gif"}, {"image":"images/197x148.gif"}]
    	},
    	{
    		"title" : "With french dressing",
    		"date" : "2015 + X?",
    		"description" : "Create a website for taylormade dresses",
    		"images" : [{"image":"images/197x148.gif"}, {"image":"images/197x148.gif"}, {"image":"images/197x148.gif"}]
    	}
    ]
};

projects.display = function() {

	for (var project in projects.projects) {
		$("#projects").append(HTMLprojectStart);

		var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title )
		$(".project-entry:last").append(formattedTitle);

		var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].date )
		$(".project-entry:last").append(formattedDates);

		var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description )
		$(".project-entry:last").append(formattedDescription);

		var formattedImage = array_helper.formatArrayWithSingleKey(projects.projects[project].images,HTMLprojectImage);
		$(".project-entry:last").append(formattedImage);
	}
};

var education = {
	"schools" : [
		{
			"name": "ENSIMAG",
			"location": "Grenoble",
			"degree" : "engineer",
			"Majors": ["Theater", "Catch up session"],
			"Date": 2004
		} ,
		{
			"name": "Dauphine",
			"location": "Paris",
			"degree" : "DESS",
			"Majors": ["market finance"],
			"Date": 2006
		} 
	],
	"OnlineCourses" : [
		{
			"title" : "Web development",
			"school" : "UDACITY",
			"date":"2013",
			"url" : "UDA/webdev.com"
		},
		{
			"title" : "Intro to HTML and CSS",
			"school" : "UDACITY",
			"date":"2015",
			"url" : "UDA/HTMLandCSS"
		}
	]
};