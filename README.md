# synergy-boat-task

## API Endpoints
1. From energyusages collection:-
	1.1 Get totalEnergy grouped by stationId. - /energy/total-energy-by-station
	1.2 Get totalHours transformed into minutes grouped by date. - /energy/total-minutes-by-date
	1.3 Get the most busy hour from hourly_port. - /energy/most-busy-hour
	1.4 Map the hourly_port of each portNumber across all the records and sum them (by hour). - /energy/sum-hourly-port-by-hour
2. From useranlytics collection,
	2.1 Group userId by action and return the sum of “LOGIN” action in descending order. - /user-analytics/sum-login-actions-by-userId
	2.2 Get the most active user (includes all action types) grouped by createdAt date. - /user-analytics/most-active-user-by-date

## To run the server:
1. Download the code and run `npm install`.
2. Create .env file.
3. Run `npm start`.
