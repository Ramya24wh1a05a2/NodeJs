package nodejs;

import java.sql.*;

public class DeleteExample {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/24wh1a05a2",
                    "javauser",
                    "1234"
            );

            Statement stmt = con.createStatement();
            stmt.executeUpdate("DELETE FROM emp WHERE empname='Ramya'");

            System.out.println("Record deleted successfully!");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
