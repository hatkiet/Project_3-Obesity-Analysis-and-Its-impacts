DROP VIEW IF EXISTS dnpao_all, 
obesity_all, 
overall_national_obesity_2022, 
overall_state_obesity_2022, 
stratificationids;

-- 2. RUN CREATE
CREATE TABLE IF NOT EXISTS dnpao (
    yearstart INT NOT NULL,
    yearend INT NOT NULL,
	locationabbr VARCHAR(2) NOT NULL,
    locationdesc VARCHAR(20) NOT NULL,
	datasource VARCHAR(5) NOT NULL,
	
	QuestionID VARCHAR NOT NULL,
	Question  VARCHAR NOT NULL,
    Data_Value FLOAT,
    Stratification1 VARCHAR NOT NULL,
    StratificationID1 VARCHAR NOT NULL
);

-- 3. IMPORT CSV AT THIS POINT

-- 4. RUN QUERY/VIEWS

--View and Query for complete table
CREATE OR REPLACE VIEW DNPAO_All AS
SELECT * FROM dnpao
	ORDER BY yearstart, locationdesc, questionid, stratificationid1;
Select * from DNPAO_All; --VIEW

--View and Query for Obesity 
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

--Query just the overall state obesity rates in 2022
CREATE OR REPLACE VIEW Overall_State_Obesity_2022 AS
SELECT * FROM DNPAO
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
	AND LocationDesc <> 'National'
	AND Stratificationid1 = 'OVERALL';
SELECT * FROM Overall_State_Obesity_2022; --VIEW
	
--Query national obesity rates per each individual stratification (27 Rows)
-- Removing the single "Overall" row renders 26 rows.
CREATE OR REPLACE VIEW Overall_National_Obesity_2022 AS
SELECT * FROM DNPAO
	WHERE YearStart = 2022
	AND QuestionID = 'Q036'
	AND LocationDesc = 'National'
	AND stratificationid1 <> 'OVERALL'
	ORDER BY stratificationid1;
SELECT * FROM Overall_National_Obesity_2022; --VIEW