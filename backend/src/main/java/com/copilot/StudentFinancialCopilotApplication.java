package com.copilot;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for Student Financial Copilot Spring Boot Application.
 * Demonstrates Spring Boot auto-configuration, dependency injection, and layered architecture.
 */
@SpringBootApplication
public class StudentFinancialCopilotApplication {

    public static void main(String[] args) {
        // Optionally load local .env if present in root or server directory
        try {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            dotenv.entries().forEach(entry -> {
                if (System.getProperty(entry.getKey()) == null && System.getenv(entry.getKey()) == null) {
                    System.setProperty(entry.getKey(), entry.getValue());
                }
            });
        } catch (Exception ignored) {
            // Proceed with standard system environment variables
        }

        SpringApplication.run(StudentFinancialCopilotApplication.class, args);
    }
}
