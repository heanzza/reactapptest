-- Daily trip volume and average fare over the selected range.
-- @param start_date DATE = 2016-01-01
-- @param end_date DATE = 2016-02-29
SELECT
  DATE(tpep_pickup_datetime)  AS trip_date,
  COUNT(*)                    AS trip_count,
  ROUND(AVG(fare_amount), 2)  AS avg_fare
FROM samples.nyctaxi.trips
WHERE DATE(tpep_pickup_datetime) BETWEEN :start_date AND :end_date
GROUP BY DATE(tpep_pickup_datetime)
ORDER BY trip_date
