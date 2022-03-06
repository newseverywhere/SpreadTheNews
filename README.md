# #SpreadTheNews

## Call to action 🧾

Russia launched a devastating war and is invading Ukraine. Ukranian cities are 
under heavy attack by the Russian military. But the Kremlin is banning any news 
about the war to reach Russians and even criminalizing any reporting on what its 
military is doing in Ukraine. It is even criminal to use the word "war" to describe
its actions. 

**It is critical that Russians have access to news about what is really happening in
Ukraine.** One must know about the war, in order to protest and resist its instigators.  

### We call on everybody that has a website to use it to make banned news about the invasion in Ukraine available to Russian visitors.

- If we turn a lot of small and large websites into news providers it becomes much harder
for authorities to block us all! Let's get the news through to people.
- It may be safer for people in Russia to access news through non-affiliated websites, such as
fashion, sport, tech, ecommerce and personal websites. 
- Finally, we may reach people in Russia that are not actively searching for independent news and 
would otherwise not encounter it (even if it was not banned).

<p align="center">
  <img width="460" height="300" src="https://github.com/newseverywhere/SpreadTheNews/blob/main/examples/ExampleGoogleMedusa.gif"><br>
  <sub>Example with Medusa news feed included on Google</sub>
</p>

## Usage 💻

For a basic version, simply download and include the provided `src/spreadthenews.js` file on your website. This will show 
one of the default news feeds on top of your page to visitors who use Russian as their browser language.

```html
<script src='/path/to/spreadthenews.js'>
```

For optimal usage, make the RSS feed request from your websites backend. See xx for more information. In the
provided version, we make the RSS feed request via a [third party API](https://rss2json.com/) to prevent 
the request being blocked in Russia. If you are expecting to make more than 10k requests a day, consider
using a paid plan of https://rss2json.com/ or make the request in your own backend.

### Settings

The snippet below shows the settings you can adjust by editing them in the included `src/spreadthenews.js` file.
```js
  var RSS2JSON_KEY = '';               // Your optional rss2json API key (if > 10k requests a day)
  var SHOW_IMAGES_IF_AVAILABLE = true; // Show images if the feed supplies them
  var MAX_OUTPUT = 15;                 // Maximum number of feed items to show
  var FEED = FEED_RUSSIAN_MEDUSA;      // Choose from feed options above or another feed of choice
  var INTRO_TEXT = '👋 It looks li..'; // Allows you to override the default intro text
  var SHOW_TO_ALL = true;              // Set to true if you want to show the feed to all visitors (e.g., for testing)
```

### News feed options

You can select any RSS news feed of choice. The following news feed urls are provided by default:

- `FEED_RUSSIAN_BBC`:  The Russian languaged BBC news feed https://www.bbc.co.uk/russian/
- `FEED_ENGLISH_BBC`:  The English languaged BBC news feed https://www.bbc.com/news/world/europe
- `FEED_RUSSIAN_MEDUSA`: The Russian languaged news feed of independent Russian news desk [Medusa](https://meduza.io/en) (that is currently blocked by the Russian authorities) https://meduza.io/ (default)

Note: To circumvent the domain block in this general client-side vanilla JS code, the requests are not made directly to these blocked domains, but they are routed through a third party. However, it is best to make the requests through your own backend (which is less likely to get blocked in the future).

## Plugins & packages

Ideally, we would provide specific platform-specific plugins/apps which make the RSS feed requests in the backend. These are in the pipeline for the following frameworks:

- [ ] Wordpress
- [ ] Django 

Are you interested in an app/plugin/extension for a different platform? Let us know in the [issues](https://github.com/newseverywhere/SpreadTheNews/issues).

## Contribute 🔥

This is currently a very basic, general javascript version. Let's improve it and make it widely available! See 
[issues](https://github.com/newseverywhere/SpreadTheNews/issues) for open ideas/to-do's and feel free to add to it. 
Have an improvement? Please fork this repository and open a merge request.
