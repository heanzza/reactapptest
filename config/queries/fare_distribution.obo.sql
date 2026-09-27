-- Distribution of trips across fare-amount buckets for the selected range.
-- @param start_date DATE = 2016-01-01
-- @param end_date DATE = 2016-02-29
SELECT
  CASE
    WHEN fare_amount < 10 THEN '< $10'
    WHEN fare_amount < 20 THEN '$10–20'
    WHEN fare_amount < 30 THEN '$20–30'
    WHEN fare_amount < 50 THEN '$30–50'
    ELSE '$50+'
  END        AS fare_bucket,
  COUNT(*)   AS trip_count
FROM samples.nyctaxi.trips
WHERE DATE(tpep_pickup_datetime) BETWEEN :start_date AND :end_date
GROUP BY 1
ORDER BY MIN(fare_amount)
