package nodejs;

import java.sql.*;

public class ReadExample {
    public static void main(String[] args) {
        try {
            // Load JDBC driver (optional in modern JDBC)
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to your database
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/24wh1a05a2",
                    "javauser",
                    "1234"
            );
            // Execute query
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM emp");

            // Print results
            while (rs.next()) {
                System.out.println(
                        rs.getInt("empid") + " - " +
                        rs.getString("empname") + " - " +
                        rs.getInt("salary")
                );
            }

            // Close connection
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
