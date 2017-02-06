// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var myAccount = "sciencesNo1Fan";
var sciList = "science";

console.log("bot running");



function getSciTweets() {

	replies = ["Thank you so much for this beautiful information", "Bless the scientists who worked hard to get us these facts",
		"Truely amazing", "Wow!", "I LOVE SCIENCE", "SCIENCE", "More SCIENCE more SCIENCE", "Sign me up for more science", 
		"Thank you enlightening me with your knowledge", "thank you for science", "I'm so glad we know about science",
		"SCIIIIIIIEEEEENCE", "I love knowing things", "I feel elightened", "I feel like jimmy neutron witht this knowledge",
		"Knowing facts is great"];

	var randIndx = Math.floor(Math.random()*replies.length);

	T.get('lists/statuses', {slug: sciList, owner_screen_name: myAccount, count: 2},
		function (error, data) {
			if (!error) {
 				var tweetData = {
					id: data[0].id,
					text: data[0].text,
        			user: data[0].user.screen_name,
        			txtid: data[0].id_str
        		}

				console.log(tweetData.text);


				T.post('statuses/retweet/' + tweetData.txtid, { },
					function(error, response) {
					if (response) {
						console.log('Success! Check your bot, it should have retweeted something.')
					}
					// If there was an error with our Twitter call, we print it out here.
					if (error) {
						console.log('There was an error with Twitter:', error);
					}
				})

				T.post('statuses/update', {status: "@" + tweetData.user + " " + replies[randIndx], in_reply_to_status_id: tweetData.id},
					function(error, response) {
					if (response) {
						console.log('Success! Check your bot, it should have replied something.')
					}
					// If there was an error with our Twitter call, we print it out here.
					if (error) {
						console.log('There was an error with Twitter:', error);
					}
				})

			} else {
				console.log('probLEMMMMM!!!!' + error);
			}
		}
	)
}





getSciTweets();
// Try to retweet something as soon as we run the program...
//retweetLatest();

// ...and then every hour after that. Time here is in milliseconds, so
//1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(getSciTweets, 1000 * 60 * 22);
