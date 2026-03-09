package nodejs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Update {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		try {
            // Register MySQL JDBC driver
            DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver());

            // Connect to the database 24wh1a05a2
            Connection connection = DriverManager.getConnection(
            	    "jdbc:mysql://localhost:3306/24wh1a05a2",
            	    "javauser",
            	    "1234"
            	);

            Statement statement = connection.createStatement();

            // Update salary for 'ram'
            int rowsUpdated = statement.executeUpdate(
                "UPDATE emp SET salary=20000 WHERE empname='ram'"
            );
            System.out.println("Rows updated: " + rowsUpdated);

            // Select all rows to verify
            ResultSet rs = statement.executeQuery("SELECT * FROM emp");

            while (rs.next()) {
                System.out.println(
                    "EmpID: " + rs.getInt("empid") +
                    ", Name: " + rs.getString("empname") +
                    ", Salary: " + rs.getInt("salary")
                );
            }

            connection.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

	}

}
