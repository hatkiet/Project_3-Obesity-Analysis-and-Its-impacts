# DNPAO Project
Red Team members's (Firstname's order): _Harrison Lee, Kiet Hoang, Michael MacInnis, Michael Nurthen, Temi Olufemi_

# An overview of the project and its purpose

_Project Aim:_ Project-3-Red-Team aimed to analyze demographic information and its impact on obesity trends in the United States. The dataset was sourced from the BRFSS (Behavioural Risk Factor Surveillance System), which is then used by the CDC's Division of Nutrition, Physical Activity, and Obesity (DNPAO). This dataset contains various demographic information from the United States, which shows how it relates to obesity, exercise and diet habits.

The data used for this project was a large dataset with different categories and questions. We collected and amended it based on the questions, specifically related to diet, exercise, and obesity. The demographic stratifications included education, age, ethnicity, gender, and income. These factors are examined to understand their impact on obesity trends. Additionally, this dataset includes an "Overall" value for each state, as well as a single "Overall" value for the entire nation. We then cleaned and created a smaller dataset called DNPAO_cleaned.csv, which focuses strictly on data values of individuals who have self-identified as "Percent of adults aged 18 years and older who have obesity."

# Instructions on how to use and interact with the project

In the Python script titled "First_Clean.ipynb," we utilized the missingno library, which is an external library that was not covered in our class. This library allowed us to quickly visualize the entire dataset and subsequently clean it up by removing unnecessary columns and ensuring that the new dataset contained no missing data points (NAs).

We have utilized PostGreSQL to store our data (see /Resources/PostGreSQL_queries.sql) and then exported the necessary data in a CSV format for visualization. However, we have decided to use Python (see "Visualizations.ipynb") as an alternative method to further refine and analyze our data for better visualization.

We developed HTML (index.html) and Java scripts (/static/js/ and /static/css) to fulfill the following requirements:

  - HTML menus, dropdowns, and/or textboxes to display JavaScript-powered visualizations

  - Flask backend with interactive API routes that serve back Python or JavaScript created plots

  - Visualizations created from user-selected filtered data

Finally, we have deployed our project to a GitHub page. 

GitHub Page of Red Team's project is at https://hatkiet.github.io/Project_3_RedTeam/  

<img width="1783" alt="Screenshot 2024-04-28 at 12 44 58 AM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/36f3893b-6e7b-470b-b844-d6492b7fec7f">

# Visualizations: 
(**focus on a specific year 2022**)

[Fig.1: 3D plot of Percent of Obesity in each Age Group per State]

<img width="979" alt="Screenshot 2024-04-28 at 1 10 37 PM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/b49c29f9-1a22-44cb-bc69-1b832ead26ab">

[Fig. 2: Percent of Obesity in each Age Group per State]

<img width="595" alt="Screenshot 2024-04-28 at 1 08 03 PM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/ff5a4f6e-c022-48a9-97a7-e5da5feb6396">

[Fig.3: National levels]

The CDC 2022 Adult Obesity Maps for overall 50 states, the District of Columbia, and 3 US territories show the proportion of adults with a body mass index (BMI) equal to or greater than 30 ( ≥30 kg/m2) based on self-reported weight and height.

A. By Age

<img width="1018" alt="Screenshot 2024-04-28 at 1 12 48 PM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/77e460f4-5273-4d79-903e-95b6e07bcff2">

B. By Education

<img width="1025" alt="Screenshot 2024-04-28 at 1 15 54 PM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/ca93bb56-de0d-4c48-981a-b0272cab70ed">

C. By Income

<img width="1020" alt="Screenshot 2024-04-28 at 1 16 14 PM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/85e386db-8565-425f-80ed-868812aa3275">

D. By Gender

<img width="1028" alt="Screenshot 2024-04-28 at 1 16 05 PM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/8d14fe04-e19f-4049-9d46-2457aca9ee71">

E. By Race/Ethnicity

<img width="1009" alt="Screenshot 2024-04-28 at 1 16 24 PM" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/7bd4b438-c880-479d-a9a2-2e27f751948a">

F. By overall population per state

<img width="1774" alt="q036_2022_overall" src="https://github.com/hatkiet/Project_3_RedTeam/assets/154276115/6caf7e4c-7314-4c6e-b83a-c627f428cfa3">

# Initial Thoughts and Concluding Remarks
We initially suspected that greater rates of obesity would be found in the lower bands of income earners, speculating that access to high-quality, nutritious foods may be more economically out of reach for low-income earners. 
After graphing, that hypothesis was debunked, as state rates of obesity were not significantly higher in any one income stratification over others. 

When we projected “Total” (data divorced from all stratifications) obesity values for each state on a US map, we saw that Louisiana and West Virginia reported the highest obesity rates. This data was not mirrored when we looked at the same state obesity rates, but specifically in regards to income. Put another way, Louisiana and West Virginia were not the same top two states for obesity rates when we looked at the lower stratifications of income. Only Louisiana appears as the state with the highest obesity rates when observing the $25,000-$34,999 income range, seconded by Kentucky (not West Virginia). West Virginia does appear as a state with the highest obesity rate in the $50,000-$74,999 range, as well as the “Data not reported” income range, but is not seconded by Louisiana for either of these ranges.

Due to the highly stratified nature of the dataset, it is difficult to draw any referential conclusions by attempting to make correlations between the stratifications. More time and more research with additional datasets would need to be conducted to better determine what specific demographics might shape obesity trends in the United States.


# A paragraph summarizing efforts for ethical considerations made in the project
(_At least one paragraph summarizing efforts for ethical considerations made in the project_)

The way data is usually reported can sometimes make it possible for someone to figure out personal information through reverse engineering. This means that if someone has access to known demographic information about an individual, they could potentially figure out that person's individual responses to a survey, provided that person is specific enough. For instance, if we know that a person is female, aged 18-24, Native American, has a college education, is in the highest income bracket, and lives in Guam in 2022, we could potentially determine their responses to survey questions about their routines, alcohol and tobacco consumption, and other such topics. 

This raises ethical concerns about how the data is reported and served by organizations like the CDC. To address this, the CDC formats the data in a way that only provides information about a specific question along with a specific demographic and group. For example, a document about obesity would contain many records, each one specifying state, year, and age group (e.g. 18-24), but no other demographic information is included in that record. This means that it is not possible to directly relate that data to any specific individual or group.


# References for the data source(s) 

https://dev.socrata.com/foundry/data.cdc.gov/hn4x-zwk7

# References for any code used that is not your own: 
It was a group effort. We wrote the code ourselves, sometimes using AI assistance for debugging and/or optimization.

# Member's contributions: 

**- Harrison Lee and Kiet Hoang**: Jupyter notebook on cleaning, trimming dataset, saving to CSV, visualizations, HTML and Java script.

**- Michael Nurthen**: Project coordination; Jupyter Notebook on data cleansing, database creation, sample queries and export to csv, JavaScript

**- Michael MacInnis**: Database creation, database queries

**- Temi Olufemi**: 
