-- Busiest pickup → dropoff ZIP pairs for the selected range.
-- @param start_date DATE = 2016-01-01
-- @param end_date DATE = 2016-02-29
SELECT
  pickup_zip,
  dropoff_zip,
  COUNT(*)                   AS trip_count,
  ROUND(AVG(fare_amount), 2) AS avg_fare,
  ROUND(AVG(trip_distance), 2) AS avg_distance
FROM samples.nyctaxi.trips
WHERE DATE(tpep_pickup_datetime) BETWEEN :start_date AND :end_date
GROUP BY pickup_zip, dropoff_zip
ORDER BY trip_count DESC
LIMIT 10
