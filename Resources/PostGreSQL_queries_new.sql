-- 1. RUN DROP
DROP VIEW IF EXISTS dnpao_all,
obesity_all,
overall_national_obesity_2022,
overall_state_obesity_2022,
stratificationids;
DROP TABLE IF EXISTS dnpao;

-- 2. RUN CREATE TABLE
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

-- 3. IMPORT CSV AT THIS POINT

-- 4. RUN QUERY/VIEWS

--View and Query for complete table
CREATE OR REPLACE VIEW dnpao_all AS
SELECT * FROM dnpao
	ORDER BY yearstart, locationdesc, questionid, stratificationid1;
Select * from DNPAO_All; --VIEW

--View and query for obesity in 2022, across all stratifications
CREATE OR REPLACE VIEW Obesity_all AS
SELECT * FROM dnpao
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
	ORDER BY locationdesc, stratificationid1;
SELECT * FROM Obesity_all; --VIEW

-- View Distinct Stratification ID's
CREATE OR REPLACE VIEW StratificationIDs AS
SELECT DISTINCT(stratificationid1), stratification1
	FROM dnpao
	ORDER BY stratificationid1;
Select * from StratificationIDs; --VIEW

-- Count distinct stratification ID's
SELECT (COUNT(DISTINCT(stratificationid1))) AS "Distinct Stratification IDs"
FROM dnpao;

--Query overall state obesity rates in 2022 (excludes national data)
CREATE OR REPLACE VIEW Overall_State_Obesity_2022 AS
SELECT * FROM DNPAO
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
	AND LocationDesc <> 'National'
	AND Stratificationid1 = 'OVERALL';
SELECT * FROM Overall_State_Obesity_2022; --VIEW
	
--Query national obesity rates per each individual stratification (27 rows)
--adding line 66 excludes the "Overall" value (26 rows)
CREATE OR REPLACE VIEW Overall_National_Obesity_2022 AS
SELECT * FROM DNPAO
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
	AND LocationDesc = 'National'
	AND stratificationid1 <> 'OVERALL'
	ORDER BY stratificationid1;
SELECT * FROM Overall_National_Obesity_2022; --VIEW