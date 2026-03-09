package nodejs;

import java.sql.*;

public class InsertExample {
    public static void main(String[] args) {
        try {
            // Load JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to database
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/24wh1a05a2",
                    "javauser",
                    "1234"
            );

            // Create statement and execute insert query
            Statement stmt = connection.createStatement();
            stmt.executeUpdate("INSERT INTO emp (empname, salary) VALUES ('Ramya', 200000)");

            System.out.println("Record inserted successfully!");

            // Close connection
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
