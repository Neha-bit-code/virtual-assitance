const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to speak text
function speak(text, voiceOptions = {}) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = voiceOptions.rate || 1;
    text_speak.volume = voiceOptions.volume || 1;
    text_speak.pitch = voiceOptions.pitch || 1;

    if (voiceOptions.voice) {
        text_speak.voice = voiceOptions.voice;
    }

    window.speechSynthesis.speak(text_speak);
}

// Function to wish user based on time of day
function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing ");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    
    }
    else if
        (message.includes("tell me about your owner")){
        speak("My owner is Neha Verma,She is currently pursing her B teach computer science degree from chandigarh university");
    }

     else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('weather')) {
        fetchWeatherData();
    } else if (message.includes('news')) {
        fetchNewsData();
    } else if (message.includes('joke')) {
        tellJoke();
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}

function fetchWeatherData() {
    const apiKey = '45c4d3b08c9faf50885a017b6fb0c649';  
    const city = 'chandigarh';  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const finalText = `The current weather in ${city} is ${data.weather[0].description} with a temperature of ${data.main.temp} degrees Celsius.`;
            speak(finalText);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            speak('Sorry, I could not fetch the weather data.');
        });
}

function fetchNewsData() {
    const apiKey = 'e88cb531790f4e158fa987a27325d337';  // Replace with your NewsAPI API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const topHeadlines = articles.slice(0, 3).map(article => article.title).join('. ');
            const finalText = `Here are the top news headlines: ${topHeadlines}`;
            speak(finalText);
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
            speak('Sorry, I could not fetch the news data.');
        });
}

function tellJoke() {
    const jokes = [
        'Why don’t scientists trust atoms? Because they make up everything!',
        'What do you get when you cross a snowman and a vampire? Frostbite.',
        'Why did the scarecrow win an award? Because he was outstanding in his field.'
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}
