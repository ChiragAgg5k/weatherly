<h1 align="center">
    Weatherly
</h1>

| ![Thumbnail 1](/assets/dark_landscape_ss.png) | ![Thumbnail 2](/assets/light_portrait_ss.png) |
| :----------------------------: | :-------------------------------------: |

Weatherly is a smart weather app with the power of ChatGPT. It has a dashboard showing current weather report, 10 days weather forecast in form **of** graph and a lot more weather data along with a chatbot to answer all of your weather related queries and provide insights about the weather.

## Installation

You can directly use the app from [here](https://weatherly.vercel.app/).

To build the app locally, make sure you have [NPM](https://nodejs.org/en/) installed. Then follow the steps below:

- Clone the repository

```bash
git clone 
cd weatherly
```

- Install dependencies

```bash
npm install
```

- Create a `.env.local` file in the root directory of the project and add the following environment variables

```bash
OPEN_WEATHER_API_KEY=<YOUR_OPEN_WEATHER_API_KEY>
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

- Run the development server

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel AI SDK](https://vercel.com/blog/introducing-the-vercel-ai-sdk)
- [gpt-3.5-turbo](https://platform.openai.com/docs/models/gpt-3-5)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Plotly.js](https://plotly.com/javascript/)
- [DaisyUI](https://daisyui.com/)

## Why?

This project is part of a quest provided by [Quine.sh](https://quine.sh/). The quest was to build a project using the [ChatGPT](https://vercel.com/blog/introducing-the-vercel-ai-sdk) and [Plotly.js](https://plotly.com/javascript/). I decided to build a weather app which can utilize these tools to enhance boring weather data provided by other weather apps.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
