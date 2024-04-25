DROP TABLE IF EXISTS dnpao;

CREATE TABLE dnpao (
    YearStart INT NOT NULL,
    LocationAbbr VARCHAR NOT NULL,
    LocationDesc VARCHAR NOT NULL,
	QuestionID VARCHAR NOT NULL,
	Question  VARCHAR NOT NULL,
    Data_Value FLOAT,
    Stratification1 VARCHAR NOT NULL,
    StratificationID1 VARCHAR NOT NULL
);

--Query obesity rates per stratification per state in 2022
SELECT * FROM dnpao
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
-- 	ORDER BY locationdesc,
-- 	stratificationid1;

-- View Distinct Stratification ID's
SELECT DISTINCT(stratificationid1), stratification1
FROM dnpao
-- ORDER BY stratificationid1;

-- Count Distinct Stratification ID's
SELECT (COUNT(DISTINCT(stratificationid1))) AS "Distinct Stratification IDs"
FROM dnpao;

--Query Just the Overall State Obesity Rates
SELECT * FROM DNPAO
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
	AND LocationDesc <> 'National'
	AND Stratificationid1 = 'OVERALL';
	
--Query National per Stratification Obesity Rates
-- removing single "Overall" row. Renders 26 rows.
SELECT * FROM DNPAO
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
	AND LocationDesc = 'National'
-- 	AND stratificationid1 <> 'OVERALL'
-- 	ORDER BY stratificationid1;