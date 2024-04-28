# DNPAO Project
**Red Team members's (Firstname's order): Harrison Lee, Kiet Hoang, Michael MacInnis, Michael Nurthen, Temi Olufemi**

# An overview of the project and its purpose

_Project Aim:_ This dataset contains various demographic information from the United States, which shows how it relates to obesity, exercise and diet habits. The project aims to analyze demographic information and its impact on obesity trends in the United States. The dataset was sourced from the BRFSS (Behavioural Risk Factor Surveillance System), which is then used by the CDC's Division of Nutrition, Physical Activity, and Obesity (DNPAO).

The demographic variables include education level, age, ethnicity, gender, and income. These factors are examined to understand their impact on obesity trends. The data used for this project was a large dataset with different categories and questions. We collected and amended it based on the questions, specifically related to diet, exercise, and obesity.

The data is stratified by age, education, income, gender, and race, providing detailed insights. Additionally, this dataset includes an "Overall" value for each state, as well as an overall value for the entire nation. We then cleaned it and created a smaller dataset called DNPAO, which focuses on nutrition, physical activities, and obesity.

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


# A paragraph summarizing efforts for ethical considerations made in the project
(_At least one paragraph summarizing efforts for ethical considerations made in the project_)

The way data is reported can sometimes make it possible for someone to figure out personal information through reverse engineering. This means that if someone has access to known demographic information about an individual, they could potentially figure out that person's individual responses to a survey, provided that person is specific enough. For instance, if we know that a person is female, aged 18-24, Native American, has a college education, is in the highest income bracket, and lives in Guam in 2022, we could potentially determine their responses to survey questions about their routines, alcohol and tobacco consumption, and other such topics. 

This raises ethical concerns about how this data is reported and served by organizations like the CDC. To address this, the CDC formats the data in a way that only provides information about a specific question along with a specific demographic and group. For example, a document about obesity would contain many records, each one specifying state, year, and age group (e.g. 18-24), but no other demographic information is included in that record. This means that it is not possible to directly relate that data to any specific individual or group.


# References for the data source(s) 

https://dev.socrata.com/foundry/data.cdc.gov/hn4x-zwk7

# References for any code used that is not your own: 
It was a group effort. We wrote the code ourselves, sometimes using AI assistance for debugging and/or optimization.
