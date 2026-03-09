package nodejs;

import java.sql.*;

public class UpdateExample {
    public static void main(String[] args) {
        try {
            // Load JDBC driver (optional in JDBC 4+)
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to your database
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/24wh1a05a2",
                    "javauser",
                    "1234"
            );

            // Create statement and execute update query
            Statement stmt = con.createStatement();
            stmt.executeUpdate(
                    "UPDATE emp SET empname='JaneDoe' WHERE salary=20000 "
            );

            System.out.println("Record updated successfully!");

            // Close connection
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
