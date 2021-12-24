# blv-express
Express backend for the Blaasveld.net project

## Run the project

Use `npm start` to run the project locally on port 3000.

## Run the project in a container

1. Build the Docker image with `docker build . -t jbrems/blv-express`.
1. Start the container with `docker run -p 3000:3000 jbrems/blv-express`.

## Deploy the container to Google Cloud Run

1. Build the Docker image with `docker build . -t jbrems/blv-express`.
1. Make sure you are logged in to Google Cloud or login with `gcloud auth login`.
1. Make sure `blaasveld-net` is the active project with `gcloud config list` or run `gcloud config set project blaasveld-net`.
1. Run `gcloud builds submit --tag gcr.io/blaasveld-net/blv-express` to upload the container image to Google Cloud.
1. Start the container with `gcloud run deploy --image gcr.io/blaasveld-net/blv-express`. Choose `y` when asked to allow unauthenticated invocations.

Or use `npm run deploy`.

## Stop the container on Google Cloud Run

1. Go to [https://console.cloud.google.com/run?project=blaasveld-net](https://console.cloud.google.com/run?project=blaasveld-net).
1. Select the running service and click `Delete`.

