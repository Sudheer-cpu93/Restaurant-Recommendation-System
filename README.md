# Restaurant-Recommendation-System
Restaurant Recommendation System Using K-Means Clustering

## Project Overview
This project develops a **Restaurant Recommendation System** using **K-Means Clustering** to categorize restaurants based on various features such as location, average cost, rating, and user votes. The model identifies clusters of restaurants and suggests the best ones based on the user's location.

---

##  Objective
- Build a recommendation system that suggests top-rated restaurants based on the user's location and preferences.
- Group restaurants into clusters using K-Means for better classification and analysis.

---

##  Dataset Information
- **Dataset Name:** Zomato Dataset
- **Source:** Zomato API / CSV file
- **Features Used:**
  - `Latitude`
  - `Longitude`
  - `Average Cost for two`
  - `Aggregate rating`
  - `Votes`

---

## 🛠 Tech Stack / Libraries
- **Python**
- `pandas` - For data manipulation and analysis
- `numpy` - For numerical operations
- `scikit-learn` - For data preprocessing, clustering, and evaluation
- `matplotlib` & `seaborn` - For visualization of clusters and analysis

---

##  Key Steps in the Project
1. **Data Loading & Preprocessing**
    - Load the dataset and handle missing values.
    - Select relevant columns for clustering.
    - Standardize the data using `StandardScaler`.

2. **K-Means Clustering**
    - Use the Elbow Method to determine the optimal number of clusters.
    - Apply K-Means to categorize restaurants into clusters.
    - Evaluate clustering results using the **Silhouette Score**.

3. **Visualizing Clusters**
    - Visualize restaurant clusters using longitude and latitude coordinates.
    - Use scatter plots to highlight different clusters.

4. **Recommendation System**
    - Predict the user's cluster based on their location.
    - Recommend the top 5 restaurants from the corresponding cluster sorted by rating.

---

##  Visualizations
- **Elbow Method Plot:** To determine the optimal number of clusters.
- **Cluster Visualization:** Scatter plot displaying restaurant clusters based on geographical location.

---

##  Model Performance
- **Silhouette Score:** Measures the quality of clusters formed, indicating how similar an object is to its own cluster compared to other clusters.

---

##  How It Works
1. The user provides their **latitude and longitude**.
2. The system predicts the cluster the user belongs to.
3. The top 5 restaurants from the identified cluster are recommended based on **highest aggregate ratings**.


