-- Trip volume by hour of day (0–23) for the selected range.
-- @param start_date DATE = 2016-01-01
-- @param end_date DATE = 2016-02-29
SELECT
  HOUR(tpep_pickup_datetime) AS pickup_hour,
  COUNT(*)                   AS trip_count
FROM samples.nyctaxi.trips
WHERE DATE(tpep_pickup_datetime) BETWEEN :start_date AND :end_date
GROUP BY HOUR(tpep_pickup_datetime)
ORDER BY pickup_hour
