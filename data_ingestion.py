import pandas as pd
import os
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

class DataIngestionPipeline:
    def __init__(self, directory, nan_threshold=0.5):
        self.directory = directory
        self.dataframes = {}
        self.merged_data = None
        self.nan_threshold = nan_threshold  # Proportion of NaNs to consider dropping a column

    def load_csv_files(self):
        """Load all CSV files in the specified directory into a dictionary of DataFrames."""
        for filename in os.listdir(self.directory):
            if filename.endswith('.csv'):
                filepath = os.path.join(self.directory, filename)
                df = pd.read_csv(filepath)
                self.dataframes[filename] = df
                print(f"Loaded {filename} with shape {df.shape}")

    def merge_dataframes(self):
        """Merge DataFrames based on common columns and save the merged DataFrame."""
        if not self.dataframes:
            print("No dataframes loaded. Exiting merge.")
            return

        # Start with the first dataframe
        self.merged_data = list(self.dataframes.values())[0]
        print(f"Starting merge with {self.merged_data.shape[0]} rows.")

        # Merge each subsequent dataframe
        for df in list(self.dataframes.values())[1:]:
            common_columns = self.merged_data.columns.intersection(df.columns).tolist()
            if common_columns:
                self.merged_data = pd.merge(self.merged_data, df, on=common_columns, how='outer')
                print(f"Merged with a dataframe having shape {df.shape}. New shape: {self.merged_data.shape}")
            else:
                print(f"No common columns to merge with {df.columns.tolist()}.")


    def preprocess_data(self):
        """Preprocess the merged data."""
        if self.merged_data is not None:
            # Drop columns with too many NaN values
            nan_limit = int(self.nan_threshold * self.merged_data.shape[0])
            self.merged_data.dropna(axis=1, thresh=nan_limit, inplace=True)
            print(f"Dropped columns with too many NaN values. New shape: {self.merged_data.shape}")

            # Fill NaN values based on user-defined strategy
            for column in self.merged_data.columns:
                if self.merged_data[column].isnull().any():
                    if pd.api.types.is_numeric_dtype(self.merged_data[column]):
                        mean_value = self.merged_data[column].mean()
                        self.merged_data[column].fillna(mean_value, inplace=True)
                        print(f"Filled NaNs in '{column}' with mean: {mean_value}")
                    else:
                        mode_value = self.merged_data[column].mode()[0]
                        self.merged_data[column].fillna(mode_value, inplace=True)
                        print(f"Filled NaNs in '{column}' with mode: {mode_value}")

            # Drop duplicates
            self.merged_data.drop_duplicates(inplace=True)
            print(f"Dropped duplicates. New shape: {self.merged_data.shape}")

            # Identify numeric and categorical columns
            numeric_cols = self.merged_data.select_dtypes(include=['int64', 'float64']).columns.tolist()
            categorical_cols = self.merged_data.select_dtypes(include=['object']).columns.tolist()

            # Convert categorical columns to string type to handle mixed types
            for col in categorical_cols:
                self.merged_data[col] = self.merged_data[col].astype(str)

            # Scale numeric features
            if numeric_cols:
                scaler = StandardScaler()
                self.merged_data[numeric_cols] = scaler.fit_transform(self.merged_data[numeric_cols])
                print(f"Scaled numeric columns: {numeric_cols}")

            # Encode categorical features
            if categorical_cols:
                # Limit the number of unique categories by grouping infrequent ones
                for col in categorical_cols:
                    freq = self.merged_data[col].value_counts()
                    # Define a threshold for frequency
                    threshold = 100  # Adjust this threshold as needed
                    self.merged_data[col] = self.merged_data[col].where(freq[self.merged_data[col]].gt(threshold), 'Other')

                encoder = OneHotEncoder(sparse_output=True, drop='first')  # Use sparse matrix
                encoded_cols = encoder.fit_transform(self.merged_data[categorical_cols])
                encoded_col_names = encoder.get_feature_names_out(categorical_cols)
                self.merged_data = pd.concat([self.merged_data, pd.DataFrame(encoded_cols.toarray(), columns=encoded_col_names)], axis=1)
                self.merged_data.drop(columns=categorical_cols, inplace=True)
                print(f"Encoded categorical columns: {categorical_cols}")
            
            # Remove rows where any numeric column is NaN, null, or empty
            numeric_cols = self.merged_data.select_dtypes(include=['number']).columns.tolist()  # Get only numeric columns
            if numeric_cols:  # Only proceed if there are numeric columns
                rows_before = self.merged_data.shape[0]
                self.merged_data = self.merged_data.dropna(subset=numeric_cols)  # Drop rows with NaN in numeric columns
                rows_after = self.merged_data.shape[0]
                print(f"Removed {rows_before - rows_after} rows with NaN in numeric columns. New shape: {self.merged_data.shape}")
            
            # Save the merged DataFrame to a CSV file
            output_file = "merged_data.csv"  # You can customize the filename here
            self.merged_data.to_csv(output_file, index=False)
            print(f"Merged DataFrame saved to '{output_file}'.")


            
    def develop_schema(self):
        """Develop a schema based on the merged data."""
        if self.merged_data is not None:
            schema = self.merged_data.dtypes
            print("Data Schema:")
            print(schema)
        else:
            print("No merged data to develop a schema.")

    def structure_data(self):
        """Optionally, further structure the data as needed."""
        if self.merged_data is not None:
            # Example: Rename columns to lowercase
            self.merged_data.columns = self.merged_data.columns.str.lower()
            print("Data structured with lowercase column names.")

    def run_pipeline(self):
        """Run the complete pipeline."""
        self.load_csv_files()
        self.merge_dataframes()  # Merge based on similar columns
        self.preprocess_data()  # General preprocessing
        self.develop_schema()
        self.structure_data()

# Example usage
if __name__ == "__main__":
    directory = './sales'  # Set your CSV files directory
    pipeline = DataIngestionPipeline(directory)
    pipeline.run_pipeline()
