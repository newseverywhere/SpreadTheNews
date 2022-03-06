/* 
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>

For more information on the project itself, see:
https://github.com/newseverywhere/SpreadTheNews/ 
*/

function SpreadTheNews() {

    // News feed options
    var FEED_RUSSIAN_BBC = "http://feeds.bbci.co.uk/russian/rss.xml";
    var FEED_ENGLISH_BBC = "https://feeds.bbci.co.uk/news/world/europe/rss.xml";
    var FEED_RUSSIAN_MEDUSA = "https://meduza.io/rss/news";

    // Adaptable settings
    var RSS2JSON_KEY = ''; // Your rss2json API key (if > 10k requests a day)
    var SHOW_IMAGES_IF_AVAILABLE = true; // Show images if the feed supplies them
    var MAX_OUTPUT = 15; // Maximum number of feed items to show
    var FEED = FEED_RUSSIAN_MEDUSA; // Choose from feed options above or another feed of choice
    var INTRO_TEXT = '👋 It looks like you are visiting from Russia. Access to independent news sources about the Ukraine invasion is crucial. We are part of a network making trusted news sources widely available!';
    var SHOW_TO_ALL = false; // Set to true if you want to show the feed to all visitors (independent of browser language)

    function getLang() {
        return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language || navigator.userLanguage || navigator.browserLanguage || 'en';
    }

    var base = `
        <style>#spreadthenews a {color: #ffd700} #explanation-banner p { text-align: center; font-style: italic; font-size: medium; max-width:900px; margin: 5px auto;} #spreadthenews-feed div { padding: 10px;}</style>
        <div id='spreadthenews' style='width: 100%; min-height: 25vh;  background-color: #0057B7; color: white; max-height: 300px; overflow-y: scroll;'>
            <div id="explanation-banner"><p>`+ INTRO_TEXT + `</p></div>
            <div id='spreadthenews-feed' style="max-width:900px; margin: 0px auto;">
            </div>
        </div>`

    if (getLang().indexOf("ru") > 0 || SHOW_TO_ALL == true) {
        // Include rss feed
        getJsonAPIDataAndShowFeed();
    }

    function showFeed(data) {
        if (data.feed && data.items) {

            document.body.insertAdjacentHTML("afterbegin", base);

            var feedContainer = document.getElementById('spreadthenews-feed')

            var htmlFragment = document.createDocumentFragment();

            for (var i = 0; i < data.items.length; i++) {

                var e = data.items[i];
                var div = document.createElement('div');
                var imageTemplate = '';
                var template = '';

                if (SHOW_IMAGES_IF_AVAILABLE) {
                    if (e.enclosure.link) {
                        imageTemplate = '<img src="' + e.enclosure.link + '"  style="max-width: 300px; padding: 10px; float: left;"></img>'
                    }
                }
                template = imageTemplate + '<h3><a href="' + e.link + '">' + e.title + '</a></h3>' + e.content;

                if (i < MAX_OUTPUT) {
                    div.innerHTML = template;
                    htmlFragment.appendChild(div);
                }

            }

            feedContainer.appendChild(htmlFragment);
        }
    }

    this.showFeed = showFeed;

    function getJsonAPIDataAndShowFeed() {
        // Avoid CORS by temporarily appending script
        var script = document.createElement('script');
        var callUrl = document.location.protocol + '//api.rss2json.com/v1/api.json?callback=stn.showFeed&rss_url=' + encodeURIComponent(FEED);
        if (RSS2JSON_KEY) {
            callUrl = callUrl + "&api_key=" + RSS2JSON_KEY
        }
        script.src = callUrl;
        document.querySelector('body').appendChild(script);
        script.parentNode.removeChild(script);
    }
}

stn = new SpreadTheNews();
