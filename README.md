# Purrfect Creations 

## Task

Alice has recently started a business selling 3D printed jewellery for cats.

As you would expect business is booming and Alice wants to keep track of the success of the business with a metrics dashboard.

She is currently managing her orders in a spreadsheet in Airtable and would like to continue to be able to do so.

She would like her dashboard to contain some key figures, such as:

- Total Orders
- Total Orders this month
- Number of orders in progress
- Revenue
- A list of the most recent few orders 
- ..and anything else that you think that she may find useful.

## Getting Started

### Prerequisites

Before running the environment you will need to ensure you have the proper api key. To generate or manage your API key, visit your [account](https://airtable.com/account) page. Using your API key and base id, create a `.env` file under the `api` directory with the following contents:
```dotenv
API_KEY="YOUR_API_KEY"
BASE_ID="BASE_ID"
```

### Running the environment

#### Running in development mode:
* Run `npm install` inside both the `api` and `webapp` folders
* Run `npm start` to spin up webapp/API.

#### Using Docker:
* Create API image by navigating to the `api` directory and running `docker build -t purfect-creations-api ./`
* Create webapp image by navigating to the `webapp` directory and running `docker build -t purfect-creations-webapp ./`
* Spin up both containers by navigating to the root folder and running `docker-compose up -d`