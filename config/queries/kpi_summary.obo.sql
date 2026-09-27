-- Headline KPIs for the selected pickup-date range.
-- @param start_date DATE = 2016-01-01
-- @param end_date DATE = 2016-02-29
SELECT
  COUNT(*)                                                                    AS trip_count,
  ROUND(AVG(fare_amount), 2)                                                  AS avg_fare,
  ROUND(SUM(fare_amount), 2)                                                  AS total_fare,
  ROUND(AVG(trip_distance), 2)                                               AS avg_distance,
  ROUND(AVG(DATEDIFF(MINUTE, tpep_pickup_datetime, tpep_dropoff_datetime)), 1) AS avg_duration_min
FROM samples.nyctaxi.trips
WHERE DATE(tpep_pickup_datetime) BETWEEN :start_date AND :end_date
